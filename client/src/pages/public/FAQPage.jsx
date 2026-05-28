import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Shield, DollarSign, Clock, Server, Lock, FileCode } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Security & Privacy',
      icon: Shield,
      questions: [
        {
          question: 'How do you ensure my data remains confidential during AI development?',
          answer: 'All AI prototyping and model training occurs exclusively on our private, isolated infrastructure. Your data never leaves our controlled environment and is never sent to third-party cloud services like OpenAI, AWS, or Google Cloud. We operate on a zero-trust architecture where data sovereignty is paramount.'
        },
        {
          question: 'Are you GDPR compliant?',
          answer: 'Absolutely. Data protection is built into our engineering process from day one. We implement privacy-by-design principles, ensuring all systems we build are fully compliant with GDPR, UK Data Protection Act 2018, and industry-specific regulations. We provide full audit trails and documentation for compliance reviews.'
        },
        {
          question: 'What happens to my code and intellectual property?',
          answer: 'You own 100% of the code we write for you. All intellectual property rights transfer to you upon project completion. We sign NDAs as standard practice and can work under your existing confidentiality agreements. Your business logic, algorithms, and proprietary processes remain entirely yours.'
        },
        {
          question: 'How secure is on-premise infrastructure compared to cloud?',
          answer: 'On-premise infrastructure gives you complete physical and logical control over your data. There are no shared resources, no multi-tenant risks, and zero exposure to third-party breaches. For businesses handling sensitive information—financial data, medical records, or proprietary R&D—on-premise solutions eliminate entire categories of security risks inherent to cloud computing.'
        }
      ]
    },
    {
      category: 'Pricing & Investment',
      icon: DollarSign,
      questions: [
        {
          question: 'What is the typical investment for a bespoke software project?',
          answer: 'Project investments typically range from £15,000 for focused applications (booking systems, internal portals) to £50,000+ for comprehensive enterprise platforms with AI integration. Unlike subscription-based SaaS, this is a capital investment in an owned asset. We provide fixed-price quotes after an initial discovery session to understand your exact requirements.'
        },
        {
          question: 'How does the cost compare to off-the-shelf SaaS solutions?',
          answer: 'While SaaS appears cheaper initially (£50-500/month), the long-term cost is significantly higher. A £300/month SaaS subscription costs £18,000 over 5 years—with zero ownership and ongoing vendor dependency. Our bespoke solutions are one-time investments that you own outright, with optional maintenance contracts starting from £500/month. Over 3-5 years, ownership becomes substantially more cost-effective.'
        },
        {
          question: 'Do you offer payment plans or phased delivery?',
          answer: 'Yes. For larger projects, we structure delivery in milestone-based phases with corresponding payment schedules. Typical structure: 30% upfront (discovery & architecture), 40% at mid-project (core functionality complete), 30% on final delivery. This protects both parties and ensures continuous value delivery.'
        },
        {
          question: 'What are the ongoing costs after launch?',
          answer: 'Ongoing costs are optional and transparent. Hosting on your own infrastructure has no monthly fees beyond your internet connection. If you choose cloud hosting (AWS, DigitalOcean), expect £50-300/month depending on traffic. Optional support & maintenance retainers start from £500/month for updates, monitoring, and feature additions. Many clients run independently with zero monthly costs.'
        }
      ]
    },
    {
      category: 'Process & Timeline',
      icon: Clock,
      questions: [
        {
          question: 'How long does a typical project take?',
          answer: 'Timeline depends on complexity. A focused application (booking system, CRM) typically takes 8-12 weeks. Full-stack platforms with AI integration require 3-6 months. We provide detailed project timelines during the discovery phase, with clear milestones and deliverable dates. Rush projects can be accommodated with adjusted scheduling.'
        },
        {
          question: 'What is your development process?',
          answer: 'We follow an Agile methodology with weekly progress updates. Process: (1) Discovery session to define requirements, (2) Technical architecture & database design, (3) Iterative development with regular demos, (4) User testing & refinement, (5) Deployment & handover. You have visibility into the entire process with access to staging environments throughout development.'
        },
        {
          question: 'Will I be able to modify the code after delivery?',
          answer: 'Absolutely. We deliver clean, well-documented code with full technical documentation. If you have an internal development team, they can maintain and extend the system independently. We also offer training sessions and knowledge transfer workshops. Alternatively, we provide ongoing support retainers if you prefer us to handle all technical updates.'
        },
        {
          question: 'Can you integrate with our existing systems?',
          answer: 'Yes. We specialize in API integration and legacy system connectivity. Whether you need to connect to existing CRMs (Salesforce, HubSpot), accounting software (Xero, QuickBooks), payment gateways (Stripe, PayPal), or custom internal systems, we design robust integration layers that ensure seamless data flow across your entire technology ecosystem.'
        }
      ]
    },
    {
      category: 'Technical Capabilities',
      icon: FileCode,
      questions: [
        {
          question: 'What technologies do you use?',
          answer: 'We operate a dual-stack approach: (1) Backend: Java with Spring Boot for enterprise-grade logic, or Node.js with Express for rapid development. Databases: PostgreSQL, MySQL, or MongoDB depending on your data structure. (2) Frontend: React for modern, responsive interfaces. (3) Infrastructure: Docker containerization, CI/CD pipelines, and Proxmox virtualization for on-premise deployments. Technology choices are driven by your specific requirements, not vendor preferences.'
        },
        {
          question: 'Do you build mobile apps?',
          answer: 'We build progressive web applications (PWAs) that work flawlessly on mobile devices without requiring app store distribution. PWAs offer instant updates, no installation friction, and work across iOS and Android. For clients requiring native mobile apps, we can architect responsive APIs that your mobile development team (or a partner agency) can integrate with.'
        },
        {
          question: 'Can you handle high-traffic applications?',
          answer: 'Yes. We design scalable architectures from the ground up. Our systems handle everything from small internal tools (100 users) to public-facing platforms (100,000+ monthly visitors). We implement load balancing, database optimization, caching strategies (Redis), and CDN integration. Performance testing is included in our delivery process to ensure your system performs under real-world load.'
        },
        {
          question: 'What is your approach to AI integration?',
          answer: 'We develop custom AI solutions in our private R&D lab using open-source models (Llama, Mistral, Stable Diffusion) that we train on your specific data. This ensures complete data sovereignty—no data ever reaches OpenAI, Google, or other third parties. Common applications: predictive analytics, document processing, chatbots, computer vision for quality control. All models are deployed on-premise or on your private infrastructure.'
        }
      ]
    },
    {
      category: 'Infrastructure & Hosting',
      icon: Server,
      questions: [
        {
          question: 'Should I host on-premise or in the cloud?',
          answer: 'It depends on your priorities. On-premise hosting offers complete control, zero monthly cloud fees, and absolute data sovereignty—ideal for businesses handling sensitive data or seeking long-term cost efficiency. Cloud hosting (AWS, DigitalOcean) offers easier scalability and geographic distribution—better for global applications with variable traffic. We help you evaluate total cost of ownership (TCO) over 5 years to make an informed decision.'
        },
        {
          question: 'Do you provide hosting, or do I need my own servers?',
          answer: 'We offer flexible options: (1) You provide infrastructure: We deploy to your on-premise servers or existing cloud accounts. (2) Managed cloud hosting: We set up and manage your cloud infrastructure (AWS, DigitalOcean) with transparent monthly costs. (3) On-premise consulting: We specify, source, and install dedicated hardware in your offices—you own the physical servers, we handle the technical setup.'
        },
        {
          question: 'What if my server goes down?',
          answer: 'For cloud-hosted applications, we implement automated monitoring, backups, and failover strategies. Typical uptime: 99.9%. For on-premise setups, we design redundant systems with backup power and disaster recovery plans. Optional support retainers include 24/7 monitoring and rapid response for critical systems. We provide detailed runbooks so your team can handle common issues independently.'
        },
        {
          question: 'How do updates and maintenance work?',
          answer: 'We deliver systems with automated update mechanisms. Security patches and dependency updates can be applied by your team or handled under a support retainer. Major feature additions are scoped as separate projects. For clients on support contracts, we proactively monitor for security vulnerabilities, apply patches, and perform database optimization. You always maintain full control over when updates are deployed.'
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwgMjExLCAyMzgsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-cyan-400 font-mono text-sm tracking-wider">// FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
              Everything You Need<br />to Know
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transparent answers to common questions about security, pricing, timelines, and our technical approach.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="relative py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqs.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div key={categoryIndex} className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <CategoryIcon size={24} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      {category.category}
                    </h2>
                  </div>

                  {/* Questions */}
                  <div className="space-y-3">
                    {category.questions.map((faq, questionIndex) => {
                      const isOpen = openIndex === `${categoryIndex}-${questionIndex}`;
                      return (
                        <div
                          key={questionIndex}
                          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden hover:border-cyan-500/30 transition-all"
                        >
                          {/* Question */}
                          <button
                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left group"
                          >
                            <span className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors pr-4">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`flex-shrink-0 text-cyan-400 transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                              size={24}
                            />
                          </button>

                          {/* Answer */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="px-6 pb-5 pt-2 border-t border-gray-700/30">
                              <p className="text-gray-300 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-purple-600/10 to-pink-600/10"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-2xl rounded-3xl p-12 md:p-16 border border-gray-700/50 shadow-2xl">
            <Lock className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Still Have Questions?
            </h2>
            
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Every project is unique. Let's discuss your specific requirements in a confidential, no-obligation consultation.
            </p>

            <Link to="/contacto">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-bold text-white text-xl shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300 hover:scale-105">
                <span className="relative z-10 flex items-center gap-3 justify-center">
                  Schedule a Call
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </Link>

            <p className="mt-6 text-gray-400 text-sm">
              All initial consultations are covered under NDA. Your ideas remain confidential.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
