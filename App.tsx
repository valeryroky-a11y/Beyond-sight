import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Coach {
  id: number;
  name: string;
  title: string;
  specialty: string;
  certifications: string;
  bio: string;
  image: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const COACHES: Coach[] = [
  {
    id: 1,
    name: "Valentina Ramos",
    title: "Coach Certificada de Pilates",
    specialty: "Especialista en movimiento inclusivo y terapéutico",
    certifications: "BASI Pilates · Beyond Sight Certified · Adaptive Movement",
    bio: "Valentina lleva más de 8 años trabajando en Pilates terapéutico. Su pasión por la enseñanza accesible la llevó a especializarse en técnicas de guía verbal y orientación espacial para personas con discapacidad visual. Ha formado a más de 200 coaches en toda América Latina.",
    image:
      "https://images.unsplash.com/photo-1747239069226-55382c570116?w=600&h=700&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Yasmin Torres",
    title: "Instructora de Pilates y Movimiento",
    specialty: "Comunicación corporal y enseñanza sensorial",
    certifications: "STOTT Pilates · Inclusive Wellness · Beyond Sight Certified",
    bio: "Yasmin es pionera en el desarrollo de metodologías de Pilates basadas en instrucción verbal y conciencia corporal. Colabora con centros de rehabilitación visual y trabaja directamente con comunidades de personas con discapacidad visual para validar y mejorar continuamente los protocolos de enseñanza.",
    image:
      "https://images.unsplash.com/photo-1747238415033-b74eec07eb59?w=600&h=700&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Lucía Medina",
    title: "Especialista en Pilates Adaptado",
    specialty: "Accesibilidad en el movimiento y bienestar integral",
    certifications: "POLESTAR Pilates · Adaptive Movement Cert. · Beyond Sight",
    bio: "Lucía combina su formación en Pilates con estudios en psicología del deporte y accesibilidad universal. Su enfoque humanista la ha convertido en una referente en la creación de espacios de movimiento donde todas las personas se sienten capaces e incluidas.",
    image:
      "https://images.unsplash.com/photo-1747239202356-764770773c9a?w=600&h=700&fit=crop&auto=format",
  },
];

const FAQS: FaqItem[] = [
  {
    question: "¿Qué es Beyond Sight Certification?",
    answer:
      "Beyond Sight Certification es un programa especializado que prepara a coaches de Pilates para enseñar de manera segura, accesible y respetuosa a personas ciegas o con distintos niveles de discapacidad visual. Está creado por T & Y Studio con el propósito de ampliar la enseñanza del Pilates hacia prácticas verdaderamente inclusivas.",
  },
  {
    question: "¿Quién puede tomar la certificación?",
    answer:
      "La certificación está dirigida a coaches de Pilates certificados, instructores de movimiento, profesionales del wellness y personas con experiencia en movimiento adaptado que deseen incorporar prácticas inclusivas a su enseñanza.",
  },
  {
    question: "¿Necesito experiencia previa en Pilates?",
    answer:
      "Sí, se recomienda contar con al menos una certificación de Pilates reconocida y experiencia práctica enseñando. El programa está diseñado para coaches que ya conocen los fundamentos del Pilates y quieren especializarse en enseñanza inclusiva.",
  },
  {
    question: "¿Qué incluye la certificación?",
    answer:
      "El programa incluye 6 módulos completos con contenido teórico y práctico, recursos de apoyo, sesiones de práctica guiada, evaluaciones progresivas y tu certificación Beyond Sight al completar el programa exitosamente.",
  },
  {
    question: "¿Cuánto dura el programa?",
    answer:
      "El programa tiene una duración aproximada de 8 semanas. Está diseñado para que puedas avanzar a tu propio ritmo sin dejar de mantener una práctica consistente y un aprendizaje profundo.",
  },
  {
    question: "¿La certificación es presencial o en línea?",
    answer:
      "Beyond Sight Certification se ofrece en formato mixto: contenido teórico en línea y sesiones prácticas que pueden realizarse de forma presencial o virtual según tu ubicación y disponibilidad.",
  },
  {
    question: "¿Cómo se adaptan los ejercicios?",
    answer:
      "Los ejercicios se adaptan reemplazando o complementando las instrucciones visuales con guía verbal precisa, orientación espacial, referencias corporales, descripciones de sensación y ritmo. El programa enseña exactamente cómo hacer estas adaptaciones de forma efectiva y respetuosa.",
  },
  {
    question: "¿Qué significa Pilates inclusivo?",
    answer:
      "Pilates inclusivo significa diseñar y facilitar experiencias de movimiento que sean accesibles para todas las personas, independientemente de sus capacidades visuales. Va más allá de la adaptación: es una filosofía de enseñanza centrada en la persona, la confianza y la autonomía.",
  },
  {
    question: "¿Cómo se evalúa a los coaches?",
    answer:
      "La evaluación es continua y combina ejercicios prácticos, demostraciones de enseñanza y reflexiones escritas. Al final del programa, los coaches completan una demostración de clase inclusiva que es revisada por nuestro equipo de especialistas.",
  },
];

// ─── Intersection Observer Hook ────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Wave SVG ─────────────────────────────────────────────────────────────────
function WaveDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 200"
      className={`w-full ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M0,80 C200,140 400,20 600,90 C700,125 750,60 800,80 L800,200 L0,200 Z"
        fill="currentColor"
        opacity="0.12"
        className="animate-wave"
      />
      <path
        d="M0,120 C150,60 350,160 550,100 C680,60 740,140 800,110 L800,200 L0,200 Z"
        fill="currentColor"
        opacity="0.08"
        className="animate-wave-slow"
      />
    </svg>
  );
}

function CircleDecor({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-full border border-sky-200/60 ${className}`}
    />
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "La certificación", href: "#certificacion" },
    { label: "Coaches", href: "#coaches" },
    { label: "Accesibilidad", href: "#accesibilidad" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm shadow-sky-100/50"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#inicio"
            className="text-sm font-semibold tracking-[0.2em] text-navy-700 hover:text-sky-500 transition-colors"
            style={{ color: "#1e3a5f", fontFamily: "Inter, sans-serif" }}
          >
            T & Y STUDIO
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-sky-500"
                style={{ color: "#4a6fa5" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#certificacion"
              className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 hover:bg-sky-50"
              style={{ color: "#4a6fa5" }}
            >
              Conoce la certificación →
            </a>
            <a
              href="#cta"
              className="text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-90 hover:shadow-md"
              style={{
                background: "linear-gradient(135deg, #4a6fa5, #2589d6)",
                color: "white",
              }}
            >
              Certifícate →
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            style={{ color: "#1e3a5f" }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden bg-white/98 border-t border-sky-100 py-4"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-sky-50 transition-colors"
                  style={{ color: "#4a6fa5" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-3 border-t border-sky-100 mt-2">
                <a
                  href="#certificacion"
                  className="text-center text-sm font-medium py-3 rounded-full border border-sky-200 hover:bg-sky-50 transition-colors"
                  style={{ color: "#4a6fa5" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Conoce la certificación →
                </a>
                <a
                  href="#cta"
                  className="text-center text-sm font-semibold py-3 rounded-full transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #4a6fa5, #2589d6)",
                    color: "white",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  Certifícate →
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "linear-gradient(160deg, #fafcff 0%, #e8f4fd 50%, #ddeef8 100%)" }}
      aria-label="Sección principal"
    >
      {/* Decorative circles */}
      <CircleDecor className="absolute -top-32 -right-32 w-[600px] h-[600px] opacity-40" />
      <CircleDecor className="absolute top-20 -right-16 w-[400px] h-[400px] opacity-30" />
      <CircleDecor className="absolute -bottom-20 -left-20 w-[350px] h-[350px] opacity-30" />
      <CircleDecor className="absolute bottom-40 left-10 w-[200px] h-[200px] opacity-20" />

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 text-sky-200">
        <WaveDecoration />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="animate-float-in">
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-6"
              style={{ color: "#4a6fa5" }}
            >
              T & Y Studio presenta
            </p>
            <h1
              className="font-serif leading-none mb-4"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(3.5rem, 9vw, 7rem)",
                color: "#1e3a5f",
                letterSpacing: "-0.01em",
              }}
            >
              BEYOND
              <br />
              <span
                className="italic"
                style={{ color: "#2589d6" }}
              >
                SIGHT
              </span>
            </h1>

            <p
              className="text-base font-medium tracking-widest uppercase mb-8"
              style={{ color: "#4a6fa5" }}
            >
              Certificación de Pilates Inclusivo
            </p>

            <p
              className="text-xl font-serif italic mb-6 leading-relaxed"
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: "#2589d6",
                fontSize: "1.3rem",
              }}
            >
              "El movimiento va más allá de lo que vemos."
            </p>

            <p
              className="text-base leading-relaxed mb-10 max-w-lg"
              style={{ color: "#4a6fa5" }}
            >
              Una certificación diseñada para preparar coaches capaces de crear
              experiencias de Pilates seguras, accesibles y respetuosas para
              personas ciegas o con discapacidad visual.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#que-es"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-sky-200/50 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #4a6fa5, #2589d6)",
                  color: "white",
                }}
              >
                Conoce Beyond Sight →
              </a>
              <a
                href="#coaches"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:bg-sky-50 hover:-translate-y-0.5"
                style={{ borderColor: "#b3d8f8", color: "#4a6fa5", background: "white" }}
              >
                Conoce a nuestros coaches
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="relative z-10">
              {/* Floating card */}
              <div
                className="absolute -top-6 -left-6 z-20 px-5 py-4 rounded-2xl shadow-lg shadow-sky-200/40"
                style={{ background: "white", color: "#1e3a5f" }}
              >
                <p className="text-xs font-medium tracking-wide uppercase" style={{ color: "#4a6fa5" }}>
                  Certificación
                </p>
                <p className="text-sm font-semibold mt-0.5">Pilates Inclusivo</p>
              </div>

              {/* Floating card 2 */}
              <div
                className="absolute -bottom-4 -right-4 z-20 px-5 py-4 rounded-2xl shadow-lg shadow-sky-200/40"
                style={{ background: "white" }}
              >
                <p className="text-xs font-medium tracking-wide" style={{ color: "#4a6fa5" }}>
                  Modalidad
                </p>
                <p className="text-sm font-semibold mt-0.5" style={{ color: "#1e3a5f" }}>
                  Mixta · 8 semanas
                </p>
              </div>

              {/* Main image */}
              <div
                className="overflow-hidden rounded-3xl shadow-2xl shadow-sky-200/40"
                style={{ aspectRatio: "3/4", maxHeight: "560px" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1747239069226-55382c570116?w=800&h=1066&fit=crop&auto=format"
                  alt="Coach de Pilates guiando un ejercicio en estudio, demostrando movimiento con confianza y precisión"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.95) saturate(0.9)" }}
                  loading="eager"
                />
              </div>
            </div>

            {/* Decorative blur orbs */}
            <div
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl"
              style={{ background: "rgba(179, 216, 248, 0.4)" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── What Is Beyond Sight ─────────────────────────────────────────────────────
function WhatIs() {
  const { ref, inView } = useInView();

  const cards = [
    {
      num: "01",
      title: "ADAPTAR",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      desc: "Adaptar ejercicios según las necesidades visuales y capacidades de cada persona.",
    },
    {
      num: "02",
      title: "GUIAR",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      desc: "Aprender a utilizar instrucciones verbales claras, precisas y fáciles de seguir.",
    },
    {
      num: "03",
      title: "CONECTAR",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      desc: "Construir confianza mediante una comunicación respetuosa y consciente.",
    },
    {
      num: "04",
      title: "MOVER",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      desc: "Experimentar Pilates a través de la conciencia corporal y el movimiento.",
    },
  ];

  return (
    <section
      id="que-es"
      className="py-28 lg:py-36"
      style={{ background: "white" }}
      aria-labelledby="que-es-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#4a6fa5" }}>
              ¿Qué es Beyond Sight?
            </p>
            <h2
              className="font-serif leading-tight mb-6"
              id="que-es-title"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1e3a5f",
              }}
            >
              El movimiento no tiene una sola forma de experimentarse.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "#4a6fa5" }}>
              Beyond Sight Certification es un programa especializado que prepara a coaches de
              Pilates para adaptar sus métodos de enseñanza, comunicación y movimiento a personas
              ciegas o con distintos niveles de discapacidad visual.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card, i) => (
              <div
                key={card.num}
                className="group p-7 rounded-2xl border cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-100/60"
                style={{
                  background: i % 2 === 0 ? "#f0f7ff" : "white",
                  borderColor: "#ddeef8",
                  transitionDelay: `${i * 80}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s, box-shadow 0.3s, background 0.3s`,
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-xs font-semibold tracking-widest"
                    style={{ color: "#7ebef0" }}
                  >
                    {card.num}
                  </span>
                  <span
                    className="p-2 rounded-xl transition-colors group-hover:bg-sky-100"
                    style={{ color: "#4a6fa5", background: "#e8f4fd" }}
                  >
                    {card.icon}
                  </span>
                </div>
                <h3
                  className="font-semibold tracking-widest text-sm mb-3"
                  style={{ color: "#1e3a5f" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6fa5" }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Interactive Experience ───────────────────────────────────────────────────
function InteractiveExperience() {
  const [mode, setMode] = useState<"visual" | "verbal">("visual");
  const { ref, inView } = useInView();

  const exercises = [
    {
      name: "El Cien (The Hundred)",
      visual: {
        label: "Instrucción Visual",
        content: [
          "Observa la posición inicial: acostado boca arriba, piernas elevadas a 45°.",
          "Mira cómo los brazos se extienden paralelos al suelo.",
          "Imita el movimiento de bombeo de brazos que ves demostrar al coach.",
          "Observa la postura de la columna: neutra, sin arquear la espalda.",
          "Mira el ritmo visual de los movimientos para sincronizar tu respiración.",
        ],
        image: "https://images.unsplash.com/photo-1747239685045-fcbcf98985db?w=600&h=400&fit=crop&auto=format",
      },
      verbal: {
        label: "Instrucción Verbal",
        content: [
          "Acuéstate boca arriba. Siente el peso de tu espalda contra la colchoneta, vértebra por vértebra.",
          "Eleva ambas piernas hasta que formen un ángulo de 45° con el suelo. Imagina que tus pies apuntan hacia el techo en diagonal.",
          "Extiende los brazos a los lados de tu cuerpo, paralelos al suelo. Siente el largo de tus brazos alejándose de tus hombros.",
          "Inhala contando cinco tiempos mientras bombeas los brazos suavemente — arriba, abajo, arriba, abajo, arriba. Exhala otros cinco tiempos con el mismo ritmo.",
          "Mantén el abdomen hacia adentro y arriba durante todo el ejercicio. Siente cómo tu centro se activa con cada respiración.",
        ],
        image: null,
      },
    },
  ];

  const ex = exercises[0];
  const current = mode === "visual" ? ex.visual : ex.verbal;

  return (
    <section
      className="py-28 lg:py-36 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f0f7ff 0%, #e8f4fd 100%)" }}
      aria-labelledby="experience-title"
    >
      <CircleDecor className="absolute -top-20 -right-20 w-80 h-80 opacity-30" />
      <CircleDecor className="absolute -bottom-10 -left-10 w-64 h-64 opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#4a6fa5" }}>
              Experiencia Interactiva
            </p>
            <h2
              id="experience-title"
              className="font-serif leading-tight"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1e3a5f",
              }}
            >
              Experimenta el movimiento de otra manera.
            </h2>
          </div>

          <div
            className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl shadow-sky-200/30"
            style={{ background: "white" }}
          >
            {/* Toggle */}
            <div className="flex" role="group" aria-label="Selecciona tipo de instrucción">
              <button
                onClick={() => setMode("visual")}
                className="flex-1 py-5 text-sm font-semibold tracking-wider uppercase transition-all duration-300"
                aria-pressed={mode === "visual"}
                style={{
                  background: mode === "visual" ? "linear-gradient(135deg, #4a6fa5, #2589d6)" : "#f0f7ff",
                  color: mode === "visual" ? "white" : "#4a6fa5",
                  borderBottom: mode === "visual" ? "none" : "2px solid #ddeef8",
                }}
              >
                Instrucción Visual
              </button>
              <button
                onClick={() => setMode("verbal")}
                className="flex-1 py-5 text-sm font-semibold tracking-wider uppercase transition-all duration-300"
                aria-pressed={mode === "verbal"}
                style={{
                  background: mode === "verbal" ? "linear-gradient(135deg, #4a6fa5, #2589d6)" : "#f0f7ff",
                  color: mode === "verbal" ? "white" : "#4a6fa5",
                  borderBottom: mode === "verbal" ? "none" : "2px solid #ddeef8",
                }}
              >
                Instrucción Verbal
              </button>
            </div>

            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full"
                  style={{ background: "#e8f4fd", color: "#4a6fa5" }}
                >
                  {ex.name}
                </span>
                <span
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{ background: mode === "visual" ? "#ddeef8" : "#e8f8f4", color: mode === "visual" ? "#2589d6" : "#2a8a7a" }}
                >
                  {current.label}
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div>
                  <ol className="space-y-4" aria-label={`Instrucciones de ${current.label}`}>
                    {current.content.map((step, i) => (
                      <li
                        key={i}
                        className="flex gap-4 items-start transition-all duration-300"
                        style={{
                          opacity: inView ? 1 : 0,
                          transitionDelay: `${i * 100}ms`,
                        }}
                      >
                        <span
                          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5"
                          style={{
                            background: mode === "visual" ? "#e8f4fd" : "#e8f8f4",
                            color: mode === "visual" ? "#2589d6" : "#2a8a7a",
                          }}
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: "#4a6fa5" }}>
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  {mode === "visual" && ex.visual.image ? (
                    <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                      <img
                        src={ex.visual.image}
                        alt="Demostración visual del ejercicio El Cien de Pilates"
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.95) saturate(0.9)" }}
                      />
                    </div>
                  ) : (
                    <div
                      className="rounded-2xl p-8 h-full flex flex-col justify-center min-h-48"
                      style={{ background: "#f0f7ff", border: "2px dashed #b3d8f8" }}
                    >
                      <div className="text-center">
                        <div
                          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                          style={{ background: "#e8f4fd" }}
                          aria-hidden="true"
                        >
                          <svg className="w-8 h-8" fill="none" stroke="#4a6fa5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                        </div>
                        <p
                          className="text-sm font-medium mb-2"
                          style={{ color: "#1e3a5f" }}
                        >
                          El sonido guía el movimiento
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: "#7ebef0" }}>
                          En la instrucción verbal, la voz del coach reemplaza a la demostración visual. Las palabras crean la imagen corporal.
                        </p>
                      </div>
                    </div>
                  )}

                  <div
                    className="mt-4 p-4 rounded-xl text-sm leading-relaxed"
                    style={{
                      background: mode === "visual" ? "#e8f4fd" : "#e8f8f4",
                      color: mode === "visual" ? "#2589d6" : "#2a8a7a",
                    }}
                  >
                    <strong>
                      {mode === "visual"
                        ? "Enfoque visual:"
                        : "Enfoque verbal:"}
                    </strong>{" "}
                    {mode === "visual"
                      ? "La enseñanza depende de observar y replicar lo que se ve."
                      : "La enseñanza usa la voz, la respiración y la sensación corporal como guía."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Modules ──────────────────────────────────────────────────────────────────
function Modules() {
  const { ref, inView } = useInView();

  const modules = [
    {
      num: "01",
      title: "Comprender la discapacidad visual",
      desc: "Conocer diferentes experiencias y necesidades relacionadas con la discapacidad visual.",
    },
    {
      num: "02",
      title: "Principios del Pilates inclusivo",
      desc: "Comprender cómo adaptar la enseñanza para crear experiencias accesibles.",
    },
    {
      num: "03",
      title: "Adaptación de ejercicios",
      desc: "Aprender a modificar ejercicios y métodos de enseñanza según cada persona.",
    },
    {
      num: "04",
      title: "Comunicación y guía verbal",
      desc: "Desarrollar instrucciones claras, precisas y fáciles de seguir.",
    },
    {
      num: "05",
      title: "Seguridad y orientación espacial",
      desc: "Aprender estrategias para crear espacios seguros y predecibles.",
    },
    {
      num: "06",
      title: "Práctica como coach inclusivo",
      desc: "Aplicar lo aprendido mediante situaciones prácticas.",
    },
  ];

  return (
    <section
      id="certificacion"
      className="py-28 lg:py-36"
      style={{ background: "white" }}
      aria-labelledby="modules-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#4a6fa5" }}>
                El programa
              </p>
              <h2
                id="modules-title"
                className="font-serif leading-tight mb-6"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#1e3a5f",
                }}
              >
                Una certificación creada para el Pilates inclusivo.
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#4a6fa5" }}>
                Seis módulos diseñados para brindarte las herramientas teóricas y prácticas que
                necesitas para enseñar de manera accesible y respetuosa.
              </p>
              <a
                href="#cta"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-sky-200/50 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #4a6fa5, #2589d6)",
                  color: "white",
                }}
              >
                Conocer el programa completo →
              </a>

              {/* Image below */}
              <div
                className="mt-10 rounded-2xl overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1747240549807-fc3962949818?w=800&h=450&fit=crop&auto=format"
                  alt="Sesión de Pilates en estudio con equipamiento profesional"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.93) saturate(0.85)" }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {modules.map((mod, i) => (
                <div
                  key={mod.num}
                  className="group flex gap-5 p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:shadow-sky-100/50 hover:-translate-y-0.5 cursor-default"
                  style={{
                    borderColor: "#ddeef8",
                    background: "white",
                    opacity: inView ? 1 : 0,
                    transitionDelay: `${i * 80}ms`,
                    transition: `opacity 0.5s ${i * 0.08}s, transform 0.3s, box-shadow 0.3s`,
                  }}
                >
                  <span
                    className="flex-shrink-0 text-xs font-semibold tracking-widest mt-1"
                    style={{ color: "#b3d8f8" }}
                  >
                    {mod.num}
                  </span>
                  <div>
                    <h3
                      className="font-semibold mb-1.5 text-sm transition-colors group-hover:text-sky-600"
                      style={{ color: "#1e3a5f" }}
                    >
                      {mod.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#4a6fa5" }}>
                      {mod.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── For Whom ─────────────────────────────────────────────────────────────────
function ForWhom() {
  const { ref, inView } = useInView();

  const cards = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "Coaches de Pilates",
      desc: "Para instructores que buscan incorporar prácticas inclusivas a sus clases.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Estudios de Pilates",
      desc: "Para estudios que quieren crear espacios más accesibles.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
      title: "Profesionales del Movimiento",
      desc: "Para personas interesadas en accesibilidad, movimiento adaptado y wellness inclusivo.",
    },
  ];

  return (
    <section
      className="py-28 lg:py-36 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f0f7ff 0%, white 100%)" }}
      aria-labelledby="for-whom-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#4a6fa5" }}>
              ¿Para quién es?
            </p>
            <h2
              id="for-whom-title"
              className="font-serif"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1e3a5f",
              }}
            >
              Creada para quienes quieren ampliar la forma de enseñar.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className="text-center p-10 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-100/60 cursor-default"
                style={{
                  borderColor: "#ddeef8",
                  background: "white",
                  opacity: inView ? 1 : 0,
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ background: "#e8f4fd", color: "#4a6fa5" }}
                >
                  {card.icon}
                </div>
                <h3
                  className="font-semibold mb-3"
                  style={{ color: "#1e3a5f", fontSize: "1rem" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4a6fa5" }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Coaches ──────────────────────────────────────────────────────────────────
function Coaches() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const { ref, inView } = useInView();

  return (
    <section
      id="coaches"
      className="py-28 lg:py-36"
      style={{ background: "white" }}
      aria-labelledby="coaches-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#4a6fa5" }}>
              Nuestro equipo
            </p>
            <h2
              id="coaches-title"
              className="font-serif"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1e3a5f",
              }}
            >
              Conoce a quienes hacen posible Beyond Sight.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {COACHES.map((coach, i) => (
              <div
                key={coach.id}
                className="group cursor-pointer"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s`,
                }}
              >
                <div className="overflow-hidden rounded-2xl mb-5" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={coach.image}
                    alt={`Fotografía de ${coach.name}, ${coach.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "brightness(0.93) saturate(0.85)" }}
                  />
                </div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#7ebef0" }}>
                  {coach.certifications.split(" · ")[0]}
                </p>
                <h3 className="font-semibold text-lg mb-0.5" style={{ color: "#1e3a5f" }}>
                  {coach.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: "#4a6fa5" }}>
                  {coach.specialty}
                </p>
                <button
                  onClick={() => setSelectedCoach(coach)}
                  className="text-sm font-medium transition-all duration-200 hover:gap-2 flex items-center gap-1.5 group/btn"
                  style={{ color: "#2589d6" }}
                  aria-label={`Conocer perfil de ${coach.name}`}
                >
                  Conocer perfil
                  <span className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coach Modal */}
      {selectedCoach && (
        <CoachModal coach={selectedCoach} onClose={() => setSelectedCoach(null)} />
      )}
    </section>
  );
}

function CoachModal({ coach, onClose }: { coach: Coach; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Perfil de ${coach.name}`}
    >
      <div
        className="absolute inset-0 bg-navy-800/40 backdrop-blur-sm"
        style={{ background: "rgba(22, 45, 74, 0.5)" }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-float-in"
        style={{ background: "white" }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-sky-50"
          style={{ color: "#4a6fa5", background: "white" }}
          aria-label="Cerrar perfil"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid sm:grid-cols-2">
          <div style={{ aspectRatio: "3/4" }} className="max-h-96 sm:max-h-full">
            <img
              src={coach.image}
              alt={`Fotografía de ${coach.name}`}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.93) saturate(0.85)" }}
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#7ebef0" }}>
              Coach
            </p>
            <h2
              className="font-serif text-2xl mb-1"
              style={{ fontFamily: "'DM Serif Display', serif", color: "#1e3a5f" }}
            >
              {coach.name}
            </h2>
            <p className="text-sm mb-4" style={{ color: "#4a6fa5" }}>
              {coach.title}
            </p>
            <div
              className="h-px mb-5"
              style={{ background: "#ddeef8" }}
              role="separator"
            />
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#4a6fa5" }}>
              {coach.bio}
            </p>
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: "#b3d8f8" }}>
                Certificaciones
              </p>
              <div className="flex flex-wrap gap-2">
                {coach.certifications.split(" · ").map((cert) => (
                  <span
                    key={cert}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: "#e8f4fd", color: "#4a6fa5" }}
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Accessibility Section ────────────────────────────────────────────────────
function AccessibilitySection() {
  const { ref, inView } = useInView();

  const pillars = [
    {
      title: "Comunicación Clara",
      desc: "Instrucciones verbales precisas que reduzcan la dependencia de demostraciones visuales.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      title: "Orientación Espacial",
      desc: "Herramientas para ayudar a los participantes a comprender su posición y entorno.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    {
      title: "Movimiento Adaptable",
      desc: "Ejercicios y estrategias que pueden adaptarse a diferentes necesidades visuales.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "Práctica Segura",
      desc: "Métodos enfocados en crear ambientes respetuosos, predecibles y seguros.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="accesibilidad"
      className="py-28 lg:py-36 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1e3a5f 0%, #2a5080 100%)" }}
      aria-labelledby="accessibility-title"
    >
      <div className="absolute inset-0 text-sky-300/10">
        <WaveDecoration />
      </div>
      <CircleDecor className="absolute -top-20 -right-20 w-80 h-80 opacity-10 border-white/20" />
      <CircleDecor className="absolute -bottom-10 -left-10 w-64 h-64 opacity-10 border-white/20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#7ebef0" }}>
              Accesibilidad
            </p>
            <h2
              id="accessibility-title"
              className="font-serif leading-tight mb-6"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "white",
              }}
            >
              La accesibilidad no es un extra. Es el punto de partida.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "#b3d8f8" }}>
              Beyond Sight busca que cada persona pueda experimentar el movimiento desde sus
              propias capacidades, necesidades y formas de percepción.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(179, 216, 248, 0.2)",
                  opacity: inView ? 1 : 0,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(179, 216, 248, 0.15)", color: "#7ebef0" }}
                >
                  {pillar.icon}
                </div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: "white" }}>
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#b3d8f8" }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
function Timeline() {
  const { ref, inView } = useInView();

  const steps = [
    { num: "01", title: "APLICA", desc: "Conoce el programa y realiza tu inscripción." },
    { num: "02", title: "APRENDE", desc: "Conoce los principios del Pilates inclusivo." },
    { num: "03", title: "PRACTICA", desc: "Aplica las estrategias de enseñanza." },
    { num: "04", title: "DEMUESTRA", desc: "Demuestra tus conocimientos y habilidades." },
    { num: "05", title: "CERTIFÍCATE", desc: "Obtén tu certificación Beyond Sight." },
  ];

  return (
    <section
      className="py-28 lg:py-36"
      style={{ background: "white" }}
      aria-labelledby="timeline-title"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#4a6fa5" }}>
              Proceso
            </p>
            <h2
              id="timeline-title"
              className="font-serif"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1e3a5f",
              }}
            >
              Tu camino hacia la certificación.
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: "#ddeef8" }}
              aria-hidden="true"
            />

            <div className="space-y-8">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className="sm:flex items-start gap-8"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.6s ${i * 0.12}s, transform 0.6s ${i * 0.12}s`,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-semibold text-sm z-10 relative"
                    style={{
                      background: i === 4 ? "linear-gradient(135deg, #4a6fa5, #2589d6)" : "#e8f4fd",
                      color: i === 4 ? "white" : "#4a6fa5",
                      border: `2px solid ${i === 4 ? "transparent" : "#ddeef8"}`,
                    }}
                    aria-hidden="true"
                  >
                    {step.num}
                  </div>
                  <div className="flex-1 pt-4 sm:pt-3">
                    <h3
                      className="font-semibold tracking-widest text-sm mb-1"
                      style={{ color: "#1e3a5f" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm" style={{ color: "#4a6fa5" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const { ref, inView } = useInView();

  const testimonials = [
    {
      quote:
        "Beyond Sight cambió completamente mi manera de enseñar. Ahora mis clases son más claras, más conectadas y más humanas — para todos mis alumnos, no solo para quienes tienen discapacidad visual.",
      name: "María Fernanda G.",
      role: "Coach de Pilates, Ciudad de México",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format",
    },
    {
      quote:
        "La forma en que el programa explica la comunicación verbal y la orientación espacial es extraordinaria. Salí del programa siendo una mejor coach en todos los aspectos.",
      name: "Carolina R.",
      role: "Instructora de movimiento, Buenos Aires",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format",
    },
    {
      quote:
        "Recomiendo esta certificación a cualquier coach que quiera ampliar su alcance y hacer del Pilates un espacio verdaderamente inclusivo. Es una inversión que vale completamente.",
      name: "Daniela M.",
      role: "Directora de estudio, Bogotá",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    },
  ];

  return (
    <section
      className="py-28 lg:py-36"
      style={{ background: "#f0f7ff" }}
      aria-labelledby="testimonials-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-16">
            <h2
              id="testimonials-title"
              className="font-serif max-w-2xl mx-auto leading-snug"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                color: "#1e3a5f",
              }}
            >
              Cambiar la forma de enseñar también cambia la forma de experimentar el movimiento.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="p-8 rounded-2xl"
                style={{
                  background: "white",
                  opacity: inView ? 1 : 0,
                  transitionDelay: `${i * 100}ms`,
                  transition: `opacity 0.6s ${i * 0.1}s`,
                }}
              >
                <svg
                  className="w-8 h-6 mb-5"
                  viewBox="0 0 32 24"
                  fill="currentColor"
                  style={{ color: "#b3d8f8" }}
                  aria-hidden="true"
                >
                  <path d="M0 24V14.4C0 6.4 5.333 1.333 16 0l2 3.2C12 4.267 8.8 7.2 8 12h6V24H0zm18 0V14.4C18 6.4 23.333 1.333 34 0l2 3.2C30 4.267 26.8 7.2 26 12h6V24H18z" />
                </svg>
                <p
                  className="text-sm leading-relaxed mb-6 italic"
                  style={{ color: "#4a6fa5" }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={`Fotografía de ${t.name}`}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#1e3a5f" }}>
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "#7ebef0" }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, inView } = useInView();

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="py-28 lg:py-36"
      style={{ background: "white" }}
      aria-labelledby="faq-title"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#4a6fa5" }}>
              Preguntas frecuentes
            </p>
            <h2
              id="faq-title"
              className="font-serif"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#1e3a5f",
              }}
            >
              Resolvemos tus dudas.
            </h2>
          </div>

          <div className="space-y-3" role="list">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border overflow-hidden transition-all duration-200"
                style={{ borderColor: openIndex === i ? "#7ebef0" : "#ddeef8" }}
                role="listitem"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-button-${i}`}
                >
                  <span
                    className="font-medium text-sm pr-4"
                    style={{ color: openIndex === i ? "#2589d6" : "#1e3a5f" }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: openIndex === i ? "#2589d6" : "#e8f4fd",
                      color: openIndex === i ? "white" : "#4a6fa5",
                      transform: openIndex === i ? "rotate(45deg)" : "rotate(0)",
                    }}
                    aria-hidden="true"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openIndex === i ? "400px" : "0",
                  }}
                >
                  <p
                    className="px-6 pb-5 text-sm leading-relaxed"
                    style={{ color: "#4a6fa5" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  const { ref, inView } = useInView();

  return (
    <section
      id="cta"
      className="py-32 lg:py-40 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #ddeef8 0%, #c5e2f5 50%, #b3d8f8 100%)" }}
      aria-labelledby="cta-title"
    >
      <CircleDecor className="absolute -top-20 -right-20 w-96 h-96 opacity-40 border-sky-300/30" />
      <CircleDecor className="absolute -bottom-20 -left-20 w-80 h-80 opacity-30 border-sky-300/30" />
      <CircleDecor className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-15 border-sky-300/20" />

      <div className="absolute bottom-0 left-0 right-0 text-sky-300">
        <WaveDecoration />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2
            id="cta-title"
            className="font-serif leading-tight mb-6"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: "#1e3a5f",
              letterSpacing: "-0.01em",
            }}
          >
            ENSEÑA MÁS
            <br />
            <span className="italic" style={{ color: "#2589d6" }}>ALLÁ DE</span>
            <br />
            LA VISTA.
          </h2>

          <p
            className="text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: "#4a6fa5" }}
          >
            Crea experiencias de movimiento donde todas las personas puedan sentirse seguras,
            capaces e incluidas.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-sky-300/40 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #1e3a5f, #2589d6)",
                color: "white",
              }}
            >
              Quiero certificarme →
            </a>
            <a
              href="#que-es"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold border transition-all duration-200 hover:bg-white/60 hover:-translate-y-1"
              style={{ borderColor: "#7ebef0", color: "#1e3a5f", background: "rgba(255,255,255,0.4)" }}
            >
              Conocer más →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="pt-16 pb-8"
      style={{ background: "#1e3a5f", color: "#b3d8f8" }}
      aria-label="Pie de página"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="lg:col-span-2">
            <p
              className="text-sm font-semibold tracking-[0.2em] uppercase mb-1"
              style={{ color: "white" }}
            >
              T & Y STUDIO
            </p>
            <p
              className="font-serif italic text-xl mb-4"
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: "#7ebef0",
              }}
            >
              Beyond Sight Certification
            </p>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#7ebef0" }}>
              Una certificación diseñada para preparar coaches capaces de crear experiencias
              de Pilates accesibles e inclusivas.
            </p>

            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-sky-700"
                style={{ background: "rgba(255,255,255,0.08)" }}
                aria-label="Instagram de T & Y Studio"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-sky-700"
                style={{ background: "rgba(255,255,255,0.08)" }}
                aria-label="LinkedIn de T & Y Studio"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "#4a6fa5" }}
            >
              Navegación
            </p>
            <ul className="space-y-3">
              {[
                { label: "La certificación", href: "#certificacion" },
                { label: "Coaches", href: "#coaches" },
                { label: "Accesibilidad", href: "#accesibilidad" },
                { label: "FAQ", href: "#faq" },
                { label: "Contacto", href: "mailto:hola@tystudio.com" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "#7ebef0" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "#4a6fa5" }}
            >
              Contacto
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hola@tystudio.com"
                  className="text-sm transition-colors hover:text-white flex items-center gap-2"
                  style={{ color: "#7ebef0" }}
                  aria-label="Enviar email a T & Y Studio"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hola@tystudio.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm transition-colors hover:text-white flex items-center gap-2"
                  style={{ color: "#7ebef0" }}
                  aria-label="Instagram de T & Y Studio"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @tystudio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "#4a6fa5" }}>
            © 2026 T & Y Studio. Todos los derechos reservados.
          </p>
          <p className="text-xs italic" style={{ color: "#4a6fa5" }}>
            Beyond Sight Certification — El movimiento va más allá de lo que vemos.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        style={{ background: "#1e3a5f", color: "white" }}
      >
        Saltar al contenido principal
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <WhatIs />
        <InteractiveExperience />
        <Modules />
        <ForWhom />
        <Coaches />
        <AccessibilitySection />
        <Timeline />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
