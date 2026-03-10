import useAuthStore from '../../store/authStore';
import { getRoleLabel } from '../../utils/formatters';
import { User, Mail, Shield } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Mi Perfil
          </span>
        </h1>
        <p className="text-gray-400">
          Información de tu cuenta
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-700/50">
            <h2 className="text-xl font-semibold text-white">Información Personal</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                <User className="text-cyan-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Nombre</p>
                <p className="font-semibold text-white text-lg">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                <Mail className="text-cyan-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="font-semibold text-white text-lg">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                <Shield className="text-cyan-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Rol</p>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white text-lg">{getRoleLabel(user.role)}</p>
                  <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 rounded-lg border border-cyan-500/30 text-sm">
                    {user.role === 'super_admin' ? 'Acceso Total' : 'Acceso Admin'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
