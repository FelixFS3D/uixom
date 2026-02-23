import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const features = [
    'Desarrollo web profesional',
    'Diseño responsivo y moderno',
    'Optimización SEO',
    'Soporte técnico continuo',
    'Hosting y dominio incluidos',
    'Actualizaciones regulares',
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Creamos Experiencias Web Increíbles
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Transformamos tus ideas en soluciones digitales que impulsan tu negocio
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/contacto">
                <Button size="lg" variant="secondary">
                  Solicitar Proyecto
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué Elegirnos?
            </h2>
            <p className="text-lg text-gray-600">
              Ofrecemos servicios completos de desarrollo web
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-6 bg-white rounded-lg shadow border border-gray-200"
              >
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <span className="text-lg text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para Empezar tu Proyecto?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Hablemos sobre cómo podemos ayudarte a alcanzar tus objetivos
          </p>
          <Link to="/contacto">
            <Button size="lg" variant="secondary">
              Contáctanos Ahora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
