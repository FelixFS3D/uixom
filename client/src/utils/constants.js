export const STATUS_OPTIONS = [
  { value: 'new', label: 'Nueva', color: 'blue' },
  { value: 'in_progress', label: 'En Progreso', color: 'yellow' },
  { value: 'done', label: 'Completada', color: 'green' },
  { value: 'cancelled', label: 'Cancelada', color: 'red' },
];

export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Baja', color: 'gray' },
  { value: 'medium', label: 'Media', color: 'blue' },
  { value: 'high', label: 'Alta', color: 'orange' },
  { value: 'urgent', label: 'Urgente', color: 'red' },
];

export const ROLE_OPTIONS = [
  { value: 'client', label: 'Cliente' },
  { value: 'admin', label: 'Administrador' },
  { value: 'super_admin', label: 'Super Admin' },
];

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';
