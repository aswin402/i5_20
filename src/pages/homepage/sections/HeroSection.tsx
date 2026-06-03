import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import heroVideoMob from '../../../assets/herovideomob.mp4';
import signal1 from '../../../assets/signal1.png';
import signal2 from '../../../assets/signal2.png';

interface HeroSectionProps {
  triggerShake: () => void;
}

export function HeroSection({ triggerShake }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSignal, setCurrentSignal] = useState(1);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSignal((prev) => (prev === 1 ? 2 : 1));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Programmatically ensure all videos inside the container are muted and playing
    // This is crucial for autoplay compatibility across many devices (e.g. iOS Safari, low-power mode browser states)
    const videos = containerRef.current?.querySelectorAll('video');
    
    const playAll = () => {
      videos?.forEach((video) => {
        video.defaultMuted = true;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', 'true');
        
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Autoplay was prevented on video element: ", error);
          });
        }
      });
    };

    // Attempt to play immediately on mount or when switching viewports
    playAll();

    // Fallback: trigger playback on first user interaction if blocked by Chrome/Safari policy
    const handleInteraction = () => {
      playAll();
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return cleanup;
  }, [isMobile]);

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

      // Mouse parallax on the background video container (only active on desktop)
      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 1024) return;
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-[92vh] flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 pt-8 sm:pt-8 lg:pt-10 select-none pb-0 sm:pb-8 lg:pb-16 overflow-x-hidden">
      
      {/* Background Video (Desktop only) */}
      {!isMobile && (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 select-none hero-bg-video pointer-events-none">
          {/* Ambient Blurred Video Background (Covers entire screen to eliminate letterboxing) */}
          <video
            key="ambient-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover filter blur-3xl opacity-20 pointer-events-none"
          >
            <source src="libst.webm" type="video/webm" />
            <source src="libst.mp4" type="video/mp4" />
          </video>
          
          {/* Crisp Video Background (Contained and right-aligned to remain fully visible and uncropped) */}
          <video
            key="crisp-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute top-0 bottom-0 left-0 right-0 lg:right-[120px] w-full lg:w-[calc(100%-120px)] h-full object-cover lg:object-contain lg:object-right object-center filter brightness-95 opacity-30 lg:opacity-100 pointer-events-none"
          >
            <source src="libst.webm" type="video/webm" />
            <source src="libst.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Asymmetrical Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-center relative z-10 w-full max-w-7xl self-start sm:ml-6 md:ml-12 lg:ml-20 xl:ml-32">
        
        {/* Slogans and CTAs */}
        <div className="lg:col-span-8 xl:col-span-7 flex flex-col gap-4 sm:gap-6 text-center lg:text-left items-center lg:items-start w-full">
          
          {/* Top Badge: Now in Private Beta | Built on Hyperliquid */}
          <div className="self-center lg:self-start hero-fade-in max-w-full">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-primary/10 border border-primary/20 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wider text-primary uppercase backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span>NOW IN PRIVATE BETA</span>
              <span className="text-white/20">|</span>
              <span className="text-white/60">BUILT ON HYPERLIQUID</span>
            </div>
          </div>

          {/* Heading: From noise to signals. */}
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-4xl sm:text-6xl uppercase md:text-7xl lg:text-[5.5rem] font-heading font-black tracking-tight leading-[0.9] sm:leading-[0.85] text-white normal-case">
              <span className="hero-title-line block overflow-hidden">
                <span className="block">From</span>
              </span>
              <span className="hero-title-line block overflow-hidden mt-1 sm:mt-2">
                <span className="block">noise to</span>
              </span>
              <span className="hero-title-line block overflow-hidden mt-1 sm:mt-2">
                <span className="text-primary drop-shadow-[0_0_15px_rgba(0,255,204,0.25)] block">
                  <img
                    src={currentSignal === 1 ? signal1 : signal2}
                    alt="signals"
                    className="h-[65px] sm:h-[100px] md:h-[125px] lg:h-[160px] w-auto object-contain inline-block align-middle"
                  />
                </span>
              </span>
            </h1>
            
            {/* Intelligence OS for Markets Badge */}
            <div className="self-center lg:self-start mt-2 hero-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/35 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-widest text-primary uppercase">
                <span className="h-2 w-2 rounded-full bg-primary" />
                INTELLIGENCE OS FOR MARKETS
              </div>
            </div>
          </div>

          {/* Mobile Waitlist CTA Button */}
          <div className="flex lg:hidden justify-center mt-3 hero-fade-in w-full">
            <button 
              onClick={() => {
                scrollToSection('intelligence-network');
                triggerShake();
              }}
              className="hero-btn group relative bg-primary text-black text-xs sm:text-sm font-body font-bold tracking-wider px-6 sm:px-8 py-3 rounded-full inline-flex items-center gap-2 transition-transform duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-pointer active:scale-95"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Video (rendered directly after the badge) */}
          {isMobile && (
            <div className="-mx-6 w-[calc(100%+3rem)] overflow-hidden my-3 hero-fade-in">
              <video
                key="mobile-video-block"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-auto block"
              >
                <source src={heroVideoMob} type="video/mp4" />
              </video>
            </div>
          )}

          {/* Paragraph description */}
          <p className="text-white/70 font-body text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mt-2 hero-fade-in mx-auto lg:mx-0">
            i5 is an intelligence-native trading network that aggregates smart-money flows, cohort behavior, and institutional-grade signals into a unified execution layer.
          </p>

          {/* Waitlist CTA Button */}
          <div className="hidden lg:flex flex-wrap justify-center lg:justify-start gap-4 mt-2 hero-fade-in">
            <button 
              onClick={() => {
                scrollToSection('intelligence-network');
                triggerShake();
              }}
              className="hero-btn group relative bg-primary text-black text-xs sm:text-sm md:text-base font-body font-bold tracking-wider px-6 sm:px-8 py-3 sm:py-3.5 rounded-full inline-flex items-center gap-2 transition-transform duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-pointer active:scale-95"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Stats: Signal Accuracy, Latency & Supplies */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-12 mt-4 sm:mt-6 border-t border-white/10 pt-4 sm:pt-6 hero-fade-in w-full">
            <div className="hero-stat-item cursor-pointer">
              <div className="stat-val text-3xl sm:text-4xl font-display font-black text-white tracking-tight origin-center lg:origin-left transition-transform duration-300">
                98.7%
              </div>
              <div className="stat-lbl text-[10px] sm:text-xs font-mono font-bold tracking-widest text-primary uppercase mt-1 transition-all duration-300">
                SIGNAL ACCURACY
              </div>
            </div>
            <div className="hero-stat-item cursor-pointer">
              <div className="stat-val text-3xl sm:text-4xl font-display font-black text-white tracking-tight origin-center lg:origin-left transition-transform duration-300">
                &lt;50ms
              </div>
              <div className="stat-lbl text-[10px] sm:text-xs font-mono font-bold tracking-widest text-primary uppercase mt-1 transition-all duration-300">
                LATENCY
              </div>
            </div>
            <div className="hero-stat-item cursor-pointer">
              <div className="stat-val text-3xl sm:text-4xl font-display font-black text-white tracking-tight origin-center lg:origin-left transition-transform duration-300">
                21M
              </div>
              <div className="stat-lbl text-[10px] sm:text-xs font-mono font-bold tracking-widest text-primary uppercase mt-1 transition-all duration-300">
                SUPPLIES
              </div>
            </div>
          </div>

        </div>

        {/* Video Spacer for Desktop */}
        <div className="lg:col-span-4 xl:col-span-5 w-full flex justify-center items-center hero-fade-in" />

      </div>

    </section>
  );
}

