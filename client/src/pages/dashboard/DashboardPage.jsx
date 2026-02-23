import { useQuery } from '@tanstack/react-query';
import { getRequestStats } from '../../api/requestsApi';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

const DashboardPage = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['requestStats'],
    queryFn: getRequestStats,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Error al cargar las estadísticas
      </div>
    );
  }

  const statusCards = [
    {
      title: 'Nuevas',
      value: stats?.status?.new || 0,
      icon: FileText,
      color: 'blue',
    },
    {
      title: 'En Progreso',
      value: stats?.status?.in_progress || 0,
      icon: Clock,
      color: 'yellow',
    },
    {
      title: 'Completadas',
      value: stats?.status?.done || 0,
      icon: CheckCircle,
      color: 'green',
    },
    {
      title: 'Canceladas',
      value: stats?.status?.cancelled || 0,
      icon: XCircle,
      color: 'red',
    },
  ];

  const priorityCards = [
    { title: 'Baja', value: stats?.priority?.low || 0, color: 'gray' },
    { title: 'Media', value: stats?.priority?.medium || 0, color: 'blue' },
    { title: 'Alta', value: stats?.priority?.high || 0, color: 'orange' },
    { title: 'Urgente', value: stats?.priority?.urgent || 0, color: 'red' },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    gray: 'bg-gray-100 text-gray-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Resumen de solicitudes y estadísticas
        </p>
      </div>

      {/* Total Requests */}
      <Card>
        <Card.Body>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total de Solicitudes</p>
            <p className="mt-2 text-4xl font-bold text-gray-900">
              {stats?.totals?.requests || 0}
            </p>
          </div>
        </Card.Body>
      </Card>

      {/* Status Cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Por Estado</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statusCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title}>
                <Card.Body>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{card.title}</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${colorClasses[card.color]}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Priority Cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Por Prioridad</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {priorityCards.map((card) => (
            <Card key={card.title}>
              <Card.Body>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">{card.title}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
