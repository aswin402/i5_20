import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroSectionProps {
  triggerShake: () => void;
}

export function HeroSection({ triggerShake }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

      // Set initial hidden states
      gsap.set('.hero-fade-in', { opacity: 0, y: 30 });
      gsap.set('.hero-title-line > span', { yPercent: 100, opacity: 0 });

      // Entry Animations
      tl.to('.hero-title-line > span', {
        yPercent: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: 'power4.out',
      })
      .to('.hero-fade-in', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
      }, '-=0.6');

      // Mouse parallax on the background video container
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 15;
        const yPercent = (clientY / window.innerHeight - 0.5) * 15;
        
        gsap.to('.hero-bg-video', {
          x: xPercent,
          y: yPercent,
          duration: 1.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Button hover animation
      const btn = containerRef.current?.querySelector('.hero-btn');
      if (btn) {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, {
            scale: 1.03,
            boxShadow: '0 8px 24px rgba(0, 255, 204, 0.4)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            scale: 1,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }

      // Stats item hover animation
      const stats = containerRef.current?.querySelectorAll('.hero-stat-item');
      stats?.forEach((stat) => {
        const val = stat.querySelector('.stat-val');
        const lbl = stat.querySelector('.stat-lbl');
        stat.addEventListener('mouseenter', () => {
          gsap.to(val, {
            scale: 1.05,
            color: '#00ffcc',
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to(lbl, {
            letterSpacing: '0.18em',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        stat.addEventListener('mouseleave', () => {
          gsap.to(val, {
            scale: 1,
            color: '#ffffff',
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to(lbl, {
            letterSpacing: '0.1em',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[92vh] flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20 pt-10 select-none pb-12 overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 select-none hero-bg-video">
        {/* Ambient Blurred Video Background (Covers entire screen to eliminate letterboxing) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover filter blur-3xl opacity-35"
        >
          <source src="./libst.mp4" type="video/mp4" />
          <source src="./libst.webm" type="video/webm" />
        </video>
        
        {/* Crisp Video Background (Contained and right-aligned to remain fully visible and uncropped) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 bottom-0 left-0 right-[30px] w-[calc(100%-30px)] h-full object-contain lg:object-right object-center filter brightness-95 transform -translate-x-8 -translate-y-6"
        >
          <source src="./libst.mp4" type="video/mp4" />
          <source src="./libst.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Asymmetrical Grid layout (Broken Rhythm) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Slogans and CTAs (Col 1-8) */}
        <div className="lg:col-span-8 xl:col-span-7 flex flex-col gap-6 text-left lg:ml-[120px] ml-[60px]">
          
          {/* Top Badge: Now in Private Beta | Built on Hyperliquid */}
          <div className="self-start hero-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-primary uppercase backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>NOW IN PRIVATE BETA</span>
              <span className="text-white/20">|</span>
              <span className="text-white/60">BUILT ON HYPERLIQUID</span>
            </div>
          </div>

          {/* Heading: From noise to signals. */}
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-heading font-black tracking-tight leading-[1.05] text-white normal-case">
              <span className="hero-title-line block overflow-hidden">
                <span className="block">From</span>
              </span>
              <span className="hero-title-line block overflow-hidden mt-1 sm:mt-2">
                <span className="block">noise to</span>
              </span>
              <span className="hero-title-line block overflow-hidden mt-1 sm:mt-2">
                <span className="text-primary drop-shadow-[0_0_15px_rgba(0,255,204,0.25)] block">signals.</span>
              </span>
            </h1>
            
            {/* Intelligence OS for Markets Badge */}
            <div className="self-start mt-2 hero-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/35 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-primary uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                INTELLIGENCE OS FOR MARKETS
              </div>
            </div>
          </div>

          {/* Paragraph description */}
          <p className="text-white/70 font-body text-base sm:text-lg max-w-xl leading-relaxed mt-2 hero-fade-in">
            i5 is an intelligence-native trading network that aggregates smart-money flows, cohort behavior, and institutional-grade signals into a unified execution layer.
          </p>

          {/* Waitlist CTA Button */}
          <div className="flex flex-wrap gap-4 mt-2 hero-fade-in">
            <button 
              onClick={() => {
                const el = document.getElementById('war-room');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                triggerShake();
              }}
              className="hero-btn group relative bg-primary text-black text-sm sm:text-base font-body font-bold tracking-wider px-8 py-3.5 rounded-full inline-flex items-center gap-2 transition-transform duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-pointer active:scale-95"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Stats: Signal Accuracy & Latency */}
          <div className="flex gap-12 mt-6 border-t border-white/10 pt-6 hero-fade-in">
            <div className="hero-stat-item cursor-pointer">
              <div className="stat-val text-4xl font-display font-black text-white tracking-tight origin-left transition-transform duration-300">
                98.7%
              </div>
              <div className="stat-lbl text-xs font-mono font-bold tracking-widest text-primary uppercase mt-1 transition-all duration-300">
                SIGNAL ACCURACY
              </div>
            </div>
            <div className="hero-stat-item cursor-pointer">
              <div className="stat-val text-4xl font-display font-black text-white tracking-tight origin-left transition-transform duration-300">
                &lt;50ms
              </div>
              <div className="stat-lbl text-xs font-mono font-bold tracking-widest text-primary uppercase mt-1 transition-all duration-300">
                LATENCY
              </div>
            </div>
          </div>

        </div>

        {/* Spacer Column to let the background video shine on the right side */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-5" />

      </div>

    </section>
  );
}
