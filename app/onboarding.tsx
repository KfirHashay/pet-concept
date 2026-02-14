import { createPet, createPetState, createProfile, createWallet } from '@/src/data/petRepo';
import { TRAITS, Trait } from '@/src/engine/types';
import { useAuthStore } from '@/src/state/authStore';
import { usePetStore } from '@/src/state/petStore';
import { useAppTheme } from '@/src/theme/ThemeContext';
import { Button } from '@/src/ui/Button';
import { Chip } from '@/src/ui/Chip';
import { Input } from '@/src/ui/Input';
import { PetAvatar } from '@/src/ui/PetAvatar';
import { Screen } from '@/src/ui/Screen';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function OnboardingScreen() {
    const { colors, spacing, fontSizes } = useAppTheme();
    const user = useAuthStore((s) => s.user);
    const setPet = usePetStore((s) => s.setPet);

    const [petName, setPetName] = useState('');
    const [selectedTraits, setSelectedTraits] = useState<Trait[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleTrait = (trait: Trait) => {
        setSelectedTraits((prev) => {
            if (prev.includes(trait)) {
                return prev.filter((t) => t !== trait);
            }
            if (prev.length >= 2) {
                return [...prev.slice(1), trait];
            }
            return [...prev, trait];
        });
    };

    const handleCreate = async () => {
        if (!petName.trim()) {
            setError('Give your pet a name!');
            return;
        }
        if (selectedTraits.length !== 2) {
            setError('Pick exactly 2 traits');
            return;
        }
        if (!user) return;

        setLoading(true);
        setError('');

        try {
            // Create profile, pet, state, and wallet
            await createProfile(user.id, user.email?.split('@')[0] ?? 'Player');
            const pet = await createPet(user.id, petName.trim(), selectedTraits);
            await createPetState(pet.id);
            await createWallet(user.id);

            setPet({
                id: pet.id,
                ownerId: pet.owner_id,
                name: pet.name,
                species: pet.species,
                level: pet.level,
                xp: pet.xp,
                traits: pet.traits as Trait[],
            });

            router.replace('/(tabs)');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Something went wrong';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Screen edges={['top', 'bottom']}>
            <ScrollView style={styles.flex} contentContainerStyle={{ padding: spacing.lg, paddingTop: spacing.xxl }}>
                <Text style={[styles.heading, { fontSize: fontSizes.xl, color: colors.text, marginBottom: spacing.sm }]}>Create Your Pet</Text>
                <Text style={[styles.textCenter, { fontSize: fontSizes.md, color: colors.textMuted, marginBottom: spacing.xl }]}>
                    Give it a name and personality
                </Text>

                <View style={[styles.centered, { marginBottom: spacing.xl }]}>
                    <PetAvatar size={140} />
                </View>

                <Input
                    label="Pet Name"
                    placeholder="e.g. Mochi, Bubbles, Ziggy..."
                    value={petName}
                    onChangeText={setPetName}
                    autoCapitalize="words"
                />

                <Text style={[styles.sectionLabel, { fontSize: fontSizes.sm, color: colors.textSecondary, marginBottom: spacing.sm }]}>
                    Choose 2 Traits
                </Text>

                <View style={[styles.chipWrap, { gap: spacing.sm, marginBottom: spacing.lg }]}>
                    {TRAITS.map((trait) => (
                        <Chip key={trait} label={trait} selected={selectedTraits.includes(trait)} onPress={() => toggleTrait(trait)} />
                    ))}
                </View>

                {error ?
                    <Text style={[styles.textCenter, { color: colors.error, fontSize: fontSizes.sm, marginBottom: spacing.md }]}>{error}</Text>
                :   null}

                <Button title="Let's Go! 🚀" onPress={handleCreate} loading={loading} disabled={!petName.trim() || selectedTraits.length !== 2} />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    heading: { fontWeight: '700', textAlign: 'center' },
    textCenter: { textAlign: 'center' },
    centered: { alignItems: 'center' },
    sectionLabel: { fontWeight: '500' },
    chipWrap: { flexDirection: 'row', flexWrap: 'wrap' },
});
