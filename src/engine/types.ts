/**
 * Engine types — contracts for game logic.
 * Implementation comes later; for now we define the shapes.
 */

export const TRAITS = ['Shy', 'NeatFreak', 'Foodie', 'Social', 'Curious', 'Sleepy', 'Goofy', 'Adventurous'] as const;

export type Trait = (typeof TRAITS)[number];

export interface PetStats {
    hunger: number; // 0-100
    energy: number; // 0-100
    happiness: number; // 0-100
    cleanliness: number; // 0-100
}

export type ActionKind = 'feed' | 'play' | 'sleep' | 'clean';

export interface ActionResult {
    statDeltas: Partial<PetStats>;
    xpGained: number;
    coinsGained: number;
    message: string;
}

export interface PetProfile {
    id: string;
    ownerId: string;
    name: string;
    species: string;
    level: number;
    xp: number;
    traits: Trait[];
}

export interface Wallet {
    coins: number;
    gems: number;
}

export interface CosmeticItem {
    id: string;
    category: string;
    name: string;
    assetKey: string;
    unlockType: string;
    unlockValue: number;
}

export interface InventoryItem {
    id: string;
    itemKey: string;
    qty: number;
    equipped: boolean;
}
