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
    <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800/50">
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse"></div>
              )}
              
              <Icon 
                size={20} 
                className={`relative z-10 transition-colors ${
                  isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'
                }`} 
              />
              <span className="relative z-10 font-medium">{item.name}</span>
              
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-r-full"></div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
