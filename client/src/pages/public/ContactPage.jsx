import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createRequest } from '../../api/requestsApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', description: '' });
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500" size={64} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Solicitud Enviada!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Hemos recibido tu solicitud y te contactaremos pronto. Revisa tu email
            para más detalles.
          </p>
          <Button onClick={() => setSubmitted(false)}>
            Enviar otra solicitud
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h1>
          <p className="text-lg text-gray-600">
            Completa el formulario y nos pondremos en contacto contigo lo antes posible
          </p>
        </div>

        <Card>
          <Card.Body>
            <form onSubmit={handleSubmit} className="space-y-6">
              {mutation.isError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {mutation.error?.response?.data?.message ||
                    'Error al enviar la solicitud'}
                </div>
              )}

              <Input
                label="Nombre completo"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Juan Pérez"
              />

              <Input
                label="Teléfono"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+34 123 456 789"
              />

              <Input
                label="Email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="juan@example.com"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción del proyecto
                </label>
                <textarea
                  name="description"
                  required
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              <Button
                type="submit"
                fullWidth
                loading={mutation.isPending}
                disabled={mutation.isPending}
              >
                Enviar Solicitud
              </Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
