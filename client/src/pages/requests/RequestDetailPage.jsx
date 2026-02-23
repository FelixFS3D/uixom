import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRequestById } from '../../api/requestsApi';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatusBadge from '../../components/common/StatusBadge';
import PriorityBadge from '../../components/common/PriorityBadge';
import { formatDate } from '../../utils/formatters';
import { ArrowLeft, Mail, Phone, User } from 'lucide-react';
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
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Error al cargar la solicitud
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/solicitudes"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Detalle de Solicitud</h1>
          <p className="mt-1 text-sm text-gray-500">ID: {request._id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold">Información del Cliente</h2>
            </Card.Header>
            <Card.Body className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Nombre</p>
                  <p className="font-medium">{request.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{request.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium">{request.phone}</p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold">Descripción</h2>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-700 whitespace-pre-wrap">{request.description}</p>
            </Card.Body>
          </Card>

          {request.notes && request.notes.length > 0 && (
            <Card>
              <Card.Header>
                <h2 className="text-lg font-semibold">Notas Internas</h2>
              </Card.Header>
              <Card.Body className="space-y-4">
                {request.notes.map((note) => (
                  <div key={note._id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="text-gray-700">{note.text}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      Por {note.author?.name || 'Usuario'} -{' '}
                      {formatDate(note.createdAt)}
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold">Estado</h2>
            </Card.Header>
            <Card.Body>
              <StatusBadge status={request.status} />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold">Prioridad</h2>
            </Card.Header>
            <Card.Body>
              <PriorityBadge priority={request.priority} />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold">Fechas</h2>
            </Card.Header>
            <Card.Body className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Creada</p>
                <p className="font-medium">{formatDate(request.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Actualizada</p>
                <p className="font-medium">{formatDate(request.updatedAt)}</p>
              </div>
            </Card.Body>
          </Card>

          {request.assignedTo && (
            <Card>
              <Card.Header>
                <h2 className="text-lg font-semibold">Asignado a</h2>
              </Card.Header>
              <Card.Body>
                <p className="font-medium">{request.assignedTo.name}</p>
                <p className="text-sm text-gray-500">{request.assignedTo.email}</p>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
