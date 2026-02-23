import api from './axios';

/**
 * Create a new request (public - no auth needed)
 * @param {Object} data - { name, phone, email, description }
 * @returns {Promise} Created request
 */
export const createRequest = async (data) => {
  const response = await api.post('/api/requests', data);
  return response.data;
};

/**
 * Get all requests (admin only)
 * @param {Object} params - { status?, priority?, search?, page?, limit?, sortBy?, sortOrder? }
 * @returns {Promise} { requests, pagination, sort }
 */
export const getRequests = async (params = {}) => {
  const response = await api.get('/api/requests', { params });
  return response.data;
};

/**
 * Get request statistics (admin only)
 * @returns {Promise} { totals, status, priority }
 */
export const getRequestStats = async () => {
  const response = await api.get('/api/requests/stats');
  return response.data;
};

/**
 * Get request by ID (admin only)
 * @param {string} id 
 * @returns {Promise} Request object
 */
export const getRequestById = async (id) => {
  const response = await api.get(`/api/requests/${id}`);
  return response.data;
};

/**
 * Update request (admin only)
 * @param {string} id 
 * @param {Object} data - { status?, priority?, assignedTo? }
 * @returns {Promise} Updated request
 */
export const updateRequest = async (id, data) => {
  const response = await api.patch(`/api/requests/${id}`, data);
  return response.data;
};

/**
 * Add note to request (admin only)
 * @param {string} id 
 * @param {string} text 
 * @returns {Promise} Updated request with new note
 */
export const addNote = async (id, text) => {
  const response = await api.post(`/api/requests/${id}/notes`, { text });
  return response.data;
};

/**
 * Delete request (super_admin only)
 * @param {string} id 
 * @returns {Promise}
 */
export const deleteRequest = async (id) => {
  const response = await api.delete(`/api/requests/${id}`);
  return response.data;
};
