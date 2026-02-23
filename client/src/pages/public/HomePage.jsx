import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { ArrowRight, Zap, Shield, Rocket, Code, Sparkles, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Code,
      title: 'Desarrollo Web Moderno',
      description: 'Stack tecnológico de última generación para apps rápidas y escalables',
    },
    {
      icon: Rocket,
      title: 'Performance Extremo',
      description: 'Optimización avanzada para tiempos de carga ultrarrápidos',
    },
    {
      icon: Shield,
      title: 'Seguridad Garantizada',
      description: 'Protección de datos con las mejores prácticas de la industria',
    },
    {
      icon: Sparkles,
      title: 'UI/UX Premium',
      description: 'Diseños elegantes que convierten visitantes en clientes',
    },
    {
      icon: TrendingUp,
      title: 'SEO & Analytics',
      description: 'Posicionamiento optimizado y métricas en tiempo real',
    },
    {
      icon: Zap,
      title: 'Soporte 24/7',
      description: 'Asistencia técnica continua y actualizaciones regulares',
    },
  ];

  return (
    <div className="bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwgMjExLCAyMzgsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Logo con X destacada */}
            <div className="mb-8 inline-block">
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter">
                <span className="text-white">UI</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 animate-pulse">
                  X
                </span>
                <span className="text-white">OM</span>
              </h1>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-2"></div>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Experiencias Digitales del Futuro
            </h2>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transformamos ideas innovadoras en
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold"> soluciones web de alto impacto</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contacto">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white text-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 hover:scale-105">
                  <span className="relative z-10 flex items-center gap-2">
                    Iniciar Proyecto
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </Link>
              
              <a href="#features">
                <button className="px-8 py-4 border-2 border-cyan-500/50 rounded-xl font-semibold text-white text-lg hover:bg-cyan-500/10 transition-all duration-300 backdrop-blur-sm">
                  Ver Servicios
                </button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
              {[
                { value: '100+', label: 'Proyectos' },
                { value: '98%', label: 'Satisfacción' },
                { value: '24/7', label: 'Soporte' },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gradient-to-b from-gray-950 to-gray-900 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwgMjExLCAyMzgsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 font-mono text-sm tracking-wider">// NUESTROS SERVICIOS</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
                Tecnología de
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Clase Mundial
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Soluciones completas con las herramientas más modernas del mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                      <Icon size={28} className="text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwgMjExLCAyMzgsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-2xl rounded-3xl p-12 md:p-16 border border-gray-700/50 shadow-2xl">
            <Zap className="w-16 h-16 mx-auto mb-6 text-cyan-400 animate-pulse" />
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">¿Listo para</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Transformar tu Negocio?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Únete a los líderes que confían en nosotros para crear sus plataformas digitales
            </p>

            <Link to="/contacto">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-bold text-white text-xl shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 hover:scale-105">
                <span className="relative z-10 flex items-center gap-3 justify-center">
                  Contactar Ahora
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </Link>

            <p className="mt-6 text-gray-400 text-sm">
              Respuesta en menos de 24 horas
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2026 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold">UIXOM</span>. Innovación digital sin límites.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
