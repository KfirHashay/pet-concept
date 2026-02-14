import { useAppTheme } from '@/src/theme/ThemeContext';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps {
    children: React.ReactNode;
    /** Which edges to pad for safe area. Defaults to ['top'] for tab screens. */
    edges?: Edge[];
    style?: ViewStyle;
}

/**
 * Root wrapper for every screen.
 * Applies safe-area insets + themed background automatically.
 *
 * - Tab screens: use default `edges={['top']}` (tab bar handles bottom).
 * - Full-screen stacks (auth, onboarding): pass `edges={['top', 'bottom']}`.
 */
export function Screen({ children, edges = ['top'], style }: ScreenProps) {
    const { colors } = useAppTheme();

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: colors.background }, style]} edges={edges}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});
