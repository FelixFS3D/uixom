import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { ArrowRight, Zap, Briefcase, Layers, MonitorSmartphone, Database, Cpu, Server, X } from 'lucide-react';
import uiLogo from '../../assets/ui.png';
import xLogo from '../../assets/x.png';
import omLogo from '../../assets/om.png';

const HomePage = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      icon: Briefcase,
      title: 'Custom Business Operations',
      description: 'Tailor-made platforms to run your entire business. From bespoke e-commerce solutions to automated appointment and booking systems.',
      details: {
        overview: 'We build complete digital ecosystems designed to streamline and automate your business operations from end to end.',
        capabilities: [
          'Custom E-Commerce Platforms: Full-featured online stores with payment processing, inventory management, and customer analytics',
          'Booking & Appointment Systems: Automated scheduling with calendar integration, SMS/email notifications, and client management',
          'Internal Portals: Employee dashboards, project management tools, and workflow automation',
          'CRM Solutions: Customer relationship management tailored to your sales process and business model',
          'Reporting Dashboards: Real-time analytics and business intelligence tools'
        ],
        benefits: 'Every solution is built from scratch to match your exact processes, eliminating the need to adapt your business to generic software.'
      }
    },
    {
      icon: Layers,
      title: 'End-to-End Engineering',
      description: 'We do not rely on generic templates. As a full-stack agency, we architect and build your software from the ground up to fit your exact needs.',
      details: {
        overview: 'Full-stack engineering means we own the entire technical lifecycle, ensuring seamless integration between your business logic and the user interface.',
        capabilities: [
          'Frontend Development: Modern React interfaces with responsive design and intuitive UX',
          'Backend Architecture: Robust Node.js/Express or Java Spring Boot servers with RESTful APIs',
          'Database Design: Optimized SQL or NoSQL databases structured for your data relationships',
          'DevOps & Deployment: Containerized applications with CI/CD pipelines for reliable updates',
          'Security Implementation: Authentication, authorization, encryption, and compliance measures'
        ],
        benefits: 'Eliminating vendor lock-in and middleware costs while maintaining complete vertical control over your software assets.'
      }
    },
    {
      icon: MonitorSmartphone,
      title: 'Intuitive User Experiences',
      description: 'We believe that "less is more". Clean, minimalist, and lightning-fast interfaces designed for maximum usability and conversion.',
      details: {
        overview: 'User experience is not an afterthought. We design interfaces that are beautiful, functional, and convert visitors into customers.',
        capabilities: [
          'Responsive Design: Pixel-perfect layouts that work flawlessly on desktop, tablet, and mobile',
          'Performance Optimization: Lightning-fast load times with code splitting and lazy loading',
          'Accessibility Standards: WCAG compliant interfaces that work for all users',
          'User Research: Data-driven design decisions based on user behavior and analytics',
          'Interactive Prototypes: Test and refine the user journey before development begins'
        ],
        benefits: 'Faster load times mean lower bounce rates. Intuitive navigation means higher conversion. Simple design means happier users.'
      }
    },
    {
      icon: Database,
      title: 'Intelligent Data Management',
      description: 'Robust and scalable architectures to organize your most valuable asset: your data. We ensure your information is perfectly structured and secure.',
      details: {
        overview: 'Your data is your competitive advantage. We design database schemas and data workflows that scale with your business growth.',
        capabilities: [
          'Schema Design: Normalized relational databases or flexible NoSQL structures optimized for your queries',
          'Data Migration: Safely transfer existing data from legacy systems with validation and integrity checks',
          'API Integration: Connect third-party services and synchronize data across platforms',
          'Backup & Recovery: Automated backup strategies with point-in-time recovery capabilities',
          'Data Analytics: Transform raw data into actionable insights with custom reporting tools'
        ],
        benefits: 'Well-structured data enables faster queries, easier scaling, and better decision-making across your organization.'
      }
    },
    {
      icon: Cpu,
      title: 'Secure AI Prototyping',
      description: 'We develop and train custom Artificial Intelligence solutions in our private R&D lab, guaranteeing your business logic remains strictly confidential.',
      details: {
        overview: 'Artificial Intelligence development in a completely isolated environment. Your proprietary data and business logic never leave our private infrastructure.',
        capabilities: [
          'Custom Model Training: Train AI models on your specific data without sending it to third-party cloud services',
          'Natural Language Processing: Build chatbots, sentiment analysis, and document processing systems',
          'Computer Vision: Image recognition, object detection, and automated quality control systems',
          'Predictive Analytics: Forecasting models for demand, churn, and business outcomes',
          'Private Infrastructure: All AI training and inference runs on dedicated, isolated private hardware'
        ],
        benefits: 'Complete data sovereignty. Zero risk of intellectual property leakage. Full compliance with data protection regulations.'
      }
    },
    {
      icon: Server,
      title: 'Private Infrastructure Setup',
      description: 'Require ultimate control? We design, source, and deploy dedicated on-premise servers and private AI environments directly into your offices.',
      details: {
        overview: 'For organizations requiring absolute data sovereignty, we architect and deploy enterprise-grade physical infrastructure within your own premises.',
        capabilities: [
          'Hardware Engineering: Specification and sourcing of high-performance nodes (Z-series workstations & Rack servers)',
          'Virtualization Layer: Robust Proxmox/Type-1 Hypervisor environments for maximum resource efficiency',
          'Network Architecture: Design secure, high-performance network topologies with redundancy',
          'On-Premise Deployment: Install, configure, and secure physical infrastructure in your facilities',
          'Private AI Clusters: Dedicated GPU servers for running AI models without cloud dependencies',
          'Maintenance & Support: Ongoing monitoring, updates, and technical support for your infrastructure'
        ],
        benefits: 'Shift from unpredictable monthly cloud subscriptions to a high-performance owned asset. Total data ownership and zero reliance on third-party uptimes.'
      }
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
            {/* Logo */}
            <div className="mb-8 inline-block">
              <div className="flex items-end justify-center">
                <img src={uiLogo} alt="UI" className="w-18 h-18 md:w-32 md:h-32 object-bottom object-contain" />
                <img src={xLogo} alt="X" className="w-18 h-18 md:w-32 md:h-32 object-bottom object-contain animate-pulse" />
                <img src={omLogo} alt="OM" className="w-18 h-18 md:w-44 md:h-32 object-bottom object-contain" />
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-2"></div>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Future-Ready Digital Solutions
            </h2>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transforming innovative ideas into 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold"> bespoke, privacy-first web applications </span>
              for UK businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contacto">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white text-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 hover:scale-105">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} aria-hidden="true" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </Link>
              
              <a href="#features">
                <button className="px-8 py-4 border-2 border-cyan-500/50 rounded-xl font-semibold text-white text-lg hover:bg-cyan-500/10 transition-all duration-300 backdrop-blur-sm">
                  View Expertise
                </button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
              {[
                { value: '100%', label: 'Bespoke Code' },
                { value: '0', label: 'Data Leaks' },
                { value: '24/7', label: 'Local Support' },
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
              <span className="text-cyan-400 font-mono text-sm tracking-wider">// CORE EXPERTISE</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
                Crafting Technology that
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Empowers Your Business
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From rock-solid backends to private AI infrastructures, built from the ground up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedFeature(feature)}
                  className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer"
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
                    
                    <div className="mt-4 text-cyan-400 text-sm font-semibold flex items-center gap-2">
                      Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
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
              <span className="text-white">Ready to Scale Your</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Digital Infrastructure?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Let's build secure, fast, and intelligent systems tailored exactly to your business needs.
            </p>

            <Link to="/contacto">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-bold text-white text-xl shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 hover:scale-105">
                <span className="relative z-10 flex items-center gap-3 justify-center">
                  Let's Talk
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} aria-hidden="true" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </Link>

            <p className="mt-6 text-gray-400 text-sm">
              I aim to reply within 24 hours. Based in the UK.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold">UIXOM</span>. Custom Software & Local AI Integration.
            </p>
          </div>
        </div>
      </footer>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedFeature(null)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl border border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={24} className="text-gray-300" />
            </button>

            {/* Modal Content */}
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <selectedFeature.icon size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    {selectedFeature.title}
                  </h2>
                </div>
              </div>

              {/* Overview */}
              <div className="mb-8">
                <p className="text-lg text-gray-300 leading-relaxed">
                  {selectedFeature.details.overview}
                </p>
              </div>

              {/* Capabilities */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full"></span>
                  What We Deliver
                </h3>
                <ul className="space-y-4">
                  {selectedFeature.details.capabilities.map((capability, index) => (
                    <li key={index} className="flex gap-3 text-gray-300">
                      <span className="flex-shrink-0 text-cyan-400 mt-0.5 text-lg">▹</span>
                      <span className="leading-relaxed">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Why This Matters</h3>
                <p className="text-gray-300 leading-relaxed">
                  {selectedFeature.details.benefits}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8 flex justify-center">
                <Link to="/contacto">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white text-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 hover:scale-105">
                    <span className="relative z-10 flex items-center gap-2">
                      Discuss This Service
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;