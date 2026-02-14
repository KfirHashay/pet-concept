/**
 * Design tokens for the "cozy companion" vibe.
 * Dark-mode first; light mode is a softer inversion.
 */

export const palette = {
    // Core neutrals
    ink: '#1A1B1E',
    charcoal: '#2C2D31',
    slate: '#3E3F44',
    stone: '#6B6E76',
    mist: '#A8ABB3',
    cloud: '#E4E6EB',
    snow: '#F7F8FA',
    white: '#FFFFFF',

    // Accents — calm, rounded vibe
    lavender: '#B8A9E8',
    mint: '#7ECFB3',
    peach: '#F2B880',
    sky: '#7EB8E0',
    rose: '#E8A9B8',

    // Functional
    success: '#7ECFB3',
    warning: '#F2B880',
    error: '#E07B7B',
    info: '#7EB8E0',
} as const;

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    primary: string;
    primaryText: string;
    accent: string;
    tabBar: string;
    tabIconDefault: string;
    tabIconActive: string;
    statHunger: string;
    statEnergy: string;
    statHappiness: string;
    statCleanliness: string;
    success: string;
    warning: string;
    error: string;
    info: string;
}

export const darkColors: ThemeColors = {
    background: palette.ink,
    surface: palette.charcoal,
    surfaceAlt: palette.slate,
    text: palette.snow,
    textSecondary: palette.cloud,
    textMuted: palette.mist,
    border: palette.slate,
    primary: palette.lavender,
    primaryText: palette.ink,
    accent: palette.mint,
    tabBar: palette.charcoal,
    tabIconDefault: palette.mist,
    tabIconActive: palette.lavender,
    statHunger: palette.peach,
    statEnergy: palette.sky,
    statHappiness: palette.mint,
    statCleanliness: palette.lavender,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    info: palette.info,
};

export const lightColors: ThemeColors = {
    background: palette.snow,
    surface: palette.white,
    surfaceAlt: palette.cloud,
    text: palette.ink,
    textSecondary: palette.charcoal,
    textMuted: palette.stone,
    border: palette.cloud,
    primary: palette.lavender,
    primaryText: palette.white,
    accent: palette.mint,
    tabBar: palette.white,
    tabIconDefault: palette.stone,
    tabIconActive: palette.lavender,
    statHunger: palette.peach,
    statEnergy: palette.sky,
    statHappiness: palette.mint,
    statCleanliness: palette.lavender,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    info: palette.info,
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
} as const;

export const radii = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
} as const;

export const fontSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
} as const;

/** Platform-aware shadow styles (iOS shadowX + Android elevation). */
export interface ShadowStyle {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
}

export interface ThemeShadows {
    none: ShadowStyle;
    sm: ShadowStyle;
    md: ShadowStyle;
    lg: ShadowStyle;
}

export const darkShadows: ThemeShadows = {
    none: { shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0 },
    sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2, elevation: 2 },
    md: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 4, elevation: 4 },
    lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8, elevation: 8 },
};

export const lightShadows: ThemeShadows = {
    none: { shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0 },
    sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2 },
    md: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 },
    lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
};
