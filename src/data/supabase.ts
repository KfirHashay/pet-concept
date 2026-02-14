import { env } from '@/src/config/env';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import type { Database } from './database.types';

/**
 * Platform-safe storage adapter.
 * - Native: uses AsyncStorage
 * - Web: uses localStorage (with SSR guard)
 */
const createStorage = () => {
    if (Platform.OS !== 'web') {
        // Lazy-require to avoid `window` access during web SSR bundling
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        return AsyncStorage;
    }

    // Web-safe localStorage wrapper (guards against SSR where window is undefined)
    return {
        getItem: (key: string) => {
            if (typeof window === 'undefined') return null;
            return window.localStorage.getItem(key);
        },
        setItem: (key: string, value: string) => {
            if (typeof window === 'undefined') return;
            window.localStorage.setItem(key, value);
        },
        removeItem: (key: string) => {
            if (typeof window === 'undefined') return;
            window.localStorage.removeItem(key);
        },
    };
};

export const supabase = createClient<Database>(env.supabase.url, env.supabase.anonKey, {
    auth: {
        storage: createStorage(),
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: Platform.OS === 'web',
    },
});
