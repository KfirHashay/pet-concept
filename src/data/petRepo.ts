import type { Trait } from '@/src/engine/types';
import type { Database } from './database.types';
import { supabase } from './supabase';

type PetRow = Database['public']['Tables']['pets']['Row'];
type PetStateRow = Database['public']['Tables']['pet_state']['Row'];
type WalletRow = Database['public']['Tables']['wallet']['Row'];

export async function createProfile(userId: string, displayName: string) {
    const { error } = await supabase.from('profiles').insert({ id: userId, display_name: displayName });
    if (error) throw error;
}

export async function createPet(ownerId: string, name: string, traits: Trait[]): Promise<PetRow> {
    const { data, error } = await supabase
        .from('pets')
        .insert({
            owner_id: ownerId,
            name,
            traits: traits as string[],
            species: 'blob',
        })
        .select('*')
        .single();
    if (error) throw error;
    return data as PetRow;
}

export async function createPetState(petId: string) {
    const { error } = await supabase.from('pet_state').insert({ pet_id: petId });
    if (error) throw error;
}

export async function createWallet(ownerId: string) {
    const { error } = await supabase.from('wallet').insert({ owner_id: ownerId, coins: 100, gems: 0 });
    if (error) throw error;
}

export async function fetchPet(ownerId: string): Promise<PetRow | null> {
    const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('owner_id', ownerId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
    if (error) throw error;
    return data as PetRow | null;
}

export async function fetchPetState(petId: string): Promise<PetStateRow | null> {
    const { data, error } = await supabase.from('pet_state').select('*').eq('pet_id', petId).single();
    if (error) throw error;
    return data as PetStateRow | null;
}

export async function fetchWallet(ownerId: string): Promise<WalletRow | null> {
    const { data, error } = await supabase.from('wallet').select('*').eq('owner_id', ownerId).single();
    if (error) throw error;
    return data as WalletRow | null;
}

export async function updatePetState(petId: string, updates: { hunger?: number; energy?: number; happiness?: number; cleanliness?: number }) {
    const { error } = await supabase
        .from('pet_state')
        .update({ ...updates, updated_at: new Date().toISOString() } as Database['public']['Tables']['pet_state']['Update'])
        .eq('pet_id', petId);
    if (error) throw error;
}

export async function updateWallet(ownerId: string, updates: { coins?: number; gems?: number }) {
    const { error } = await supabase
        .from('wallet')
        .update({ ...updates, updated_at: new Date().toISOString() } as Database['public']['Tables']['wallet']['Update'])
        .eq('owner_id', ownerId);
    if (error) throw error;
}
