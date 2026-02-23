import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { ShieldAlert } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <ShieldAlert className="mx-auto text-red-500 mb-4" size={64} />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">No Autorizado</h1>
        <p className="text-lg text-gray-600 mb-8">
          No tienes permisos para acceder a esta página
        </p>
        <Link to="/dashboard">
          <Button>Volver al Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
