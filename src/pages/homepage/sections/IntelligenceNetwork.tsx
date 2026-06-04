import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function IntelligenceNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entry for content
      gsap.from('.network-content > *', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Breathing glow backdrop
      gsap.to('.network-glow', {
        opacity: 0.7,
        scale: 1.15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Hover animations for the button
      const button = containerRef.current?.querySelector('.network-btn');
      if (button) {
        const arrow = button.querySelector('.network-arrow');
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            backgroundColor: '#00ffcc',
            color: '#000000',
            borderColor: '#00ffcc',
            boxShadow: '0 0 15px rgba(0, 255, 204, 0.4)',
            y: -2,
            duration: 0.25,
            ease: 'power2.out',
          });
          if (arrow) {
            gsap.to(arrow, {
              x: 3,
              duration: 0.25,
              ease: 'power2.out',
            });
          }
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            backgroundColor: 'rgba(0, 255, 204, 0.05)',
            color: '#00ffcc',
            borderColor: 'rgba(0, 255, 204, 0.3)',
            boxShadow: 'none',
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
          });
          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              duration: 0.25,
              ease: 'power2.out',
            });
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="intelligence-network" className="relative py-24 px-4 sm:px-8 md:px-12 lg:px-20 border-b border-white/10 select-none bg-black overflow-hidden">
      {/* Glow backdrop */}
      <div className="network-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-40" />

      <div className="network-content max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center gap-6">
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-primary block uppercase">// SYSTEM INITIALIZED</span>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase leading-none max-w-3xl">
          Join the Intelligence Network
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-3 text-sm sm:text-base font-display font-bold text-primary uppercase mt-1">
          <span>Detect earlier.</span>
          <span className="text-white/20">•</span>
          <span>Analyze faster.</span>
          <span className="text-white/20">•</span>
          <span>Execute smarter.</span>
        </div>

        <p className="text-white/70 font-body text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mt-2">
          The intelligence gap is closing. Secure your access to the i5 network today and start trading with an institutional edge.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4">
          <a 
            href="#" 
            className="network-btn inline-flex items-center justify-center gap-2 border border-primary/30 px-6 py-3 bg-primary/5 text-primary font-bold font-mono text-xs uppercase cursor-pointer select-none"
          >
            <span>Read Docs</span>
            <ArrowRight className="network-arrow w-3.5 h-3.5" />
          </a>
        </div>

        {/* Hyperliquid connected badge */}
        <div className="mt-8 flex items-center gap-2.5 px-4 py-2 border border-primary/20 bg-primary/5 font-mono text-xs sm:text-sm text-primary select-none rounded-none animate-pulse">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span>NOW CONNECTED TO HYPERLIQUID MAINNET</span>
        </div>
      </div>
    </section>
  );
}
