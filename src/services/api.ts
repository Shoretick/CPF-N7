const API_URL = 'https://remarkable-adaptation-production-5d63.up.railway.app/api';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.clear();
    window.location.href = '/';
    throw new Error('Sesión expirada');
  }

  return response;
}