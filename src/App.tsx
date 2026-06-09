import React, { useState, useEffect, Suspense } from 'react';
import { ChevronRight, ArrowRight, BookOpen, Monitor, Award, Building, Globe, Users, Menu, X, Facebook, Youtube, Phone, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LiteYouTube } from './components/LiteYouTube';
const LazyMarkdown = React.lazy(() => import('react-markdown'));
import { blogArticlesData } from './blogArticles';
import { appendLeadToSheet } from './lib/sheets';

const submitLead = async (formName: string, name: string, email: string, phone: string, extraData: string = '') => {
  try {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
    
    let postgradoInfo = 'Maestría en Administración Pública';
    if (formName) postgradoInfo += ` (${formName})`;
    if (extraData) postgradoInfo += ` - ${extraData}`;

    await appendLeadToSheet([
      name,
      email,
      phone,
      postgradoInfo,
      formattedDateTime
    ]);
    return true;
  } catch (error: any) {
    console.error("Error inside submitLead:", error);
    return false;
  }
};

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

const VinculacionesModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [modo, setModo] = useState('WhatsApp');
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [contacto, setContacto] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Close when pressing Esc
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await submitLead('Vinculaciones Modal', nombre, '', contacto, `${modo} - Fecha: ${fecha} - Hora: ${hora}`);
    setIsSubmitting(false);
    if (success) {
      setSubmitted(true);
    }
  };

  const getHeadContent = () => {
    if (modo === 'WhatsApp') {
      return {
        title: 'Conversemos por WhatsApp',
        desc: 'Compártanos su número y un representante de la Dirección de Vinculación del CPEM se comunicará con usted para presentarle nuestra propuesta de colaboración académica e institucional.',
        btn: 'SOLICITAR POR WHATSAPP'
      };
    } else if (modo === 'Llamada telefónica') {
      return {
        title: 'Agende una llamada de 15 minutos',
        desc: 'Seleccione el día y horario de su preferencia. La Dirección de Vinculación del CPEM le presentará las oportunidades de convenio y colaboración institucional para hospitales, clínicas y organizaciones del sector salud.',
        btn: 'AGENDAR LLAMADA DE 15 MIN'
      };
    } else {
      return {
        title: 'Agende una sesión virtual por Zoom de 20 a 30 minutos',
        desc: 'Indique el horario que mejor se adapte a su agenda. Le enviaremos el acceso a la videollamada para presentarle nuestra propuesta de alianza estratégica y vinculación académica institucional.',
        btn: 'AGENDAR SESIÓN POR ZOOM'
      };
    }
  };

  const content = getHeadContent();

  const getSuccessMessage = () => {
    if (modo === 'WhatsApp') {
      return <>Gracias, <b className="font-semibold text-[#16223b]">{nombre}</b>. Un representante de la Dirección de Vinculación del CPEM se comunicará con usted por <b className="font-semibold text-[#16223b]">WhatsApp</b> para presentarle nuestra propuesta de colaboración académica e institucional.</>;
    } else {
      const dur = modo === 'Videollamada por Zoom' ? 'de 20 a 30 minutos' : 'de 15 minutos';
      const fechaFmt = fecha ? new Date(fecha + 'T00:00').toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }) : '';
      return <>Gracias, <b className="font-semibold text-[#16223b]">{nombre}</b>. Su sesión {dur} por <b className="font-semibold text-[#16223b]">{modo}</b> con la Dirección de Vinculación del CPEM queda solicitada para el <b className="font-semibold text-[#16223b]">{fechaFmt}</b> de <b className="font-semibold text-[#16223b]">{hora}</b>. Le confirmaremos los detalles a la brevedad.</>;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#16223b]/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-[460px] bg-white rounded-[22px] shadow-[0_1px_2px_rgba(15,38,69,0.05),_0_20px_50px_-18px_rgba(15,38,69,0.22)] overflow-hidden my-auto"
        onClick={e => e.stopPropagation()}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-white/80 z-10 p-2"
          aria-label="Cerrar modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-gradient-to-br from-[#0f2645] to-[#16335c] text-white pt-8 pb-7 px-9 relative overflow-hidden">
          <div className="absolute -right-[50px] -top-[50px] w-[190px] h-[190px] border border-white/10 rounded-full pointer-events-none"></div>
          <div className="flex items-center gap-[11px] mb-5 relative">
            <div className="w-[42px] h-[42px] rounded-[10px] bg-white/10 border border-white/20 flex items-center justify-center font-serif font-semibold text-[15px] tracking-wider">
              CPEM
            </div>
            <div>
              <strong className="block text-[12.5px] font-semibold leading-tight">Centro de Postgrados del Estado de México</strong>
              <span className="text-[11px] opacity-80">Dirección de Vinculación Institucional</span>
            </div>
          </div>
          <h2 className="font-serif font-medium text-2xl leading-[1.22] tracking-tight mb-2 relative transition-all duration-300">
            {content.title}
          </h2>
          <p className="text-[13.5px] leading-[1.55] opacity-90 relative transition-all duration-300">
            {content.desc}
          </p>
        </div>

        <div className="p-7 px-9">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12.5px] font-medium mb-[9px] text-[#16223b]">¿Cómo prefiere que le contactemos?</label>
                <div className="grid grid-cols-3 gap-[9px]">
                  {/* WhatsApp Option */}
                  <div className="relative">
                    <input 
                      type="radio" 
                      name="modo" 
                      id="mwa" 
                      value="WhatsApp" 
                      checked={modo === 'WhatsApp'} 
                      onChange={(e) => setModo(e.target.value)} 
                      className="absolute opacity-0 inset-0 cursor-pointer peer z-10" 
                    />
                    <label 
                      htmlFor="mwa" 
                      className={`m-0 cursor-pointer text-center rounded-[13px] pt-[14px] pb-3 px-1 flex flex-col items-center gap-2 transition-all duration-200 border-[1.5px] ${modo === 'WhatsApp' ? 'border-[#25d366] bg-[#e6f9ee]' : 'border-[#e3e8f0]'}`}
                    >
                      <div className={`w-7 h-7 flex items-center justify-center transition-colors duration-200 ${modo === 'WhatsApp' ? 'text-[#25d366]' : 'text-[#56607a]'}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[21px] h-[21px]">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>
                        </svg>
                      </div>
                      <span className="text-[12px] font-semibold text-[#16223b]">WhatsApp</span>
                    </label>
                  </div>
                  {/* Llamada Option */}
                  <div className="relative">
                    <input 
                      type="radio" 
                      name="modo" 
                      id="mtel" 
                      value="Llamada telefónica" 
                      checked={modo === 'Llamada telefónica'} 
                      onChange={(e) => setModo(e.target.value)} 
                      className="absolute opacity-0 inset-0 cursor-pointer peer z-10" 
                    />
                    <label 
                      htmlFor="mtel" 
                      className={`m-0 cursor-pointer text-center rounded-[13px] pt-[14px] pb-3 px-1 flex flex-col items-center gap-2 transition-all duration-200 border-[1.5px] ${modo === 'Llamada telefónica' ? 'border-[#16335c] bg-[#e9eff8]' : 'border-[#e3e8f0]'}`}
                    >
                      <div className={`w-7 h-7 flex items-center justify-center transition-colors duration-200 ${modo === 'Llamada telefónica' ? 'text-[#16335c]' : 'text-[#56607a]'}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[21px] h-[21px]">
                          <path d="M13 2a9 9 0 0 1 9 9M13 6a5 5 0 0 1 5 5M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>
                        </svg>
                      </div>
                      <span className="text-[12px] font-semibold text-[#16223b]">Llamada</span>
                    </label>
                  </div>
                  {/* Zoom Option */}
                  <div className="relative">
                    <input 
                      type="radio" 
                      name="modo" 
                      id="mzoom" 
                      value="Videollamada por Zoom" 
                      checked={modo === 'Videollamada por Zoom'} 
                      onChange={(e) => setModo(e.target.value)} 
                      className="absolute opacity-0 inset-0 cursor-pointer peer z-10" 
                    />
                    <label 
                      htmlFor="mzoom" 
                      className={`m-0 cursor-pointer text-center rounded-[13px] pt-[14px] pb-3 px-1 flex flex-col items-center gap-2 transition-all duration-200 border-[1.5px] ${modo === 'Videollamada por Zoom' ? 'border-[#16335c] bg-[#e9eff8]' : 'border-[#e3e8f0]'}`}
                    >
                      <div className={`w-7 h-7 flex items-center justify-center transition-colors duration-200 ${modo === 'Videollamada por Zoom' ? 'text-[#16335c]' : 'text-[#56607a]'}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[21px] h-[21px]">
                          <path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/>
                        </svg>
                      </div>
                      <span className="text-[12px] font-semibold text-[#16223b]">Zoom</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[12.5px] font-medium mb-[9px] text-[#16223b]">Nombre y cargo</label>
                <input 
                  type="text" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Dra. María González, Directora Médica" 
                  className="w-full text-[15px] text-[#16223b] bg-[#fbfcfe] border border-[#e3e8f0] rounded-[11px] p-[13px_15px] focus:outline-none focus:bg-white focus:border-[#16335c] focus:ring-4 focus:ring-[#16335c]/10 transition-all placeholder:text-[#aab2c2]"
                  required 
                />
              </div>

              {modo === 'WhatsApp' && (
                <div>
                  <label className="block text-[12.5px] font-medium mb-[9px] text-[#16223b]">Número de WhatsApp</label>
                  <input 
                    type="tel" 
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    placeholder="+52 1 ..."
                    className="w-full text-[15px] text-[#16223b] bg-[#fbfcfe] border border-[#e3e8f0] rounded-[11px] p-[13px_15px] focus:outline-none focus:bg-white focus:border-[#16335c] focus:ring-4 focus:ring-[#16335c]/10 transition-all placeholder:text-[#aab2c2]"
                    required 
                  />
                </div>
              )}

              {modo === 'Llamada telefónica' && (
                <div>
                  <label className="block text-[12.5px] font-medium mb-[9px] text-[#16223b]">Teléfono de contacto</label>
                  <input 
                    type="tel" 
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    placeholder="+52 ..."
                    className="w-full text-[15px] text-[#16223b] bg-[#fbfcfe] border border-[#e3e8f0] rounded-[11px] p-[13px_15px] focus:outline-none focus:bg-white focus:border-[#16335c] focus:ring-4 focus:ring-[#16335c]/10 transition-all placeholder:text-[#aab2c2]"
                    required 
                  />
                </div>
              )}

              {modo === 'Videollamada por Zoom' && (
                <div>
                  <label className="block text-[12.5px] font-medium mb-[9px] text-[#16223b]">Correo electrónico</label>
                  <input 
                    type="email" 
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    placeholder="nombre@institucion.mx"
                    className="w-full text-[15px] text-[#16223b] bg-[#fbfcfe] border border-[#e3e8f0] rounded-[11px] p-[13px_15px] focus:outline-none focus:bg-white focus:border-[#16335c] focus:ring-4 focus:ring-[#16335c]/10 transition-all placeholder:text-[#aab2c2]"
                    required 
                  />
                </div>
              )}

              {(modo === 'Llamada telefónica' || modo === 'Videollamada por Zoom') && (
                <div>
                  <label className="block text-[12.5px] font-medium mb-[9px] text-[#16223b]">Día y horario de su preferencia</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="date" 
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full text-[15px] text-[#16223b] bg-[#fbfcfe] border border-[#e3e8f0] rounded-[11px] p-[13px_15px] focus:outline-none focus:bg-white focus:border-[#16335c] focus:ring-4 focus:ring-[#16335c]/10 transition-all placeholder:text-[#aab2c2]"
                      required 
                    />
                    <select 
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                      className="w-full text-[15px] text-[#16223b] bg-[#fbfcfe] border border-[#e3e8f0] rounded-[11px] p-[13px_15px] focus:outline-none focus:bg-white focus:border-[#16335c] focus:ring-4 focus:ring-[#16335c]/10 transition-all"
                      required
                    >
                      <option value="" disabled>Horario</option>
                      <option>09:00 – 10:00</option>
                      <option>10:00 – 11:00</option>
                      <option>11:00 – 12:00</option>
                      <option>12:00 – 13:00</option>
                      <option>13:00 – 14:00</option>
                      <option>14:00 – 15:00</option>
                      <option>15:00 – 16:00</option>
                      <option>16:00 – 17:00</option>
                    </select>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full text-[14.5px] font-semibold text-white bg-[#16335c] border-none rounded-[11px] p-[15px] cursor-pointer mt-2 tracking-[0.03em] transition-all hover:bg-[#0f2645] active:scale-95"
              >
                {content.btn}
              </button>

              <div className="flex items-center justify-center gap-[7px] mt-4 text-[11.5px] text-[#56607a]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Sus datos son confidenciales · RVOE SEP 20180199
              </div>
            </form>
          ) : (
            <div className="text-center py-2 animate-[rise_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
              <div className="w-[60px] h-[60px] mx-auto mb-[20px] rounded-full bg-[#e9f9ef] text-[#16a34a] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[28px] h-[28px]">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <h2 className="font-serif font-medium text-[22px] mb-[9px] text-[#16223b]">Solicitud recibida</h2>
              <p className="text-[14px] text-[#56607a] leading-[1.6]">
                {getSuccessMessage()}
              </p>
              <div className="mt-[22px] pt-5 border-t border-[#e3e8f0] text-[12.5px] text-[#56607a] leading-[1.5]">
                <b className="text-[#16223b]">Dr. Jorge Zaldívar Vázquez</b> · Director General<br />
                Centro de Postgrados del Estado de México — CPEM<br />
                info@postgradoscpem.mx · postgradoscpem.mx
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlianzasModalOpen, setIsAlianzasModalOpen] = useState(false);
  const [isVinculacionesModalOpen, setIsVinculacionesModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isPlayingMuestra, setIsPlayingMuestra] = useState(false);
  const [isVideoFormRequired, setIsVideoFormRequired] = useState(false);
  const [isVideoFormSubmitted, setIsVideoFormSubmitted] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('ljNg3_iLNps');
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [isHoveringBlog, setIsHoveringBlog] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'articulos'>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isPdfFormSubmitted, setIsPdfFormSubmitted] = useState(false);
  const [isPdfSubmitting, setIsPdfSubmitting] = useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Handle initial load based on URL path
    const path = window.location.pathname;
    if (path.startsWith('/articulo/')) {
      const articleId = path.split('/articulo/')[1];
      setCurrentView('articulos');
      setSelectedArticleId(articleId);
      
      const article = blogArticlesData.find(a => a.id === articleId);
      if (article) {
        document.title = `${article.title} - CPEM`;
      }
    } else if (path === '/articulos') {
      setCurrentView('articulos');
      setSelectedArticleId(null);
      document.title = "Artículos - CPEM";
    }

    // Handle back button
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/articulo/')) {
        const articleId = path.split('/articulo/')[1];
        setCurrentView('articulos');
        setSelectedArticleId(articleId);
      } else if (path === '/articulos') {
        setCurrentView('articulos');
        setSelectedArticleId(null);
      } else {
        setCurrentView('home');
        setSelectedArticleId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openArticleList = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setSelectedArticleId(null);
    setCurrentView('articulos');
    setIsMobileMenuOpen(false);
    window.history.pushState({}, '', '/articulos');
    document.title = "Artículos - CPEM";
    window.scrollTo(0, 0);
  };

  const openArticle = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setSelectedArticleId(id);
    setCurrentView('articulos');
    window.history.pushState({}, '', `/articulo/${id}`);
    
    const article = blogArticlesData.find(a => a.id === id);
    if (article) {
      document.title = `${article.title} - CPEM`;
    }
    
    window.scrollTo(0, 0);
  };
  
  const handleHomeClick = (e: React.MouseEvent, sectionId: string) => {
    window.history.pushState({}, '', '/');
    document.title = "Maestría en Administración Pública - CPEM";
    scrollToSection(e as any, sectionId);
  };
  
  React.useEffect(() => {
    if (window.location.hash === '#vinculaciones' || window.location.search.includes('vinculaciones')) {
      setIsVinculacionesModalOpen(true);
    }
  }, []);

  const isStandaloneVinculaciones = window.location.hash === '#vinculaciones' || window.location.search.includes('vinculaciones');

  if (isStandaloneVinculaciones) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center p-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <VinculacionesModal isOpen={true} onClose={() => window.location.href = '/'} />
      </div>
    );
  }

  React.useEffect(() => {
    let timer: number;
    if (isPlayingMuestra && !isVideoFormSubmitted) {
      // Show form after 30 seconds (30,000 ms), but do not pause the video
      timer = window.setTimeout(() => {
        setIsVideoFormRequired(true);
      }, 30000);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [isPlayingMuestra, isVideoFormSubmitted]);

  React.useEffect(() => {
    if (isHoveringBlog) {
      return;
    }
    const blogTimer = window.setInterval(() => {
      setCurrentBlogIndex((prev) => (prev + 1) % blogArticlesData.length);
    }, 5000); // rotate every 5 seconds
    return () => window.clearInterval(blogTimer);
  }, [isHoveringBlog]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // Always ensure we go back to the root URL when navigating to a section
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      document.title = "Maestría en Administración Pública - CPEM";
    }
    
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        setActiveSection(sectionId);
        setIsMobileMenuOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    
    if (sectionId === 'plan-de-estudios') {
      setActiveTab(1); // Ensure Primer Cuatrimestre is active
      
      // We want to scroll directly to the panel content for Primer Cuatrimestre
      setTimeout(() => {
        const targetElement = document.getElementById('ancla-primer-cuatrimestre');
        if (targetElement) {
          const headerOffset = 150;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 50);
      return; // Exit early since we handle scrolling here
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120; // Exact match for sticky header height + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['institucion', 'proposito', 'plan', 'plan-de-estudios', 'metodologia', 'admision'];
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
          <div className="flex items-center space-x-[20px] md:space-x-8 cursor-pointer" onClick={(e) => scrollToSection(e as any, 'institucion')}>
            <div 
              className={`bg-ie-blue transition-all duration-300 flex-shrink-0 ${isScrolled ? 'h-9 w-28 md:h-14 md:w-48' : 'h-11 w-36 md:h-16 md:w-56'}`}
              style={{
                WebkitMaskImage: 'url(https://raw.githubusercontent.com/Apps-mauropena/MAP/main/public/logoCPEM.webp)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'left center',
                maskImage: 'url(https://raw.githubusercontent.com/Apps-mauropena/MAP/main/public/logoCPEM.webp)',
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
              <a href="#institucion" onClick={(e) => scrollToSection(e, 'institucion')} className={`hover:text-ie-blue transition-colors ${activeSection === 'institucion' ? 'text-gray-900 border-b-2 border-ie-blue pb-1' : 'pb-1 border-b-2 border-transparent'}`}>La Institución</a>
              <a href="#proposito" onClick={(e) => scrollToSection(e, 'proposito')} className={`hover:text-ie-blue transition-colors ${activeSection === 'proposito' ? 'text-gray-900 border-b-2 border-ie-blue pb-1' : 'pb-1 border-b-2 border-transparent'}`}>Nuestro Propósito</a>
              <a href="#plan-de-estudios" onClick={(e) => scrollToSection(e, 'plan-de-estudios')} className={`hover:text-ie-blue transition-colors ${activeSection === 'plan-de-estudios' && currentView === 'home' ? 'text-gray-900 border-b-2 border-ie-blue pb-1' : 'pb-1 border-b-2 border-transparent'}`}>Plan de Estudios</a>
              <a href="#admision" onClick={(e) => scrollToSection(e, 'admision')} className={`hover:text-ie-blue transition-colors ${activeSection === 'admision' && currentView === 'home' ? 'text-gray-900 border-b-2 border-ie-blue pb-1' : 'pb-1 border-b-2 border-transparent'}`}>Admisiones</a>
              <a href="/articulos" onClick={openArticleList} className={`hover:text-ie-blue transition-colors ${currentView === 'articulos' && !selectedArticleId ? 'text-gray-900 border-b-2 border-ie-blue pb-1' : 'pb-1 border-b-2 border-transparent'}`}>Artículos</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsAlianzasModalOpen(true); }} className="hover:text-ie-blue transition-colors pb-1 border-b-2 border-transparent">Alianzas Corporativas</a>
            </nav>
            <div className="flex items-center space-x-2 xl:space-x-3">
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
                  href="#institucion" className="text-lg font-bold tracking-widest text-gray-800 uppercase hover:text-ie-blue" onClick={(e) => scrollToSection(e, 'institucion')}>La Institución</motion.a>
                <motion.a 
                   initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}
                   href="#proposito" className="text-lg font-bold tracking-widest text-gray-800 uppercase hover:text-ie-blue" onClick={(e) => scrollToSection(e, 'proposito')}>Nuestro Propósito</motion.a>
                <motion.a 
                   initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.22 }}
                   href="#plan-de-estudios" className="text-lg font-bold tracking-widest text-gray-800 uppercase hover:text-ie-blue" onClick={(e) => scrollToSection(e, 'plan-de-estudios')}>Plan de Estudios</motion.a>
                <motion.a 
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    href="#admision" className="text-lg font-bold tracking-widest text-gray-800 uppercase hover:text-ie-blue" onClick={(e) => scrollToSection(e, 'admision')}>Admisiones</motion.a>
                <motion.a 
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.32 }}
                    href="/articulos" className="text-lg font-bold tracking-widest text-gray-800 uppercase hover:text-ie-blue" onClick={openArticleList}>Artículos</motion.a>
                <motion.a 
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.35 }}
                    href="#" className="text-lg font-bold tracking-widest text-gray-800 uppercase hover:text-ie-blue" onClick={(e) => { e.preventDefault(); setIsAlianzasModalOpen(true); setIsMobileMenuOpen(false); }}>Alianzas Corporativas</motion.a>
                
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="pt-6 mt-2 border-t border-gray-100 flex flex-col gap-4">
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
                   <button onClick={(e) => { e.preventDefault(); setIsPdfModalOpen(true); }} className="block text-center w-full px-6 py-4 border border-gray-300 text-sm font-bold tracking-wide hover:bg-gray-50 transition-colors uppercase">
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

      {/* HOME VIEW: Hidden when in articulos view */}
      <div className={currentView === 'home' ? 'block' : 'hidden'}>
        {/* Hero Section */}
        <section id="institucion" className="relative w-full overflow-hidden h-[75vh] min-h-[520px] md:h-[80vh] md:min-h-[640px]">
        <div className="absolute inset-0 z-0">
          <img 
            width="800"
            height="800"
            loading="lazy"
            decoding="async"
            src="https://raw.githubusercontent.com/Apps-mauropena/MAP/main/public/cara.map.cpem.webp" 
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
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-5 md:mb-0">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative w-full sm:w-auto px-8 py-4 bg-ie-blue text-white text-sm md:text-base font-bold uppercase tracking-wider transition-all border border-transparent overflow-hidden"
              >
                <div className="absolute inset-0 bg-ie-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                <span className="relative z-10">Inicia tu proceso</span>
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); setIsPdfModalOpen(true); }}
                className="group relative flex justify-center items-center w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-ie-blue text-sm md:text-base font-bold uppercase tracking-wider transition-all border border-white backdrop-blur-sm"
              >
                Descargar Folleto
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
           style={{ backgroundImage: "url('https://raw.githubusercontent.com/Apps-mauropena/MAP/main/public/map.portada.04.webp')" }}
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
                  <img width="200" height="90" loading="lazy" decoding="async" src="https://raw.githubusercontent.com/Apps-mauropena/MAP/main/public/rvoe.sep.cpem.webp" alt="RVOE SEP" className="h-[60px] md:h-[90px] w-auto drop-shadow-md object-contain" />
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
          <div id="plan-de-estudios" className="flex flex-col lg:flex-row gap-4 lg:gap-12 scroll-m-[100px]">
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
                    <div id={term.id === 1 ? 'ancla-primer-cuatrimestre' : undefined} className="bg-[#f8f9fa] border-l-4 border-ie-blue p-8 mb-8">
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
            <div 
              className="relative h-80 group overflow-hidden bg-black cursor-pointer rounded-2xl shadow-xl"
              onMouseEnter={() => setIsHoveringBlog(true)}
              onMouseLeave={() => setIsHoveringBlog(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBlogIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  {blogArticlesData[currentBlogIndex].type === 'video' ? (
                    <div className="w-full h-full relative">
                      <LiteYouTube 
                        videoId={blogArticlesData[currentBlogIndex].videoId!} 
                        title={blogArticlesData[currentBlogIndex].title}
                        className="w-full h-full absolute inset-0 z-0"
                      />
                      <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/90 to-transparent pointer-events-none z-10">
                        <span className="text-white font-bold text-xl uppercase tracking-wider drop-shadow-md">{blogArticlesData[currentBlogIndex].title}</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img width="800" height="600" loading="lazy" decoding="async" src={blogArticlesData[currentBlogIndex].image} alt={blogArticlesData[currentBlogIndex].title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent flex flex-col justify-end p-6">
                        <span className="text-ie-gold text-xs font-bold uppercase tracking-widest mb-2 border-b border-ie-gold/30 pb-2 inline-block w-max">Blog CPEM</span>
                        <h3 className="text-white font-bold text-lg leading-snug mb-2">{blogArticlesData[currentBlogIndex].title}</h3>
                        <p className="text-gray-300 text-sm line-clamp-2">{blogArticlesData[currentBlogIndex].description}</p>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative h-80 group cursor-pointer overflow-hidden">
              <img width="800" height="600" loading="lazy" decoding="async" src="https://raw.githubusercontent.com/Apps-mauropena/MAP/main/public/portada-folleto.map.webp" alt="Folleto Informativo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/50 transition-colors flex flex-col items-center justify-center p-6 text-center gap-4">
                <span className="text-white font-bold text-xl uppercase tracking-wider">Folleto Informativo</span>
                <button onClick={(e) => { e.preventDefault(); setIsPdfModalOpen(true); }} className="inline-block px-6 py-2 bg-ie-blue text-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-ie-blue transition-colors border border-transparent hover:border-ie-blue shadow-md mt-2">
                  Descargar
                </button>
              </div>
            </div>
            <div className="relative h-80 hover:h-[400px] transition-all duration-500 ease-out z-10 group overflow-hidden bg-black cursor-pointer rounded-2xl shadow-xl border border-white/10" onClick={() => {
              const videoIds = ['ljNg3_iLNps', 'NRHP2u7xUPY'];
              setCurrentVideoId(videoIds[Math.floor(Math.random() * videoIds.length)]);
              setIsPlayingMuestra(true);
            }}>
              <img width="800" height="600" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&fm=webp&w=1200" alt="Clase Muestra" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                
                <div className="relative flex items-center justify-center mb-8">
                  <motion.div 
                    animate={{ scale: [1, 1.8, 2.5], opacity: [0.5, 0.2, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    className="absolute w-20 h-20 bg-ie-blue rounded-full"
                  />
                  <motion.div 
                    animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                    transition={{ duration: 2.5, delay: 0.8, repeat: Infinity, ease: "easeOut" }}
                    className="absolute w-20 h-20 bg-ie-blue rounded-full"
                  />
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/30 z-10 group-hover:bg-ie-blue transition-colors duration-500"
                  >
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
                  </motion.div>
                </div>

                <motion.h3 
                  className="text-white font-black text-3xl md:text-4xl uppercase tracking-widest drop-shadow-2xl mb-3"
                >
                  Ver Clase Muestra
                </motion.h3>
                <div className="bg-white/10 backdrop-blur border border-white/20 px-6 py-2 rounded-full">
                  <p className="text-white text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Haz clic para reproducir
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div> {/* END OF HOME VIEW */}

      {/* ARTICULOS VIEW */}
      <div className={currentView === 'articulos' ? 'block' : 'hidden'}>
        {!selectedArticleId ? (
          <>
            <div className="pt-24 pb-16 bg-[#f8f9fa] border-b border-gray-200">
              <div className="max-w-[1400px] mx-auto px-6 text-center">
                <span className="text-ie-blue font-bold tracking-[0.2em] uppercase mb-4 block">Actualidad Académica</span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-[#000c2e] uppercase tracking-tight mb-6">
                  Noticias y Artículos
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Explora nuestros análisis profundos, investigaciones y perspectivas sobre políticas públicas, gestión gubernamental y liderazgo en el sector público. Un espacio diseñado para enriquecer tu visión profesional y posicionarte a la vanguardia de la administración pública.
                </p>
              </div>
            </div>

            <section id="blog-content" className="py-20 bg-white min-h-screen">
              <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {blogArticlesData.filter(a => a.type === 'blog').map((article, idx) => (
                  <a href={`/articulo/${article.id}`} key={idx} onClick={(e) => openArticle(article.id!, e)} className="group cursor-pointer flex flex-col items-start bg-gray-50 border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="w-full h-48 overflow-hidden relative">
                      <img width="800" height="600" loading="lazy" decoding="async" src={article.image?.includes('unsplash') ? article.image.replace('&q=80', '&q=80&fm=webp') : article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-ie-blue text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        Actualidad
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow w-full">
                      <header>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
                          <span>{new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          <span>•</span>
                          <span>Lectura {article.readTime || '5 min'}</span>
                        </div>
                        <h3 className="text-gray-900 font-bold text-xl leading-snug mb-3 group-hover:text-ie-blue transition-colors">
                          {article.title}
                        </h3>
                      </header>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                        {article.description}
                      </p>
                      <footer className="mt-auto border-t border-gray-200 pt-4 w-full">
                        <span className="text-ie-blue font-bold text-sm uppercase tracking-wide group-hover:underline flex items-center gap-2">
                          Leer artículo <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </span>
                      </footer>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </section>
          </>
        ) : (
          <div className="min-h-screen bg-white">
            {blogArticlesData.filter(a => a.id === selectedArticleId).map(article => (
              <article key={article.id} className="pt-24 pb-20">
                <div className="max-w-4xl mx-auto px-6 mb-12">
                  <a 
                    href="/articulos"
                    onClick={openArticleList}
                    className="inline-flex items-center gap-2 text-ie-blue font-bold uppercase tracking-wider text-sm hover:text-[#000c2e] transition-colors mb-8"
                  >
                    <ArrowLeft className="w-4 h-4" /> Volver a Artículos
                  </a>
                  <div className="flex items-center gap-3 text-sm text-gray-500 font-medium mb-6">
                    <span className="bg-ie-blue/10 text-ie-blue px-3 py-1 rounded-full uppercase tracking-wider text-xs font-bold">Actualidad</span>
                    <span>•</span>
                    <span>{new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>•</span>
                    <span>Lectura {article.readTime || '5 min'}</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
                    {article.title}
                  </h1>
                </div>
                
                {article.image && (
                  <div className="w-full h-[400px] md:h-[500px] mb-12">
                    <img width="1200" height="800" fetchpriority="high" src={article.image?.includes('unsplash') ? article.image.replace('&q=80', '&q=80&fm=webp') : article.image} alt={article.title} className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="max-w-3xl mx-auto px-6">
                  {article.content ? (
                    <div className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-ie-blue hover:prose-a:text-[#000c2e] prose-img:rounded-xl">
                      <Suspense fallback={<div className="py-12 text-center text-gray-500 font-medium">Cargando contenido...</div>}>
                        <LazyMarkdown>{article.content}</LazyMarkdown>
                      </Suspense>
                    </div>
                  ) : (
                    <div className="text-center py-20 text-gray-500">
                      <p>Contenido del artículo en desarrollo.</p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div> {/* END OF ARTICULOS VIEW */}

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
              <li><a href="#" onClick={openArticleList} className="hover:text-white transition-colors">Artículos y Noticias</a></li>
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
              <li><a href="#" onClick={(e) => { e.preventDefault(); setIsVinculacionesModalOpen(true); }} className="hover:text-white transition-colors">Vinculaciones CPEM</a></li>
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

      {/* Video Modal (Clase Muestra) */}
      <AnimatePresence>
        {isPlayingMuestra && (
          <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-0 md:p-8">
            <button 
              onClick={() => {
                setIsPlayingMuestra(false);
                setIsVideoFormRequired(false);
              }}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-[210] p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full h-full md:max-w-6xl md:max-h-[80vh] bg-black md:rounded-2xl overflow-hidden relative"
            >
              <iframe 
                ref={iframeRef}
                className="w-full h-full absolute inset-0" 
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&enablejsapi=1`} 
                title="Clase Muestra"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
              
              {/* Overlay to block the top title which redirects to YouTube */}
              <div className="absolute top-0 left-0 w-full h-20 z-[190] bg-transparent pointer-events-auto"></div>
              {/* Overlay to block the YouTube logo on the bottom right */}
              <div className="absolute bottom-0 right-0 w-[140px] h-[70px] z-[190] bg-transparent pointer-events-auto"></div>

              <AnimatePresence>
                {isVideoFormRequired && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[220] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
                  >
                    <div className="bg-white/60 backdrop-blur-xl border border-white/20 p-8 rounded-2xl w-full max-w-md shadow-2xl text-gray-900">
                      <h3 className="text-2xl font-bold mb-2 tracking-tight">Continúa viendo la clase</h3>
                      <p className="text-gray-800 mb-6 text-sm font-medium">Completa estos datos para quitar este mensaje de la pantalla.</p>
                      
                      <form className="space-y-5" onSubmit={async (e) => {
                        e.preventDefault();
                        const target = e.target as typeof e.target & {
                          0: { value: string };
                          1: { value: string };
                          2: { value: string };
                        };
                        const name = target[0].value;
                        const email = target[1].value;
                        const phone = target[2].value;
                        
                        const success = await submitLead('Continúa viendo la clase', name, email, phone);
                        if (success) {
                          setIsVideoFormSubmitted(true);
                          setIsVideoFormRequired(false);
                        }
                      }}>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1.5">Nombre completo</label>
                          <input type="text" required className="w-full px-4 py-3 bg-white/50 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-ie-blue focus:border-transparent outline-none transition-all placeholder:text-gray-500" placeholder="Ej. Juan Pérez" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1.5">Correo electrónico</label>
                          <input type="email" required className="w-full px-4 py-3 bg-white/50 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-ie-blue focus:border-transparent outline-none transition-all placeholder:text-gray-500" placeholder="juan@correo.com" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1.5">Teléfono / Celular</label>
                          <input type="tel" required className="w-full px-4 py-3 bg-white/50 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-ie-blue focus:border-transparent outline-none transition-all placeholder:text-gray-500" placeholder="55 1234 5678" />
                        </div>
                        <button type="submit" className="w-full py-3.5 bg-ie-blue text-white rounded-xl font-bold hover:bg-ie-dark transition-colors uppercase tracking-wide text-sm mt-6">
                          Enviar y Continuar
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

                <form className="space-y-4" onSubmit={async (e) => { 
                  e.preventDefault(); 
                  const target = e.target as typeof e.target & {
                    0: { value: string };
                    1: { value: string };
                    2: { value: string };
                  };
                  const name = target[0].value;
                  const email = target[1].value;
                  const phone = target[2].value;
                  
                  const success = await submitLead('Inicia tu Proceso', name, email, phone);
                  if (success) {
                    setIsModalOpen(false); 
                  }
                }}>
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

                <form className="space-y-4" onSubmit={async (e) => { 
                  e.preventDefault(); 
                  const target = e.target as typeof e.target & {
                    0: { value: string };
                    1: { value: string };
                    2: { value: string };
                    3: { value: string };
                  };
                  const name = target[0].value;
                  const phone = target[1].value;
                  const dia = target[2].value;
                  const hora = target[3].value;
                  
                  const success = await submitLead('Agenda una cita', name, '', phone, `Día: ${dia} - Hora: ${hora}`);
                  if (success) {
                    setIsPhoneModalOpen(false); 
                  }
                }}>
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

      {/* Alianzas Corporativas Modal */}
      <AnimatePresence>
        {isAlianzasModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white max-w-[1150px] w-full rounded-[30px] shadow-[0_20px_60px_rgba(16,37,68,0.15)] relative overflow-hidden flex flex-col md:flex-row my-auto"
            >
              <button 
                onClick={() => setIsAlianzasModalOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-[#172033] z-50 bg-white/80 backdrop-blur border border-gray-200 md:border-transparent md:bg-transparent rounded-full p-2 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Column */}
              <div className="relative bg-gradient-to-br from-ie-blue to-ie-blue-dark p-10 md:p-[70px_60px] text-white overflow-hidden md:w-[55%] shrink-0">
                {/* Decorative circles */}
                <div className="absolute w-[500px] h-[500px] border border-white/10 rounded-full -right-[220px] -top-[180px] pointer-events-none"></div>
                
                <div className="flex items-center gap-3 mb-[60px] relative z-10">
                  <div>
                    <h4 className="text-[14px] font-semibold mb-1">Centro de Postgrados del Estado de México</h4>
                    <p className="text-[12px] opacity-75">Dirección de Vinculación Institucional</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/10 text-xs mb-7 relative z-10">
                  Convenios
                </div>

                <h2 className="font-serif text-4xl md:text-[52px] leading-[1.05] font-medium mb-6 tracking-tight relative z-10">
                  Fortalezcamos una alianza institucional
                </h2>

                <p className="text-[16px] leading-[1.8] opacity-90 max-w-[520px] relative z-10 font-light">
                  Más de 25 años formando líderes en México. La Dirección de Vinculación Institucional del CPEM le presentará nuestras oportunidades de colaboración académica, capacitación y convenios estratégicos para hospitales, clínicas y organizaciones del sector salud.
                </p>

                <div className="mt-12 grid gap-5 relative z-10">
                  <div className="flex gap-3.5 items-start">
                    <div className="min-w-[34px] w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center text-sm">✓</div>
                    <div>
                      <strong className="block text-[15px] mb-1 font-semibold">Atención personalizada</strong>
                      <span className="text-[13px] opacity-75 leading-relaxed block font-light">Seguimiento institucional por parte de nuestro equipo de vinculación académica.</span>
                    </div>
                  </div>
                  <div className="flex gap-3.5 items-start">
                    <div className="min-w-[34px] w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center text-sm">✓</div>
                    <div>
                      <strong className="block text-[15px] mb-1 font-semibold">Convenios académicos</strong>
                      <span className="text-[13px] opacity-75 leading-relaxed block font-light">Propuestas de capacitación, beneficios institucionales y programas de posgrado.</span>
                    </div>
                  </div>
                  <div className="flex gap-3.5 items-start">
                    <div className="min-w-[34px] w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center text-sm">✓</div>
                    <div>
                      <strong className="block text-[15px] mb-1 font-semibold">Información confidencial</strong>
                      <span className="text-[13px] opacity-75 leading-relaxed block font-light">Todos los datos compartidos son tratados de manera segura y profesional.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="p-8 md:p-[60px_50px] bg-white w-full">
                <div className="mb-8">
                  <h3 className="font-serif text-[32px] font-medium mb-3 tracking-tight text-gray-900">Agendar reunión institucional</h3>
                  <p className="text-[15px] leading-relaxed text-gray-600">
                    Seleccione el medio de atención que mejor se adapte a su agenda.
                  </p>
                </div>

                <div className="grid gap-3.5 mb-7">
                  {/* Option 1 */}
                  <label className="border-2 border-ie-blue bg-blue-50 rounded-2xl p-5 cursor-pointer flex flex-col transition-all hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(0,24,90,0.08)]">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="block text-[15px] font-semibold text-gray-900">WhatsApp institucional</strong>
                      <input type="radio" name="reunion_tipo" defaultChecked className="w-4 h-4 text-ie-blue focus:ring-ie-blue border-gray-300" />
                    </div>
                    <span className="text-[13px] leading-relaxed text-gray-600">Primer acercamiento rápido y personalizado con la Dirección de Vinculación.</span>
                  </label>
                  
                  {/* Option 2 */}
                  <label className="border border-gray-200 rounded-2xl p-5 cursor-pointer flex flex-col transition-all hover:-translate-y-0.5 hover:border-ie-blue hover:shadow-[0_10px_30px_rgba(0,24,90,0.08)]">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="block text-[15px] font-semibold text-gray-900">Llamada ejecutiva · 15 minutos</strong>
                      <input type="radio" name="reunion_tipo" className="w-4 h-4 text-ie-blue focus:ring-ie-blue border-gray-300" />
                    </div>
                    <span className="text-[13px] leading-relaxed text-gray-600">Ideal para conocer oportunidades de colaboración y resolver dudas iniciales.</span>
                  </label>

                  {/* Option 3 */}
                  <label className="border border-gray-200 rounded-2xl p-5 cursor-pointer flex flex-col transition-all hover:-translate-y-0.5 hover:border-ie-blue hover:shadow-[0_10px_30px_rgba(0,24,90,0.08)]">
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="block text-[15px] font-semibold text-gray-900">Sesión virtual por Zoom · 20 a 30 minutos</strong>
                      <input type="radio" name="reunion_tipo" className="w-4 h-4 text-ie-blue focus:ring-ie-blue border-gray-300" />
                    </div>
                    <span className="text-[13px] leading-relaxed text-gray-600">Presentación institucional completa sobre convenios, beneficios y alianzas estratégicas.</span>
                  </label>
                </div>

                <div className="grid gap-4">
                  <input type="text" placeholder="Nombre completo" className="w-full p-[16px_18px] rounded-2xl border border-gray-200 text-[14px] bg-gray-50 focus:outline-none focus:border-ie-blue focus:ring-4 focus:ring-ie-blue/10 focus:bg-white transition-all text-gray-900" />
                  <input type="text" placeholder="Cargo institucional" className="w-full p-[16px_18px] rounded-2xl border border-gray-200 text-[14px] bg-gray-50 focus:outline-none focus:border-ie-blue focus:ring-4 focus:ring-ie-blue/10 focus:bg-white transition-all text-gray-900" />
                  <input type="text" placeholder="Hospital o institución" className="w-full p-[16px_18px] rounded-2xl border border-gray-200 text-[14px] bg-gray-50 focus:outline-none focus:border-ie-blue focus:ring-4 focus:ring-ie-blue/10 focus:bg-white transition-all text-gray-900" />
                  <input type="email" placeholder="Correo institucional" className="w-full p-[16px_18px] rounded-2xl border border-gray-200 text-[14px] bg-gray-50 focus:outline-none focus:border-ie-blue focus:ring-4 focus:ring-ie-blue/10 focus:bg-white transition-all text-gray-900" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="tel" placeholder="WhatsApp o teléfono" className="w-full p-[16px_18px] rounded-2xl border border-gray-200 text-[14px] bg-gray-50 focus:outline-none focus:border-ie-blue focus:ring-4 focus:ring-ie-blue/10 focus:bg-white transition-all text-gray-900" />
                    <select className="w-full p-[16px_18px] rounded-2xl border border-gray-200 text-[14px] bg-gray-50 focus:outline-none focus:border-ie-blue focus:ring-4 focus:ring-ie-blue/10 focus:bg-white transition-all text-gray-900 cursor-pointer">
                      <option>Seleccione un horario</option>
                      <option>09:00 – 10:00</option>
                      <option>10:00 – 11:00</option>
                      <option>11:00 – 12:00</option>
                      <option>12:00 – 13:00</option>
                    </select>
                  </div>

                  <button className="w-full mt-2 p-[18px] rounded-2xl bg-gradient-to-br from-ie-blue-light to-ie-blue text-white font-semibold text-[14px] tracking-wide hover:-translate-y-0.5 hover:shadow-[0_15px_30px_rgba(0,24,90,0.18)] transition-all uppercase">
                    Agendar reunión institucional
                  </button>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-200 grid gap-2.5">
                  <div className="text-[13px] text-gray-600 flex items-center gap-2">
                    <span className="text-ie-blue font-bold">✔</span> Más de 5,000 egresados en México
                  </div>
                  <div className="text-[13px] text-gray-600 flex items-center gap-2">
                    <span className="text-ie-blue font-bold">✔</span> Institución con validez oficial SEP
                  </div>
                  <div className="text-[13px] text-gray-600 flex items-center gap-2">
                    <span className="text-ie-blue font-bold">✔</span> Respuesta institucional en menos de 24 horas
                  </div>
                </div>

                <div className="mt-4 text-[12px] text-gray-400 leading-relaxed">
                  Centro de Postgrados del Estado de México · Dirección de Vinculación Institucional
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPdfModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 px-6 md:px-0 bg-black/60 backdrop-blur-sm pt-20">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative"
            >
              <button 
                onClick={() => {
                  setIsPdfModalOpen(false);
                  setIsPdfFormSubmitted(false);
                }}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-10 text-center">
                {!isPdfFormSubmitted ? (
                  <>
                    <h3 className="font-serif text-2xl font-bold mb-3 text-gray-900 border-b border-gray-100 pb-4">
                      Descargar Folleto
                    </h3>
                    <p className="text-[14px] text-gray-600 mb-8">
                      Completa tus datos para recibir el folleto informativo de la Maestría en Administración Pública en tu correo electrónico.
                    </p>

                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      const target = e.target as typeof e.target & {
                        0: { value: string };
                        1: { value: string };
                      };
                      const name = target[0].value;
                      const email = target[1].value;

                      setIsPdfSubmitting(true);
                      try {
                        const success = await submitLead('Descargar Folleto', name, email, '');
                        
                        // Siempre permitimos descargar el folleto para no bloquear al usuario final
                        setIsPdfFormSubmitted(true);
                      } catch (err: any) {
                        console.error("Error al procesar el formulario:", err);
                      } finally {
                        setIsPdfSubmitting(false);
                      }
                    }} className="flex flex-col gap-4">
                      <input 
                        type="text" 
                        required 
                        disabled={isPdfSubmitting}
                        placeholder="Nombre completo" 
                        className="w-full p-[14px_16px] rounded-xl border border-gray-200 text-[14px] bg-gray-50 focus:outline-none focus:border-ie-blue focus:ring-2 focus:ring-ie-blue/20 transition-all disabled:opacity-50"
                      />
                      <input 
                        type="email" 
                        required 
                        disabled={isPdfSubmitting}
                        placeholder="Correo electrónico" 
                        className="w-full p-[14px_16px] rounded-xl border border-gray-200 text-[14px] bg-gray-50 focus:outline-none focus:border-ie-blue focus:ring-2 focus:ring-ie-blue/20 transition-all disabled:opacity-50"
                      />
                      <button 
                        type="submit" 
                        disabled={isPdfSubmitting}
                        className="w-full mt-2 p-[16px] rounded-xl bg-ie-blue text-white font-bold tracking-wide hover:bg-ie-blue-dark transition-all uppercase text-[13px] shadow-lg shadow-ie-blue/20 disabled:opacity-50"
                      >
                        {isPdfSubmitting ? 'Procesando...' : 'Enviar y Descargar'}
                      </button>
                    </form>
                    <p className="text-[11px] text-gray-400 mt-5">
                      Tus datos están protegidos y no serán compartidos con terceros. Al hacer clic, autorizas el registro en nuestra base vía Google Sheets con tu cuenta actual.
                    </p>
                  </>
                ) : (
                  <div className="py-8">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-3 text-gray-900 border-b border-gray-100 pb-4">
                      ¡Registro Exitoso!
                    </h3>
                    <p className="text-[14px] text-gray-600 mb-6">
                      Tus datos han sido registrados. Haz clic en el botón de abajo para descargar tu folleto.
                    </p>
                    <a 
                      href="/Cpem.Maestri%CC%81a%20en%20Administracio%CC%81n%20Pu%CC%81blica.pdf"
                      download="Cpem.Maestría en Administración Pública.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex justify-center items-center gap-2 p-[14px] mb-3 rounded-xl bg-[#00173f] text-white font-bold hover:bg-[#00287a] transition-colors uppercase text-[12px]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                      Descargar Folleto Ahora
                    </a>
                    <button 
                      onClick={() => {
                        setIsPdfModalOpen(false);
                        setIsPdfFormSubmitted(false);
                      }}
                      className="w-full p-[14px] rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors uppercase text-[12px]"
                    >
                      Cerrar
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <VinculacionesModal isOpen={isVinculacionesModalOpen} onClose={() => setIsVinculacionesModalOpen(false)} />
    </div>
  );
}

