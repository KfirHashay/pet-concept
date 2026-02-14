import { useAppTheme } from '@/src/theme/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatBarProps {
    label: string;
    value: number; // 0-100
    color: string;
}

export function StatBar({ label, value, color }: StatBarProps) {
    const { colors, radii, spacing, fontSizes } = useAppTheme();
    const clamped = Math.max(0, Math.min(100, value));

    return (
        <View style={{ marginBottom: spacing.sm }}>
            <View style={[styles.header, { marginBottom: spacing.xs }]}>
                <Text style={[styles.labelText, { color: colors.textSecondary, fontSize: fontSizes.xs }]}>{label}</Text>
                <Text style={{ color: colors.textMuted, fontSize: fontSizes.xs }}>{clamped}%</Text>
            </View>
            <View style={[styles.track, { backgroundColor: colors.surfaceAlt, borderRadius: radii.full }]}>
                <View style={[styles.fill, { width: `${clamped}%`, backgroundColor: color, borderRadius: radii.full }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labelText: {
        fontWeight: '500',
    },
    track: {
        height: 10,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
    },
});
