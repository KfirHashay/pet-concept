/**
 * Auto-generated types for Supabase tables.
 * In production you'd run `supabase gen types typescript`.
 * This is a hand-written minimal version matching our schema.
 */

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    display_name: string | null;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    display_name?: string | null;
                    created_at?: string;
                };
                Update: {
                    display_name?: string | null;
                };
                Relationships: [];
            };
            pets: {
                Row: {
                    id: string;
                    owner_id: string;
                    name: string;
                    species: string;
                    level: number;
                    xp: number;
                    traits: string[];
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    owner_id: string;
                    name: string;
                    species?: string;
                    level?: number;
                    xp?: number;
                    traits: string[];
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    name?: string;
                    species?: string;
                    level?: number;
                    xp?: number;
                    traits?: string[];
                    updated_at?: string;
                };
                Relationships: [];
            };
            pet_state: {
                Row: {
                    pet_id: string;
                    hunger: number;
                    energy: number;
                    happiness: number;
                    cleanliness: number;
                    last_tick_at: string;
                    updated_at: string;
                };
                Insert: {
                    pet_id: string;
                    hunger?: number;
                    energy?: number;
                    happiness?: number;
                    cleanliness?: number;
                    last_tick_at?: string;
                    updated_at?: string;
                };
                Update: {
                    hunger?: number;
                    energy?: number;
                    happiness?: number;
                    cleanliness?: number;
                    last_tick_at?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            wallet: {
                Row: {
                    owner_id: string;
                    coins: number;
                    gems: number;
                    updated_at: string;
                };
                Insert: {
                    owner_id: string;
                    coins?: number;
                    gems?: number;
                    updated_at?: string;
                };
                Update: {
                    coins?: number;
                    gems?: number;
                    updated_at?: string;
                };
                Relationships: [];
            };
            cosmetics_catalog: {
                Row: {
                    id: string;
                    category: string;
                    name: string;
                    asset_key: string;
                    unlock_type: string;
                    unlock_value: number;
                };
                Insert: {
                    id?: string;
                    category: string;
                    name: string;
                    asset_key: string;
                    unlock_type: string;
                    unlock_value: number;
                };
                Update: {
                    category?: string;
                    name?: string;
                    asset_key?: string;
                    unlock_type?: string;
                    unlock_value?: number;
                };
                Relationships: [];
            };
            inventory_items: {
                Row: {
                    id: string;
                    owner_id: string;
                    item_key: string;
                    qty: number;
                    equipped: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    owner_id: string;
                    item_key: string;
                    qty?: number;
                    equipped?: boolean;
                    created_at?: string;
                };
                Update: {
                    qty?: number;
                    equipped?: boolean;
                };
                Relationships: [];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
}
