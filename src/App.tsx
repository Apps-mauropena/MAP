import React, { useState } from 'react';
import { ChevronRight, ArrowRight, BookOpen, Monitor, Award, Building, Globe, Users, Menu, X, Facebook, Youtube, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
)

const FacebookIconFilled = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 320 512" fill="currentColor">
    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
  </svg>
)

const YoutubeIconFilled = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 576 512" fill="currentColor">
    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.781 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
  </svg>
)

// Data extracted exactly from the provided syllabus document
const curriculumData = [
  {
    id: 1,
    title: 'Primer Cuatrimestre',
    courses: [
      { code: 'MAP101', name: 'Metodología de la Investigación', desc: 'Fundamentos, técnicas y procedimientos para el protocolo de investigación en administración pública.' },
      { code: 'MAP102', name: 'Sistema y Administración Pública en México', desc: 'Evolución de las reformas y relaciones entre los tres poderes durante el siglo XX y XXI.' },
      { code: 'MAP103', name: 'Administración del Factor Humano', desc: 'Estrategias de desarrollo profesional e integral de los trabajadores en las organizaciones.' }
    ]
  },
  {
    id: 2,
    title: 'Segundo Cuatrimestre',
    courses: [
      { code: 'MAP204', name: 'Administración Estratégica', desc: 'Planeación y dirección estratégica para lograr ventajas competitivas institucionales.' },
      { code: 'MAP205', name: 'Problemas Fiscales y Financieros', desc: 'Diagnósticos financieros, fiscales y contables para la toma de decisiones directivas.' },
      { code: 'MAP206', name: 'Finanzas Entorno Económico Financiero', desc: 'Análisis de indicadores macroeconómicos y evaluación del entorno económico nacional.' }
    ]
  },
  {
    id: 3,
    title: 'Tercer Cuatrimestre',
    courses: [
      { code: 'MAP307', name: 'Responsabilidad del Servidor Público', desc: 'Análisis profundo de la Ley de servidores públicos y las obligaciones constitucionales.' },
      { code: 'MAP308', name: 'Problemas Económicos, Políticos y Sociales', desc: 'Evaluación crítica de los modelos económicos y su consecuencia en el Estado Mexicano.' },
      { code: 'MAP309', name: 'Derecho Administrativo', desc: 'Interpretación del marco legal aplicable a la actividad del Estado y el servicio público.' }
    ]
  },
  {
    id: 4,
    title: 'Cuarto Cuatrimestre',
    courses: [
      { code: 'MAP410', name: 'Seminario de Calidad', desc: 'Sistemas de gestión de calidad aplicados para mejorar servicios al ciudadano y el clima organizacional.' },
      { code: 'MAP411', name: 'Finanzas Públicas', desc: 'Técnicas presupuestarias, fuentes de ingresos y manejo de endeudamiento público.' },
      { code: 'MAP412', name: 'Profesionalización de los Servidores Públicos', desc: 'Sistemas modernos para el desarrollo integral y el servicio civil de carrera.' }
    ]
  },
  {
    id: 5,
    title: 'Quinto Cuatrimestre',
    courses: [
      { code: 'MAP513', name: 'Dirección Estratégica en la Adm. Pública', desc: 'Habilidades directivas para la conformación de instituciones modernas y eficientes.' },
      { code: 'MAP514', name: 'Federalismo y Gobierno Local', desc: 'Estudio de la organización política mexicana: federal, estatal y municipal.' },
      { code: 'MAP515', name: 'Políticas Públicas', desc: 'Diseño, formulación, implementación y evaluación de agendas de gobierno y política de Estado.' }
    ]
  },
  {
    id: 6,
    title: 'Sexto Cuatrimestre',
    courses: [
      { code: 'MAP616', name: 'Ciencia Política', desc: 'Problemas teóricos, estudio del Estado moderno y transformaciones políticas contemporáneas.' },
      { code: 'MAP617', name: 'Teoría del Estado', desc: 'Evolución del Estado y las relaciones con la sociedad, economía y la política internacional.' },
      { code: 'MAP618', name: 'Gestión de Tecnologías de Información', desc: 'Herramientas TI para optimizar los procesos de gestión en la administración gubernamental.' }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* Top Header Row */}
      <header className={`transition-all duration-300 sticky top-0 z-50 border-b ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-transparent shadow-sm' : 'bg-white border-gray-100'}`}>
        <div className="max-w-[1400px] mx-auto px-6 h-[66px] md:h-24 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div 
              className={`bg-ie-blue transition-all duration-300 ${isScrolled ? 'h-12 w-36 md:h-14 md:w-48' : 'h-14 w-48 md:h-16 md:w-56'}`}
              style={{
                WebkitMaskImage: 'url(/logo.png)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'left center',
                maskImage: 'url(/logo.png)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'left center'
              }}
              aria-label="Centro de Postgrados"
              role="img"
            />
            <div className="leading-tight hidden sm:block">
              <span className={`block font-bold text-gray-900 tracking-tight transition-all duration-300 ${isScrolled ? 'text-sm md:text-base' : 'text-base md:text-lg'}`}>CENTRO DE</span>
              <span className={`block font-bold text-gray-900 tracking-tight transition-all duration-300 ${isScrolled ? 'text-sm md:text-base' : 'text-base md:text-lg'}`}>POSTGRADOS</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-6 relative -left-[75px]">
            <a href="#" className="text-ie-blue hover:text-ie-blue transition-colors relative group" aria-label="Facebook">
              <FacebookIconFilled className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300" />
              <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-ie-blue transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
            </a>
            <a href="#" className="text-ie-blue hover:text-ie-blue transition-colors relative group" aria-label="YouTube">
              <YoutubeIconFilled className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300" />
              <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-ie-blue transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden md:block px-6 py-2.5 border border-gray-300 text-sm font-semibold tracking-wide hover:bg-gray-50 transition-colors uppercase">
              Descargar Folleto
            </button>
            <button className="hidden md:block px-6 py-2.5 bg-ie-blue text-white text-sm font-semibold tracking-wide hover:bg-ie-blue-dark transition-colors uppercase shadow-sm">
              Solicita Admisión
            </button>
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-ie-blue transition-colors focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
               {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-white border-b border-gray-100 shadow-xl absolute top-full left-0 w-full z-40 origin-top"
            >
              <div className="flex flex-col py-6 px-6 space-y-6">
                <motion.a 
                  initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                  href="#institucion" className="text-lg font-bold tracking-widest text-gray-800 uppercase hover:text-ie-blue" onClick={() => setIsMobileMenuOpen(false)}>La Institución</motion.a>
                <motion.a 
                   initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}
                   href="#proposito" className="text-lg font-bold tracking-widest text-gray-800 uppercase hover:text-ie-blue" onClick={() => setIsMobileMenuOpen(false)}>Nuestro Propósito</motion.a>
                <motion.a 
                   initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                   href="#plan" className="text-lg font-bold tracking-widest text-ie-blue uppercase" onClick={() => setIsMobileMenuOpen(false)}>Maestría</motion.a>
                <motion.a 
                   initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.25 }}
                   href="#metodologia" className="text-lg font-bold tracking-widest text-gray-800 uppercase hover:text-ie-blue" onClick={() => setIsMobileMenuOpen(false)}>Metodología</motion.a>
                <motion.a 
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    href="#admision" className="text-lg font-bold tracking-widest text-gray-800 uppercase hover:text-ie-blue" onClick={() => setIsMobileMenuOpen(false)}>Admisiones</motion.a>
                
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }} className="pt-6 mt-2 border-t border-gray-100 flex flex-col gap-4">
                  <div className="flex justify-center space-x-8 py-2 mb-2">
                    <a href="#" className="text-ie-blue hover:text-ie-blue transition-all duration-300 relative group" aria-label="Facebook">
                      <FacebookIconFilled className="w-7 h-7 mx-auto" />
                      <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-ie-blue transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
                    </a>
                    <a href="#" className="text-ie-blue hover:text-ie-blue transition-all duration-300 relative group" aria-label="YouTube">
                      <YoutubeIconFilled className="w-8 h-8 mx-auto" />
                      <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-ie-blue transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
                    </a>
                  </div>
                   <button className="w-full px-6 py-4 border border-gray-300 text-sm font-bold tracking-wide hover:bg-gray-50 transition-colors uppercase">
                    Descargar Folleto
                   </button>
                   <button className="w-full px-6 py-4 bg-ie-blue text-white text-sm font-bold tracking-wide hover:bg-ie-blue-dark transition-colors uppercase shadow-sm">
                    Solicita Admisión
                   </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Secondary Navigation */}
      <nav className="border-b border-gray-100 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-center space-x-8 text-xs font-bold tracking-widest text-gray-600 uppercase">
          <a href="#institucion" className="hover:text-ie-blue transition-colors pb-1">La Institución</a>
          <a href="#proposito" className="hover:text-ie-blue transition-colors pb-1">Nuestro Propósito</a>
          <a href="#plan" className="hover:text-ie-blue border-b-2 border-ie-blue pb-1 text-gray-900">Maestría</a>
          <a href="#metodologia" className="hover:text-ie-blue transition-colors pb-1">Metodología</a>
          <a href="#admision" className="hover:text-ie-blue transition-colors pb-1">Admisiones</a>
        </div>
      </nav>

      {/* Minimal Banner Notification */}
      <div className="bg-ie-blue text-white py-2.5 flex items-center justify-center group cursor-pointer hover:bg-ie-blue-dark transition-colors px-4 text-center">
        <span className="text-xs md:text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
          Tu futuro en la gestión pública comienza aquí <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden h-[75vh] min-h-[520px] md:h-[80vh] md:min-h-[640px]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/cara.map.cpem.jpg" 
            alt="Senadores y funcionarios públicos de México en sesión formal" 
            className="w-full h-full object-cover object-center grayscale-[20%]"
          />
          {/* Specific Gradient overlay mimicking the screenshot */}
          <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-gray-900/90 via-gray-900/70 to-transparent md:via-gray-900/60"></div>
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-3xl mt-20 md:mt-8 text-center md:text-left flex flex-col items-center md:items-start mx-auto md:mx-0">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 uppercase">
              Liderazgo de Excelencia para el Sector Público
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-gray-200 mb-10 font-normal leading-relaxed max-w-2xl px-2 md:px-0">
              Fórmate con la <strong className="text-white font-semibold">Maestría en Administración Pública</strong> del Centro de Postgrados del Estado de México. Prepárate para diseñar, implementar y evaluar políticas que transforman a la sociedad.
            </p>
            <div className="flex gap-4 w-full sm:w-auto mb-5 md:mb-0">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative w-full sm:w-auto px-8 py-4 bg-ie-blue text-white text-sm md:text-base font-bold uppercase tracking-wider transition-all border border-transparent overflow-hidden"
              >
                <div className="absolute inset-0 bg-ie-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                <span className="relative z-10">Inicia tu proceso</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Information Cards (Nuestro Propósito alternative) */}
      <section id="proposito" className="pt-20 pb-20 md:pt-32 md:pb-24 bg-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-gray-900 uppercase tracking-tight mb-12">
            Nuestro Propósito
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-12 shadow-xs border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <Globe className="w-12 h-12 text-ie-blue mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4">Líderes Responsables</h3>
              <p className="text-gray-600 leading-relaxed">
                Nos comprometemos a formar una nueva generación de servidores públicos con consciencia social, rigor legal y sólida ética administrativa.
              </p>
            </div>
            
            <div className="bg-white p-12 shadow-xs border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <Building className="w-12 h-12 text-ie-blue mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4">Gestión Estratégica</h3>
              <p className="text-gray-600 leading-relaxed">
                Desarrollamos en nuestros estudiantes competencias avanzadas para enfrentar la complejidad del Estado y dirigir organizaciones públicas de alto impacto.
              </p>
            </div>
            
            <div className="bg-white p-12 shadow-xs border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <Users className="w-12 h-12 text-ie-blue mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4">Enfoque Humano y TIC</h3>
              <p className="text-gray-600 leading-relaxed">
                Integramos la eficiencia en la gestión del factor humano con la última innovación en tecnologías de la información para la administración pública moderna.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Split Image/Text Section (similar to CONOCE A NUESTRO DECANO / HISTORIA) */}
      <section className="bg-ie-blue flex flex-col md:flex-row text-white w-full">
         <div className="w-full md:w-1/2 p-16 lg:p-32 flex flex-col justify-center">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
              UN MODELO EDUCATIVO INNOVADOR
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-10">
              Esta maestría aborda de manera integral problemas económicos, fiscales, políticos y sociales mediante metodologías analíticas, forjando líderes con visión estratégica, capacidades técnicas superiores y conocimientos de derecho administrativo.
            </p>
            <div className="flex">
              <button className="px-8 py-3 border border-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-ie-blue transition-colors">
                Descubrir Metodología
              </button>
            </div>
         </div>
         <div className="w-full md:w-1/2 min-h-[400px] bg-[url('https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center">
         </div>
      </section>

      {/* Curriculum Grid Section - Critical Payload Insertion */}
      <section id="plan" className="py-24 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 uppercase tracking-tight mb-4">Plan de Estudios</h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Diseñado para desarrollarte a través de un programa de 6 cuatrimestres, abarcando desde fundamentos de investigación hasta la maestría en diseño de políticas públicas.
            </p>
          </div>

          {/* Interactive Curriculum Tabs */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-12">
            {/* Desktop Tab Selectors */}
            <div className="hidden lg:flex lg:w-1/4 flex-col gap-2">
              {curriculumData.map((term) => (
                <button
                  key={`desktop-tab-${term.id}`}
                  onClick={() => setActiveTab(term.id)}
                  className={`text-left px-6 py-4 font-bold uppercase tracking-wide transition-all ${
                    activeTab === term.id 
                      ? 'bg-ie-blue text-white shadow-md' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{term.title}</span>
                    <ChevronRight className={`w-5 h-5 ${activeTab === term.id ? 'opacity-100' : 'opacity-0 text-gray-400'} transition-opacity`} />
                  </div>
                </button>
              ))}
              
              <div className="mt-8 p-6 bg-gray-50 border border-gray-200">
                 <h4 className="font-bold text-gray-900 mb-2 uppercase text-sm">Formato Flexible</h4>
                 <p className="text-sm text-gray-600">Estudia con plataformas de última generación como nuestro Campus 100% en línea apoyado con aula invertida, foros colaborativos y videoconferencias síncronas.</p>
              </div>
            </div>

            {/* Tab Content Panels & Mobile Accordions */}
            <div className="w-full lg:w-3/4 flex flex-col gap-4 lg:block">
              {curriculumData.map((term) => (
                <div 
                  key={`content-${term.id}`} 
                  className="flex flex-col"
                >
                  {/* Mobile Accordion Button */}
                  <button
                    onClick={() => setActiveTab(activeTab === term.id ? 0 : term.id)}
                    className={`lg:hidden w-full text-left px-6 py-4 font-bold uppercase tracking-wide transition-all ${
                      activeTab === term.id 
                        ? 'bg-ie-blue text-white shadow-md' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{term.title}</span>
                      <ChevronRight className={`w-5 h-5 transition-transform ${activeTab === term.id ? 'rotate-90 text-white' : 'text-gray-400'}`} />
                    </div>
                  </button>

                  {/* Panel Content */}
                  <div className={`transition-opacity duration-500 ${activeTab === term.id ? 'block opacity-100 mt-4 lg:mt-0' : 'hidden opacity-0'}`}>
                    <div className="bg-[#f8f9fa] border-l-4 border-ie-blue p-8 mb-8">
                      <h3 className="text-2xl font-bold uppercase text-gray-900 mb-2">{term.title}</h3>
                      <p className="text-gray-600">Consolida tus habilidades directivas a través de estas unidades de competencia intensivas.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {term.courses.map((course, idx) => (
                        <div key={idx} className="border border-gray-200 p-8 flex flex-col hover:border-ie-blue transition-colors bg-white group">
                          <span className="text-ie-blue font-bold text-sm tracking-wider mb-2">{course.code}</span>
                          <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-ie-blue transition-colors">{course.name}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed mt-auto relative pt-4 before:content-[''] before:w-8 before:h-0.5 before:bg-ie-blue before:absolute before:top-0 before:left-0 whitespace-pre-line">
                            {course.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Mobile Flexible Format Information */}
              <div className="mt-4 p-6 bg-gray-50 border border-gray-200 lg:hidden">
                 <h4 className="font-bold text-gray-900 mb-2 uppercase text-sm">Formato Flexible</h4>
                 <p className="text-sm text-gray-600">Estudia con plataformas de última generación como nuestro Campus 100% en línea apoyado con aula invertida, foros colaborativos y videoconferencias síncronas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Blocks Section (similar to "MÁS INFORMACIÓN SOBRE IE") */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-gray-900 uppercase tracking-tight mb-12">
            MÁS SOBRE ESTE PROGRAMA
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative h-80 group cursor-pointer overflow-hidden">
              <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" alt="Metodología" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/50 transition-colors flex items-center justify-center">
                <span className="text-white font-bold text-xl uppercase tracking-wider">Metodología LMS</span>
              </div>
            </div>
            <div className="relative h-80 group cursor-pointer overflow-hidden">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Experiencia" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/50 transition-colors flex items-center justify-center p-6 text-center">
                <span className="text-white font-bold text-xl uppercase tracking-wider">Networking Ejecutivo</span>
              </div>
            </div>
            <div className="relative h-80 group cursor-pointer overflow-hidden">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" alt="Claustro" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/50 transition-colors flex items-center justify-center p-6 text-center">
                <span className="text-white font-bold text-xl uppercase tracking-wider">Gestión del Estado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Powerful CTA full width */}
      <section className="bg-ie-blue py-20 text-center">
         <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight mb-8">
              Programas diseñados para llevar tu carrera pública al siguiente nivel
            </h2>
            <button className="px-10 py-4 bg-white text-ie-blue text-base font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors shadow-lg">
              Solicita Admisión Hoy
            </button>
         </div>
      </section>

      {/* Main Footer inspired by IE */}
      <footer className="bg-[#000c2e] text-white pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-700/50 pb-16">
          <div>
            <h4 className="text-xl font-bold uppercase tracking-wider mb-6">CPEM</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">La Institución</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Claustro Académico</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Centros de Investigación</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Noticias y Eventos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold uppercase tracking-wider mb-6">Programas</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors font-bold text-white">Maestría en Administración Pública</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Maestría en Evaluación Educativa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Diplomados Ejecutivos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Metodología Online LMS</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold uppercase tracking-wider mb-6">Admisiones</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Proceso de Admisión</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Becas y Financiación</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Asesoría Personalizada</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold uppercase tracking-wider mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>Campus Ciudad de México</li>
              <li>Teléfono: +52 (55) 1234 5678</li>
              <li>Email: admisiones@cpem.edu.mx</li>
              <li className="pt-4 flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-[#000c2e] transition-colors"><Globe className="w-4 h-4"/></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Centro de Postgrados del Estado de México. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Aviso de Privacidad</a>
            <a href="#" className="hover:text-white">Política de Cookies</a>
            <a href="#" className="hover:text-white">Términos y Condiciones</a>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex flex-col gap-4 z-50">
        <a 
          href="#" 
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 group relative"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon className="w-7 h-7" />
          <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
            Escríbenos por WhatsApp
          </span>
        </a>
        <a 
          href="#" 
          className="w-14 h-14 bg-ie-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-ie-blue-light hover:scale-110 transition-all duration-300 group relative"
          aria-label="Llamada Telefónica"
        >
          <Phone className="w-6 h-6 fill-current" />
          <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
            Llámanos
          </span>
        </a>
      </div>

      {/* Floating Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white max-w-md w-full shadow-2xl relative overflow-hidden flex flex-col"
            >
              {/* Decorative top bar */}
              <div className="h-2 w-full bg-ie-gold"></div>
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-gray-900 uppercase tracking-tight mb-2">Inicia tu Proceso</h3>
                <p className="text-sm font-semibold text-ie-gold mb-6 uppercase tracking-wider">
                  ¡Aplicaste a un 20% de descuento en tu primera inscripción! <br/>
                  <span className="text-gray-500 text-xs font-normal">Válido hasta el 30 de mayo.</span>
                </p>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Nombre Completo</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-ie-blue focus:ring-1 focus:ring-ie-blue transition-colors outline-none text-sm"
                      placeholder="Ej. Juan Pérez"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Correo Electrónico</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-ie-blue focus:ring-1 focus:ring-ie-blue transition-colors outline-none text-sm"
                      placeholder="juan@ejemplo.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Teléfono</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-ie-blue focus:ring-1 focus:ring-ie-blue transition-colors outline-none text-sm"
                      placeholder="55 1234 5678"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full mt-6 px-8 py-4 bg-ie-blue text-white text-sm font-bold uppercase tracking-wider hover:bg-ie-blue-dark transition-colors"
                  >
                    Enviar Solicitud
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

