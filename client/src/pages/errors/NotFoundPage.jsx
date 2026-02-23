import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { FileQuestion } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <FileQuestion className="mx-auto text-gray-400 mb-4" size={64} />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">
          La página que buscas no existe
        </p>
        <Link to="/">
          <Button>Volver al Inicio</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
