import { create } from 'zustand';
import { login as apiLogin, getMe, logout as apiLogout } from '../api/authApi';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  // Login action
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await apiLogin(email, password);
      
      // Save to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  // Logout action
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
    apiLogout();
  },

  // Refresh user data
  refreshUser: async () => {
    try {
      const userData = await getMe();
      localStorage.setItem('user', JSON.stringify(userData));
      set({ user: userData });
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
