import { useQuery } from '@tanstack/react-query';
import { getRequestStats } from '../../api/requestsApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FileText, Clock, CheckCircle, XCircle, TrendingUp, AlertCircle } from 'lucide-react';

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
      <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <AlertCircle size={20} />
          <span>Error al cargar las estadísticas</span>
        </div>
      </div>
    );
  }

  const statusCards = [
    {
      title: 'Nuevas',
      value: stats?.status?.new || 0,
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-blue-500/20',
      border: 'border-blue-500/30',
      iconBg: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: 'En Progreso',
      value: stats?.status?.in_progress || 0,
      icon: Clock,
      gradient: 'from-yellow-500 to-orange-500',
      shadow: 'shadow-yellow-500/20',
      border: 'border-yellow-500/30',
      iconBg: 'from-yellow-500/20 to-orange-500/20',
    },
    {
      title: 'Completadas',
      value: stats?.status?.done || 0,
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-500',
      shadow: 'shadow-green-500/20',
      border: 'border-green-500/30',
      iconBg: 'from-green-500/20 to-emerald-500/20',
    },
    {
      title: 'Canceladas',
      value: stats?.status?.cancelled || 0,
      icon: XCircle,
      gradient: 'from-red-500 to-pink-500',
      shadow: 'shadow-red-500/20',
      border: 'border-red-500/30',
      iconBg: 'from-red-500/20 to-pink-500/20',
    },
  ];

  const priorityCards = [
    { 
      title: 'Baja', 
      value: stats?.priority?.low || 0, 
      gradient: 'from-gray-500 to-gray-600',
      border: 'border-gray-500/30',
    },
    { 
      title: 'Media', 
      value: stats?.priority?.medium || 0, 
      gradient: 'from-blue-500 to-cyan-500',
      border: 'border-blue-500/30',
    },
    { 
      title: 'Alta', 
      value: stats?.priority?.high || 0, 
      gradient: 'from-orange-500 to-amber-500',
      border: 'border-orange-500/30',
    },
    { 
      title: 'Urgente', 
      value: stats?.priority?.urgent || 0, 
      gradient: 'from-red-500 to-pink-500',
      border: 'border-red-500/30',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Dashboard
          </span>
        </h1>
        <p className="text-gray-400">
          Resumen de solicitudes y estadísticas en tiempo real
        </p>
      </div>

      {/* Total Requests - Hero Card */}
      <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="text-cyan-400" size={32} />
            <p className="text-lg font-semibold text-gray-300">Total de Solicitudes</p>
          </div>
          <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2">
            {stats?.totals?.requests || 0}
          </p>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full"></div>
        </div>
      </div>

      {/* Status Cards */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
          Por Estado
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statusCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-xl p-6 border ${card.border} hover:scale-105 transition-all duration-300 ${card.shadow} hover:shadow-xl overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.iconBg} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-400 mb-2">{card.title}</p>
                    <p className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${card.gradient}`}>
                      {card.value}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${card.iconBg} border ${card.border}`}>
                    <Icon size={28} className={`text-transparent bg-clip-text bg-gradient-to-r ${card.gradient}`} style={{ WebkitTextStroke: '1px currentColor' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Priority Cards */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
          Por Prioridad
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {priorityCards.map((card) => (
            <div
              key={card.title}
              className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-xl p-6 border ${card.border} hover:scale-105 transition-all duration-300 overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="relative z-10 text-center">
                <p className="text-sm font-semibold text-gray-400 mb-2">{card.title}</p>
                <p className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${card.gradient}`}>
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
