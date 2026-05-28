import { useState, useEffect } from 'react';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { Radio } from 'lucide-react';

export function Navbar() {
  const [tradersCount, setTradersCount] = useState(12482);
  const [time, setTime] = useState('');

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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 border-b border-white/10 bg-black/90 backdrop-blur-md z-50 flex items-center justify-between px-4 sm:px-6 font-mono select-none">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="text-lg font-display tracking-tighter text-white font-extrabold flex items-center gap-1.5 hover:opacity-85 transition-opacity cursor-pointer"
        >
          <span className="bg-primary text-black px-1.5 py-0.5 text-xs font-black tracking-normal">i5</span>
          <span className="tracking-widest">.XYZ</span>
        </button>
        
        <div className="hidden md:flex items-center gap-4 text-xs">
          <button 
            onClick={() => scrollToSection('alpha-feed')} 
            className="text-white/60 hover:text-primary hover:before:content-['>_'] transition-colors cursor-pointer"
          >
            FEED
          </button>
          <button 
            onClick={() => scrollToSection('why-we-win')} 
            className="text-white/60 hover:text-primary hover:before:content-['>_'] transition-colors cursor-pointer"
          >
            TECH_STACK
          </button>
          <button 
            onClick={() => scrollToSection('performance')} 
            className="text-white/60 hover:text-primary hover:before:content-['>_'] transition-colors cursor-pointer"
          >
            PERFORMANCE
          </button>
          <button 
            onClick={() => scrollToSection('community')} 
            className="text-white/60 hover:text-primary hover:before:content-['>_'] transition-colors cursor-pointer"
          >
            CULT
          </button>
        </div>
      </div>

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

      <div className="flex items-center gap-3">
        <button 
          onClick={() => scrollToSection('war-room')}
          className="hidden sm:block text-xs bg-primary text-black font-bold px-3 py-1.5 border border-primary hover:bg-transparent hover:text-primary transition-colors cursor-pointer uppercase"
        >
          ENTER THE WAR ROOM
        </button>
        <ThemeToggleButton />
      </div>
    </nav>
  );
}
