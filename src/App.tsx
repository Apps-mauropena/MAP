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
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['institucion', 'proposito', 'plan', 'metodologia', 'admision'];
      let currentSection = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
            break;
          }
        }
      }
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* Top Header Row */}
      <header className={`transition-all duration-300 sticky top-0 z-50 border-b ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-transparent shadow-sm' : 'bg-white border-gray-100'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-[66px] md:h-24 flex items-center justify-between">
          <div className="flex items-center space-x-[20px] md:space-x-8 cursor-pointer">
            <div 
              className={`bg-ie-blue transition-all duration-300 flex-shrink-0 ${isScrolled ? 'h-9 w-28 md:h-14 md:w-48' : 'h-11 w-36 md:h-16 md:w-56'}`}
              style={{
                WebkitMaskImage: 'url(https://raw.githubusercontent.com/Apps-mauropena/MAP/main/public/logo.png)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'left center',
                maskImage: 'url(https://raw.githubusercontent.com/Apps-mauropena/MAP/main/public/logo.png)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'left center'
              }}
              aria-label="Centro de Postgrados"
              role="img"
            />
            
            <div className="flex items-center space-x-3 md:space-x-6 flex-shrink-0 relative -left-[25px] md:-left-[80px]">
              <a href="#" className="text-ie-blue hover:text-ie-blue transition-colors relative group" aria-label="Facebook">
                <FacebookIconFilled className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300" />
                <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-ie-blue transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
              </a>
              <a href="#" className="text-ie-blue hover:text-ie-blue transition-colors relative group" aria-label="YouTube">
                <YoutubeIconFilled className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300" />
                <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-ie-blue transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4 lg:space-x-8 flex-shrink-0 md:relative md:left-[30px]">
            <nav className="hidden lg:flex items-center space-x-3 xl:space-x-4 text-[10px] xl:text-xs font-bold tracking-widest text-gray-600 uppercase border-r border-gray-200 pr-4 xl:pr-8">
              <a href="#institucion" onClick={() => setActiveSection('institucion')} className={`hover:text-ie-blue transition-colors ${activeSection === 'institucion' ? 'text-gray-900 border-b-2 border-ie-blue pb-1' : 'pb-1 border-b-2 border-transparent'}`}>La Institución</a>
              <a href="#proposito" onClick={() => setActiveSection('proposito')} className={`hover:text-ie-blue transition-colors ${activeSection === 'proposito' ? 'text-gray-900 border-b-2 border-ie-blue pb-1' : 'pb-1 border-b-2 border-transparent'}`}>Nuestro Propósito</a>
              <a href="#plan" onClick={() => setActiveSection('plan')} className={`hover:text-ie-blue transition-colors ${activeSection === 'plan' ? 'text-gray-900 border-b-2 border-ie-blue pb-1' : 'pb-1 border-b-2 border-transparent'}`}>Maestría</a>
              <a href="#metodologia" onClick={() => setActiveSection('metodologia')} className={`hover:text-ie-blue transition-colors ${activeSection === 'metodologia' ? 'text-gray-900 border-b-2 border-ie-blue pb-1' : 'pb-1 border-b-2 border-transparent'}`}>Metodología</a>
              <a href="#admision" onClick={() => setActiveSection('admision')} className={`hover:text-ie-blue transition-colors ${activeSection === 'admision' ? 'text-gray-900 border-b-2 border-ie-blue pb-1' : 'pb-1 border-b-2 border-transparent'}`}>Admisiones</a>
            </nav>
            <div className="flex items-center space-x-2 xl:space-x-3">
              <button className="hidden md:block px-5 py-2 border border-gray-300 text-xs font-semibold tracking-wide hover:bg-gray-50 transition-colors uppercase">
                Descargar Folleto
              </button>
              <button 
                className="hidden md:block px-5 py-2 bg-ie-blue text-white text-xs font-semibold tracking-wide hover:bg-ie-blue-dark transition-colors uppercase shadow-sm"
                onClick={() => setIsModalOpen(true)}
              >
                Solicita Admisión
              </button>
            </div>
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
                   <button 
                    className="w-full px-6 py-4 bg-ie-blue text-white text-sm font-bold tracking-wide hover:bg-ie-blue-dark transition-colors uppercase shadow-sm"
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                   >
                    Solicita Admisión
                   </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>



      {/* Minimal Banner Notification */}
      <div className="bg-ie-blue text-white py-2.5 flex items-center justify-center group cursor-pointer hover:bg-ie-blue-dark transition-colors px-4 text-center">
        <span className="text-xs md:text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
          Tu futuro en la gestión pública comienza aquí <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
        </span>
      </div>

      {/* Hero Section */}
      <section id="institucion" className="relative w-full overflow-hidden h-[75vh] min-h-[520px] md:h-[80vh] md:min-h-[640px]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://raw.githubusercontent.com/Apps-mauropena/MAP/main/public/cara.map.cpem.jpg" 
            alt="Senadores y funcionarios públicos de México en sesión formal" 
            className="w-full h-full object-cover object-center grayscale-[20%]"
          />
          {/* Specific Gradient overlay mimicking the screenshot */}
          <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-gray-900/90 via-gray-900/70 to-transparent md:via-gray-900/60"></div>
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-3xl mt-20 md:mt-8 text-center md:text-left flex flex-col items-center md:items-start mx-auto md:mx-0">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 uppercase">
              Liderazgo Estratégico para el Sector Público
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-12 shadow-xs border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <Globe className="w-12 h-12 text-ie-blue mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4">Líderes Responsables</h3>
              <p className="text-gray-600 leading-relaxed">
                Nos comprometemos a formar una nueva generación de servidores públicos con consciencia social, rigor legal y sólida ética administrativa.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-12 shadow-xs border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <Building className="w-12 h-12 text-ie-blue mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4">Gestión Estratégica</h3>
              <p className="text-gray-600 leading-relaxed">
                Desarrollamos en nuestros estudiantes competencias avanzadas para enfrentar la complejidad del Estado y dirigir organizaciones públicas de alto impacto.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-12 shadow-xs border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <Users className="w-12 h-12 text-ie-blue mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wide text-gray-900 mb-4">Enfoque Humano y TIC</h3>
              <p className="text-gray-600 leading-relaxed">
                Integramos la eficiencia en la gestión del factor humano con la última innovación en tecnologías de la información para la administración pública moderna.
              </p>
            </motion.div>
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
         <div 
           className="w-full md:w-1/2 min-h-[400px] bg-cover bg-[center_-10px] md:bg-center"
           style={{ backgroundImage: "url('https://raw.githubusercontent.com/Apps-mauropena/MAP/main/public/map.portada.04.png')" }}
         >
         </div>
      </section>

      {/* Curriculum Grid Section - Critical Payload Insertion */}
      <section id="plan" className="pt-12 pb-16 md:py-24 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-center justify-between relative gap-8">
            <div className="max-w-3xl relative z-10">
              <div className="relative flex items-center mb-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-ie-blue uppercase tracking-tight relative z-10">Plan de Estudios</h2>
                <div className="ml-[30px] z-20 flex-shrink-0">
                  <img src="https://raw.githubusercontent.com/Apps-mauropena/MAP/main/public/rvoe.sep.cpem.png" alt="RVOE SEP" className="h-[60px] md:h-[90px] w-auto drop-shadow-md object-contain" />
                </div>
              </div>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                Diseñado para desarrollarte a través de un programa de 6 cuatrimestres, abarcando desde fundamentos de investigación hasta la maestría en diseño de políticas públicas.
              </p>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 inline-flex items-center group relative cursor-default"
              >
                {/* Glow background */}
                <div className="absolute inset-0 bg-gradient-to-r from-ie-blue/10 via-ie-blue/5 to-ie-gold/10 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative overflow-hidden flex items-center px-6 py-3 bg-[#f8f9fa] border border-gray-200/60 rounded-lg shadow-sm hover:shadow-md hover:border-ie-blue/20 transition-all duration-500">
                  
                  {/* Animated line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-ie-blue/50 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />

                  <Award className="w-5 h-5 text-ie-blue mr-3 group-hover:scale-110 group-hover:text-ie-gold transition-all duration-500 z-10" />
                  <p className="text-[11px] font-bold tracking-widest text-ie-blue uppercase z-10">
                    RVOE 20193111 <span className="mx-2 text-gray-300">|</span> 
                    <span className="font-medium text-gray-600">Modalidad no escolarizada</span> <span className="mx-2 text-gray-300">|</span> 
                    <span className="font-medium text-gray-600">22/02/2018</span>
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Subtle Premium Graphic on Desktop */}
            <div className="hidden lg:flex w-full md:w-1/3 justify-end items-center relative pl-8">
              <div className="relative w-56 h-56 flex items-center justify-center opacity-80 group">
                <div className="absolute inset-0 border-[1px] border-ie-blue/10 rounded-full animate-[spin_25s_linear_infinite]"></div>
                <div className="absolute inset-6 border-[1px] border-ie-gold/20 rounded-full border-dashed animate-[spin_35s_linear_infinite_reverse]"></div>
                <div className="absolute inset-12 bg-ie-blue/5 rounded-full backdrop-blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>
                
                <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-ie-blue/20 to-transparent rotate-45"></div>
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-ie-gold/20 to-transparent rotate-45"></div>

                <div className="absolute w-12 h-12 bg-white rounded-full shadow-[0_0_30px_rgba(0,12,46,0.1)] flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-ie-blue rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Curriculum Tabs */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-12">
            {/* Desktop Tab Selectors */}
            <div className="hidden lg:flex lg:w-1/4 flex-col gap-2 relative z-10" role="tablist">
              {curriculumData.map((term, index) => (
                <div key={`desktop-tab-${term.id}`} className="relative group">
                  <button
                    onClick={() => setActiveTab(term.id)}
                    className={`relative z-10 w-full text-left px-6 py-4 font-bold uppercase tracking-wide transition-colors duration-300 ${
                      activeTab === term.id 
                        ? 'text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-selected={activeTab === term.id}
                    role="tab"
                  >
                    <div className="flex items-center justify-between">
                      <span className="relative z-10">{term.title}</span>
                      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                        <ChevronRight className={`absolute transition-all duration-300 ${activeTab === term.id ? 'translate-x-0 opacity-100 text-white' : '-translate-x-full opacity-0 text-ie-blue group-hover:translate-x-0 group-hover:opacity-100'}`} />
                      </div>
                    </div>
                  </button>
                  
                  {/* Subtle hover pulse animation for unselected tabs to encourage clicks */}
                  {activeTab !== term.id && index === 1 && (
                     <motion.div 
                       className="absolute right-[22px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[1.5px] border-ie-blue/40 z-20 pointer-events-none group-hover:opacity-0 transition-opacity"
                       animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                       transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                     />
                  )}

                  {activeTab === term.id ? (
                    <motion.div
                      layoutId="active-tab-indicator-desktop"
                      className="absolute inset-0 bg-ie-blue rounded-lg shadow-[0_4px_20px_-4px_rgba(0,12,46,0.3)] z-0"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-50 rounded-lg group-hover:bg-gray-100/80 transition-colors duration-300 z-0 border border-transparent group-hover:border-gray-200"></div>
                  )}
                </div>
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
                  <div className="relative group lg:hidden w-full outline-none">
                    <button
                      onClick={() => setActiveTab(activeTab === term.id ? 0 : term.id)}
                      className={`relative w-full z-10 text-left px-6 py-4 font-bold uppercase tracking-wide transition-colors duration-300 ${
                        activeTab === term.id 
                          ? 'text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <span>{term.title}</span>
                        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${activeTab === term.id ? 'rotate-90 text-white' : 'text-gray-400 group-hover:text-ie-blue'}`} />
                      </div>
                    </button>
                    {activeTab === term.id ? (
                      <motion.div
                        layoutId="active-tab-indicator-mobile"
                        className="absolute inset-0 bg-ie-blue rounded-lg shadow-md z-0"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors duration-300 z-0"></div>
                    )}
                  </div>

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

      {/* Modalidad Asincrónica Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-stretch gap-12 lg:gap-20">
            <div className="w-full md:w-1/2 pt-0 md:pt-2 order-2 md:order-1">
              <p className="text-[17px] text-gray-600 mb-10 leading-relaxed">
                Nuestra Maestría y sus clases están diseñadas para adaptarse a los horarios exigentes de los servidores públicos. El formato asincrónico te permite estudiar a tu propio ritmo, desde cualquier lugar y en el momento que decidas.
              </p>
              <ul className="space-y-8">
                <li className="flex items-start group">
                  <div className="p-3 bg-gray-50 border border-gray-200 group-hover:border-ie-blue group-hover:bg-ie-blue transition-colors mr-5">
                    <Monitor className="w-6 h-6 text-ie-blue group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase tracking-wide mb-2 text-sm group-hover:text-ie-blue transition-colors">Campus Virtual 24/7</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Accede a videoclases, lecturas guiadas y materiales interactivos disponibles permanentemente. Todo el contenido está grabado y estructurado para que no dependas de horarios fijos de conexión.</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="p-3 bg-gray-50 border border-gray-200 group-hover:border-ie-blue group-hover:bg-ie-blue transition-colors mr-5">
                    <BookOpen className="w-6 h-6 text-ie-blue group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase tracking-wide mb-2 text-sm group-hover:text-ie-blue transition-colors">Evaluación y Entregas Flexibles</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Avanza entregando proyectos, análisis de casos y participando en foros de discusión dentro de plazos flexibles (semanales o quincenales), eliminando la presión de los exámenes en tiempo real.</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="p-3 bg-gray-50 border border-gray-200 group-hover:border-ie-blue group-hover:bg-ie-blue transition-colors mr-5">
                    <Users className="w-6 h-6 text-ie-blue group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 uppercase tracking-wide mb-2 text-sm group-hover:text-ie-blue transition-colors">Tutoría Experta Constante</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Aunque tu estudio es autónomo, contarás con profesores y asesores respaldando cada paso, proporcionando retroalimentación asíncrona a tus dudas y seguimiento detallado de tu progreso a través del LMS.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 flex flex-col order-1 md:order-2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight mb-8 relative pb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-ie-gold">
                Modalidad 100% Asincrónica
              </h2>
              <div className="w-full min-h-[350px] md:min-h-[500px] flex-grow bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center border border-gray-100 shadow-2xl relative">
                  <div className="absolute inset-0 bg-ie-blue/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Blocks Section (similar to "MÁS INFORMACIÓN SOBRE IE") */}
      <section id="metodologia" className="py-24 bg-gray-50 border-t border-gray-100">
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
      <section id="admision" className="bg-ie-blue py-20 text-center">
         <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight mb-8">
              Programas diseñados para llevar tu carrera pública al siguiente nivel
            </h2>
            <button 
              className="px-10 py-4 bg-white text-ie-blue text-base font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors shadow-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Solicita información
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
              <li><a href="https://maestria.postgradoscpem.mx/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Maestría en Evaluación Educativa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Diplomados Ejecutivos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Metodología Online LMS</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold uppercase tracking-wider mb-6">Admisiones</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Proceso de Admisión</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Becas y Convenios</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Asesoría Personalizada</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold uppercase tracking-wider mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>Campus Ciudad de México</li>
              <li>Teléfono: 55 4486 2673</li>
              <li>Email: info@postgradoscpem.mx</li>
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
          href="https://wa.me/525544862673?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20Maestr%C3%ADa%20en%20Administraci%C3%B3n%20P%C3%BAblica." 
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 group relative"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon className="w-7 h-7" />
          <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
            Escríbenos por WhatsApp
          </span>
        </a>
        <button 
          onClick={() => setIsPhoneModalOpen(true)}
          className="w-14 h-14 bg-ie-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-ie-blue-light hover:scale-110 transition-all duration-300 group relative"
          aria-label="Llamada Telefónica"
        >
          <Phone className="w-6 h-6 fill-current" />
          <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
            Llámanos
          </span>
        </button>
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

      {/* Telephone Appointment Modal */}
      <AnimatePresence>
        {isPhoneModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-md shadow-2xl relative overflow-hidden"
            >
              {/* Decorative top bar */}
              <div className="h-2 w-full bg-ie-gold"></div>
              
              <button 
                onClick={() => setIsPhoneModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-[#000c2e] uppercase tracking-tight mb-2">
                  Agenda una cita
                </h3>
                <p className="text-sm font-semibold text-gray-600 mb-6 uppercase tracking-wider">
                  telefónica con Admisiones CPEM
                </p>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsPhoneModalOpen(false); }}>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Nombre Completo</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-ie-blue focus:ring-1 focus:ring-ie-blue transition-colors outline-none text-sm"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Teléfono</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-ie-blue focus:ring-1 focus:ring-ie-blue transition-colors outline-none text-sm"
                      placeholder="Tu número"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Día</label>
                    <select 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-ie-blue focus:ring-1 focus:ring-ie-blue transition-colors outline-none text-sm text-gray-700"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>Seleccionar día</option>
                      <option value="Lunes">Lunes</option>
                      <option value="Martes">Martes</option>
                      <option value="Miercoles">Miércoles</option>
                      <option value="Jueves">Jueves</option>
                      <option value="Viernes">Viernes</option>
                      <option value="Sabado">Sábado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Hora (09:00 - 17:00)</label>
                    <select 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-ie-blue focus:ring-1 focus:ring-ie-blue transition-colors outline-none text-sm text-gray-700"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>Seleccionar hora</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full mt-6 px-8 py-4 bg-ie-blue text-white text-sm font-bold uppercase tracking-wider hover:bg-ie-blue-light transition-colors relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-ie-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      Agendar Cita <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
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

