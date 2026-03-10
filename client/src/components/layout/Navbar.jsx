import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { LogOut, User } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="text-3xl font-black tracking-tighter group">
          <span className="text-white">UI</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:from-cyan-300 group-hover:to-purple-300 transition-all">
            X
          </span>
          <span className="text-white">OM</span>
          <span className="ml-3 text-sm font-semibold text-cyan-400">Admin</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">{user?.name}</span>
            <span className="text-xs px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 rounded-md border border-cyan-500/30">
              {user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
            </span>
          </div>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-cyan-500/50 transition-all">
              <User size={20} className="text-cyan-400" />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 py-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
              
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/perfil"
                    className={`${
                      active ? 'bg-gray-800/50' : ''
                    } flex items-center gap-3 px-4 py-3 text-sm text-gray-200 relative z-10 transition-colors`}
                  >
                    <User size={18} className="text-cyan-400" />
                    Mi Perfil
                  </Link>
                )}
              </Menu.Item>
              
              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-2"></div>
              
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? 'bg-red-500/10' : ''
                    } flex items-center gap-3 px-4 py-3 text-sm text-red-400 w-full text-left relative z-10 transition-colors`}
                  >
                    <LogOut size={18} />
                    Cerrar Sesión
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
