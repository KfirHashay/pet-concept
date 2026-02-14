import { useAppTheme } from '@/src/theme/ThemeContext';
import { Touchable } from '@/src/ui/Touchable';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export function Button({ title, onPress, variant = 'primary', loading = false, disabled = false, style, textStyle }: ButtonProps) {
    const { colors, radii, spacing, fontSizes } = useAppTheme();

    const isPrimary = variant === 'primary';
    const isGhost = variant === 'ghost';

    const bgColor =
        isPrimary ? colors.primary
        : isGhost ? 'transparent'
        : colors.surface;
    const txtColor = isPrimary ? colors.primaryText : colors.text;
    const borderColor = isGhost ? 'transparent' : colors.border;

    return (
        <Touchable
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.container,
                {
                    backgroundColor: bgColor,
                    borderRadius: radii.lg,
                    paddingVertical: spacing.md,
                    paddingHorizontal: spacing.lg,
                    borderWidth: isPrimary ? 0 : 1,
                    borderColor,
                },
                style,
            ]}
        >
            {loading ?
                <ActivityIndicator color={txtColor} />
            :   <Text style={[styles.label, { color: txtColor, fontSize: fontSizes.md }, textStyle]}>{title}</Text>}
        </Touchable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontWeight: '600',
    },
});
