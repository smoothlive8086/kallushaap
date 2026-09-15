const API_URL = window.location.port === '5173' || window.location.port === '5174'
  ? 'http://localhost:2010/api'
  : '/api';

export const setToken = (token) => {
  if (token) {
    localStorage.setItem('smooth_token', token);
  } else {
    localStorage.removeItem('smooth_token');
  }
};

export const getToken = () => {
  return localStorage.getItem('smooth_token');
};

export const setUser = (user) => {
  if (user) {
    localStorage.setItem('smooth_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('smooth_user');
  }
};

export const getUser = () => {
  try {
    const userStr = localStorage.getItem('smooth_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const api = {
  getDiscordAuthUrl: () => request('/auth/discord-url'),
  exchangeCode: (code) => request('/auth/exchange', {
    method: 'POST',
    body: JSON.stringify({ code })
  })
};
