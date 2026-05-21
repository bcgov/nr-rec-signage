import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import { UsersService } from '../../users/users.service';

interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
  currentUser?: any;
  hasAdminRole?: boolean;
}

const getIssuer = (authServerUrl: string, realm: string) => {
  if (!authServerUrl || !realm) {
    throw new Error('Keycloak configuration is missing (SSO_AUTH_SERVER_URL / SSO_REALM or KEYCLOAK_AUTH_SERVER_URL / KEYCLOAK_REALM)');
  }
  return `${authServerUrl.replace(/\/$/, '')}/realms/${realm}`;
};

const getIdirUsername = (payload: JWTPayload): string | undefined => {
  return (payload as any)?.idir_username || (payload as any)?.preferred_username || undefined;
};

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private jwksUrl?: URL;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  private getConfig() {
    const authServerUrl = this.configService.get<string>('SSO_AUTH_SERVER_URL') || this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL');
    const realm = this.configService.get<string>('SSO_REALM') || this.configService.get<string>('KEYCLOAK_REALM');
    const clientId = this.configService.get<string>('SSO_CLIENT_ID') || this.configService.get<string>('KEYCLOAK_CLIENT_ID');

    if (!authServerUrl || !realm) {
      throw new Error('Keycloak configuration is missing (SSO_AUTH_SERVER_URL / SSO_REALM or KEYCLOAK_AUTH_SERVER_URL / KEYCLOAK_REALM)');
    }

    if (!this.jwksUrl) {
      this.jwksUrl = new URL(`${getIssuer(authServerUrl, realm)}/protocol/openid-connect/certs`);
    }

    return { authServerUrl, realm, clientId, jwksUrl: this.jwksUrl };
  }

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.toLowerCase().startsWith('bearer ')) {
      return res.status(401).json({ message: 'Missing Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Missing bearer token' });
    }

    let payload: JWTPayload;
    let config;

    try {
      config = this.getConfig();
      const jwks = createRemoteJWKSet(config.jwksUrl);
      const verifyOptions: Record<string, unknown> = {
        issuer: getIssuer(config.authServerUrl, config.realm),
      };

      if (config.clientId) {
        verifyOptions.audience = config.clientId;
      }

      const verified = await jwtVerify(token, jwks, verifyOptions as any);
      payload = verified.payload;
    } catch (error) {
      return res.status(401).json({ message: error instanceof Error ? error.message : 'Invalid or expired token' });
    }

    const idirUsername = getIdirUsername(payload);
    if (!idirUsername) {
      return res.status(403).json({ message: 'IDIR username not found in token' });
    }

    const currentUser = await this.usersService.getByIdirUserName(idirUsername);
    if (!currentUser || !currentUser.is_active) {
      return res.status(403).json({ message: 'User not found or inactive' });
    }

    const isAdmin = currentUser.role.toLowerCase() === 'admin';
    req.user = payload;
    req.currentUser = currentUser;
    req.hasAdminRole = isAdmin;

    next();
  }
}
