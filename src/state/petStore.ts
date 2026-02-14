import { applyAction, clampStat } from '@/src/engine/actions';
import type { ActionKind, PetProfile, PetStats, Wallet } from '@/src/engine/types';
import { create } from 'zustand';

interface PetState {
    pet: PetProfile | null;
    stats: PetStats;
    wallet: Wallet;
    setPet: (pet: PetProfile | null) => void;
    setStats: (stats: PetStats) => void;
    setWallet: (wallet: Wallet) => void;
    performAction: (action: ActionKind) => void;
}

const defaultStats: PetStats = {
    hunger: 50,
    energy: 50,
    happiness: 50,
    cleanliness: 50,
};

const defaultWallet: Wallet = { coins: 100, gems: 0 };

export const usePetStore = create<PetState>((set, get) => ({
    pet: null,
    stats: defaultStats,
    wallet: defaultWallet,

    setPet: (pet) => set({ pet }),
    setStats: (stats) => set({ stats }),
    setWallet: (wallet) => set({ wallet }),

    performAction: (action: ActionKind) => {
        const { stats, wallet, pet } = get();
        if (!pet) return;

        const result = applyAction(action, stats, pet.traits);

        const newStats: PetStats = {
            hunger: clampStat(stats.hunger + (result.statDeltas.hunger ?? 0)),
            energy: clampStat(stats.energy + (result.statDeltas.energy ?? 0)),
            happiness: clampStat(stats.happiness + (result.statDeltas.happiness ?? 0)),
            cleanliness: clampStat(stats.cleanliness + (result.statDeltas.cleanliness ?? 0)),
        };

        set({
            stats: newStats,
            wallet: {
                coins: wallet.coins + result.coinsGained,
                gems: wallet.gems,
            },
        });
    },
}));
