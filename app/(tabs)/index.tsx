import type { ActionKind } from '@/src/engine/types';
import { usePetStore } from '@/src/state/petStore';
import { useAppTheme } from '@/src/theme/ThemeContext';
import { Button } from '@/src/ui/Button';
import { Chip } from '@/src/ui/Chip';
import { PetAvatar } from '@/src/ui/PetAvatar';
import { Screen } from '@/src/ui/Screen';
import { StatBar } from '@/src/ui/StatBar';
import { Touchable } from '@/src/ui/Touchable';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const ACTIONS: { kind: ActionKind; emoji: string; label: string }[] = [
    { kind: 'feed', emoji: '🍖', label: 'Feed' },
    { kind: 'play', emoji: '🎾', label: 'Play' },
    { kind: 'sleep', emoji: '💤', label: 'Sleep' },
    { kind: 'clean', emoji: '🛁', label: 'Clean' },
];

export default function HomeScreen() {
    const { colors, shadows, spacing, fontSizes, radii } = useAppTheme();
    const { pet, stats, wallet, performAction } = usePetStore();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['35%'], []);

    const openActions = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);

    const handleAction = useCallback(
        (action: ActionKind) => {
            performAction(action);
            bottomSheetRef.current?.close();
        },
        [performAction],
    );

    const renderBackdrop = useCallback(
        (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
            <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
        ),
        [],
    );

    if (!pet) {
        return (
            <Screen>
                <View style={styles.emptyContainer}>
                    <Text style={{ color: colors.textMuted, fontSize: fontSizes.md }}>No pet found. Complete onboarding first.</Text>
                </View>
            </Screen>
        );
    }

    return (
        <Screen>
            <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 120 }}>
                {/* Wallet */}
                <View style={[styles.walletRow, { marginBottom: spacing.md }]}>
                    <View
                        style={[
                            styles.walletPill,
                            {
                                backgroundColor: colors.surface,
                                borderRadius: radii.full,
                                paddingVertical: spacing.xs + 2,
                                paddingHorizontal: spacing.md,
                                gap: spacing.xs,
                                ...shadows.sm,
                            },
                        ]}
                    >
                        <Text style={{ fontSize: fontSizes.md }}>🪙</Text>
                        <Text style={[styles.semibold, { color: colors.text, fontSize: fontSizes.sm }]}>{wallet.coins}</Text>
                    </View>
                </View>

                {/* Pet */}
                <View style={[styles.centered, { marginBottom: spacing.lg }]}>
                    <PetAvatar size={180} />
                    <Text style={[styles.petName, { color: colors.text, fontSize: fontSizes.xl, marginTop: spacing.md }]}>{pet.name}</Text>
                    <Text style={{ color: colors.textMuted, fontSize: fontSizes.sm, marginTop: spacing.xs }}>
                        Lv. {pet.level} • {pet.species}
                    </Text>
                </View>

                {/* Traits */}
                <View style={[styles.traitsRow, { gap: spacing.sm, marginBottom: spacing.xl }]}>
                    {pet.traits.map((trait) => (
                        <Chip key={trait} label={trait} selected />
                    ))}
                </View>

                {/* Stats */}
                <View
                    style={{
                        backgroundColor: colors.surface,
                        borderRadius: radii.lg,
                        padding: spacing.md,
                        marginBottom: spacing.lg,
                        ...shadows.md,
                    }}
                >
                    <StatBar label="Hunger" value={100 - stats.hunger} color={colors.statHunger} />
                    <StatBar label="Energy" value={stats.energy} color={colors.statEnergy} />
                    <StatBar label="Happiness" value={stats.happiness} color={colors.statHappiness} />
                    <StatBar label="Cleanliness" value={stats.cleanliness} color={colors.statCleanliness} />
                </View>

                {/* Actions button */}
                <Button title="🎮  Actions" onPress={openActions} />
            </ScrollView>

            {/* Bottom sheet */}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                backgroundStyle={{ backgroundColor: colors.surface }}
                handleIndicatorStyle={{ backgroundColor: colors.textMuted }}
            >
                <BottomSheetView style={{ padding: spacing.lg }}>
                    <Text style={[styles.sheetTitle, { color: colors.text, fontSize: fontSizes.lg, marginBottom: spacing.md }]}>
                        What would you like to do?
                    </Text>
                    <View style={styles.actionsRow}>
                        {ACTIONS.map(({ kind, emoji, label }) => (
                            <Touchable
                                key={kind}
                                onPress={() => handleAction(kind)}
                                style={[
                                    styles.actionButton,
                                    {
                                        backgroundColor: colors.surfaceAlt,
                                        borderRadius: radii.lg,
                                        padding: spacing.md,
                                    },
                                ]}
                            >
                                <Text style={{ fontSize: 28, marginBottom: spacing.xs }}>{emoji}</Text>
                                <Text style={[styles.actionLabel, { color: colors.text, fontSize: fontSizes.sm }]}>{label}</Text>
                            </Touchable>
                        ))}
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </Screen>
    );
}

const styles = StyleSheet.create({
    emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    walletRow: { flexDirection: 'row', justifyContent: 'flex-end' },
    walletPill: { flexDirection: 'row', alignItems: 'center' },
    semibold: { fontWeight: '600' },
    centered: { alignItems: 'center' },
    petName: { fontWeight: '700' },
    traitsRow: { flexDirection: 'row', justifyContent: 'center' },
    sheetTitle: { fontWeight: '600', textAlign: 'center' },
    actionsRow: { flexDirection: 'row', justifyContent: 'space-around' },
    actionButton: { alignItems: 'center', minWidth: 72, overflow: 'hidden' },
    actionLabel: { fontWeight: '500' },
});
