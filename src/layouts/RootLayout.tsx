import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { useThemeStore } from '@/store/useThemeStore';
import { useEffect } from 'react';

export function RootLayout() {
  const { crtMode } = useThemeStore();

  useEffect(() => {
    // Ensure dark mode is active on document root for standard tailwind variables
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className={`min-h-screen bg-black text-white relative selection:bg-primary selection:text-black overflow-x-clip ${crtMode ? 'crt-active' : ''}`}>
      {/* Noise background */}
      <div className="fixed inset-0 pointer-events-none z-[9999] terminal-grain opacity-5" />

      {/* Grid Pattern overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 dapp-grid" />
      <div className="fixed inset-0 pointer-events-none z-0 dapp-grid-cyan-green" />

      {/* CRT overlay elements */}
      {crtMode && (
        <>
          <div className="fixed inset-0 pointer-events-none z-[10000] bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scanline" />
          <div className="fixed inset-0 pointer-events-none z-[10001] crt-scanline animate-flicker" />
        </>
      )}

      <Navbar />
      <main className="pt-20 relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
