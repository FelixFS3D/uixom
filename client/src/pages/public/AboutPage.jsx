import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Cpu, Shield, Zap, Server, Layers } from 'lucide-react';

const AboutPage = () => {
  const pillars = [
    {
      number: '01',
      title: 'Craftsmanship Over Mass Production',
      description: 'We treat every project as a unique piece of engineering. From the initial database schema to the final user interface, every line of code is written with precision, performance, and long-term maintainability in mind.',
      icon: Code2,
    },
    {
      number: '02',
      title: 'The R&D Edge',
      description: 'Innovation requires a safe space. Our private R&D lab allows us to prototype and fine-tune cutting-edge technologies, such as custom AI models, in a strictly controlled environment. This ensures that when we deploy a solution for you, it has been rigorously tested on our own high-performance infrastructure.',
      icon: Cpu,
    },
    {
      number: '03',
      title: 'Absolute Transparency',
      description: 'We operate as your strategic technical partner. No jargon, no hidden layers. We provide clear communication, direct access to the engineering process, and a focus on delivering measurable business value.',
      icon: Shield,
    },
  ];

  const technicalStack = [
    {
      title: 'Backend Robustness',
      description: 'Utilizing Java & Spring Boot for secure, scalable, and mission-critical logic.',
      icon: Server,
    },
    {
      title: 'Frontend Agility',
      description: 'Leveraging the MERN stack for fast, responsive, and engaging user interfaces.',
      icon: Layers,
    },
    {
      title: 'Infrastructure Control',
      description: 'Expertise in On-Premise environments and Virtualization (Proxmox) for ultimate data ownership.',
      icon: Zap,
    },
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwgMjExLCAyMzgsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 font-mono text-sm tracking-wider">// ABOUT UIXOM</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
              Engineering the Future<br />of Business Operations
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
            <p className="text-xl md:text-2xl text-white font-light">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold">Uixom</span> is a boutique software engineering studio dedicated to building high-performance digital infrastructure.
            </p>
            
            <p>
              We believe that the most powerful tools are those built with purpose. While much of the industry relies on generic, one-size-fits-all templates, we take a different path. We architect <span className="text-white font-semibold">bespoke systems from the ground up</span>, ensuring that your technology adapts to your business—not the other way around.
            </p>
            
            <p>
              At the core of Uixom is a commitment to <span className="text-cyan-400 font-semibold">technical excellence</span> and <span className="text-purple-400 font-semibold">data sovereignty</span>. We don't just write code; we design resilient ecosystems that empower businesses to scale securely in an increasingly complex digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="relative py-32 bg-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwgMjExLCAyMzgsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Our Philosophy:</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Three Pillars
              </span>
            </h2>
          </div>

          <div className="space-y-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Number & Icon */}
                    <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-2">
                      <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-purple-500 opacity-50">
                        {pillar.number}
                      </div>
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                        <Icon size={28} className="text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all">
                        {pillar.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Uixom Box */}
      <section className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-cyan-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl p-12 md:p-16 border border-cyan-500/30 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwgMjExLCAyMzgsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-block mb-6">
                <span className="text-cyan-400 font-mono text-sm tracking-wider">// WHY UIXOM</span>
              </div>
              <blockquote className="text-2xl md:text-4xl font-bold text-white leading-tight mb-8">
                "We bridge the gap between complex{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  enterprise-grade backend engineering
                </span>{' '}
                and intuitive, modern user experiences."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Foundation */}
      <section className="relative py-32 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 font-mono text-sm tracking-wider">// TECHNICAL FOUNDATION</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">The</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Double-Stack Approach
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our studio specializes in combining the best of both worlds for maximum performance and scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technicalStack.map((stack, index) => {
              const Icon = stack.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                      <Icon size={28} className="text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all">
                      {stack.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {stack.description}
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
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-purple-600/10 to-pink-600/10"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Extraordinary?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss how we can engineer a solution tailored precisely to your business needs.
          </p>

          <Link to="/contacto">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-bold text-white text-xl shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center gap-3 justify-center">
                Start a Conversation
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </Link>

          <p className="mt-6 text-gray-400 text-sm">
            Based in the UK. Available for projects worldwide.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
