import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 01. Scalper Tick & Latency Simulator
function ScalperWidget({ active }: { active: boolean }) {
  const [bids, setBids] = useState<number[]>([40, 60, 35, 50, 75]);
  const [asks, setAsks] = useState<number[]>([30, 45, 55, 65, 40]);
  
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setBids(prev => prev.map(val => Math.max(10, Math.min(100, val + (Math.random() - 0.5) * 20))));
      setAsks(prev => prev.map(val => Math.max(10, Math.min(100, val + (Math.random() - 0.5) * 20))));
    }, 120);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="relative h-24 w-full bg-zinc-950 border border-white/12 rounded p-2.5 font-mono text-[9px] text-white overflow-hidden mt-4">
      <div className="flex justify-between items-center pb-1 border-b border-white/10 mb-2 opacity-60">
        <span>[SCLP_FEED]</span>
        <span className="flex items-center gap-1">
          <span className={`w-1 h-1 rounded-full bg-primary ${active ? 'animate-ping' : ''}`} />
          <span className="text-primary font-bold">LAT: 3.4ms</span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 h-[calc(100%-18px)]">
        <div className="flex flex-col justify-between">
          {asks.map((val, idx) => (
            <div key={idx} className="flex items-center gap-1.5 justify-end">
              <span className="text-red-500/50">{(93240 + idx * 2.5).toFixed(1)}</span>
              <div className="h-1 bg-red-500/30 transition-all duration-100 ease-out" style={{ width: `${val}%` }} />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between">
          {bids.map((val, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <div className="h-1 bg-primary/40 transition-all duration-100 ease-out" style={{ width: `${val}%` }} />
              <span className="text-primary/70">{(93235 - idx * 2.5).toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 02. Swing Trader Trend Tracer with Orbiting Node
function SwingWidget({ active }: { active: boolean }) {
  return (
    <div className="relative h-24 w-full bg-zinc-950 border border-white/12 rounded overflow-hidden mt-4">
      <div className="absolute top-2 left-2.5 font-mono text-[9px] text-white/50">// TREND_SCANNER</div>
      <div className="absolute top-2 right-2.5 font-mono text-[9px] text-primary/80">[MA_LOCK_ON]</div>
      <svg className="w-full h-full p-2 pt-6" viewBox="0 0 200 60" overflow="visible">
        <line x1="0" y1="15" x2="200" y2="15" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2, 2" />
        <line x1="0" y1="35" x2="200" y2="35" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2, 2" />
        <path 
          id="swing-path"
          d="M 0 42 Q 40 10, 80 40 T 160 20 T 200 10" 
          fill="none" 
          stroke={active ? '#00ffcc' : 'rgba(255, 255, 255, 0.2)'} 
          strokeWidth="1.5"
          className="transition-colors duration-300"
        />
        {active && (
          <circle r="4" fill="#00ffcc" className="filter drop-shadow-[0_0_4px_#00ffcc]">
            <animateMotion 
              dur="3s" 
              repeatCount="indefinite"
              path="M 0 42 Q 40 10, 80 40 T 160 20 T 200 10"
            />
          </circle>
        )}
      </svg>
    </div>
  );
}

// 03. Quant API Query stream
function QuantWidget({ active }: { active: boolean }) {
  const [stream, setStream] = useState<string>('GET /v2/market/signal');
  
  useEffect(() => {
    if (!active) {
      setStream('GET /v2/market/signal');
      return;
    }
    const samples = [
      '{"ask": 93240.2, "vol": 12.8, "lat": 0.4}',
      '{"bid": 93238.5, "delta": +0.02, "seq": 492}',
      '{"signal": "BUY", "confidence": 0.982}',
      '{"risk_score": 0.12, "volatility": "HIGH"}',
      '{"latency_warp": 0.02, "threads": 128}'
    ];
    let count = 0;
    const interval = setInterval(() => {
      setStream(samples[count % samples.length]);
      count++;
    }, 450);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="relative h-24 w-full bg-zinc-950 border border-white/12 rounded p-2.5 font-mono text-[9px] text-white/80 overflow-hidden mt-4 flex flex-col justify-between">
      <div className="flex justify-between items-center pb-1 border-b border-white/10 opacity-60">
        <span>API QUERY HUD</span>
        <span className="text-primary">[ENDPOINT: ESTABLISHED]</span>
      </div>
      <div className="flex-1 flex items-center bg-black/40 px-2 my-1.5 border border-white/5 font-mono text-[8px] text-primary/95 h-[30px] overflow-hidden min-h-[30px] relative">
        {active && (
          <div className="absolute inset-y-0 left-0 w-[2px] bg-primary animate-pulse" />
        )}
        <span className={active ? 'animate-[glitch-shake_0.2s_infinite] truncate' : 'truncate'}>
          {stream}
        </span>
      </div>
      <div className="flex justify-between text-[7px] text-white/40 uppercase">
        <span>STATUS: 200 OK</span>
        <span>RATE: 2,500/SEC</span>
      </div>
    </div>
  );
}

// 04. Signal Provider radar ripples & circular sweeps
function SignalWidget({ active }: { active: boolean }) {
  return (
    <div className="relative h-24 w-full bg-zinc-950 border border-white/12 rounded overflow-hidden mt-4 flex items-center justify-center">
      <div className="absolute top-2 left-2.5 font-mono text-[9px] text-white/50">// SIG_BROADCASTER</div>
      
      <svg className="w-20 h-20" viewBox="0 0 100 100" overflow="visible">
        <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(255, 255, 255, 0.05)" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255, 255, 255, 0.05)" />
        <circle cx="50" cy="50" r="3" fill="#00ffcc" />
        
        {active && (
          <>
            <circle cx="50" cy="50" r="3" fill="none" stroke="#00ffcc" strokeWidth="1.5">
              <animate attributeName="r" values="3;45;3" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="3" fill="none" stroke="rgba(0, 255, 204, 0.5)" strokeWidth="1">
              <animate attributeName="r" values="3;45;3" dur="2s" begin="0.7s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="2s" begin="0.7s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        <line 
          x1="50" y1="50" x2="85" y2="50" 
          stroke={active ? 'rgba(0, 255, 204, 0.8)' : 'rgba(255, 255, 255, 0.15)'} 
          strokeWidth="1.5"
          className="transition-colors duration-300"
          style={{
            transformOrigin: '50px 50px',
            animation: active ? 'sweep-spin 3s linear infinite' : 'none'
          }}
        />
      </svg>
    </div>
  );
}

// 05. Whale Depth Cohort flow heatmap (wide element)
function FundWidget({ active }: { active: boolean }) {
  const [flows, setFlows] = useState<number[]>([60, 45, 80, 55]);
  
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setFlows(prev => prev.map(val => Math.max(20, Math.min(100, val + (Math.random() - 0.5) * 15))));
    }, 200);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="relative h-24 w-full bg-zinc-950 border border-white/12 rounded p-2.5 font-mono text-[9px] text-white overflow-hidden mt-4 flex flex-col justify-between">
      <div className="flex justify-between items-center pb-1 border-b border-white/10 opacity-60">
        <span>COHORT INFLOW MONITOR [STABLE]</span>
        <span className="text-primary font-bold">ACTIVE NODES: 6/6</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-around py-1.5">
        {[
          { label: "WHALE COLLATERAL", color: "bg-primary" },
          { label: "INSTITUTIONAL FLOAT", color: "bg-[#00ffcc]/80" },
          { label: "SMART SENTIMENT", color: "bg-[#00ffcc]/60" },
          { label: "EXCHANGE RESERVES", color: "bg-[#00ffcc]/40" }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3">
            <span className="text-white/40 text-[7px] w-24 truncate">{item.label}</span>
            <div className="flex-1 h-1.5 bg-white/5 border border-white/10 overflow-hidden relative">
              <div 
                className={`h-full ${item.color} transition-all duration-300 ease-out`}
                style={{ width: `${active ? flows[idx] : 30 + idx * 10}%` }}
              />
              {active && (
                <div 
                  className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[sweep_1.2s_linear_infinite]"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                />
              )}
            </div>
            <span className="text-primary text-[8px] w-8 text-right font-bold">
              {active ? `${Math.round(flows[idx])}%` : `${30 + idx * 10}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BuiltForTraders() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.from('.trader-header > *', {
        scrollTrigger: {
          trigger: '#built-for-traders',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Cards staggered entry
      gsap.fromTo('.trader-card', 
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: '.trader-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="built-for-traders" className="relative py-24 px-4 sm:px-8 md:px-12 lg:px-20 border-b border-white/10 select-none bg-[#030304] overflow-visible">
      <style>{`
        @keyframes sweep-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes sweep {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }
        @keyframes glitch-shake {
          0% { transform: translate(0, 0) skew(0deg); }
          10% { transform: translate(-1px, 1px) skew(-2deg); }
          20% { transform: translate(1px, -1px) skew(1deg); }
          30% { transform: translate(0px, 1px) skew(0deg); }
          40% { transform: translate(-1px, -1px) skew(2deg); }
          50% { transform: translate(1px, 1px) skew(-1deg); }
          60% { transform: translate(0px, 0px) skew(0deg); }
          100% { transform: translate(0, 0) skew(0deg); }
        }
      `}</style>

      {/* Glow background */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="trader-header max-w-3xl mb-16 text-left">
          <span className="text-[10px] font-mono tracking-widest text-primary block mb-2">// ADAPTIVE TERMINAL</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase leading-none">
            BUILT FOR EVERY TRADER
          </h2>
          <div className="mt-4 flex flex-col gap-1 font-display font-bold text-lg text-primary uppercase">
            <div>One platform. Every workflow.</div>
          </div>
          <p className="text-white/60 font-body text-base sm:text-lg mt-6 leading-relaxed">
            From sub-second scalping to institutional portfolio management, i5 adapts to how you trade.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="trader-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* 01 Scalpers */}
          <div 
            className={`trader-card relative bg-black p-6 sm:p-8 border-2 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 ${
              hoveredCardIndex === 0 
                ? 'border-primary -translate-y-1.5 shadow-[0_0_15px_rgba(0,255,204,0.15)] bg-primary/[0.01]' 
                : 'border-white/15 shadow-[4px_4px_0px_rgba(255,255,255,0.05)]'
            }`}
            onMouseEnter={() => setHoveredCardIndex(0)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
            <div className={`trader-bg-number absolute -top-4 -right-2 text-7xl font-display font-black font-mono select-none pointer-events-none transition-all duration-300 ${
              hoveredCardIndex === 0 ? 'text-primary/[0.08] -translate-x-3 scale-105' : 'text-white/[0.03]'
            }`}>
              01
            </div>
            <div>
              <span className="text-xs font-mono text-primary font-bold block mb-2">// 01 //</span>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-3">
                Scalpers
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-body leading-relaxed">
                React to momentum and volatility shifts the moment they form. Sub-second signal delivery for high-frequency edge.
              </p>
              
              {/* Custom micro-widget */}
              <ScalperWidget active={hoveredCardIndex === 0} />
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-primary hover:text-white transition-colors mt-8 self-start group/link">
              <span>Learn more</span>
              <ArrowRight className={`trader-arrow-icon w-3.5 h-3.5 transition-transform duration-300 ${
                hoveredCardIndex === 0 ? 'translate-x-1 text-white' : ''
              }`} />
            </a>
          </div>

          {/* 02 Swing Traders */}
          <div 
            className={`trader-card relative bg-black p-6 sm:p-8 border-2 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 ${
              hoveredCardIndex === 1 
                ? 'border-primary -translate-y-1.5 shadow-[0_0_15px_rgba(0,255,204,0.15)] bg-primary/[0.01]' 
                : 'border-white/15 shadow-[4px_4px_0px_rgba(255,255,255,0.05)]'
            }`}
            onMouseEnter={() => setHoveredCardIndex(1)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
            <div className={`trader-bg-number absolute -top-4 -right-2 text-7xl font-display font-black font-mono select-none pointer-events-none transition-all duration-300 ${
              hoveredCardIndex === 1 ? 'text-primary/[0.08] -translate-x-3 scale-105' : 'text-white/[0.03]'
            }`}>
              02
            </div>
            <div>
              <span className="text-xs font-mono text-primary font-bold block mb-2">// 02 //</span>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-3">
                Swing Traders
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-body leading-relaxed">
                Track smart-money conviction across longer timeframes. See multi-day positioning trends before narratives break.
              </p>
              
              {/* Custom micro-widget */}
              <SwingWidget active={hoveredCardIndex === 1} />
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-primary hover:text-white transition-colors mt-8 self-start group/link">
              <span>Learn more</span>
              <ArrowRight className={`trader-arrow-icon w-3.5 h-3.5 transition-transform duration-300 ${
                hoveredCardIndex === 1 ? 'translate-x-1 text-white' : ''
              }`} />
            </a>
          </div>

          {/* 03 Quant Desks */}
          <div 
            className={`trader-card relative bg-black p-6 sm:p-8 border-2 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 ${
              hoveredCardIndex === 2 
                ? 'border-primary -translate-y-1.5 shadow-[0_0_15px_rgba(0,255,204,0.15)] bg-primary/[0.01]' 
                : 'border-white/15 shadow-[4px_4px_0px_rgba(255,255,255,0.05)]'
            }`}
            onMouseEnter={() => setHoveredCardIndex(2)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
            <div className={`trader-bg-number absolute -top-4 -right-2 text-7xl font-display font-black font-mono select-none pointer-events-none transition-all duration-300 ${
              hoveredCardIndex === 2 ? 'text-primary/[0.08] -translate-x-3 scale-105' : 'text-white/[0.03]'
            }`}>
              03
            </div>
            <div>
              <span className="text-xs font-mono text-primary font-bold block mb-2">// 03 //</span>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-3">
                Quant Desks
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-body leading-relaxed">
                Structured market intelligence and behavioral signal feeds via API. Integrate i5 intelligence into your automated workflows.
              </p>
              
              {/* Custom micro-widget */}
              <QuantWidget active={hoveredCardIndex === 2} />
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-primary hover:text-white transition-colors mt-8 self-start group/link">
              <span>Learn more</span>
              <ArrowRight className={`trader-arrow-icon w-3.5 h-3.5 transition-transform duration-300 ${
                hoveredCardIndex === 2 ? 'translate-x-1 text-white' : ''
              }`} />
            </a>
          </div>

          {/* 04 Signal Providers */}
          <div 
            className={`trader-card relative bg-black p-6 sm:p-8 border-2 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 ${
              hoveredCardIndex === 3 
                ? 'border-primary -translate-y-1.5 shadow-[0_0_15px_rgba(0,255,204,0.15)] bg-primary/[0.01]' 
                : 'border-white/15 shadow-[4px_4px_0px_rgba(255,255,255,0.05)]'
            }`}
            onMouseEnter={() => setHoveredCardIndex(3)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
            <div className={`trader-bg-number absolute -top-4 -right-2 text-7xl font-display font-black font-mono select-none pointer-events-none transition-all duration-300 ${
              hoveredCardIndex === 3 ? 'text-primary/[0.08] -translate-x-3 scale-105' : 'text-white/[0.03]'
            }`}>
              04
            </div>
            <div>
              <span className="text-xs font-mono text-primary font-bold block mb-2">// 04 //</span>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-3">
                Signal Providers
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-body leading-relaxed">
                Build audiences and monetize verified, on-chain performance metrics. Share telemetry triggers directly.
              </p>
              
              {/* Custom micro-widget */}
              <SignalWidget active={hoveredCardIndex === 3} />
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-primary hover:text-white transition-colors mt-8 self-start group/link">
              <span>Learn more</span>
              <ArrowRight className={`trader-arrow-icon w-3.5 h-3.5 transition-transform duration-300 ${
                hoveredCardIndex === 3 ? 'translate-x-1 text-white' : ''
              }`} />
            </a>
          </div>

          {/* 05 Crypto Funds */}
          <div 
            className={`trader-card relative bg-black p-6 sm:p-8 border-2 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 ${
              hoveredCardIndex === 4 
                ? 'border-primary -translate-y-1.5 shadow-[0_0_15px_rgba(0,255,204,0.15)] bg-primary/[0.01]' 
                : 'border-white/15 shadow-[4px_4px_0px_rgba(255,255,255,0.05)]'
            }`}
            onMouseEnter={() => setHoveredCardIndex(4)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
            <div className={`trader-bg-number absolute -top-4 -right-2 text-7xl font-display font-black font-mono select-none pointer-events-none transition-all duration-300 ${
              hoveredCardIndex === 4 ? 'text-primary/[0.08] -translate-x-3 scale-105' : 'text-white/[0.03]'
            }`}>
              05
            </div>
            <div>
              <span className="text-xs font-mono text-primary font-bold block mb-2">// 05 //</span>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-3">
                Crypto Funds
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-body leading-relaxed">
                Monitor market structure and coordinated whale sentiment in real time. Institutional dashboards and risk overlays to secure capital placement.
              </p>
              
              {/* Custom micro-widget */}
              <FundWidget active={hoveredCardIndex === 4} />
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-primary hover:text-white transition-colors mt-8 self-start group/link">
              <span>Learn more</span>
              <ArrowRight className={`trader-arrow-icon w-3.5 h-3.5 transition-transform duration-300 ${
                hoveredCardIndex === 4 ? 'translate-x-1 text-white' : ''
              }`} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
