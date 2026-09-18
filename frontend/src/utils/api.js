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
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
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

  // Server Admin & Management API Endpoints
  getSettings: (guildId) => request(`/guilds/${guildId}/settings`),
  saveSettings: (guildId, settings) => request(`/guilds/${guildId}/settings`, {
    method: 'POST',
    body: JSON.stringify(settings)
  }),
  getAdminGuildDetails: (guildId) => request(`/guilds/${guildId}`),
  updateAdminGuildDetails: (guildId, formData) => request(`/guilds/${guildId}`, {
    method: 'POST',
    body: formData
  }),
  getAdminMembers: (guildId, query = '') => request(`/guilds/${guildId}/members?query=${encodeURIComponent(query)}`),
  getAdminGuildRoles: (guildId) => request(`/guilds/${guildId}/roles`),
  createChannel: (guildId, name, type, parentId = null) => request(`/guilds/${guildId}/channels`, {
    method: 'POST',
    body: JSON.stringify({ name, type, parentId })
  }),
  renameChannel: (guildId, channelId, name) => request(`/guilds/${guildId}/channels/${channelId}`, {
    method: 'PUT',
    body: JSON.stringify({ name })
  }),
  deleteChannel: (guildId, channelId) => request(`/guilds/${guildId}/channels/${channelId}`, {
    method: 'DELETE'
  }),
  timeoutMember: (guildId, memberId, duration, reason) => request(`/guilds/${guildId}/members/${memberId}/timeout`, {
    method: 'POST',
    body: JSON.stringify({ duration, reason })
  }),
  kickMember: (guildId, memberId, reason) => request(`/guilds/${guildId}/members/${memberId}/kick`, {
    method: 'POST',
    body: JSON.stringify({ reason })
  }),
  banMember: (guildId, memberId, reason) => request(`/guilds/${guildId}/members/${memberId}/ban`, {
    method: 'POST',
    body: JSON.stringify({ reason })
  }),
  changeNickname: (guildId, memberId, nickname, reason) => request(`/guilds/${guildId}/members/${memberId}/nickname`, {
    method: 'POST',
    body: JSON.stringify({ nickname, reason })
  }),
  updateMemberRoles: (guildId, memberId, roleIds, reason) => request(`/guilds/${guildId}/members/${memberId}/roles`, {
    method: 'POST',
    body: JSON.stringify({ roleIds, reason })
  }),
  startBulkNickname: (guildId, data) => request(`/guilds/${guildId}/bulk-nickname`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getBulkNicknameStatus: (guildId) => request(`/guilds/${guildId}/bulk-nickname/status`),
  cancelBulkNickname: (guildId) => request(`/guilds/${guildId}/bulk-nickname/cancel`, {
    method: 'POST'
  }),
  resolveYoutubeChannel: (guildId, channelUrl) => request(`/guilds/${guildId}/youtube/resolve`, {
    method: 'POST',
    body: JSON.stringify({ channelUrl })
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

