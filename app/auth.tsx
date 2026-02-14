import { signIn, signUp } from '@/src/data/authRepo';
import { useAppTheme } from '@/src/theme/ThemeContext';
import { Button } from '@/src/ui/Button';
import { Input } from '@/src/ui/Input';
import { Screen } from '@/src/ui/Screen';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AuthScreen() {
    const { colors, shadows, spacing, fontSizes, radii } = useAppTheme();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [confirmationSent, setConfirmationSent] = useState(false);

    const handleSubmit = async () => {
        setError('');
        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        try {
            if (isSignUp) {
                const data = await signUp(email.trim(), password);
                if (data.user && !data.session) {
                    setConfirmationSent(true);
                }
            } else {
                await signIn(email.trim(), password);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Something went wrong';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Screen edges={['top', 'bottom']}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
                <ScrollView contentContainerStyle={[styles.scrollContent, { padding: spacing.lg }]} keyboardShouldPersistTaps="handled">
                    <View style={[styles.centered, { marginBottom: spacing.xxl }]}>
                        <Text style={[styles.title, { fontSize: fontSizes.xxl, color: colors.text, marginBottom: spacing.xs }]}>🐾 Pet Concept</Text>
                        <Text style={{ fontSize: fontSizes.md, color: colors.textMuted }}>Your cozy companion awaits</Text>
                    </View>

                    {confirmationSent ?
                        <View
                            style={[
                                styles.card,
                                styles.centered,
                                { backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.lg, ...shadows.md },
                            ]}
                        >
                            <Text style={{ fontSize: 48, marginBottom: spacing.md }}>📧</Text>
                            <Text style={[styles.cardTitle, { fontSize: fontSizes.lg, color: colors.text, marginBottom: spacing.sm }]}>
                                Check your email!
                            </Text>
                            <Text
                                style={[
                                    styles.textCenter,
                                    { fontSize: fontSizes.md, color: colors.textSecondary, marginBottom: spacing.sm, lineHeight: 22 },
                                ]}
                            >
                                We sent a confirmation link to
                            </Text>
                            <Text
                                style={[
                                    styles.textCenter,
                                    styles.semibold,
                                    { fontSize: fontSizes.md, color: colors.primary, marginBottom: spacing.lg },
                                ]}
                            >
                                {email}
                            </Text>
                            <Text
                                style={[
                                    styles.textCenter,
                                    { fontSize: fontSizes.sm, color: colors.textMuted, lineHeight: 20, marginBottom: spacing.lg },
                                ]}
                            >
                                Click the link in the email to verify your account, then come back here and sign in.
                            </Text>
                            <Button
                                title="Back to Sign In"
                                variant="secondary"
                                onPress={() => {
                                    setConfirmationSent(false);
                                    setIsSignUp(false);
                                    setPassword('');
                                }}
                            />
                        </View>
                    :   <View style={[styles.card, { backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.lg, ...shadows.md }]}>
                            <Text style={[styles.cardHeading, { fontSize: fontSizes.lg, color: colors.text, marginBottom: spacing.lg }]}>
                                {isSignUp ? 'Create Account' : 'Welcome Back'}
                            </Text>

                            <Input
                                label="Email"
                                placeholder="you@example.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                            />

                            <Input
                                label="Password"
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                            />

                            {error ?
                                <Text style={[styles.textCenter, { color: colors.error, fontSize: fontSizes.sm, marginBottom: spacing.md }]}>
                                    {error}
                                </Text>
                            :   null}

                            <Button title={isSignUp ? 'Sign Up' : 'Sign In'} onPress={handleSubmit} loading={loading} />

                            <Button
                                title={isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                variant="ghost"
                                onPress={() => {
                                    setIsSignUp(!isSignUp);
                                    setError('');
                                }}
                                style={{ marginTop: spacing.md }}
                            />
                        </View>
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    scrollContent: { flexGrow: 1, justifyContent: 'center' },
    centered: { alignItems: 'center' },
    card: {},
    title: { fontWeight: '700' },
    cardTitle: { fontWeight: '700', textAlign: 'center' },
    cardHeading: { fontWeight: '600', textAlign: 'center' },
    semibold: { fontWeight: '600' },
    textCenter: { textAlign: 'center' },
});
