import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, User } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'super_admin'],
    },
    {
      name: 'Solicitudes',
      path: '/solicitudes',
      icon: FileText,
      roles: ['admin', 'super_admin'],
    },
    {
      name: 'Usuarios',
      path: '/usuarios',
      icon: Users,
      roles: ['super_admin'],
    },
    {
      name: 'Mi Perfil',
      path: '/perfil',
      icon: User,
      roles: ['admin', 'super_admin'],
    },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200">
      <nav className="p-4 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
