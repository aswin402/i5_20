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

const LAYER_IMAGES: Record<number, string> = { 1: I1, 2: I2, 3: I3, 4: I4, 5: I5 };

function I5CentralCore({ 
  hoveredIndex, 
}: { 
  hoveredIndex: number | null; 
  setHoveredIndex: (index: number | null) => void; 
}) {
  const src = hoveredIndex !== null ? LAYER_IMAGES[hoveredIndex] : IConstant;

  return (
    <div className="relative w-full max-w-[320px] mx-auto mt-8 select-none">
      <img
        key={src}
        src={src}
        alt="i5 intelligence stack"
        className="w-full h-auto object-contain"
        style={{
          animation: 'stackFadeIn 0.25s ease',
        }}
      />
      <style>{`
        @keyframes stackFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export function IntelligenceStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


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
      // Left content fade-in and slide-up
      gsap.from('.stack-left-content > *', {
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

      // Animate dot and card entries for each layer
      const layers = containerRef.current?.querySelectorAll('.stack-layer-card');
      if (layers && layers.length > 0) {
        // Initial setup for entrance
        layers.forEach((layer) => {
          const dot = layer.querySelector('.stack-connector-dot');
          gsap.set(layer, { x: 30, opacity: 0 });
          if (dot) gsap.set(dot, { scale: 0, opacity: 0 });
        });

        // Trigger animation for all layers when the stack container reaches 85% of the viewport
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="why-we-win" className="relative py-24 px-4 sm:px-8 md:px-12 lg:px-20 border-b border-white/10 dapp-grid-cyan-green overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Left Column: Title & Description */}
        <div className="stack-left-content lg:col-span-4 flex flex-col justify-start lg:sticky lg:top-24 h-fit">
          <span className="text-[10px] font-mono tracking-widest text-primary block mb-2">// STACK ARCHITECTURE</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-none">
            THE <span className="text-primary lowercase">i5</span> INTELLIGENCE STACK
          </h2>
          <div className="mt-4 flex flex-col gap-1 font-display font-bold text-lg text-primary uppercase">
            <div>Five layers.</div>
            <div>One coordinated runtime.</div>
          </div>
          <p className="text-white/60 font-body text-sm sm:text-base mt-6 leading-relaxed">
            Most platforms display data. i5 interprets it. Each layer compounds the next — perception sharpens context, context sharpens reasoning, reasoning directs action, action feeds reflection.
          </p>
          <I5CentralCore hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
        </div>

        {/* Right Column: 5 Layers Stack */}
        <div className="stack-timeline-container lg:col-span-8 flex flex-col gap-6 relative pl-8 sm:pl-12">
          
          {/* Connecting Vertical Line */}
          <div className="stack-vertical-line absolute left-[20px] sm:left-[30px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-primary/5 pointer-events-none" />

          {/* Layer 1 */}
          <div 
            className="stack-layer-card relative bg-black/80 p-6 sm:p-8 border-2 border-white/15 cursor-pointer shadow-[3px_3px_0px_rgba(255,255,255,0.05)]"
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Timeline Connector Dot */}
            <div className="stack-connector-dot absolute -left-[28px] sm:-left-[38px] top-9 w-4 h-4 rounded-full bg-black border-2 border-primary flex items-center justify-center">
              <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
            </div>
            
            <div className="stack-layer-content flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-inter font-black text-3xl text-primary">i1</span>
                  <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">
                    Market Intelligence
                  </h3>
                  <span className="bg-primary/10 border border-primary/20 text-primary text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                    DATA LAYER
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/60 font-body leading-relaxed max-w-xl">
                  Hyperliquid order flow, perps, funding, OI, volatility, liquidity maps, and liquidation streams — ingested in real time.
                </p>
              </div>
              
              {/* Visual module & Sub-items list wrapper */}
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto sm:min-w-[280px] pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-6">
                <div className="hidden xs:block w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                  <Layer1Visual hovered={hoveredIndex === 1} />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[10px] text-white/50 w-full">
                  <div className="hover:text-primary transition-colors">&gt; Order flow</div>
                  <div className="hover:text-primary transition-colors">&gt; Funding & OI</div>
                  <div className="hover:text-primary transition-colors">&gt; Liquidity maps</div>
                  <div className="hover:text-primary transition-colors">&gt; Liquidations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 2 */}
          <div 
            className="stack-layer-card relative bg-black/80 p-6 sm:p-8 border-2 border-white/15 cursor-pointer shadow-[3px_3px_0px_rgba(255,255,255,0.05)]"
            onMouseEnter={() => setHoveredIndex(2)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Timeline Connector Dot */}
            <div className="stack-connector-dot absolute -left-[28px] sm:-left-[38px] top-9 w-4 h-4 rounded-full bg-black border-2 border-primary flex items-center justify-center">
              <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
            </div>
            
            <div className="stack-layer-content flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-inter font-black text-3xl text-primary">i2</span>
                  <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">
                    AI Intelligence
                  </h3>
                  <span className="bg-primary/10 border border-primary/20 text-primary text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                    AGENT LAYER
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/60 font-body leading-relaxed max-w-xl">
                  Specialized agents — Signal, Narrative, Risk, Execution, Learning — coordinate across the entire trading workflow.
                </p>
              </div>
              
              {/* Visual module & Sub-items list wrapper */}
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto sm:min-w-[280px] pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-6">
                <div className="hidden xs:block w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                  <Layer2Visual hovered={hoveredIndex === 2} />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[10px] text-white/50 w-full">
                  <div className="hover:text-primary transition-colors">&gt; Signal agents</div>
                  <div className="hover:text-primary transition-colors">&gt; Narrative agents</div>
                  <div className="hover:text-primary transition-colors">&gt; Risk agents</div>
                  <div className="hover:text-primary transition-colors">&gt; Execution agents</div>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 3 */}
          <div 
            className="stack-layer-card relative bg-black/80 p-6 sm:p-8 border-2 border-white/15 cursor-pointer shadow-[3px_3px_0px_rgba(255,255,255,0.05)]"
            onMouseEnter={() => setHoveredIndex(3)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Timeline Connector Dot */}
            <div className="stack-connector-dot absolute -left-[28px] sm:-left-[38px] top-9 w-4 h-4 rounded-full bg-black border-2 border-primary flex items-center justify-center">
              <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
            </div>
            
            <div className="stack-layer-content flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-inter font-black text-3xl text-primary">i3</span>
                  <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">
                    Community Intelligence
                  </h3>
                  <span className="bg-primary/10 border border-primary/20 text-primary text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                    NETWORK LAYER
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/60 font-body leading-relaxed max-w-xl">
                  Traders publish signals, validate setups, and earn transparent on-chain reputation. Merit-based intelligence at scale.
                </p>
              </div>
              
              {/* Visual module & Sub-items list wrapper */}
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto sm:min-w-[280px] pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-6">
                <div className="hidden xs:block w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                  <Layer3Visual hovered={hoveredIndex === 3} />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[10px] text-white/50 w-full">
                  <div className="hover:text-primary transition-colors">&gt; Reputation scores</div>
                  <div className="hover:text-primary transition-colors">&gt; Signal marketplace</div>
                  <div className="hover:text-primary transition-colors">&gt; Copy trading</div>
                  <div className="hover:text-primary transition-colors">&gt; Watchlists</div>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 4 */}
          <div 
            className="stack-layer-card relative bg-black/80 p-6 sm:p-8 border-2 border-white/15 cursor-pointer shadow-[3px_3px_0px_rgba(255,255,255,0.05)]"
            onMouseEnter={() => setHoveredIndex(4)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Timeline Connector Dot */}
            <div className="stack-connector-dot absolute -left-[28px] sm:-left-[38px] top-9 w-4 h-4 rounded-full bg-black border-2 border-primary flex items-center justify-center">
              <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
            </div>
            
            <div className="stack-layer-content flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-inter font-black text-3xl text-primary">i4</span>
                  <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">
                    Event Intelligence
                  </h3>
                  <span className="bg-primary/10 border border-primary/20 text-primary text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                    DETECTION LAYER
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/60 font-body leading-relaxed max-w-xl">
                  Whale transfers, funding spikes, volume anomalies, and narrative shifts — surfaced as ranked, contextual events.
                </p>
              </div>
              
              {/* Visual module & Sub-items list wrapper */}
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto sm:min-w-[280px] pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-6">
                <div className="hidden xs:block w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                  <Layer4Visual hovered={hoveredIndex === 4} />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[10px] text-white/50 w-full">
                  <div className="hover:text-primary transition-colors">&gt; Whale moves</div>
                  <div className="hover:text-primary transition-colors">&gt; Volume anomalies</div>
                  <div className="hover:text-primary transition-colors">&gt; Narrative shifts</div>
                  <div className="hover:text-primary transition-colors">&gt; Volatility events</div>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 5 */}
          <div 
            className="stack-layer-card relative bg-black/80 p-6 sm:p-8 border-2 border-white/15 cursor-pointer shadow-[3px_3px_0px_rgba(255,255,255,0.05)]"
            onMouseEnter={() => setHoveredIndex(5)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Timeline Connector Dot */}
            <div className="stack-connector-dot absolute -left-[28px] sm:-left-[38px] top-9 w-4 h-4 rounded-full bg-black border-2 border-primary flex items-center justify-center">
              <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
            </div>
            
            <div className="stack-layer-content flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-inter font-black text-3xl text-primary">i5</span>
                  <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">
                    Execution Intelligence
                  </h3>
                  <span className="bg-primary/10 border border-primary/20 text-primary text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                    ACTION LAYER
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/60 font-body leading-relaxed max-w-xl">
                  From signal to fill in one workflow. One-click trades, dynamic stops, scaling, and policy-bound automation.
                </p>
              </div>
              
              {/* Visual module & Sub-items list wrapper */}
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto sm:min-w-[280px] pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-6">
                <div className="hidden xs:block w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                  <Layer5Visual hovered={hoveredIndex === 5} />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[10px] text-white/50 w-full">
                  <div className="hover:text-primary transition-colors">&gt; One-click trades</div>
                  <div className="hover:text-primary transition-colors">&gt; Dynamic stops</div>
                  <div className="hover:text-primary transition-colors">&gt; Copy workflows</div>
                  <div className="hover:text-primary transition-colors">&gt; Risk policies</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
