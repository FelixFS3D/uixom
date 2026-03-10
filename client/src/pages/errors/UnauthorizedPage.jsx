import { Link } from 'react-router-dom';
import { ShieldAlert, LayoutDashboard } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwgMjExLCAyMzgsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="inline-block mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl flex items-center justify-center border border-orange-500/30 animate-pulse">
            <ShieldAlert className="text-orange-400" size={64} />
          </div>
        </div>
        <h1 className="text-5xl font-black mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">No Autorizado</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
          No tienes permisos para acceder a esta página
        </p>
        <Link to="/dashboard">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 hover:scale-105">
            <span className="relative z-10 flex items-center gap-2 justify-center">
              <LayoutDashboard size={20} />
              Volver al Dashboard
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
