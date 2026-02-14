import { useAppTheme } from '@/src/theme/ThemeContext';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Ellipse } from 'react-native-svg';

interface PetAvatarProps {
    size?: number;
}

/**
 * Placeholder "blob" pet — a friendly rounded shape.
 * Will be replaced with real art / Lottie later.
 */
export function PetAvatar({ size = 160 }: PetAvatarProps) {
    const { colors } = useAppTheme();

    return (
        <View style={styles.wrapper}>
            <Svg width={size} height={size} viewBox="0 0 160 160">
                {/* Shadow */}
                <Ellipse cx="80" cy="145" rx="40" ry="8" fill={colors.surfaceAlt} opacity={0.5} />
                {/* Body */}
                <Circle cx="80" cy="85" r="50" fill={colors.primary} />
                {/* Left eye */}
                <Circle cx="65" cy="78" r="6" fill={colors.primaryText} />
                {/* Right eye */}
                <Circle cx="95" cy="78" r="6" fill={colors.primaryText} />
                {/* Blush left */}
                <Ellipse cx="58" cy="92" rx="8" ry="5" fill={colors.accent} opacity={0.4} />
                {/* Blush right */}
                <Ellipse cx="102" cy="92" rx="8" ry="5" fill={colors.accent} opacity={0.4} />
                {/* Mouth */}
                <Ellipse cx="80" cy="96" rx="6" ry="3" fill={colors.primaryText} opacity={0.6} />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
