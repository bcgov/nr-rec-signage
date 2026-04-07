const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export function createApiFetch(logout: () => void, token: () => string | null) {
  return async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    const headers = new Headers(init?.headers);
    const authToken = token();
    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }

    let url = input;
    if (typeof input === 'string') {
      url = `${BASE_URL}${input.startsWith('/') ? input : '/' + input}`;
    }

    const response = await fetch(url, { ...init, headers });

    if (response.status === 401) {
      logout();
    }

    return response;
  };
}
