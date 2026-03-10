import { Users } from 'lucide-react';

const UsersListPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Gestión de Usuarios
          </span>
        </h1>
        <p className="text-gray-400">
          Administra los usuarios del sistema
        </p>
      </div>

      <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-12 border border-gray-700/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
              <Users className="text-cyan-400" size={40} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Función en Desarrollo</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Próximamente podrás gestionar usuarios, roles y permisos desde esta sección.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersListPage;
