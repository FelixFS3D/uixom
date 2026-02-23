import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const PublicNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-3xl font-black tracking-tighter group">
            <span className="text-white">UI</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:from-cyan-300 group-hover:to-purple-300 transition-all">
              X
            </span>
            <span className="text-white">OM</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Inicio
            </Link>
            <Link
              to="/contacto"
              className="text-gray-300 hover:text-cyan-400 transition-colors font-medium"
            >
              Contacto
            </Link>
            <Link
              to="/login"
              className="group relative px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-2">
                <LogIn size={18} />
                Admin
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
