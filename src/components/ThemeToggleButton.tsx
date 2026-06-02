import { Monitor } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import Button from './button';

export function ThemeToggleButton() {
  const { crtMode, toggleCrtMode } = useThemeStore();

  return (
    <Button
      variant="outline"
      onClick={toggleCrtMode}
      title={`CRT Mode: ${crtMode ? 'ACTIVE' : 'DISABLED'} • Click to toggle`}
      className={`font-mono border px-1.5 md:px-2 xl:px-3 h-7 md:h-8 xl:h-9 rounded-none transition-all active:scale-[0.98] cursor-pointer gap-1 md:gap-1.5 shrink-0 ${
        crtMode 
          ? 'border-primary text-primary bg-primary/10 hover:bg-primary hover:text-black shadow-[0_0_10px_rgba(0,255,204,0.15)]' 
          : 'border-white/20 text-white/60 bg-transparent hover:border-white hover:text-white'
      }`}
    >
      <Monitor className={`h-3 w-3 md:h-3.5 md:w-3.5 xl:h-4 xl:w-4 shrink-0 ${crtMode ? 'animate-pulse' : ''}`} />
      <span className="text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs font-bold tracking-widest uppercase font-mono shrink-0">
        CRT: {crtMode ? 'ON' : 'OFF'}
      </span>
    </Button>
  );
}