import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../../../assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entry for footer columns
      gsap.from('.footer-column', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Hover animations for footer col links
      const links = containerRef.current?.querySelectorAll('.footer-col-links a');
      links?.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            color: '#00ffcc',
            x: 4,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            color: 'rgba(255, 255, 255, 0.6)',
            x: 0,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
      });

      // Submit button hover animation
      const button = containerRef.current?.querySelector('.footer-signup-btn');
      if (button) {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            backgroundColor: '#00ffcc',
            color: '#000000',
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            backgroundColor: 'rgba(0, 255, 204, 0.1)',
            color: '#00ffcc',
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-16 border-t border-white/10 bg-black select-none text-left relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 pb-12 xl:pb-16">
          
          {/* Col 1: Logo & Tagline (Col span 4) */}
          <div className="footer-column lg:col-span-4 flex flex-col gap-4 text-left">
            <div className="flex items-center gap-2">
              <img src={logo} alt="i5 Logo" className="h-7 w-auto object-contain" />
              <span className="text-white font-display font-black text-sm uppercase tracking-wider">
                Intelligence Network
              </span>
            </div>
            <p className="text-white/50 font-body text-xs leading-relaxed max-w-sm">
              The intelligence layer built for traders on Hyperliquid mainnet.
            </p>
          </div>

          {/* Col 2: Platform Links (Col span 2) */}
          <div className="footer-column lg:col-span-2 flex flex-col gap-4 text-left">
            <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-bold">
              Platform
            </div>
            <div className="footer-col-links flex flex-col gap-2 font-mono text-xs text-white/60">
              <a href="#why-we-win" className="cursor-pointer">Intelligence Stack</a>
              <a href="#core-features" className="cursor-pointer">Signal Engine</a>
              <a href="#core-features" className="cursor-pointer">Wallet Tracking</a>
              <a href="#core-features" className="cursor-pointer">Alerts & Webhooks</a>
            </div>
          </div>

          {/* Col 3: Community Links (Col span 2) */}
          <div className="footer-column lg:col-span-2 flex flex-col gap-4 text-left">
            <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-bold">
              Community
            </div>
            <div className="footer-col-links flex flex-col gap-2 font-mono text-xs text-white/60">
              <a href="https://x.com/ifivelabs" target="_blank" rel="noopener noreferrer" className="cursor-pointer">X (Twitter)</a>
              <a href="https://t.me/I5Labs" target="_blank" rel="noopener noreferrer" className="cursor-pointer">Telegram</a>
              <a href="#" className="cursor-pointer">Blog</a>
              <a href="#" className="cursor-pointer">Newsletter</a>
            </div>
          </div>

          {/* Col 4: Newsletter text & signup (Col span 4) */}
          <div className="footer-column lg:col-span-4 flex flex-col gap-4 text-left">
            <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-bold">
              Stay Updated
            </div>
            <p className="text-white/50 font-body text-xs leading-relaxed max-w-sm">
              Stay updated with the latest market intelligence and network updates.
            </p>
            {/* Optional premium email signup element */}
            <div className="flex max-w-sm border border-white/10 focus-within:border-primary transition-colors">
              <input 
                type="email" 
                placeholder="ENTER EMAIL ADDRESS" 
                className="bg-transparent border-0 outline-none px-3 py-2 text-[10px] font-mono flex-1 text-white placeholder-white/20 uppercase"
              />
              <button className="footer-signup-btn bg-primary/10 border-l border-white/10 px-4 text-[10px] font-mono font-bold text-primary uppercase cursor-pointer">
                SUBMIT
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-white/30">
          <div>
            © 2026 i5 Intelligence Network. Built on Hyperliquid.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
