import { signOut } from '@/src/data/authRepo';
import { useAuthStore } from '@/src/state/authStore';
import { useAppTheme } from '@/src/theme/ThemeContext';
import type { ThemeMode } from '@/src/theme/tokens';
import { Button } from '@/src/ui/Button';
import { Screen } from '@/src/ui/Screen';
import { Touchable } from '@/src/ui/Touchable';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const THEME_OPTIONS: { label: string; value: ThemeMode }[] = [
    { label: '🌙 Dark', value: 'dark' },
    { label: '☀️ Light', value: 'light' },
    { label: '⚙️ System', value: 'system' },
];

export default function SettingsScreen() {
    const { colors, shadows, spacing, fontSizes, radii, mode, setMode } = useAppTheme();
    const user = useAuthStore((s) => s.user);

    const handleLogout = async () => {
        try {
            await signOut();
        } catch {
            // auth listener handles cleanup
        }
    };

    return (
        <Screen>
            <ScrollView style={styles.flex} contentContainerStyle={{ padding: spacing.lg }}>
                <Text style={[styles.title, { fontSize: fontSizes.xl, color: colors.text, marginBottom: spacing.xl }]}>Settings</Text>

                {/* Theme toggle */}
                <View
                    style={{
                        backgroundColor: colors.surface,
                        borderRadius: radii.lg,
                        padding: spacing.md,
                        marginBottom: spacing.lg,
                        ...shadows.md,
                    }}
                >
                    <Text style={[styles.sectionHeader, { color: colors.textSecondary, fontSize: fontSizes.sm, marginBottom: spacing.md }]}>
                        Appearance
                    </Text>
                    <View style={[styles.row, { gap: spacing.sm }]}>
                        {THEME_OPTIONS.map((opt) => (
                            <Touchable
                                key={opt.value}
                                onPress={() => setMode(opt.value)}
                                style={[
                                    styles.themeOption,
                                    {
                                        backgroundColor: mode === opt.value ? colors.primary : colors.surfaceAlt,
                                        borderRadius: radii.md,
                                        paddingVertical: spacing.md,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.themeOptionLabel,
                                        {
                                            color: mode === opt.value ? colors.primaryText : colors.text,
                                            fontSize: fontSizes.sm,
                                        },
                                    ]}
                                >
                                    {opt.label}
                                </Text>
                            </Touchable>
                        ))}
                    </View>
                </View>

                {/* Account */}
                <View
                    style={{
                        backgroundColor: colors.surface,
                        borderRadius: radii.lg,
                        padding: spacing.md,
                        marginBottom: spacing.lg,
                        ...shadows.md,
                    }}
                >
                    <Text style={[styles.sectionHeader, { color: colors.textSecondary, fontSize: fontSizes.sm, marginBottom: spacing.md }]}>
                        Account
                    </Text>
                    <View style={[styles.spacedRow, { marginBottom: spacing.md }]}>
                        <Text style={{ color: colors.textMuted, fontSize: fontSizes.sm }}>Email</Text>
                        <Text style={{ color: colors.text, fontSize: fontSizes.sm }}>{user?.email ?? '—'}</Text>
                    </View>
                    <Button title="Sign Out" variant="secondary" onPress={handleLogout} />
                </View>

                {/* Version */}
                <Text style={[styles.textCenter, { color: colors.textMuted, fontSize: fontSizes.xs, marginTop: spacing.lg }]}>
                    Pet Concept v0.0.1
                </Text>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    title: { fontWeight: '700' },
    sectionHeader: {
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    row: { flexDirection: 'row' },
    spacedRow: { flexDirection: 'row', justifyContent: 'space-between' },
    themeOption: { flex: 1, alignItems: 'center', overflow: 'hidden' },
    themeOptionLabel: { fontWeight: '500' },
    textCenter: { textAlign: 'center' },
});
