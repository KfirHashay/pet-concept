import type { ThemeMode } from '@/src/theme/tokens';
import { create } from 'zustand';

interface ThemeState {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    mode: 'system',
    setMode: (mode) => set({ mode }),
}));
