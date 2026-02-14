/**
 * Environment configuration.
 * Expo injects EXPO_PUBLIC_* vars at build time.
 */

const requireEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};

export const env = {
    supabase: {
        url: requireEnv('EXPO_PUBLIC_SUPABASE_URL'),
        anonKey: requireEnv('EXPO_PUBLIC_SUPABASE_ANON_KEY'),
    },
} as const;
