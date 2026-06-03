import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DeltaAnalyzerProps {
  activeRow: number | null;
}

// Scrambles text characters to simulate live decoding telemetry
function ScrambleText({ text, speed = 25 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    let iteration = 0;
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_$%@#';
    
    // Set immediate randomized character template matching the length
    setDisplayText(
      text
        .split("")
        .map((char) => (char === " " ? " " : chars[Math.floor(Math.random() * chars.length)]))
        .join("")
    );

    const interval = setInterval(() => {
      setDisplayText(() => 
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1;
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed]);
  
  return <>{displayText}</>;
}

// Canvas-based multi-layered sinusoidal neural/signal waveform tracker
function HudWaveform({ activeRow }: { activeRow: number | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let phase = 0;
    
    const currentParams = {
      amplitude: 12,
      frequency: 0.02,
      speed: 0.04,
      noise: 0
    };
    
    const targetParams = {
      amplitude: 12,
      frequency: 0.02,
      speed: 0.04,
      noise: 0
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const draw = () => {
      // Create slight motion trail/opacity decay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerY = height / 2;
      
      // Interpolate towards targets for smooth transitions
      currentParams.amplitude += (targetParams.amplitude - currentParams.amplitude) * 0.1;
      currentParams.frequency += (targetParams.frequency - currentParams.frequency) * 0.1;
      currentParams.speed += (targetParams.speed - currentParams.speed) * 0.1;
      currentParams.noise += (targetParams.noise - currentParams.noise) * 0.1;
      
      phase += currentParams.speed;
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 255, 204, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Layer 1: Primary Neon Cyan signal core
      ctx.strokeStyle = '#00ffcc';
      ctx.shadowColor = '#00ffcc';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const noiseVal = (Math.random() - 0.5) * currentParams.noise;
        const y = centerY + Math.sin(x * currentParams.frequency + phase) * currentParams.amplitude + noiseVal;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Layer 2: Ambient outer echo line
      ctx.strokeStyle = 'rgba(0, 255, 204, 0.3)';
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * (currentParams.frequency * 1.6) - phase * 0.7) * (currentParams.amplitude * 0.6);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Layer 3: Dashed background telemetry pulses
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.setLineDash([2, 5]);
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * (currentParams.frequency * 2.5) + phase * 1.8) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    if (activeRow !== null) {
      targetParams.amplitude = 20 + activeRow * 2.5;
      targetParams.frequency = 0.04 + activeRow * 0.012;
      targetParams.speed = 0.14;
      targetParams.noise = 2.5;
    } else {
      targetParams.amplitude = 10;
      targetParams.frequency = 0.025;
      targetParams.speed = 0.04;
      targetParams.noise = 0;
    }
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeRow]);
  
  return (
    <div className="relative h-20 w-full bg-black/90 border border-primary/20 overflow-hidden mt-4">
      <div className="absolute top-1.5 left-2 text-[7px] tracking-wider font-mono text-primary/50">// HUD_WAVEFORM_MONITOR</div>
      <div className="absolute top-1.5 right-2 text-[7px] tracking-wider font-mono text-primary/50">[ SIGNAL_WARP_LOCKED ]</div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

function I5DeltaAnalyzer({ activeRow }: DeltaAnalyzerProps) {
  const telemetryData = [
    {
      metric: "COGNITIVE CAPACITY",
      traditional: "1.2 GFLOPS [MANUAL]",
      i5: "48.2 TFLOPS [CO-PROCESSOR]",
      delta: "+3,916% SPEEDUP",
      progressTrad: 12,
      progressI5: 98,
      status: "AI_INGEST_CONVERGED"
    },
    {
      metric: "WORKFLOW CONCURRENCY",
      traditional: "8 FRAGMENTED TOOLS",
      i5: "1 UNIFIED TERMINAL",
      delta: "100% CONSOLIDATED",
      progressTrad: 25,
      progressI5: 100,
      status: "INTEGRATION_SYNCED"
    },
    {
      metric: "SIGNAL PROPAGATION",
      traditional: "45,000ms [DELAYED]",
      i5: "3.4ms [REAL-TIME]",
      delta: "-99.99% LATENCY",
      progressTrad: 5,
      progressI5: 99,
      status: "ALERT_ROUTER_WARP"
    },
    {
      metric: "DATA DIMENSIONALITY",
      traditional: "SIMPLE OHLC PRICES",
      i5: "COHORT LIQ HEATMAPS",
      delta: "64x RESOLUTION",
      progressTrad: 18,
      progressI5: 95,
      status: "ANALYTICS_RESOLVED"
    },
    {
      metric: "SENTIMENT DEPTH",
      traditional: "PUBLIC TWITTER FEEDS",
      i5: "WHALE WALLET METRICS",
      delta: "DIRECT INFLOW TRACE",
      progressTrad: 30,
      progressI5: 92,
      status: "COHORT_INTELLIGENCE"
    },
    {
      metric: "DECISION CONVICTION",
      traditional: "GUESSWORK & EMOTION",
      i5: "BAYESIAN PROBABILITY",
      delta: "MATHEMATICAL EDGE",
      progressTrad: 15,
      progressI5: 97,
      status: "CONVICTION_MAXIMUM"
    }
  ];

  const current = activeRow !== null ? telemetryData[activeRow] : {
    metric: "SYSTEM CONVERGENCE",
    traditional: "MANUAL PROCESSES",
    i5: "WEAPONIZED RUNTIME",
    delta: "ACTIVE DELTA EDGE",
    progressTrad: 20,
    progressI5: 90,
    status: "SYSTEM_STANDBY_READY"
  };

  return (
    <div className="relative w-full border border-primary/20 bg-black/60 p-5 mt-6 font-mono text-[10px] text-white shadow-[0_0_20px_rgba(0,0,0,0.8)] select-none overflow-hidden">
      {/* Corner Bracket decorations */}
      <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-white/20" />
      <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-white/20" />
      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-white/20" />
      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-white/20" />

      {/* Screen CRT effect overlay */}
      <div className="absolute inset-0 crt-scanline opacity-10 pointer-events-none" />

      {/* Matrix binary falling stream backdrop */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none font-mono text-[8px] overflow-hidden select-none flex justify-around">
        {Array.from({ length: 6 }).map((_, colIdx) => (
          <div 
            key={colIdx} 
            className="flex flex-col animate-[matrix-rain_10s_linear_infinite]"
            style={{ 
              animationDelay: `${colIdx * 1.4}s`,
              animationDuration: `${6 + colIdx * 2.2}s`
            }}
          >
            {Array.from({ length: 15 }).map((_, charIdx) => (
              <span key={charIdx}>
                {Math.random() > 0.5 ? '1' : '0'}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* HUD Header */}
      <div className="flex justify-between items-center pb-2.5 border-b border-white/10 mb-4 text-[9px] text-white/50 relative z-10">
        <span className="text-primary font-black tracking-widest">// DELTA TELEMETRY //</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
          <span className="text-primary font-bold">{current.status}</span>
        </span>
      </div>

      {/* Metric Display */}
      <div className="space-y-4 relative z-10">
        <div>
          <div className="text-[9px] text-white/40 uppercase">ACTIVE_METRIC</div>
          <div className="text-sm font-bold text-white tracking-wide uppercase mt-0.5 min-h-[20px]">
            <ScrambleText key={current.metric} text={current.metric} />
          </div>
        </div>

        {/* Traditional Progress bar */}
        <div>
          <div className="flex justify-between text-white/50 text-[9px] mb-1 min-h-[14px]">
            <span>TRADITIONAL TRADING</span>
            <span>
              <ScrambleText key={current.traditional} text={current.traditional} />
            </span>
          </div>
          <div className="h-1.5 bg-white/5 w-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-red-500/60 transition-all duration-500 ease-out"
              style={{ width: `${current.progressTrad}%` }}
            />
          </div>
        </div>

        {/* i5 Progress bar */}
        <div>
          <div className="flex justify-between text-primary text-[9px] mb-1 min-h-[14px]">
            <span>i5 RUNTIME ENVIRONMENT</span>
            <span>
              <ScrambleText key={current.i5} text={current.i5} />
            </span>
          </div>
          <div className="h-1.5 bg-primary/5 w-full overflow-hidden border border-primary/20 shadow-[0_0_5px_rgba(0,255,204,0.1)]">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_8px_#00ffcc]"
              style={{ width: `${current.progressI5}%` }}
            />
          </div>
        </div>

        {/* Live dynamic waveform monitor */}
        <HudWaveform activeRow={activeRow} />

        {/* Delta Output Card */}
        <div className="border border-primary/30 bg-primary/5 p-3 flex justify-between items-center mt-4">
          <span className="text-[8px] text-primary/80 uppercase tracking-widest">COGNITIVE_GAIN:</span>
          <span className="text-sm font-black text-primary tracking-wide min-h-[20px]">
            <ScrambleText key={current.delta} text={current.delta} speed={30} />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Edge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileScrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [lineDeltaY, setLineDeltaY] = useState<number>(0);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setHoveredRowIndex(0);
    }
  }, []);

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    if (width === 0) return;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex >= 0 && newIndex < 6 && newIndex !== hoveredRowIndex) {
      setHoveredRowIndex(newIndex);
    }
  };

  const handleRowSelect = (idx: number) => {
    setHoveredRowIndex(idx);
    if (mobileScrollContainerRef.current) {
      const container = mobileScrollContainerRef.current;
      container.scrollTo({
        left: idx * container.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (hoveredRowIndex === null || !telemetryRef.current) {
      setLineDeltaY(0);
      return;
    }

    const calculateDeltaY = () => {
      const rowEl = rowRefs.current[hoveredRowIndex];
      const telemetryEl = telemetryRef.current;
      if (!rowEl || !telemetryEl) return;

      const rowRect = rowEl.getBoundingClientRect();
      const telemetryRect = telemetryEl.getBoundingClientRect();

      const rowCenterY = rowRect.top + rowRect.height / 2;
      const telemetryTop = telemetryRect.top;
      const telemetryBottom = telemetryRect.bottom;

      if (rowCenterY < telemetryTop) {
        setLineDeltaY(telemetryTop - rowCenterY);
      } else if (rowCenterY > telemetryBottom) {
        setLineDeltaY(telemetryBottom - rowCenterY);
      } else {
        setLineDeltaY(0);
      }
    };

    calculateDeltaY();
    window.addEventListener('resize', calculateDeltaY);
    return () => {
      window.removeEventListener('resize', calculateDeltaY);
    };
  }, [hoveredRowIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.from('.edge-header > *', {
        scrollTrigger: {
          trigger: '#i5-edge',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Comparison table fade-in
      gsap.from('.edge-table', {
        scrollTrigger: {
          trigger: '.edge-table',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      });

      // Alternating row entries
      const rows = containerRef.current?.querySelectorAll('.edge-row');
      rows?.forEach((row, idx) => {
        const isMobile = window.innerWidth < 768;
        gsap.fromTo(row,
          { opacity: 0, x: isMobile ? 0 : (idx % 2 === 0 ? -30 : 30) },
          {
            scrollTrigger: {
              trigger: '.edge-table',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            x: 0,
            delay: idx * 0.06,
            duration: 0.7,
            ease: 'power2.out',
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="i5-edge" className="relative py-24 px-4 sm:px-8 md:px-12 lg:px-20 border-b border-white/10 select-none bg-black overflow-hidden">
      {/* Glitch and animation keyframe injections */}
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
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
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        @keyframes matrix-rain {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
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
        @keyframes bounce-left {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(-4px); }
        }
        @keyframes bounce-right {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(4px); }
        }
        .animate-bounce-left {
          animation: bounce-left 1.2s infinite ease-in-out;
        }
        .animate-bounce-right {
          animation: bounce-right 1.2s infinite ease-in-out;
        }
      `}</style>

      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-stretch items-start">
          
          {/* Left Column: Header & Dynamic Telemetry Console */}
          <div className="lg:col-span-4 w-full">
            <div className="lg:sticky lg:top-24 h-fit flex flex-col justify-start">
              {/* Header */}
              <div className="edge-header max-w-3xl text-left">
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-primary block mb-2">// COGNITIVE DELTA</span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase leading-none">
                  THE <span className='lowercase'>i5</span> EDGE
                </h2>
                <div className="mt-4 flex flex-col gap-1 font-display font-bold text-lg text-white">
                  <div className='font-bold text-xl'>Traditional vs <span className='text-primary lowercase'>i5</span></div>
                </div>
                <p className="text-white/70 font-body text-sm sm:text-base md:text-lg mt-6 leading-relaxed">
                  Every row represents a paradigm shift in execution, intelligence, and coordination. Stop guessing — <span className="text-primary font-bold">start knowing.</span>
                </p>
              </div>
                           {/* Live Telemetry HUD */}
              <div ref={telemetryRef} className="block">
                <I5DeltaAnalyzer activeRow={hoveredRowIndex} />
              </div>
            </div>
          </div>
 
          {/* Right Column: Comparison Table */}
          <div className="lg:col-span-8 w-full lg:h-full">
            <div className="edge-table border-2 border-white/10 bg-black/40 backdrop-blur-md overflow-hidden md:overflow-visible relative shadow-[4px_4px_0px_rgba(255,255,255,0.02)] w-full lg:h-full lg:flex lg:flex-col">
              
              {/* Left arrow navigator on mobile */}
              {hoveredRowIndex !== null && hoveredRowIndex > 0 && (
                <button
                  onClick={() => handleRowSelect(hoveredRowIndex - 1)}
                  className="absolute left-2 top-[62%] md:hidden z-40 bg-black/80 backdrop-blur-md border border-primary/30 text-primary p-2 rounded-full shadow-[0_0_10px_rgba(0,255,204,0.15)] animate-bounce-left transition-all duration-300 hover:bg-primary/20"
                  aria-label="Previous compare slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {/* Right arrow navigator on mobile */}
              {(hoveredRowIndex === null || hoveredRowIndex < 5) && (
                <button
                  onClick={() => handleRowSelect(hoveredRowIndex === null ? 1 : hoveredRowIndex + 1)}
                  className="absolute right-2 top-[62%] md:hidden z-40 bg-black/80 backdrop-blur-md border border-primary/30 text-primary p-2 rounded-full shadow-[0_0_10px_rgba(0,255,204,0.15)] animate-bounce-right transition-all duration-300 hover:bg-primary/20"
                  aria-label="Next compare slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {/* Table Header Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest shrink-0">
                <div className="p-4 sm:p-6 text-white/50 border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-between">
                  <span>Traditional Trading</span>
                  <span className="text-red-500/80 font-bold">[ LIMITED ]</span>
                </div>
                <div className="p-4 sm:p-6 text-primary flex items-center justify-between bg-primary/5">
                  <span><span className='text-white lowercase'>i5</span> Intelligence</span>
                  <span className="text-primary font-black animate-pulse">[ WEAPONIZED ]</span>
                </div>
              </div>
 
              {/* Comparison Rows */}
              <div 
                ref={mobileScrollContainerRef}
                onScroll={handleMobileScroll}
                className="divide-y-0 md:divide-y divide-white/5 font-mono text-sm sm:text-base lg:flex-1 lg:flex lg:flex-col flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none scrollbar-none w-full"
              >
                {[
                  { traditional: 'Manual analysis', i5: 'AI-assisted intelligence' },
                  { traditional: 'Fragmented tools', i5: 'Unified terminal' },
                  { traditional: 'Delayed reaction', i5: 'Real-time alerts' },
                  { traditional: 'Basic charts', i5: 'Smart-money analytics' },
                  { traditional: 'Public sentiment', i5: 'Whale positioning insights' },
                  { traditional: 'Guesswork', i5: 'Data-driven conviction' }
                ].map((row, idx) => (
                  <div 
                    key={idx} 
                    ref={(el) => { rowRefs.current[idx] = el; }}
                    className={`edge-row grid grid-cols-1 md:grid-cols-2 group border-white/10 transition-all duration-300 relative lg:flex-1 w-full shrink-0 snap-start md:w-auto md:shrink ${
                      hoveredRowIndex === idx 
                        ? 'bg-primary/[0.02] border-y border-y-primary/20 scale-[1.005] z-20' 
                        : 'bg-transparent border-y border-y-transparent'
                    }`}
                    onMouseEnter={() => setHoveredRowIndex(idx)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                  >
                    {/* Glowing outer border box (full 4-sided outline on hover) */}
                    {hoveredRowIndex === idx && (
                      <div className="absolute inset-0 border border-primary shadow-[0_0_15px_rgba(0,255,204,0.25)] pointer-events-none z-30" />
                    )}
 
                    {/* Connecting Data Bus line (crawls to the left towards HUD on desktop) */}
                    {hoveredRowIndex === idx && (
                      <div className="absolute -left-[48px] top-1/2 -translate-y-1/2 w-[48px] h-[4px] lg:flex hidden items-center justify-end overflow-visible pointer-events-none z-30">
                        <svg className="w-full h-full" overflow="visible">
                          <path 
                            d={`M 48 2 L 0 ${2 + lineDeltaY}`} 
                            stroke="#00ffcc" 
                            strokeWidth="2" 
                            strokeDasharray="4, 4" 
                            className="animate-[dash_0.5s_linear_infinite]"
                            style={{
                              filter: 'drop-shadow(0px 0px 4px #00ffcc)'
                            }}
                          />
                          <circle cx="0" cy={2 + lineDeltaY} r="3" fill="#00ffcc">
                            <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" />
                          </circle>
                        </svg>
                      </div>
                    )}
 
                    {/* Left side: Traditional */}
                    <div className={`p-4 sm:p-6 border-b border-white/5 md:border-b-0 md:border-r border-white/10 flex items-center gap-3 transition-opacity duration-300 relative overflow-hidden z-10 ${
                      hoveredRowIndex !== null && hoveredRowIndex !== idx ? 'opacity-25' : 'opacity-100'
                    } ${hoveredRowIndex === idx ? 'text-red-500/40' : 'text-white/55'}`}>
                      {/* Sweep scan inside cell */}
                      {hoveredRowIndex === idx && (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full animate-[sweep_0.8s_ease-out_forwards] pointer-events-none z-0" />
                      )}
                      <X className="edge-x-icon w-4 h-4 text-red-500/60 shrink-0 relative z-10" />
                      <span className={`relative z-10 ${hoveredRowIndex === idx ? 'animate-[glitch-shake_0.3s_infinite] line-through font-mono' : ''}`}>
                        {row.traditional}
                      </span>
                    </div>
 
                    {/* Right side: i5 */}
                    <div className={`p-4 sm:p-6 flex items-center gap-3 transition-all duration-300 relative overflow-hidden z-10 ${
                      hoveredRowIndex !== null && hoveredRowIndex !== idx ? 'opacity-25' : 'opacity-100'
                    } ${hoveredRowIndex === idx ? 'bg-primary/5 text-primary' : 'bg-primary/[0.01] text-white'}`}>
                      {/* Sweep scan inside cell */}
                      {hoveredRowIndex === idx && (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full animate-[sweep_0.8s_ease-out_forwards] pointer-events-none z-0" />
                      )}
                      
                      {/* Checkmark wrapper containing neon concentric ripples */}
                      <div className="relative flex items-center justify-center shrink-0 w-6 h-6 z-10">
                        {hoveredRowIndex === idx && (
                          <>
                            <span className="absolute inset-0 rounded-full border border-primary/50 animate-[ripple_0.8s_ease-out_infinite]" />
                            <span className="absolute inset-0 rounded-full border border-primary/20 animate-[ripple_0.8s_ease-out_infinite_0.3s]" />
                          </>
                        )}
                        <Check className={`edge-check-icon w-4 h-4 text-primary shrink-0 transition-transform duration-300 relative z-10 ${
                          hoveredRowIndex === idx ? 'scale-125 rotate-6 filter drop-shadow-[0_0_5px_#00ffcc]' : 'scale-100'
                        }`} />
                      </div>
                      
                      <span className={`relative z-10 ${hoveredRowIndex === idx ? 'font-black tracking-wide' : 'font-bold tracking-wide'}`}>
                        {row.i5}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile swipe navigation dots */}
            <div className="flex md:hidden flex-col items-center gap-2 mt-4">
              <div className="flex justify-center items-center gap-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRowSelect(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      hoveredRowIndex === idx || (hoveredRowIndex === null && idx === 0) ? 'bg-primary w-4' : 'bg-white/20 w-1.5'
                    }`}
                    aria-label={`Go to row ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="text-[9px] font-mono text-white/30 tracking-widest uppercase flex items-center gap-1.5 animate-pulse">
                <span>&larr;</span> swipe to compare <span>&rarr;</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
