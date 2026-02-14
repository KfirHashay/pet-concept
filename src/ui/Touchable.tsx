import React from 'react';
import { Platform, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

/** Minimum touch target size (Apple HIG 44pt, Material 48dp — we use 48 to satisfy both). */
const MIN_TARGET = 48;

interface TouchableProps extends Omit<PressableProps, 'style'> {
    style?: StyleProp<ViewStyle>;
}

/**
 * Platform-native pressable wrapper.
 *  • iOS  → opacity dims to 0.7 on press
 *  • Android → material ripple overlay
 *  • Web   → opacity (no ripple API)
 *  • All  → enforces 48dp minimum touch target
 */
export function Touchable({ style, disabled, children, hitSlop, ...rest }: TouchableProps) {
    return (
        <Pressable
            android_ripple={Platform.OS === 'android' ? { color: 'rgba(255,255,255,0.15)', borderless: false } : undefined}
            style={({ pressed }) => [
                { minHeight: MIN_TARGET, justifyContent: 'center' as const },
                style,
                Platform.OS !== 'android' && pressed && { opacity: 0.7 },
                disabled && { opacity: 0.5 },
            ]}
            hitSlop={hitSlop ?? 4}
            disabled={disabled}
            {...rest}
        >
            {children}
        </Pressable>
    );
}
