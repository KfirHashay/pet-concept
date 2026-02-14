import { useAppTheme } from '@/src/theme/ThemeContext';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export function Input({ label, error, style, ...rest }: InputProps) {
    const { colors, radii, spacing, fontSizes } = useAppTheme();

    return (
        <View style={{ marginBottom: spacing.md }}>
            {label && <Text style={[styles.label, { color: colors.textSecondary, fontSize: fontSizes.sm, marginBottom: spacing.xs }]}>{label}</Text>}
            <TextInput
                placeholderTextColor={colors.textMuted}
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.surface,
                        borderColor: error ? colors.error : colors.border,
                        borderRadius: radii.md,
                        paddingVertical: spacing.sm + 4,
                        paddingHorizontal: spacing.md,
                        color: colors.text,
                        fontSize: fontSizes.md,
                    },
                    style,
                ]}
                {...rest}
            />
            {error && <Text style={{ color: colors.error, fontSize: fontSizes.xs, marginTop: spacing.xs }}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
    },
});
