import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  crtMode: boolean;
  toggleCrtMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark', // Lock theme to dark by default
      setTheme: (theme) => set({ theme }),
      crtMode: true, // Enable CRT screen scanlines by default for aesthetic value
      toggleCrtMode: () => set((state) => ({ crtMode: !state.crtMode })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
