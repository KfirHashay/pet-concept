import { useAppTheme } from '@/src/theme/ThemeContext';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export function LoadingScreen() {
    const { colors } = useAppTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
