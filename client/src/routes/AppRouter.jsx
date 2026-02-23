import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import PublicLayout from '../components/layout/PublicLayout';

// Public pages
import HomePage from '../pages/public/HomePage';
import ContactPage from '../pages/public/ContactPage';
import LoginPage from '../pages/auth/LoginPage';

// Admin pages
import DashboardPage from '../pages/dashboard/DashboardPage';
import RequestsListPage from '../pages/requests/RequestsListPage';
import RequestDetailPage from '../pages/requests/RequestDetailPage';
import UsersListPage from '../pages/users/UsersListPage';
import ProfilePage from '../pages/profile/ProfilePage';

// Error pages
import UnauthorizedPage from '../pages/errors/UnauthorizedPage';
import NotFoundPage from '../pages/errors/NotFoundPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected admin routes */}
        <Route
          element={
            <ProtectedRoute requiredRole={['admin', 'super_admin']}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/solicitudes" element={<RequestsListPage />} />
          <Route path="/solicitudes/:id" element={<RequestDetailPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          
          {/* Users management - only super_admin */}
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute requiredRole="super_admin">
                <UsersListPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Error routes */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
