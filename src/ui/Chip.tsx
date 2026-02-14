import { useAppTheme } from '@/src/theme/ThemeContext';
import { Touchable } from '@/src/ui/Touchable';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ChipProps {
    label: string;
    selected?: boolean;
    onPress?: () => void;
}

export function Chip({ label, selected = false, onPress }: ChipProps) {
    const { colors, radii, spacing, fontSizes } = useAppTheme();

    const content = (
        <View
            style={[
                styles.chip,
                {
                    backgroundColor: selected ? colors.primary : colors.surface,
                    borderRadius: radii.full,
                    paddingVertical: spacing.sm + 2,
                    paddingHorizontal: spacing.md,
                    borderColor: selected ? colors.primary : colors.border,
                },
            ]}
        >
            <Text
                style={{
                    color: selected ? colors.primaryText : colors.textSecondary,
                    fontSize: fontSizes.sm,
                    fontWeight: selected ? '600' : '400',
                }}
            >
                {label}
            </Text>
        </View>
    );

    if (onPress) {
        return <Touchable onPress={onPress}>{content}</Touchable>;
    }

    return content;
}

const styles = StyleSheet.create({
    chip: {
        borderWidth: 1,
    },
});
