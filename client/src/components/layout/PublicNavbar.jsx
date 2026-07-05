import { Link, NavLink } from 'react-router-dom';
import xLogo from '../../assets/x.png';

const PublicNavbar = () => {
  const activeLinkClass = "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-bold";
  const inactiveLinkClass = "text-gray-300 hover:text-white transition-colors";

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
      <div className="relative w-full px-8 py-3 bg-gray-900 rounded-xl">
        {/* Gradient Border */}
        <div className="absolute -inset-px bg-gray-900 rounded-xl blur-sm opacity-50" aria-hidden="true"></div>
        
        <div className="relative flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={xLogo} alt="X Logo" className="h-6 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
              About
            </NavLink>
            <NavLink to="/faq" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
              FAQ
            </NavLink>
            <NavLink to="/contacto" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
