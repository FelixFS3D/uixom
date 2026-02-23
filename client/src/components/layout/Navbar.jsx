import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { LogOut, User } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="px-6 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="text-xl font-bold text-blue-600">
          Uixom Admin
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user?.name}
          </span>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
              <User size={20} />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/perfil"
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } flex items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                  >
                    <User size={16} />
                    Mi Perfil
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } flex items-center gap-2 px-4 py-2 text-sm text-red-600 w-full text-left`}
                  >
                    <LogOut size={16} />
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
