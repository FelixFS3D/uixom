import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createRequest } from '../../api/requestsApi';
import { Send, Mail, Phone, User, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ title: '', clientName: '', clientPhone: '', clientEmail: '', description: '' });
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      priority: 'media',
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle2 className="text-white" size={48} />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                ¡Solicitud Enviada!
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Hemos recibido tu solicitud y te contactaremos pronto. Revisa tu email para más detalles.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Enviar otra solicitud</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-20">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwgMjExLCAyMzgsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <Sparkles className="w-12 h-12 text-cyan-400 animate-pulse mx-auto" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Hablemos de tu</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Próximo Proyecto
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Completa el formulario y nuestro equipo te contactará en menos de 24 horas
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {mutation.isError && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl backdrop-blur-sm">
                {mutation.error?.response?.data?.message || 'Error al enviar la solicitud'}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <User size={18} className="text-cyan-400" />
                Nombre Completo
              </label>
              <input
                name="clientName"
                required
                value={formData.clientName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition-all"
                placeholder="Juan Pérez"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <Mail size={18} className="text-cyan-400" />
                Email
              </label>
              <input
                name="clientEmail"
                type="email"
                required
                value={formData.clientEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition-all"
                placeholder="juan@ejemplo.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <Phone size={18} className="text-cyan-400" />
                Teléfono <span className="text-gray-500 text-xs">(opcional)</span>
              </label>
              <input
                name="clientPhone"
                type="tel"
                value={formData.clientPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition-all"
                placeholder="+34 600 000 000"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <MessageSquare size={18} className="text-cyan-400" />
                Asunto del Proyecto
              </label>
              <input
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition-all"
                placeholder="Diseño de eCommerce para mi tienda"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Descripción del Proyecto
              </label>
              <textarea
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 transition-all resize-none"
                placeholder="Cuéntanos más sobre tu proyecto, objetivos, plazos y presupuesto estimado..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="group relative w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-white text-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {mutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Solicitud
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            <p className="text-center text-gray-400 text-sm mt-4">
              Al enviar este formulario, aceptas que nos pongamos en contacto contigo
            </p>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">¿Prefieres contactarnos directamente?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:hola@uixom.com"
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
            >
              <Mail size={18} />
              hola@uixom.com
            </a>
            <span className="hidden sm:inline text-gray-600">•</span>
            <a
              href="tel:+34600000000"
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
            >
              <Phone size={18} />
              +34 600 000 000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
