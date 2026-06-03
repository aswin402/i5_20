import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IConstant from '../../../assets/Iconstant.png';
import I1 from '../../../assets/I1.png';
import I2 from '../../../assets/I2.png';
import I3 from '../../../assets/I3.png';
import I4 from '../../../assets/I4.png';
import I5 from '../../../assets/I5.png';

gsap.registerPlugin(ScrollTrigger);

interface LayerVisualProps {
  hovered: boolean;
}

function Layer1Visual({ hovered }: LayerVisualProps) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-white/30 select-none">
      <defs>
        <linearGradient id="gridGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00ffcc" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <style>{`
        @keyframes flow-fast-1 {
          to { stroke-dashoffset: -90; }
        }
        @keyframes flow-slow-1 {
          to { stroke-dashoffset: -90; }
        }
      `}</style>
      <line x1="10" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      <line x1="10" y1="70" x2="90" y2="70" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      
      <path d="M10,30 L90,30" stroke="url(#gridGrad1)" strokeWidth="2" strokeDasharray="15 30" strokeDashoffset="0" style={hovered ? { animation: 'flow-fast-1 1.5s linear infinite' } : { animation: 'flow-slow-1 4s linear infinite' }} />
      <path d="M10,50 L90,50" stroke="url(#gridGrad1)" strokeWidth="2" strokeDasharray="25 25" strokeDashoffset="0" style={hovered ? { animation: 'flow-fast-1 1.2s linear infinite' } : { animation: 'flow-slow-1 3s linear infinite' }} />
      <path d="M10,70 L90,70" stroke="url(#gridGrad1)" strokeWidth="2" strokeDasharray="10 40" strokeDashoffset="0" style={hovered ? { animation: 'flow-fast-1 1.8s linear infinite' } : { animation: 'flow-slow-1 5s linear infinite' }} />

      <circle cx="90" cy="30" r="3" fill={hovered ? '#00ffcc' : 'currentColor'} className="transition-colors duration-300" />
      <circle cx="90" cy="50" r="3" fill={hovered ? '#00ffcc' : 'currentColor'} className="transition-colors duration-300" />
      <circle cx="90" cy="70" r="3" fill={hovered ? '#00ffcc' : 'currentColor'} className="transition-colors duration-300" />
    </svg>
  );
}

function Layer2Visual({ hovered }: LayerVisualProps) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-white/30 select-none">
      <defs>
        <radialGradient id="dieGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
        </radialGradient>
      </defs>
      <style>{`
        @keyframes chip-pulse-2 {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(0, 255, 204, 0.2)); }
          50% { filter: drop-shadow(0 0 8px rgba(0, 255, 204, 0.7)); }
        }
        @keyframes orbit-spin-2 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Silicon Board Grid */}
      <rect x="15" y="15" width="70" height="70" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
      
      {/* Circuit traces to nodes */}
      <path d="M50,22 L50,34 M23.4,41.3 L35.4,45 M66.5,72.7 L57.5,63.5 M33.5,72.7 L42.5,63.5 M76.6,41.3 L64.6,45" stroke={hovered ? '#00ffcc' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1" className="transition-colors duration-300" />
      
      {/* Orbit line */}
      <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3, 3" />
      
      {/* Central i5 Die */}
      <rect x="34" y="34" width="32" height="32" rx="4" fill="#000000" stroke={hovered ? '#00ffcc' : 'rgba(255, 255, 255, 0.3)'} strokeWidth="2" className="transition-colors duration-300" style={hovered ? { animation: 'chip-pulse-2 2s infinite' } : {}} />
      
      {/* Glowing die center */}
      {hovered && (
        <rect x="35" y="35" width="30" height="30" rx="3" fill="url(#dieGlow)" pointerEvents="none" />
      )}
      
      {/* i5 Text in center */}
      <text x="50" y="55" fontFamily="var(--font-display)" fontSize="11" fontWeight="900" textAnchor="middle" fill={hovered ? '#00ffcc' : '#ffffff'} className="transition-colors duration-300 tracking-tighter">i5</text>
      
      {/* Satellite Agent Nodes */}
      <g style={{ transformOrigin: '50px 50px', animation: hovered ? 'orbit-spin-2 8s linear infinite' : 'none' }}>
        <circle cx="50" cy="22" r="3.5" fill={hovered ? '#00ffcc' : '#ffffff'} className="transition-colors duration-300" />
        <circle cx="76.6" cy="41.3" r="3.5" fill={hovered ? '#00ffcc' : '#ffffff'} className="transition-colors duration-300" />
        <circle cx="66.5" cy="72.7" r="3.5" fill={hovered ? '#00ffcc' : '#ffffff'} className="transition-colors duration-300" />
        <circle cx="33.5" cy="72.7" r="3.5" fill={hovered ? '#00ffcc' : '#ffffff'} className="transition-colors duration-300" />
        <circle cx="23.4" cy="41.3" r="3.5" fill={hovered ? '#00ffcc' : '#ffffff'} className="transition-colors duration-300" />
      </g>
    </svg>
  );
}

function Layer3Visual({ hovered }: LayerVisualProps) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-white/30 select-none">
      <style>{`
        @keyframes spin-slow-3 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-3 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .rot-3 {
          transform-origin: 50px 50px;
          animation: spin-slow-3 15s linear infinite;
        }
        .rot-rev-3 {
          transform-origin: 50px 50px;
          animation: spin-reverse-3 10s linear infinite;
        }
      `}</style>

      {/* Network connection mesh */}
      <path d="M25,25 L75,25 L75,75 L25,75 Z M25,25 L50,50 L75,25 M25,75 L50,50 L75,75" stroke={hovered ? '#00ffcc' : 'rgba(255,255,255,0.1)'} strokeWidth={hovered ? 1.5 : 1} className="transition-all duration-300" fill="none" />
      
      {/* Rotating concentric dashboard indicators */}
      <circle cx="50" cy="50" r="15" fill="none" stroke={hovered ? '#00ffcc' : 'rgba(255, 255, 255, 0.05)'} strokeWidth="1" strokeDasharray="3, 5" className="rot-3 transition-colors duration-300" />
      <circle cx="50" cy="50" r="10" fill="none" stroke={hovered ? '#00ffcc' : 'rgba(255, 255, 255, 0.05)'} strokeWidth="0.7" strokeDasharray="1, 3" className="rot-rev-3 transition-colors duration-300" />

      {/* Dynamic consensus ripples when hovered */}
      {hovered ? (
        <>
          <circle cx="50" cy="50" r="5" fill="none" stroke="#00ffcc" strokeWidth="1.5" opacity="0">
            <animate attributeName="r" values="5;38" dur="2s" repeatCount="indefinite" begin="0s" />
            <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" begin="0s" />
          </circle>
          <circle cx="50" cy="50" r="5" fill="none" stroke="#00ffcc" strokeWidth="1.5" opacity="0">
            <animate attributeName="r" values="5;38" dur="2s" repeatCount="indefinite" begin="1s" />
            <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
          
          {/* Data packet flows */}
          <circle r="2.5" fill="#00ffcc">
            <animateMotion dur="1.2s" repeatCount="indefinite" path="M25,25 L50,50" />
          </circle>
          <circle r="2.5" fill="#00ffcc">
            <animateMotion dur="1.2s" repeatCount="indefinite" path="M75,25 L50,50" begin="0.3s" />
          </circle>
          <circle r="2.5" fill="#00ffcc">
            <animateMotion dur="1.2s" repeatCount="indefinite" path="M75,75 L50,50" begin="0.6s" />
          </circle>
          <circle r="2.5" fill="#00ffcc">
            <animateMotion dur="1.2s" repeatCount="indefinite" path="M25,75 L50,50" begin="0.9s" />
          </circle>
        </>
      ) : (
        <>
          {/* Ambient flow (slower, lower opacity) */}
          <circle r="1.5" fill="rgba(255,255,255,0.3)">
            <animateMotion dur="3s" repeatCount="indefinite" path="M25,25 L50,50" />
          </circle>
          <circle r="1.5" fill="rgba(255,255,255,0.3)">
            <animateMotion dur="3s" repeatCount="indefinite" path="M75,75 L50,50" begin="1.5s" />
          </circle>
        </>
      )}

      {/* Node indicators */}
      <circle cx="25" cy="25" r="4.5" fill={hovered ? '#00ffcc' : 'currentColor'} className="transition-colors duration-300" />
      <circle cx="75" cy="25" r="4.5" fill={hovered ? '#00ffcc' : 'currentColor'} className="transition-colors duration-300" />
      <circle cx="75" cy="75" r="4.5" fill={hovered ? '#00ffcc' : 'currentColor'} className="transition-colors duration-300" />
      <circle cx="25" cy="75" r="4.5" fill={hovered ? '#00ffcc' : 'currentColor'} className="transition-colors duration-300" />
      <circle cx="50" cy="50" r="6" fill={hovered ? '#00ffcc' : 'currentColor'} className="transition-colors duration-300" />
    </svg>
  );
}

function Layer4Visual({ hovered }: LayerVisualProps) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-white/30 select-none">
      <style>{`
        @keyframes radar-sweep-4 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <defs>
        <linearGradient id="radarSweepGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      
      <g style={{ transformOrigin: '50px 50px', animation: 'radar-sweep-4 4s linear infinite' }}>
        <path d="M50,50 L50,10 A40,40 0 0,1 78.2,21.8 Z" fill="url(#radarSweepGrad4)" pointerEvents="none" />
      </g>

      <circle cx="35" cy="30" r="2.5" fill="#00ffcc" opacity={hovered ? 0.9 : 0.2} className="transition-opacity duration-300" />
      <circle cx="65" cy="60" r="3.5" fill="#00ffcc" opacity={hovered ? 0.8 : 0.1} className="transition-opacity duration-300" />
    </svg>
  );
}

function Layer5Visual({ hovered }: LayerVisualProps) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-white/30 select-none">
      <style>{`
        @keyframes line-dash-5 {
          to { stroke-dashoffset: -20; }
        }
        @keyframes scale-pulse-5 {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
      <g style={hovered ? { transformOrigin: '50px 50px', animation: 'scale-pulse-5 2s ease-in-out infinite' } : {}}>
        <rect x="25" y="25" width="50" height="50" rx="6" fill="none" stroke={hovered ? '#00ffcc' : 'currentColor'} strokeWidth="2" className="transition-colors duration-300" />
        <polygon points="40,50 48,58 62,44" fill="none" stroke={hovered ? '#00ffcc' : 'rgba(255,255,255,0.2)'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300" />
        
        {hovered && (
          <rect x="25" y="25" width="50" height="50" rx="6" fill="none" stroke="#00ffcc" strokeWidth="2" strokeDasharray="5, 5" style={{ animation: 'line-dash-5 1s linear infinite' }} />
        )}
      </g>
    </svg>
  );
}



function I5CentralCore({ 
  hoveredIndex, 
  className = "",
}: { 
  hoveredIndex: number | null; 
  setHoveredIndex?: (index: number | null) => void; 
  className?: string;
}) {
  const images = [
    { id: 'constant', src: IConstant, active: hoveredIndex === null },
    { id: 1, src: I1, active: hoveredIndex === 1 },
    { id: 2, src: I2, active: hoveredIndex === 2 },
    { id: 3, src: I3, active: hoveredIndex === 3 },
    { id: 4, src: I4, active: hoveredIndex === 4 },
    { id: 5, src: I5, active: hoveredIndex === 5 },
  ];

  return (
    <div className={`relative select-none w-full h-full ${className}`}>
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          alt="i5 intelligence stack"
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out"
          style={{
            opacity: img.active ? 1 : 0,
            pointerEvents: img.active ? 'auto' : 'none',
          }}
        />
      ))}
    </div>
  );
}

export function IntelligenceStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [userHoveredIndex, setUserHoveredIndex] = useState<number | null>(null);
  const [autoActiveIndex, setAutoActiveIndex] = useState<number>(1);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const hoveredIndex = isDesktop
    ? (userHoveredIndex !== null ? userHoveredIndex : autoActiveIndex)
    : userHoveredIndex;

  useEffect(() => {
    if (!isDesktop) return;
    if (userHoveredIndex !== null) return;

    const interval = setInterval(() => {
      setAutoActiveIndex((prev) => (prev % 5) + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [isDesktop, userHoveredIndex]);

  const handleMouseEnter = (idx: number) => {
    setUserHoveredIndex(idx);
    setAutoActiveIndex(idx);
  };

  const handleMouseLeave = () => {
    setUserHoveredIndex(null);
  };

  const handleCardClick = (idx: number) => {
    if (window.innerWidth >= 1024) {
      setUserHoveredIndex(idx);
      setAutoActiveIndex(idx);
    }
  };

  // Sync card styles dynamically when hoveredIndex changes (both-way interaction)
  useEffect(() => {
    const layers = containerRef.current?.querySelectorAll('.stack-layer-card');
    if (!layers) return;
    
    layers.forEach((layer, idx) => {
      const isHovered = hoveredIndex === (idx + 1);
      const dotInner = layer.querySelector('.stack-dot-inner');
      
      gsap.to(layer, {
        y: isHovered ? -5 : 0,
        borderColor: isHovered ? '#00ffcc' : 'rgba(255, 255, 255, 0.15)',
        boxShadow: isHovered ? '3px 7px 15px rgba(0, 255, 204, 0.25)' : '3px 3px 0px rgba(255, 255, 255, 0.05)',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      
      if (dotInner) {
        gsap.to(dotInner, {
          scale: isHovered ? 1.3 : 1,
          backgroundColor: isHovered ? '#000000' : '#00ffcc',
          borderColor: isHovered ? '#00ffcc' : 'transparent',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });
  }, [hoveredIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top header fade-in
      gsap.from('.stack-top-header > *', {
        scrollTrigger: {
          trigger: '#why-we-win',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Animate the vertical connector line from scaleY 0 to 1 as we scroll the container
      gsap.fromTo('.stack-vertical-line',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.stack-timeline-container',
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          }
        }
      );

      const layers = containerRef.current?.querySelectorAll('.stack-layer-card');
      const mm = gsap.matchMedia();

      // Desktop layout animations (>= 1024px)
      mm.add("(min-width: 1024px)", () => {
        // Left image column scale/fade-in
        gsap.from('.stack-image-column', {
          scrollTrigger: {
            trigger: '#why-we-win',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power2.out',
        });

        // Layer cards entrance timeline
        if (layers && layers.length > 0) {
          layers.forEach((layer) => {
            const dot = layer.querySelector('.stack-connector-dot');
            gsap.set(layer, { x: 30, opacity: 0 });
            if (dot) gsap.set(dot, { scale: 0, opacity: 0 });
          });

          const mainTl = gsap.timeline({
            scrollTrigger: {
              trigger: '.stack-timeline-container',
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          });

          layers.forEach((layer, idx) => {
            const dot = layer.querySelector('.stack-connector-dot');
            mainTl.to(dot, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }, idx * 0.15)
                  .to(layer, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, idx * 0.15 + 0.15);
          });
        }
      });

      // Mobile/Tablet layout animations (< 1024px)
      mm.add("(max-width: 1023px)", () => {
        const NAVBAR_H = 80;

        const imageEl =
          containerRef.current?.querySelector(
            ".stack-image-column"
          ) as HTMLElement | null;

        const IMAGE_H = imageEl?.offsetHeight || 280;

        const STICKY_CARD_TOP = NAVBAR_H + IMAGE_H;

        const lineEl = containerRef.current?.querySelector(
          ".stack-vertical-line"
        ) as HTMLElement | null;

        if (lineEl) {
          gsap.set(lineEl, {
            position: "sticky",
            top: STICKY_CARD_TOP + 26,
            height: `calc(100vh - ${STICKY_CARD_TOP + 26}px)`,
            bottom: "auto",
          });
        }

        if (!layers || layers.length === 0) return;

        // Set initial state: all cards have full opacity and are in their natural positions
        layers.forEach((layer, idx) => {
          const card = layer as HTMLElement;
          card.style.top = `${STICKY_CARD_TOP}px`;
          card.style.zIndex = `${100 + idx}`;
          
          gsap.set(card, { opacity: 1, scale: 1, y: 0 });
        });

        // Set initial active index
        setUserHoveredIndex(null);

        // Update active index as cards scroll past the sticky threshold
        layers.forEach((layer, idx) => {
          ScrollTrigger.create({
            trigger: layer,
            start: `top ${STICKY_CARD_TOP + 20}px`,
            end: `bottom ${STICKY_CARD_TOP}px`,
            onEnter: () => setUserHoveredIndex(idx + 1),
            onEnterBack: () => setUserHoveredIndex(idx + 1),
            onLeaveBack: () => {
              if (idx === 0) setUserHoveredIndex(null);
              else setUserHoveredIndex(idx);
            }
          });
        });

        return () => {
          if (lineEl) {
            lineEl.style.position = "";
            lineEl.style.top = "";
            lineEl.style.height = "";
            lineEl.style.bottom = "";
          }
          layers.forEach((layer) => {
            const card = layer as HTMLElement;
            card.style.top = "";
            card.style.zIndex = "";
          });
        };
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="why-we-win" className="relative py-24 px-4 sm:px-8 md:px-12 lg:px-20 border-b border-white/10 dapp-grid-cyan-green">
      {/* Background glow overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Top Header Block */}
        <div className="stack-top-header flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="max-w-3xl">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-primary block mb-2">// STACK ARCHITECTURE</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-none">
              THE <span className="text-primary lowercase">i5</span> INTELLIGENCE STACK
            </h2>
            <p className="text-white/70 font-body text-sm sm:text-base md:text-lg mt-4 leading-relaxed">
              Most platforms display data. i5 interprets it. Each layer compounds the next — perception sharpens context, context sharpens reasoning, reasoning directs action, action feeds reflection.
            </p>
          </div>
          <div className="flex flex-col gap-1 font-display font-bold text-lg text-primary uppercase lg:text-right shrink-0">
            <div>Five layers.</div>
            <div>One coordinated runtime.</div>
          </div>
        </div>

        {/* Content Row: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: BIG Image */}
          <div className="stack-image-column lg:col-span-6 flex flex-col items-center justify-center bg-transparent border-0 lg:bg-black/40 lg:border lg:border-white/10 p-4 rounded-lg sticky top-[80px] lg:relative lg:top-auto overflow-hidden h-[280px] sm:h-[220px] lg:h-auto z-20">
            <div className="absolute inset-0 bg-radial-gradient from-primary/10 to-transparent pointer-events-none hidden lg:block" />
            {/* Grid background details */}
            <div className="absolute inset-0 opacity-15 pointer-events-none hidden lg:block" style={{ backgroundImage: 'radial-gradient(var(--color-primary, #00ffcc) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <I5CentralCore hoveredIndex={hoveredIndex} className="w-full h-full flex items-center justify-center z-10" />
          </div>

          {/* Right Column: 5 Layers Stack */}
          <div
            className="
            stack-timeline-container
            lg:col-span-6
            flex
            flex-col
            gap-4
            relative
            lg:pl-8
            lg:sm:pl-12
            pl-0
            z-30
            lg:pb-0
            pb-0
          "
          >
            
            {/* Connecting Vertical Line */}
            <div className="stack-vertical-line hidden lg:block absolute left-[20px] sm:left-[30px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-primary/5 pointer-events-none" />

            {/* Layer 1 */}
            <div 
              className="
              stack-layer-card
              sticky
              top-0
              lg:relative
              lg:top-auto
              bg-black
              lg:bg-black/80
              p-4
              sm:py-3.5
              sm:px-8
              sm:min-h-[96px]
              border-2
              border-white/15
              cursor-pointer
              shadow-[3px_3px_0px_rgba(255,255,255,0.05)]
              "
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCardClick(1)}
            >
              {/* Timeline Connector Dot */}
              <div className="stack-connector-dot hidden lg:flex absolute -left-[20px] sm:-left-[26px] top-[26px] lg:top-[28px] w-4 h-4 rounded-full bg-black border-2 border-primary items-center justify-center">
                <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
              </div>
              
              <div className="stack-layer-content flex flex-col sm:flex-row sm:items-stretch justify-between gap-4">
                <div className="flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-inter font-black text-2xl sm:text-3xl text-primary">i1</span>
                    <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
                      Market Intelligence
                    </h3>
                    <span className="bg-primary/10 border border-primary/20 text-primary text-[8px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 uppercase tracking-wider">
                      DATA LAYER
                    </span>
                  </div>
                  <p className="text-xs sm:text-base text-white/50 font-body leading-relaxed max-w-xl">
                    Hyperliquid order flow, perps, funding, OI, volatility, liquidity maps, and liquidation streams — ingested in real time.
                  </p>
                </div>
                
                {/* Visual module & Sub-items list wrapper */}
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto sm:min-w-[240px] pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-4">
                  <div className="hidden xs:block w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                    <Layer1Visual hovered={hoveredIndex === 1} />
                  </div>
                  <div className="flex flex-col gap-y-1 font-mono text-xs sm:text-sm text-emerald-400 font-bold w-full">
                    <div className="hover:text-white transition-colors">&gt; Order flow</div>
                    <div className="hover:text-white transition-colors">&gt; Funding & OI</div>
                    <div className="hover:text-white transition-colors">&gt; Liquidity maps</div>
                    <div className="hover:text-white transition-colors">&gt; Liquidations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Layer 2 */}
            <div 
              className="
              stack-layer-card
              sticky
              top-0
              lg:relative
              lg:top-auto
              bg-black
              lg:bg-black/80
              p-4
              sm:py-3.5
              sm:px-8
              sm:min-h-[96px]
              border-2
              border-white/15
              cursor-pointer
              shadow-[3px_3px_0px_rgba(255,255,255,0.05)]
              "
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCardClick(2)}
            >
              {/* Timeline Connector Dot */}
              <div className="stack-connector-dot hidden lg:flex absolute -left-[20px] sm:-left-[26px] top-[26px] lg:top-[28px] w-4 h-4 rounded-full bg-black border-2 border-primary items-center justify-center">
                <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
              </div>
              
              <div className="stack-layer-content flex flex-col sm:flex-row sm:items-stretch justify-between gap-4">
                <div className="flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-inter font-black text-2xl sm:text-3xl text-primary">i2</span>
                    <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
                      AI Intelligence
                    </h3>
                    <span className="bg-primary/10 border border-primary/20 text-primary text-[8px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 uppercase tracking-wider">
                      AGENT LAYER
                    </span>
                  </div>
                  <p className="text-xs sm:text-base text-white/50 font-body leading-relaxed max-w-xl">
                    Specialized agents — Signal, Narrative, Risk, Execution, Learning — coordinate across the entire trading workflow.
                  </p>
                </div>
                
                {/* Visual module & Sub-items list wrapper */}
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto sm:min-w-[240px] pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-4">
                  <div className="hidden xs:block w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                    <Layer2Visual hovered={hoveredIndex === 2} />
                  </div>
                  <div className="flex flex-col gap-y-1 font-mono text-xs sm:text-sm text-emerald-400 font-bold w-full">
                    <div className="hover:text-white transition-colors">&gt; Signal agents</div>
                    <div className="hover:text-white transition-colors">&gt; Narrative agents</div>
                    <div className="hover:text-white transition-colors">&gt; Risk agents</div>
                    <div className="hover:text-white transition-colors">&gt; Execution agents</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Layer 3 */}
            <div 
              className="
              stack-layer-card
              sticky
              top-0
              lg:relative
              lg:top-auto
              bg-black
              lg:bg-black/80
              p-4
              sm:py-3.5
              sm:px-8
              sm:min-h-[96px]
              border-2
              border-white/15
              cursor-pointer
              shadow-[3px_3px_0px_rgba(255,255,255,0.05)]
              "
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCardClick(3)}
            >
              {/* Timeline Connector Dot */}
              <div className="stack-connector-dot hidden lg:flex absolute -left-[20px] sm:-left-[26px] top-[26px] lg:top-[28px] w-4 h-4 rounded-full bg-black border-2 border-primary items-center justify-center">
                <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
              </div>
              
              <div className="stack-layer-content flex flex-col sm:flex-row sm:items-stretch justify-between gap-4">
                <div className="flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-inter font-black text-2xl sm:text-3xl text-primary">i3</span>
                    <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
                      Community Intelligence
                    </h3>
                    <span className="bg-primary/10 border border-primary/20 text-primary text-[8px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 uppercase tracking-wider">
                      NETWORK LAYER
                    </span>
                  </div>
                  <p className="text-xs sm:text-base text-white/50 font-body leading-relaxed max-w-xl">
                    Traders publish signals, validate setups, and earn transparent on-chain reputation. Merit-based intelligence at scale.
                  </p>
                </div>
                
                {/* Visual module & Sub-items list wrapper */}
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto sm:min-w-[240px] pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-4">
                  <div className="hidden xs:block w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                    <Layer3Visual hovered={hoveredIndex === 3} />
                  </div>
                  <div className="flex flex-col gap-y-1 font-mono text-xs sm:text-sm text-emerald-400 font-bold w-full">
                    <div className="hover:text-white transition-colors">&gt; Reputation scores</div>
                    <div className="hover:text-white transition-colors">&gt; Signal marketplace</div>
                    <div className="hover:text-white transition-colors">&gt; Copy trading</div>
                    <div className="hover:text-white transition-colors">&gt; Watchlists</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Layer 4 */}
            <div 
              className="
              stack-layer-card
              sticky
              top-0
              lg:relative
              lg:top-auto
              bg-black
              lg:bg-black/80
              p-4
              sm:py-3.5
              sm:px-8
              sm:min-h-[96px]
              border-2
              border-white/15
              cursor-pointer
              shadow-[3px_3px_0px_rgba(255,255,255,0.05)]
              "
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCardClick(4)}
            >
              {/* Timeline Connector Dot */}
              <div className="stack-connector-dot hidden lg:flex absolute -left-[20px] sm:-left-[26px] top-[26px] lg:top-[28px] w-4 h-4 rounded-full bg-black border-2 border-primary items-center justify-center">
                <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
              </div>
              
              <div className="stack-layer-content flex flex-col sm:flex-row sm:items-stretch justify-between gap-4">
                <div className="flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-inter font-black text-2xl sm:text-3xl text-primary">i4</span>
                    <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
                      Event Intelligence
                    </h3>
                    <span className="bg-primary/10 border border-primary/20 text-primary text-[8px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 uppercase tracking-wider">
                      DETECTION LAYER
                    </span>
                  </div>
                  <p className="text-xs sm:text-base text-white/50 font-body leading-relaxed max-w-xl">
                    Whale transfers, funding spikes, volume anomalies, and narrative shifts — surfaced as ranked, contextual events.
                  </p>
                </div>
                
                {/* Visual module & Sub-items list wrapper */}
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto sm:min-w-[240px] pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-4">
                  <div className="hidden xs:block w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                    <Layer4Visual hovered={hoveredIndex === 4} />
                  </div>
                  <div className="flex flex-col gap-y-1 font-mono text-xs sm:text-sm text-emerald-400 font-bold w-full">
                    <div className="hover:text-white transition-colors">&gt; Whale moves</div>
                    <div className="hover:text-white transition-colors">&gt; Volume anomalies</div>
                    <div className="hover:text-white transition-colors">&gt; Narrative shifts</div>
                    <div className="hover:text-white transition-colors">&gt; Volatility events</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Layer 5 */}
            <div 
              className="
              stack-layer-card
              sticky
              top-0
              lg:relative
              lg:top-auto
              bg-black
              lg:bg-black/80
              p-4
              sm:py-3.5
              sm:px-8
              sm:min-h-[96px]
              border-2
              border-white/15
              cursor-pointer
              shadow-[3px_3px_0px_rgba(255,255,255,0.05)]
              "
              onMouseEnter={() => handleMouseEnter(5)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCardClick(5)}
            >
              {/* Timeline Connector Dot */}
              <div className="stack-connector-dot hidden lg:flex absolute -left-[20px] sm:-left-[26px] top-[26px] lg:top-[28px] w-4 h-4 rounded-full bg-black border-2 border-primary items-center justify-center">
                <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
              </div>
              
              <div className="stack-layer-content flex flex-col sm:flex-row sm:items-stretch justify-between gap-4">
                <div className="flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-inter font-black text-2xl sm:text-3xl text-primary">i5</span>
                    <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
                      Execution Intelligence
                    </h3>
                    <span className="bg-primary/10 border border-primary/20 text-primary text-[8px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 uppercase tracking-wider">
                      ACTION LAYER
                    </span>
                  </div>
                  <p className="text-xs sm:text-base text-white/50 font-body leading-relaxed max-w-xl">
                    From signal to fill in one workflow. One-click trades, dynamic stops, scaling, and policy-bound automation.
                  </p>
                </div>
                
                {/* Visual module & Sub-items list wrapper */}
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto sm:min-w-[240px] pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-4">
                  <div className="hidden xs:block w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                    <Layer5Visual hovered={hoveredIndex === 5} />
                  </div>
                  <div className="flex flex-col gap-y-1 font-mono text-xs sm:text-sm text-emerald-400 font-bold w-full">
                    <div className="hover:text-white transition-colors">&gt; One-click trades</div>
                    <div className="hover:text-white transition-colors">&gt; Dynamic stops</div>
                    <div className="hover:text-white transition-colors">&gt; Copy workflows</div>
                    <div className="hover:text-white transition-colors">&gt; Risk policies</div>
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
