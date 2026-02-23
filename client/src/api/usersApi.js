import api from './axios';

/**
 * Get all users (admin only)
 * @param {Object} params - { role?, isActive?, search?, page?, limit? }
 * @returns {Promise} { users, pagination }
 */
export const getUsers = async (params = {}) => {
  const response = await api.get('/api/users', { params });
  return response.data;
};

/**
 * Get user by ID (admin only)
 * @param {string} id 
 * @returns {Promise} User object
 */
export const getUserById = async (id) => {
  const response = await api.get(`/api/users/${id}`);
  return response.data;
};

/**
 * Create user (admin only)
 * @param {Object} data - { name, email, password, role? }
 * @returns {Promise} Created user
 */
export const createUser = async (data) => {
  const response = await api.post('/api/users', data);
  return response.data;
};

/**
 * Update user (admin only)
 * @param {string} id 
 * @param {Object} data - { name?, email?, role?, isActive? }
 * @returns {Promise} Updated user
 */
export const updateUser = async (id, data) => {
  const response = await api.put(`/api/users/${id}`, data);
  return response.data;
};

/**
 * Delete user (soft delete - admin only)
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteUser = async (id) => {
  const response = await api.delete(`/api/users/${id}`);
  return response.data;
};
