import { Link } from 'react-router-dom';
import xLogo from '../../assets/x.png';

const PublicNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
        <Link to="/" className="flex items-center">
          <img src={xLogo} alt="X" className="w-9 h-9 object-contain hover:scale-110 transition-transform" />
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              About
            </Link>
            <Link
              to="/faq"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              FAQ
            </Link>
            <Link
              to="/contacto"
              className="text-gray-300 hover:text-cyan-400 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
