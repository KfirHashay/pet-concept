import type { CosmeticItem, InventoryItem } from '@/src/engine/types';
import { create } from 'zustand';

interface ClosetState {
    catalog: CosmeticItem[];
    inventory: InventoryItem[];
    setCatalog: (items: CosmeticItem[]) => void;
    setInventory: (items: InventoryItem[]) => void;
    toggleEquip: (itemId: string) => void;
}

export const useClosetStore = create<ClosetState>((set, get) => ({
    catalog: [],
    inventory: [],
    setCatalog: (catalog) => set({ catalog }),
    setInventory: (inventory) => set({ inventory }),
    toggleEquip: (itemId) => {
        const { inventory } = get();
        set({
            inventory: inventory.map((item) => (item.id === itemId ? { ...item, equipped: !item.equipped } : item)),
        });
    },
}));
