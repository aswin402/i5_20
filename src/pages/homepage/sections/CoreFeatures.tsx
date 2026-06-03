import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Wallet, Users, Flame, Bell, Share2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CoreFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.from('.features-header > *', {
        scrollTrigger: {
          trigger: '#core-features',
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
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        scale: 0.96,
        stagger: 0.08,
        duration: 0.8,
        ease: 'back.out(1.2)',
      });

      // Hover animations for all cards
      const cards = containerRef.current?.querySelectorAll('.feature-card');
      cards?.forEach((card) => {
        const iconWrapper = card.querySelector('.feature-icon-wrapper');
        const icon = card.querySelector('.feature-icon');
        const isFlagship = card.classList.contains('border-primary');

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -6,
            borderColor: '#00ffcc',
            boxShadow: '0px 10px 20px rgba(0, 255, 204, 0.25)',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
          if (iconWrapper) {
            gsap.to(iconWrapper, {
              scale: 1.1,
              borderColor: 'rgba(0, 255, 204, 0.4)',
              backgroundColor: 'rgba(0, 255, 204, 0.15)',
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
          if (icon) {
            gsap.to(icon, {
              rotation: 12,
              color: '#00ffcc',
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            borderColor: isFlagship ? '#00ffcc' : 'rgba(255, 255, 255, 0.15)',
            boxShadow: isFlagship ? '4px 4px 0px #00ffcc' : '4px 4px 0px rgba(255, 255, 255, 0.05)',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
          if (iconWrapper) {
            gsap.to(iconWrapper, {
              scale: 1,
              borderColor: isFlagship ? 'rgba(0, 255, 204, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              backgroundColor: isFlagship ? 'rgba(0, 255, 204, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
          if (icon) {
            gsap.to(icon, {
              rotation: 0,
              color: isFlagship ? '#00ffcc' : '#ffffff',
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="core-features" className="relative py-24 px-4 sm:px-8 md:px-12 lg:px-20 border-b border-white/10 select-none bg-[#030304] overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="features-header max-w-none mb-16 text-left">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-primary block mb-2">// CORE CAPABILITIES</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase leading-[1.1]">
            Everything you need to read the market and act on it.
          </h2>
          <p className="text-white/70 font-body text-sm sm:text-base md:text-lg mt-6 leading-relaxed">
            Six core capabilities. One integrated intelligence layer. <span className="text-primary font-bold">Zero guesswork.</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: AI Signal Engine (FLAGSHIP) */}
          <div className="feature-card relative border-r-2 border-b-2 border-primary bg-primary/5 p-6 sm:p-8 shadow-[4px_4px_0px_#00ffcc] flex flex-col justify-between overflow-hidden cursor-pointer">
            {/* Flagship Badge */}
            <div className="absolute top-0 right-0 bg-primary text-black font-mono font-black text-[9px] px-3 py-1 uppercase tracking-wider">
              FLAGSHIP
            </div>
            
            <div>
              <div className="feature-icon-wrapper mb-6 p-2 w-fit bg-primary/10 border border-primary/20">
                <Cpu className="feature-icon w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-3">
                AI Signal Engine
              </h3>
              <p className="text-xs sm:text-base text-white/60 font-body leading-relaxed">
                Order flow + wallet behavior + funding + sentiment fused into ranked, conviction-scored trade setups with explainable reasoning.
              </p>
            </div>

            <div className="hidden md:flex mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-primary/80 items-center justify-between">
              <span>[ ENGINE_STATUS: ACTIVE ]</span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                98.7% CONFIDENCE
              </span>
            </div>
          </div>

          {/* Divider 1 */}
          <div className="hidden max-md:block border-t border-dashed border-primary/30 my-2" />

          {/* Card 2: Smart-Money Tracking */}
          <div className="feature-card relative border-r-2 border-b-2 border-white/15 bg-black p-6 sm:p-8 shadow-[4px_4px_0px_rgba(255,255,255,0.05)] flex flex-col justify-between overflow-hidden cursor-pointer">
            <div>
              <div className="feature-icon-wrapper mb-6 p-2 w-fit bg-white/5 border border-white/10">
                <Wallet className="feature-icon w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-3">
                Smart-Money Tracking
              </h3>
              <p className="text-xs sm:text-base text-white/60 font-body leading-relaxed">
                Live positions, PnL, leverage, and historical behavior of elite Hyperliquid wallets — in real time.
              </p>
            </div>

            <div className="hidden md:flex mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-white/50 items-center justify-between">
              <span>[ WALLETS: 420+ LIVE ]</span>
              <span className="text-primary font-bold">AVG PNL: +34.2%</span>
            </div>
          </div>

          {/* Divider 2 */}
          <div className="hidden max-md:block border-t border-dashed border-primary/30 my-2" />

          {/* Card 3: Cohort Analytics */}
          <div className="feature-card relative border-r-2 border-b-2 border-white/15 bg-black p-6 sm:p-8 shadow-[4px_4px_0px_rgba(255,255,255,0.05)] flex flex-col justify-between overflow-hidden cursor-pointer">
            <div>
              <div className="feature-icon-wrapper mb-6 p-2 w-fit bg-white/5 border border-white/10">
                <Users className="feature-icon w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-3">
                Cohort Analytics
              </h3>
              <p className="text-xs sm:text-base text-white/60 font-body leading-relaxed">
                Segment the market into whales, elites, retail, and the liquidated. See positioning shift before price does.
              </p>
            </div>

            <div className="hidden md:flex mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-white/50 items-center justify-between">
              <span>[ COHORTS: WHALES & RET ]</span>
              <span className="text-white/70">DELTA: BULLISH</span>
            </div>
          </div>

          {/* Divider 3 */}
          <div className="hidden max-md:block border-t border-dashed border-primary/30 my-2" />

          {/* Card 4: Liquidation Heatmaps */}
          <div className="feature-card relative border-r-2 border-b-2 border-white/15 bg-black p-6 sm:p-8 shadow-[4px_4px_0px_rgba(255,255,255,0.05)] flex flex-col justify-between overflow-hidden cursor-pointer">
            <div>
              <div className="feature-icon-wrapper mb-6 p-2 w-fit bg-white/5 border border-white/10">
                <Flame className="feature-icon w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-3">
                Liquidation Heatmaps
              </h3>
              <p className="text-xs sm:text-base text-white/60 font-body leading-relaxed">
                Visualize where leverage is clustered. Trade liquidity events instead of getting caught in them.
              </p>
            </div>

            <div className="hidden md:flex mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-white/50 items-center justify-between">
              <span>[ MAPS: SOL / BTC / ETH ]</span>
              <span className="text-red-500 font-bold">HIGH LIQ CLUSTER</span>
            </div>
          </div>

          {/* Divider 4 */}
          <div className="hidden max-md:block border-t border-dashed border-primary/30 my-2" />

          {/* Card 5: Real-Time Alerts */}
          <div className="feature-card relative border-r-2 border-b-2 border-white/15 bg-black p-6 sm:p-8 shadow-[4px_4px_0px_rgba(255,255,255,0.05)] flex flex-col justify-between overflow-hidden cursor-pointer">
            <div>
              <div className="feature-icon-wrapper mb-6 p-2 w-fit bg-white/5 border border-white/10">
                <Bell className="feature-icon w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-3">
                Real-Time Alerts
              </h3>
              <p className="text-xs sm:text-base text-white/60 font-body leading-relaxed">
                Whale activity, funding swings, narrative acceleration — delivered to mobile, Telegram, Discord, or webhooks.
              </p>
            </div>

            <div className="hidden md:flex mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-white/50 items-center justify-between">
              <span>[ PUSH_LATENCY: &lt;10ms ]</span>
              <span className="text-primary font-bold">ACTIVE DEPLOY</span>
            </div>
          </div>

          {/* Divider 5 */}
          <div className="hidden max-md:block border-t border-dashed border-primary/30 my-2" />

          {/* Card 6: Social Trading Streams */}
          <div className="feature-card relative border-r-2 border-b-2 border-white/15 bg-black p-6 sm:p-8 shadow-[4px_4px_0px_rgba(255,255,255,0.05)] flex flex-col justify-between overflow-hidden cursor-pointer">
            <div>
              <div className="feature-icon-wrapper mb-6 p-2 w-fit bg-white/5 border border-white/10">
                <Share2 className="feature-icon w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mb-3">
                Social Trading Streams
              </h3>
              <p className="text-xs sm:text-base text-white/60 font-body leading-relaxed">
                Every asset becomes a live intelligence feed. Bloomberg Terminal meets Stocktwits meets Hyperliquid.
              </p>
            </div>

            <div className="hidden md:flex mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-white/50 items-center justify-between">
              <span>[ FEEDS: DYNAMIC AGENTS ]</span>
              <span className="text-white/70">12,482 USERS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
