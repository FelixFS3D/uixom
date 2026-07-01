import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import uiLogo from '../../assets/ui.png';
import xLogo from '../../assets/x.png';
import omLogo from '../../assets/om.png';

const glassStyle = 'bg-gray-900/80 backdrop-blur-xl border border-gray-700/50';

const PublicNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top-left: logo */}
      <div className="fixed top-6 left-6 z-[100]">
        <Link to="/" className={`flex items-center gap-0.5 h-12 px-4 rounded-full ${glassStyle} hover:border-cyan-500/50 transition-all`}>
          <img src={uiLogo} alt="UI" className="h-4 w-auto object-contain" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.7)) drop-shadow(0 -1px 4px rgba(255,255,255,0.5))' }} />
          <img src={xLogo} alt="X" className="h-4 w-auto object-contain animate-pulse" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.7)) drop-shadow(0 -1px 4px rgba(255,255,255,0.5))' }} />
          <img src={omLogo} alt="OM" className="h-3 w-auto object-contain translate-y-[3px]" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.7)) drop-shadow(0 -1px 4px rgba(255,255,255,0.5))' }} />
        </Link>
      </div>

      {/* Top-right: hamburger + expanding bar */}
      <div className="fixed top-6 right-6 z-[100] flex items-center justify-end">
        {/* Expanding bar */}
        <div
          className={`flex items-center gap-6 overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-w-xl px-6 opacity-100' : 'max-w-0 px-0 opacity-0'
          } h-12 ${glassStyle} rounded-full mr-3 whitespace-nowrap`}
        >
          <Link to="/" onClick={() => setOpen(false)} className="text-gray-300 hover:text-white font-medium transition-colors">Home</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="text-gray-300 hover:text-white font-medium transition-colors">About</Link>
          <Link to="/faq" onClick={() => setOpen(false)} className="text-gray-300 hover:text-white font-medium transition-colors">FAQ</Link>
          <Link to="/contacto" onClick={() => setOpen(false)} className="text-gray-300 hover:text-cyan-400 font-medium transition-colors">Contact</Link>
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setOpen(o => !o)}
          className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full ${glassStyle} text-white hover:border-cyan-500/50 transition-all`}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </>
  );
};

export default PublicNavbar;
