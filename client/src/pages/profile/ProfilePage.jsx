import useAuthStore from '../../store/authStore';
import Card from '../../components/common/Card';
import { getRoleLabel } from '../../utils/formatters';
import { User, Mail, Shield } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
        <p className="mt-1 text-sm text-gray-500">
          Información de tu cuenta
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <Card.Header>
            <h2 className="text-lg font-semibold">Información Personal</h2>
          </Card.Header>
          <Card.Body className="space-y-6">
            <div className="flex items-center gap-3">
              <User className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Rol</p>
                <p className="font-medium text-gray-900">{getRoleLabel(user.role)}</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
