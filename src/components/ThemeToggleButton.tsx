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
      className={`font-mono border-2 px-3 py-1 h-9 rounded-none transition-all active:scale-[0.98] cursor-pointer ${
        crtMode 
          ? 'border-primary text-primary bg-primary/10 hover:bg-primary hover:text-black shadow-[0_0_10px_rgba(0,255,204,0.15)]' 
          : 'border-white/20 text-white/60 bg-transparent hover:border-white hover:text-white'
      }`}
    >
      <Monitor className={`h-4 w-4 ${crtMode ? 'animate-pulse' : ''}`} />
      <span className="text-xs font-bold tracking-widest uppercase font-mono">
        CRT: {crtMode ? 'ON' : 'OFF'}
      </span>
    </Button>
  );
}