import { format, formatDistanceToNow } from 'date-fns';
import { enGB } from 'date-fns/locale';

/**
 * Format date to readable string
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return '-';
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: enGB });
};

/**
 * Format date to short format
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatDateShort = (date) => {
  if (!date) return '-';
  return format(new Date(date), 'dd/MM/yyyy', { locale: enGB });
};

/**
 * Format date as relative time (e.g., "2 hours ago")
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-';
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: enGB });
};

/**
 * Get status badge color
 * @param {string} status 
 * @returns {string} Tailwind color class
 */
export const getStatusColor = (status) => {
  const colors = {
    new: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    done: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Get priority badge color
 * @param {string} priority 
 * @returns {string} Tailwind color class
 */
export const getPriorityColor = (priority) => {
  const colors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  };
  return colors[priority] || 'bg-gray-100 text-gray-800';
};

/**
 * Get status label in English
 * @param {string} status 
 * @returns {string}
 */
export const getStatusLabel = (status) => {
  const labels = {
    new: 'New',
    in_progress: 'In Progress',
    done: 'Completed',
    cancelled: 'Cancelled',
  };
  return labels[status] || status;
};

/**
 * Get priority label in English
 * @param {string} priority 
 * @returns {string}
 */
export const getPriorityLabel = (priority) => {
  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  };
  return labels[priority] || priority;
};

/**
 * Get role label in English
 * @param {string} role 
 * @returns {string}
 */
export const getRoleLabel = (role) => {
  const labels = {
    client: 'Client',
    admin: 'Administrator',
    super_admin: 'Super Admin',
  };
  return labels[role] || role;
};
