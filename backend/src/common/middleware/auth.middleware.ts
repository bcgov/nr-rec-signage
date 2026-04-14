import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';

interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

const getIssuer = (authServerUrl: string, realm: string) => {
  if (!authServerUrl || !realm) {
    throw new Error('Keycloak configuration is missing (SSO_AUTH_SERVER_URL / SSO_REALM or KEYCLOAK_AUTH_SERVER_URL / KEYCLOAK_REALM)');
  }
  return `${authServerUrl.replace(/\/$/, '')}/realms/${realm}`;
};

const hasAdminRole = (payload: JWTPayload, clientId?: string): boolean => {
  console.log(payload);
  const realmRoles = (payload?.client_roles as string[]) || [] as string[];

  return realmRoles.includes('admin');
};

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private jwksUrl?: URL;

  constructor(private readonly configService: ConfigService) {}

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

    req.user = payload;

    const method = req.method.toUpperCase();
    if (method === 'POST' || method === 'PUT') {
      const normalizedPath = req.path.toLowerCase();
      const allowNonAdmin =
        normalizedPath.startsWith('/api/signs') ||
        normalizedPath.startsWith('/api/upload');

      if (!allowNonAdmin && !hasAdminRole(payload, config?.clientId)) {
        return res.status(403).json({ message: 'Admin role required' });
      }
    }

    next();
  }
}
