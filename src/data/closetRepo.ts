import type { Database } from './database.types';
import { supabase } from './supabase';

type CatalogRow = Database['public']['Tables']['cosmetics_catalog']['Row'];
type InventoryRow = Database['public']['Tables']['inventory_items']['Row'];

export async function fetchCatalog(): Promise<CatalogRow[]> {
    const { data, error } = await supabase.from('cosmetics_catalog').select('*').order('category');
    if (error) throw error;
    return (data as CatalogRow[]) ?? [];
}

export async function fetchInventory(ownerId: string): Promise<InventoryRow[]> {
    const { data, error } = await supabase.from('inventory_items').select('*').eq('owner_id', ownerId);
    if (error) throw error;
    return (data as InventoryRow[]) ?? [];
}

export async function toggleEquipItem(itemId: string, equipped: boolean) {
    const { error } = await supabase
        .from('inventory_items')
        .update({ equipped } as Database['public']['Tables']['inventory_items']['Update'])
        .eq('id', itemId);
    if (error) throw error;
}
