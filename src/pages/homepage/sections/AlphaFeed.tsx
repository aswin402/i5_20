import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const feedRow1 = [
  { pair: 'BTCUSD PERP', type: 'LONG', lev: '100x', status: 'TARGET 3 HIT', profit: '+842.3%', isBullish: true },
  { pair: 'SOLUSD PERP', type: 'SHORT', lev: '50x', status: 'ENTRY ACQUIRED', profit: '+12.4%', isBullish: false },
  { pair: 'ETHUSD PERP', type: 'LONG', lev: '75x', status: 'LIQUIDATION SWEPT', profit: '+184.2%', isBullish: true },
  { pair: 'AVAXUSD PERP', type: 'SHORT', lev: '25x', status: 'TARGET 1 HIT', profit: '+64.5%', isBullish: false },
  { pair: 'LINKUSD PERP', type: 'LONG', lev: '50x', status: 'TARGET 2 HIT', profit: '+142.9%', isBullish: true },
  { pair: 'NEARUSD PERP', type: 'LONG', lev: '30x', status: 'SL HIT', profit: '-15.4%', isBullish: false }
];

const feedRow2 = [
  // Group 1
  { msg: 'Momentum Shift', isAlert: false },
  { msg: 'Liquidity Gap', isAlert: false },
  { msg: 'Whale Accumulation', isAlert: false },
  { msg: 'Alpha Detected', isAlert: true },
  { msg: 'Momentum Shift', isAlert: false },
  { msg: 'Liquidity Gap', isAlert: false },
  { msg: 'Whale Accumulation', isAlert: false },
  { msg: 'Alpha Detected', isAlert: true },
  { msg: 'Momentum Shift', isAlert: false },
  { msg: 'Liquidity Gap', isAlert: false },
  { msg: 'Whale Accumulation', isAlert: false },
  { msg: 'Alpha Detected', isAlert: true },
  { msg: 'Momentum Shift', isAlert: false },
  { msg: 'Liquidity Gap', isAlert: false },
  { msg: 'Whale Accumulation', isAlert: false },

  // Group 2
  { msg: 'Sentiment Flip', isAlert: false },
  { msg: 'Large Transfer', isAlert: false },
  { msg: 'Breakout Triggered', isAlert: false },
  { msg: 'Smart Money Inflow', isAlert: false },
  { msg: 'Sentiment Flip', isAlert: false },
  { msg: 'Large Transfer', isAlert: false },
  { msg: 'Breakout Triggered', isAlert: false },
  { msg: 'Smart Money Inflow', isAlert: false },
  { msg: 'Sentiment Flip', isAlert: false },
  { msg: 'Large Transfer', isAlert: false },
  { msg: 'Breakout Triggered', isAlert: false },
  { msg: 'Smart Money Inflow', isAlert: false },
  { msg: 'Sentiment Flip', isAlert: false },
  { msg: 'Large Transfer', isAlert: false },
  { msg: 'Breakout Triggered', isAlert: false },
  { msg: 'Smart Money Inflow', isAlert: false },

  // Group 3
  { msg: 'Volatility Spike', isAlert: false },
  { msg: 'Capital Rotation', isAlert: false },
  { msg: 'Order Flow Surge', isAlert: false },
  { msg: 'Trend Reversal', isAlert: false },
  { msg: 'Volatility Spike', isAlert: false },
  { msg: 'Capital Rotation', isAlert: false },
  { msg: 'Order Flow Surge', isAlert: false },
  { msg: 'Trend Reversal', isAlert: false },
  { msg: 'Volatility Spike', isAlert: false },
  { msg: 'Capital Rotation', isAlert: false },
  { msg: 'Order Flow Surge', isAlert: false },
  { msg: 'Trend Reversal', isAlert: false },
  { msg: 'Volatility Spike', isAlert: false },
  { msg: 'Capital Rotation', isAlert: false },
  { msg: 'Order Flow Surge', isAlert: false },
  { msg: 'Trend Reversal', isAlert: false }
];

export function AlphaFeed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in entry of the header content
      gsap.from('.feed-header > *', {
        scrollTrigger: {
          trigger: '#alpha-feed',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Fade-in entry of the ticker rows
      gsap.from('.feed-ticker-row', {
        scrollTrigger: {
          trigger: '#alpha-feed',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
      });

      // GSAP driven infinite marquee rows
      const row1 = containerRef.current?.querySelector('.marquee-row-1') as HTMLElement;
      const row2 = containerRef.current?.querySelector('.marquee-row-2') as HTMLElement;

      if (row1 && row2) {
        // Calculate scroll widths (half of total width since we duplicated)
        const w1 = row1.scrollWidth / 2;
        const w2 = row2.scrollWidth / 2;

        // Dynamic duration based on width to keep scrolling speed identical
        const speed = 100; // pixels per second
        const duration1 = w1 / speed;
        const duration2 = w2 / speed;

        const tween1 = gsap.to(row1, {
          x: -w1,
          duration: duration1,
          ease: 'none',
          repeat: -1,
        });

        // Set initial offset for row 2 so reverse direction loops seamlessly
        gsap.set(row2, { x: -w2 });
        const tween2 = gsap.to(row2, {
          x: 0,
          duration: duration2,
          ease: 'none',
          repeat: -1,
        });

        // Adjust timeScale based on scroll velocity
        ScrollTrigger.create({
          trigger: '#alpha-feed',
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity() / 150);
            const speedScale = 1 + Math.min(velocity, 4);

            gsap.to([tween1, tween2], {
              timeScale: speedScale,
              duration: 0.3,
              overwrite: 'auto',
            });

            // Decelerate back to normal
            gsap.to([tween1, tween2], {
              timeScale: 1,
              delay: 0.3,
              duration: 0.6,
              ease: 'power1.out',
              overwrite: 'auto',
            });
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="alpha-feed" className="pt-4 sm:pt-16 pb-16 bg-[#030304] border-y-2 border-white/10 overflow-hidden select-none relative z-20">
      {/* Background neon grid line */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,204,0.015)_1px,transparent_1px)] bg-[size:100%_16px] pointer-events-none" />

      <div className="feed-header max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 mb-8 text-left relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00ffcc]" />
          <h2 className="text-xl font-display font-black text-white uppercase tracking-widest">
            Live Signal Diagnostics (Alpha Feed)
          </h2>
        </div>
        <p className="text-xs font-mono text-white/50 mt-1 uppercase tracking-wider">
          Real-time order routing logs flowing directly from lit & dark matching engines.
        </p>
      </div>

      {/* Row 1: Signals Ticker (Scrolling Left) */}
      <div className="feed-ticker-row flex overflow-hidden w-full gap-6 mb-6 relative z-10">
        <div className="marquee-row-1 whitespace-nowrap flex gap-6">
          {[...feedRow1, ...feedRow1].map((item, idx) => (
            <div 
              key={idx}
              className="inline-flex items-center gap-3 border-2 border-white/15 bg-black px-4 py-3 rounded-none shadow-[3px_3px_0px_rgba(0,255,204,0.3)] hover:border-primary transition-all duration-300"
            >
              <span className="font-mono text-xs font-black text-white">{item.pair}</span>
              <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-none ${
                item.isBullish ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'
              }`}>
                {item.lev} {item.type}
              </span>
              <span className="font-mono text-xs font-bold text-white/50">{item.status}</span>
              <span className={`font-mono text-xs font-black flex items-center gap-0.5 ${
                item.isBullish ? 'text-primary' : 'text-red-500'
              }`}>
                {item.profit}
                {item.isBullish ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Diagnostics Ticker (Scrolling Right) */}
      <div className="feed-ticker-row flex overflow-hidden w-full gap-6 relative z-10">
        <div className="marquee-row-2 whitespace-nowrap flex gap-6">
          {[...feedRow2, ...feedRow2].map((item, idx) => {
            const isAlpha = item.msg === 'Alpha Detected';
            return (
              <div 
                key={idx}
                className={`inline-flex items-center gap-3 border-2 px-7 py-4 rounded-none font-mono text-sm font-black transition-all duration-300 ${
                  isAlpha
                    ? 'bg-emerald-950/40 border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)] animate-pulse'
                    : item.isAlert 
                      ? 'bg-red-950/30 border-red-500 text-red-500 shadow-[3px_3px_0px_rgba(239,68,68,0.3)]' 
                      : 'bg-black border-white/15 text-primary shadow-[3px_3px_0px_rgba(0,255,204,0.2)] hover:border-primary'
                }`}
              >
                {isAlpha ? (
                  <TrendingUp className="w-5 h-5 text-emerald-400 animate-bounce" />
                ) : item.isAlert ? (
                  <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-primary" />
                )}
                <span>{item.msg}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
