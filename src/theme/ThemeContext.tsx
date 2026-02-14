import { useThemeStore } from '@/src/state/themeStore';
import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { ThemeColors, ThemeMode, ThemeShadows, darkColors, darkShadows, fontSizes, lightColors, lightShadows, radii, spacing } from './tokens';

export interface AppTheme {
    colors: ThemeColors;
    shadows: ThemeShadows;
    spacing: typeof spacing;
    radii: typeof radii;
    fontSizes: typeof fontSizes;
    isDark: boolean;
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<AppTheme | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
    const systemScheme = useSystemColorScheme();
    const { mode, setMode } = useThemeStore();

    const resolvedScheme = mode === 'system' ? (systemScheme ?? 'dark') : mode;
    const isDark = resolvedScheme === 'dark';
    const colors = isDark ? darkColors : lightColors;
    const shadows = isDark ? darkShadows : lightShadows;

    const setThemeMode = useCallback((m: ThemeMode) => setMode(m), [setMode]);

    const theme = useMemo<AppTheme>(
        () => ({
            colors,
            shadows,
            spacing,
            radii,
            fontSizes,
            isDark,
            mode,
            setMode: setThemeMode,
        }),
        [colors, shadows, isDark, mode, setThemeMode],
    );

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): AppTheme {
    const theme = useContext(ThemeContext);
    if (!theme) {
        throw new Error('useAppTheme must be used within AppThemeProvider');
    }
    return theme;
}
