import { useState, useEffect } from 'react';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { Radio, Menu, X } from 'lucide-react';

export function Navbar() {
  const [tradersCount, setTradersCount] = useState(12482);
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTradersCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);

    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      // Offset scroll for navbar height
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
    <>
      <nav className="fixed top-0 left-0 right-0 h-20 border-b border-white/10 bg-black/90 backdrop-blur-md z-50 flex items-center justify-between px-6 sm:px-8 lg:px-12 font-mono select-none">
        <div className="flex items-center gap-10">
          <button 
            onClick={() => {
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="text-xl font-display tracking-tighter text-white font-extrabold flex items-center gap-2 hover:opacity-85 transition-opacity cursor-pointer"
          >
            <span className="bg-primary text-black px-2 py-0.5 text-sm font-black tracking-normal">i5</span>
            <span className="tracking-widest">.XYZ</span>
          </button>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold">
            <button 
              onClick={() => scrollToSection('why-we-win')} 
              className="text-white/60 hover:text-primary hover:before:content-['>_'] transition-colors cursor-pointer tracking-wider"
            >
              PLATFORM
            </button>
            <button 
              onClick={() => scrollToSection('core-features')} 
              className="text-white/60 hover:text-primary hover:before:content-['>_'] transition-colors cursor-pointer tracking-wider"
            >
              FEATURES
            </button>
            <button 
              onClick={() => scrollToSection('built-for-traders')} 
              className="text-white/60 hover:text-primary hover:before:content-['>_'] transition-colors cursor-pointer tracking-wider"
            >
              COMPARE
            </button>
            <button 
              onClick={() => scrollToSection('intelligence-network')} 
              className="text-white/60 hover:text-primary hover:before:content-['>_'] transition-colors cursor-pointer tracking-wider"
            >
              USERS
            </button>
          </div>
        </div>

        {/* Live system metrics (Desktop only) */}
        <div className="hidden lg:flex items-center gap-6 text-[10px] text-white/40 tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
            <span className="text-white/70 font-bold">{tradersCount.toLocaleString()} DEGENS LIVE</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-1">
            <Radio className="h-3 w-3 text-primary animate-pulse" />
            <span>SYS_STATUS: <span className="text-primary font-bold">WEAPONIZED</span></span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div>{time}</div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => scrollToSection('intelligence-network')}
            className="hidden sm:block text-xs bg-primary text-black font-black px-5 py-2.5 border border-primary hover:bg-transparent hover:text-primary transition-colors cursor-pointer uppercase tracking-wider"
          >
            ENTER THE WAR ROOM
          </button>
          <ThemeToggleButton />
          
          {/* Hamburger menu button for mobile/tablet */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/80 hover:text-primary transition-colors p-1 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed inset-x-0 top-20 bg-black/95 backdrop-blur-xl border-b border-white/10 z-40 md:hidden transition-all duration-300 ease-in-out select-none font-mono ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-6 sm:p-8 gap-5 text-base font-bold">
          <button 
            onClick={() => scrollToSection('why-we-win')} 
            className="text-left py-2 text-white/60 hover:text-primary hover:pl-2 transition-all cursor-pointer tracking-wider border-b border-white/5"
          >
            &gt; PLATFORM
          </button>
          <button 
            onClick={() => scrollToSection('core-features')} 
            className="text-left py-2 text-white/60 hover:text-primary hover:pl-2 transition-all cursor-pointer tracking-wider border-b border-white/5"
          >
            &gt; FEATURES
          </button>
          <button 
            onClick={() => scrollToSection('built-for-traders')} 
            className="text-left py-2 text-white/60 hover:text-primary hover:pl-2 transition-all cursor-pointer tracking-wider border-b border-white/5"
          >
            &gt; COMPARE
          </button>
          <button 
            onClick={() => scrollToSection('intelligence-network')} 
            className="text-left py-2 text-white/60 hover:text-primary hover:pl-2 transition-all cursor-pointer tracking-wider border-b border-white/5"
          >
            &gt; USERS
          </button>
          
          <button 
            onClick={() => scrollToSection('intelligence-network')}
            className="w-full text-center mt-3 text-sm bg-primary text-black font-black py-3 border border-primary hover:bg-transparent hover:text-primary transition-colors cursor-pointer uppercase tracking-wider"
          >
            ENTER THE WAR ROOM
          </button>
        </div>
      </div>
    </>
  );
}

