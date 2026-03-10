import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRequestById } from '../../api/requestsApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import { formatDate } from '../../utils/formatters';
import { ArrowLeft, Mail, Phone, User, Calendar, AlertCircle, FileText, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const RequestDetailPage = () => {
  const { id } = useParams();
  
  const { data: request, isLoading, error } = useQuery({
    queryKey: ['request', id],
    queryFn: () => getRequestById(id),
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
          <span>Error al cargar la solicitud</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/solicitudes"
          className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-700/50 text-gray-400 hover:text-white"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-4xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Detalle de Solicitud
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">ID: {request._id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-700/50 flex items-center gap-3">
              <User className="text-cyan-400" size={24} />
              <h2 className="text-xl font-semibold text-white">Información del Cliente</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
                  <User className="text-cyan-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Nombre</p>
                  <p className="font-semibold text-white">{request.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
                  <Mail className="text-cyan-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-semibold text-white">{request.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
                  <Phone className="text-cyan-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <p className="font-semibold text-white">{request.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-700/50 flex items-center gap-3">
              <FileText className="text-cyan-400" size={24} />
              <h2 className="text-xl font-semibold text-white">Descripción</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{request.description}</p>
            </div>
          </div>

          {request.notes && request.notes.length > 0 && (
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-700/50 flex items-center gap-3">
                <MessageSquare className="text-cyan-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Notas Internas</h2>
              </div>
              <div className="p-6 space-y-4">
                {request.notes.map((note) => (
                  <div key={note._id} className="border-l-4 border-cyan-500 pl-4 py-3 bg-gray-800/30 rounded-r-lg">
                    <p className="text-gray-300">{note.text}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      Por {note.author?.name || 'Usuario'} -{' '}
                      {formatDate(note.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-700/50">
              <h2 className="text-lg font-semibold text-white">Estado</h2>
            </div>
            <div className="p-6">
              <StatusBadge status={request.status} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-700/50">
              <h2 className="text-lg font-semibold text-white">Prioridad</h2>
            </div>
            <div className="p-6">
              <PriorityBadge priority={request.priority} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-700/50 flex items-center gap-3">
              <Calendar className="text-cyan-400" size={20} />
              <h2 className="text-lg font-semibold text-white">Fechas</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                <p className="text-sm text-gray-400 mb-1">Creada</p>
                <p className="font-semibold text-white">{formatDate(request.createdAt)}</p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                <p className="text-sm text-gray-400 mb-1">Actualizada</p>
                <p className="font-semibold text-white">{formatDate(request.updatedAt)}</p>
              </div>
            </div>
          </div>

          {request.assignedTo && (
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-700/50">
                <h2 className="text-lg font-semibold text-white">Asignado a</h2>
              </div>
              <div className="p-6">
                <p className="font-semibold text-white">{request.assignedTo.name}</p>
                <p className="text-sm text-gray-400 mt-1">{request.assignedTo.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
