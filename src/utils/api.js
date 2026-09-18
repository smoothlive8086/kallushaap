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
  }),
  getUserGuilds: () => request('/guilds'),
  processRolePurchase: (data) => request('/payments/process-purchase', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  customizeRole: (id, data) => request(`/payments/customize-role/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  getMyPurchasedRoles: () => request('/payments/my-roles'),
  updatePurchasedRole: (id, data) => request(`/payments/update-role/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  keyauthAdminLogin: (username, password, hwid) => request('/auth/keyauth-login', {
    method: 'POST',
    body: JSON.stringify({ username, password, hwid })
  }),
  getGuilds: async () => {
    try {
      return await request('/admin/guilds');
    } catch {
      return await request('/guilds');
    }
  },
  getAuthorizedUsers: () => request('/admin/users'),
  getBotSettings: () => request('/admin/bot-settings'),
  saveBotSettings: (data) => request('/admin/bot-settings', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  leaveGuild: (guildId) => request(`/admin/guilds/${guildId}/leave`, { method: 'POST' }),
  getAdminPayments: async () => {
    try {
      return await request('/admin/payments');
    } catch (err) {
      return await request('/payments/admin/all');
    }
  },
  verifyPayment: async (id) => {
    try {
      return await request(`/admin/payments/${id}/verify`, { method: 'POST' });
    } catch (err) {
      return await request(`/payments/admin/${id}/verify`, { method: 'POST' });
    }
  },
  rejectPayment: async (id) => {
    try {
      return await request(`/admin/payments/${id}/reject`, { method: 'POST' });
    } catch (err) {
      return await request(`/payments/admin/${id}/reject`, { method: 'POST' });
    }
  },
  unverifyPayment: async (id) => {
    try {
      return await request(`/payments/admin/${id}/unverify`, { method: 'POST' });
    } catch (err) {
      return await request(`/admin/payments/${id}/unverify`, { method: 'POST' });
    }
  },
  deletePayment: async (id) => {
    try {
      return await request(`/payments/admin/${id}`, { method: 'DELETE' });
    } catch (err) {
      return await request(`/admin/payments/${id}`, { method: 'DELETE' });
    }
  },
  getPackages: () => request('/payments/packages'),
  createPackage: (data) => request('/payments/admin/packages', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updatePackage: (id, data) => request(`/payments/admin/packages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteConfigPackage: (id) => request(`/payments/admin/packages/${id}`, {
    method: 'DELETE'
  }),
  getPaymentSettings: () => request('/payments/settings'),
  updatePaymentSettings: (data) => request('/admin/payment-settings', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  // Member XP & Leveling API Endpoints
  getLevelLeaderboard: (guildId, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/guilds/${guildId}/levels/leaderboard?${query}`);
  },
  updateUserXp: (guildId, userId, data) => request(`/guilds/${guildId}/levels/user/${userId}/xp`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  resetUserXp: (guildId, userId) => request(`/guilds/${guildId}/levels/reset-user/${userId}`, {
    method: 'POST'
  }),
  resetAllXp: (guildId) => request(`/guilds/${guildId}/levels/reset-all`, {
    method: 'POST'
  }),
  getLevelStats: (guildId) => request(`/guilds/${guildId}/levels/stats`),
  autoGenerateLevelRoles: (guildId) => request(`/guilds/${guildId}/levels/auto-generate-roles`, { method: 'POST' })
};

