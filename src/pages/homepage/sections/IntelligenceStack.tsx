import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

function I5CentralCore({ hoveredIndex }: { hoveredIndex: number | null }) {
  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto mt-8 border border-white/10 bg-black/60 p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-sm select-none">
      {/* Corner Bracket decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/20" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/20" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/20" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/20" />

      {/* Main SVG */}
      <svg viewBox="0 0 300 300" className="w-full h-full">
        <defs>
          <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
          </radialGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <style>{`
          @keyframes spin-cw {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-ccw {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          @keyframes pulse-die {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(0, 255, 204, 0.3)); }
            50% { transform: scale(1.03); filter: drop-shadow(0 0 15px rgba(0, 255, 204, 0.8)); }
          }
          .rot-cw {
            transform-origin: 150px 150px;
            animation: spin-cw 20s linear infinite;
          }
          .rot-ccw {
            transform-origin: 150px 150px;
            animation: spin-ccw 15s linear infinite;
          }
          .die-pulse {
            transform-origin: 150px 150px;
            animation: pulse-die 3s ease-in-out infinite;
          }
        `}</style>

        {/* Outer Circular Grid */}
        <circle cx="150" cy="150" r="120" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
        <circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />

        {/* Rotating bezel rings */}
        <circle cx="150" cy="150" r="85" fill="none" stroke={hoveredIndex ? '#00ffcc' : 'rgba(255, 255, 255, 0.1)'} strokeWidth="1.5" strokeDasharray="15, 25" className="rot-cw transition-colors duration-300" style={hoveredIndex ? { animationDuration: '6s' } : {}} />
        <circle cx="150" cy="150" r="75" fill="none" stroke={hoveredIndex ? '#00ffcc' : 'rgba(255, 255, 255, 0.08)'} strokeWidth="1" strokeDasharray="5, 12" className="rot-ccw transition-colors duration-300" style={hoveredIndex ? { animationDuration: '5s' } : {}} />

        {/* Circuit Traces linking core to outer contacts */}
        {/* Trace 1: Top-Left (Layer 1) */}
        <path d="M100,100 L60,60" fill="none" stroke={hoveredIndex === 1 ? '#00ffcc' : 'rgba(255, 255, 255, 0.1)'} strokeWidth={hoveredIndex === 1 ? 2.5 : 1.5} className="transition-all duration-300" />
        {hoveredIndex === 1 && (
          <circle r="4" fill="#00ffcc">
            <animateMotion dur="0.8s" repeatCount="indefinite" path="M100,100 L60,60" />
          </circle>
        )}

        {/* Trace 2: Mid-Left (Layer 2) */}
        <path d="M90,150 L40,150" fill="none" stroke={hoveredIndex === 2 ? '#00ffcc' : 'rgba(255, 255, 255, 0.1)'} strokeWidth={hoveredIndex === 2 ? 2.5 : 1.5} className="transition-all duration-300" />
        {hoveredIndex === 2 && (
          <circle r="4" fill="#00ffcc">
            <animateMotion dur="0.8s" repeatCount="indefinite" path="M90,150 L40,150" />
          </circle>
        )}

        {/* Trace 3: Top-Right (Layer 3) */}
        <path d="M200,100 L240,60" fill="none" stroke={hoveredIndex === 3 ? '#00ffcc' : 'rgba(255, 255, 255, 0.1)'} strokeWidth={hoveredIndex === 3 ? 2.5 : 1.5} className="transition-all duration-300" />
        {hoveredIndex === 3 && (
          <circle r="4" fill="#00ffcc">
            <animateMotion dur="0.8s" repeatCount="indefinite" path="M200,100 L240,60" />
          </circle>
        )}

        {/* Trace 4: Mid-Right (Layer 4) */}
        <path d="M210,150 L260,150" fill="none" stroke={hoveredIndex === 4 ? '#00ffcc' : 'rgba(255, 255, 255, 0.1)'} strokeWidth={hoveredIndex === 4 ? 2.5 : 1.5} className="transition-all duration-300" />
        {hoveredIndex === 4 && (
          <circle r="4" fill="#00ffcc">
            <animateMotion dur="0.8s" repeatCount="indefinite" path="M210,150 L260,150" />
          </circle>
        )}

        {/* Trace 5: Bottom-Center (Layer 5) */}
        <path d="M150,210 L150,260" fill="none" stroke={hoveredIndex === 5 ? '#00ffcc' : 'rgba(255, 255, 255, 0.1)'} strokeWidth={hoveredIndex === 5 ? 2.5 : 1.5} className="transition-all duration-300" />
        {hoveredIndex === 5 && (
          <circle r="4" fill="#00ffcc">
            <animateMotion dur="0.8s" repeatCount="indefinite" path="M150,210 L150,260" />
          </circle>
        )}

        {/* Silicon Die Substrate */}
        <rect x="95" y="95" width="110" height="110" rx="8" fill="#000000" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
        
        {/* Glow center */}
        {hoveredIndex && (
          <rect x="98" y="98" width="104" height="104" rx="6" fill="url(#centralGlow)" pointerEvents="none" />
        )}

        {/* Central Core Die with i5 embossed */}
        <g className="die-pulse">
          <rect x="105" y="105" width="90" height="90" rx="6" fill="#030304" stroke={hoveredIndex ? '#00ffcc' : 'rgba(255, 255, 255, 0.3)'} strokeWidth="2.5" className="transition-colors duration-300" />
          <text x="150" y="157" fontFamily="var(--font-display)" fontSize="36" fontWeight="900" textAnchor="middle" fill={hoveredIndex ? '#00ffcc' : '#ffffff'} filter={hoveredIndex ? 'url(#glowEffect)' : 'none'} className="transition-colors duration-300 tracking-tighter">i5</text>
          
          <text x="150" y="178" fontFamily="var(--font-mono)" fontSize="7" fontWeight="bold" textAnchor="middle" fill={hoveredIndex ? '#00ffcc' : 'rgba(255,255,255,0.4)'} className="transition-colors duration-300 tracking-widest">// CORE</text>
        </g>

        {/* Outer terminal contacts (dots) */}
        <circle cx="60" cy="60" r="5" fill={hoveredIndex === 1 ? '#00ffcc' : 'rgba(255, 255, 255, 0.2)'} className="transition-colors duration-300" />
        <circle cx="40" cy="150" r="5" fill={hoveredIndex === 2 ? '#00ffcc' : 'rgba(255, 255, 255, 0.2)'} className="transition-colors duration-300" />
        <circle cx="240" cy="60" r="5" fill={hoveredIndex === 3 ? '#00ffcc' : 'rgba(255, 255, 255, 0.2)'} className="transition-colors duration-300" />
        <circle cx="260" cy="150" r="5" fill={hoveredIndex === 4 ? '#00ffcc' : 'rgba(255, 255, 255, 0.2)'} className="transition-colors duration-300" />
        <circle cx="150" cy="260" r="5" fill={hoveredIndex === 5 ? '#00ffcc' : 'rgba(255, 255, 255, 0.2)'} className="transition-colors duration-300" />
      </svg>

      {/* Mini HUD Diagnostic Readout Panel */}
      <div className="mt-4 border border-primary/20 bg-primary/5 p-3 rounded-none font-mono text-[10px] text-white/70 h-[84px] flex flex-col justify-between select-none">
        {hoveredIndex === 1 && (
          <>
            <div className="flex justify-between text-primary font-bold">
              <span>[ SYSTEM PORTAL: DATA_INGRESS ]</span>
              <span className="animate-pulse">STREAMING</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 mt-1.5 text-white/60">
              <div>CORE STATUS : ACTIVE</div>
              <div>FREQUENCY   : 980 MHz</div>
              <div>ENGINE      : HYPERLIQUID_WS</div>
              <div>INFLOW RATE : 41.2k TPS</div>
            </div>
          </>
        )}
        {hoveredIndex === 2 && (
          <>
            <div className="flex justify-between text-primary font-bold">
              <span>[ SYSTEM PORTAL: AGENT_CORE ]</span>
              <span className="animate-pulse">PROCESSING</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 mt-1.5 text-white/60">
              <div>CORE STATUS : COORD_ACTIVE</div>
              <div>FREQUENCY   : 1.4 GHz [OC]</div>
              <div>AGENT ARRAY : 5/5 ONLINE</div>
              <div>INFERENCE   : 8.2ms LATENCY</div>
            </div>
          </>
        )}
        {hoveredIndex === 3 && (
          <>
            <div className="flex justify-between text-primary font-bold">
              <span>[ SYSTEM PORTAL: NET_ROUTER ]</span>
              <span className="animate-pulse">SYNCHRONIZED</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 mt-1.5 text-white/60">
              <div>CORE STATUS : DISTRIB_SYNC</div>
              <div>FREQUENCY   : 800 MHz</div>
              <div>PEER DEGENS : 12,482 LIVE</div>
              <div>MERIT CHAIN : VERIFIED</div>
            </div>
          </>
        )}
        {hoveredIndex === 4 && (
          <>
            <div className="flex justify-between text-primary font-bold">
              <span>[ SYSTEM PORTAL: DETECTOR ]</span>
              <span className="animate-pulse">SCANNING</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 mt-1.5 text-white/60">
              <div>CORE STATUS : GRID_SCAN</div>
              <div>FREQUENCY   : 1.1 GHz</div>
              <div>RADAR RES   : 0.01s DELTA</div>
              <div>ANOMALIES   : 3 DETECTED</div>
            </div>
          </>
        )}
        {hoveredIndex === 5 && (
          <>
            <div className="flex justify-between text-primary font-bold">
              <span>[ SYSTEM PORTAL: ACTION_GATE ]</span>
              <span className="animate-pulse">ROUTING</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 mt-1.5 text-white/60">
              <div>CORE STATUS : GATE_READY</div>
              <div>FREQUENCY   : 1.6 GHz [MAX]</div>
              <div>TX ROUTING  : DIRECT_HL</div>
              <div>FILL SPEED  : 3.4ms DIRECT</div>
            </div>
          </>
        )}
        {hoveredIndex === null && (
          <>
            <div className="flex justify-between text-white/40">
              <span>[ SYSTEM PORTAL: I5_RUNTIME ]</span>
              <span>STANDBY</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 mt-1.5 text-white/40">
              <div>CORE STATUS : STANDBY</div>
              <div>FREQUENCY   : 400 MHz</div>
              <div>THERMALS    : 34°C STABLE</div>
              <div>SYSTEM LOAD : 4.2% IDLE</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function IntelligenceStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number, cardEl: HTMLDivElement | null) => {
    setHoveredIndex(index);
    if (!cardEl) return;
    
    const dotInner = cardEl.querySelector('.stack-dot-inner');
    gsap.to(cardEl, {
      y: -5,
      borderColor: '#00ffcc',
      boxShadow: '3px 7px 15px rgba(0, 255, 204, 0.25)',
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
    if (dotInner) {
      gsap.to(dotInner, {
        scale: 1.3,
        backgroundColor: '#000000',
        borderColor: '#00ffcc',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  };

  const handleMouseLeave = (_index: number, cardEl: HTMLDivElement | null) => {
    setHoveredIndex(null);
    if (!cardEl) return;
    
    const dotInner = cardEl.querySelector('.stack-dot-inner');
    gsap.to(cardEl, {
      y: 0,
      borderColor: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '3px 3px 0px rgba(255, 255, 255, 0.05)',
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
    if (dotInner) {
      gsap.to(dotInner, {
        scale: 1,
        backgroundColor: '#00ffcc',
        borderColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  };

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
          <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase leading-none">
            THE I5 INTELLIGENCE STACK
          </h2>
          <div className="mt-4 flex flex-col gap-1 font-display font-bold text-lg text-primary uppercase">
            <div>Five layers.</div>
            <div>One coordinated runtime.</div>
          </div>
          <p className="text-white/60 font-body text-sm sm:text-base mt-6 leading-relaxed">
            Most platforms display data. i5 interprets it. Each layer compounds the next — perception sharpens context, context sharpens reasoning, reasoning directs action, action feeds reflection.
          </p>
          <I5CentralCore hoveredIndex={hoveredIndex} />
        </div>

        {/* Right Column: 5 Layers Stack */}
        <div className="stack-timeline-container lg:col-span-8 flex flex-col gap-6 relative pl-8 sm:pl-12">
          
          {/* Connecting Vertical Line */}
          <div className="stack-vertical-line absolute left-[20px] sm:left-[30px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-primary/5 pointer-events-none" />

          {/* Layer 1 */}
          <div 
            className="stack-layer-card relative bg-black/80 p-6 sm:p-8 border-2 border-white/15 cursor-pointer shadow-[3px_3px_0px_rgba(255,255,255,0.05)]"
            onMouseEnter={(e) => handleMouseEnter(1, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(1, e.currentTarget)}
          >
            {/* Timeline Connector Dot */}
            <div className="stack-connector-dot absolute -left-[28px] sm:-left-[38px] top-9 w-4 h-4 rounded-full bg-black border-2 border-primary flex items-center justify-center">
              <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
            </div>
            
            <div className="stack-layer-content flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-display font-black text-2xl text-primary">01</span>
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
            onMouseEnter={(e) => handleMouseEnter(2, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(2, e.currentTarget)}
          >
            {/* Timeline Connector Dot */}
            <div className="stack-connector-dot absolute -left-[28px] sm:-left-[38px] top-9 w-4 h-4 rounded-full bg-black border-2 border-primary flex items-center justify-center">
              <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
            </div>
            
            <div className="stack-layer-content flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-display font-black text-2xl text-primary">02</span>
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
            onMouseEnter={(e) => handleMouseEnter(3, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(3, e.currentTarget)}
          >
            {/* Timeline Connector Dot */}
            <div className="stack-connector-dot absolute -left-[28px] sm:-left-[38px] top-9 w-4 h-4 rounded-full bg-black border-2 border-primary flex items-center justify-center">
              <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
            </div>
            
            <div className="stack-layer-content flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-display font-black text-2xl text-primary">03</span>
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
            onMouseEnter={(e) => handleMouseEnter(4, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(4, e.currentTarget)}
          >
            {/* Timeline Connector Dot */}
            <div className="stack-connector-dot absolute -left-[28px] sm:-left-[38px] top-9 w-4 h-4 rounded-full bg-black border-2 border-primary flex items-center justify-center">
              <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
            </div>
            
            <div className="stack-layer-content flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-display font-black text-2xl text-primary">04</span>
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
            onMouseEnter={(e) => handleMouseEnter(5, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(5, e.currentTarget)}
          >
            {/* Timeline Connector Dot */}
            <div className="stack-connector-dot absolute -left-[28px] sm:-left-[38px] top-9 w-4 h-4 rounded-full bg-black border-2 border-primary flex items-center justify-center">
              <div className="stack-dot-inner w-1.5 h-1.5 rounded-full bg-primary border border-transparent" />
            </div>
            
            <div className="stack-layer-content flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-display font-black text-2xl text-primary">05</span>
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
