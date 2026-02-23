import api from './axios';

/**
 * Login with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise} { token, user }
 */
export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

/**
 * Get current user profile
 * @returns {Promise} User object
 */
export const getMe = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};

/**
 * Update current user profile
 * @param {Object} data - { name?, email?, currentPassword?, newPassword? }
 * @returns {Promise} Updated user
 */
export const updateMe = async (data) => {
  const response = await api.put('/api/auth/me', data);
  return response.data;
};

/**
 * Logout (clear local storage)
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};
