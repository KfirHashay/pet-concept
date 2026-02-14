import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { fetchPet, fetchPetState, fetchWallet } from '@/src/data/petRepo';
import { supabase } from '@/src/data/supabase';
import type { Trait } from '@/src/engine/types';
import { useAuthStore } from '@/src/state/authStore';
import { usePetStore } from '@/src/state/petStore';
import { AppThemeProvider, useAppTheme } from '@/src/theme/ThemeContext';
import { LoadingScreen } from '@/src/ui/LoadingScreen';

function AuthGate({ children }: { children: React.ReactNode }) {
    const { session, loading, setSession, setLoading } = useAuthStore();
    const setPet = usePetStore((s) => s.setPet);
    const setStats = usePetStore((s) => s.setStats);
    const setWallet = usePetStore((s) => s.setWallet);

    useEffect(() => {
        // Restore session on mount
        supabase.auth.getSession().then(({ data: { session: s } }) => {
            setSession(s);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, s) => {
            setSession(s);
        });

        return () => subscription.unsubscribe();
    }, [setSession]);

    // Load pet data and route when user is authenticated
    useEffect(() => {
        if (loading) return;

        if (!session) {
            router.replace('/auth');
            return;
        }

        const loadDataAndRoute = async () => {
            try {
                const pet = await fetchPet(session.user.id);
                if (pet) {
                    setPet({
                        id: pet.id,
                        ownerId: pet.owner_id,
                        name: pet.name,
                        species: pet.species,
                        level: pet.level,
                        xp: pet.xp,
                        traits: pet.traits as Trait[],
                    });

                    const [state, wallet] = await Promise.all([fetchPetState(pet.id), fetchWallet(session.user.id)]);

                    if (state) {
                        setStats({
                            hunger: state.hunger,
                            energy: state.energy,
                            happiness: state.happiness,
                            cleanliness: state.cleanliness,
                        });
                    }
                    if (wallet) {
                        setWallet({ coins: wallet.coins, gems: wallet.gems });
                    }

                    // Pet exists → go to home
                    router.replace('/(tabs)');
                } else {
                    // Authenticated but no pet → onboarding
                    router.replace('/onboarding');
                }
            } catch {
                // No data yet → go to onboarding
                router.replace('/onboarding');
            }
        };

        loadDataAndRoute();
    }, [session, loading, setPet, setStats, setWallet]);

    if (loading) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}

function InnerLayout() {
    const { isDark } = useAppTheme();

    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="auth" options={{ headerShown: false }} />
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style={isDark ? 'light' : 'dark'} />
        </>
    );
}

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AppThemeProvider>
                <AuthGate>
                    <InnerLayout />
                </AuthGate>
            </AppThemeProvider>
        </GestureHandlerRootView>
    );
}
