-- 001_initial_schema.sql
-- Core tables for pet-concept v0.0.x

-- Profiles (1:1 with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pets
CREATE TABLE IF NOT EXISTS public.pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT NOT NULL DEFAULT 'blob',
  level INT NOT NULL DEFAULT 1,
  xp INT NOT NULL DEFAULT 0,
  traits TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Pet state (stats)
CREATE TABLE IF NOT EXISTS public.pet_state (
  pet_id UUID PRIMARY KEY REFERENCES public.pets(id) ON DELETE CASCADE,
  hunger INT NOT NULL DEFAULT 50,
  energy INT NOT NULL DEFAULT 50,
  happiness INT NOT NULL DEFAULT 50,
  cleanliness INT NOT NULL DEFAULT 50,
  last_tick_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Wallet
CREATE TABLE IF NOT EXISTS public.wallet (
  owner_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  coins INT NOT NULL DEFAULT 100,
  gems INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cosmetics catalog (static/seed data)
CREATE TABLE IF NOT EXISTS public.cosmetics_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  asset_key TEXT NOT NULL,
  unlock_type TEXT NOT NULL DEFAULT 'coins',
  unlock_value INT NOT NULL DEFAULT 0
);

-- Inventory items
CREATE TABLE IF NOT EXISTS public.inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_key TEXT NOT NULL,
  qty INT NOT NULL DEFAULT 1,
  equipped BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_pets_owner ON public.pets(owner_id);
CREATE INDEX IF NOT EXISTS idx_inventory_owner ON public.inventory_items(owner_id);
