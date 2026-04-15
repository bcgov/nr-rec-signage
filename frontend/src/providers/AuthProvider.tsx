import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { KeycloakInstance } from 'keycloak-js';
import { createApiFetch } from '../utils/ApiUtils';
import { initializeKeycloak } from '../service/keycloak';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
  apiFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  userInfo: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [keycloak, setKeycloak] = useState<KeycloakInstance | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      setLoading(true);

      if (mounted) {
        const kc = await initializeKeycloak();
        if(kc?.authenticated) {
            setKeycloak(kc);
            setToken(kc.token ?? null);
            setUserInfo(kc.tokenParsed);
            setIsAuthenticated(true);
            kc.onTokenExpired = async () => {
                try {
                    const refreshed = await kc.updateToken(30);
                    if (refreshed && kc.token) {
                    setToken(kc.token);
                    }
                } catch (error) {
                    console.error('Keycloak token refresh failed', error);
                    setIsAuthenticated(false);
                    setToken(null);
                }
            };
        } else {
            setIsAuthenticated(false);
            setToken(null);
        }
        setLoading(false);
      }
    };

    void initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const logout = async () => {
    setToken(null);
    setIsAuthenticated(false);
    window.location.reload();
  };

  const hasRole = (role: string) => {
    return keycloak?.idTokenParsed?.client_roles?.includes(role) ?? false;
  };

  const apiFetch = useMemo(
    () => createApiFetch(() => {
      void logout();
    }, () => token),
    [logout, token],
  );

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, loading, logout, hasRole, apiFetch, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
