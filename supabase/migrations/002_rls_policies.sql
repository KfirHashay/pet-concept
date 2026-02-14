-- 002_rls_policies.sql
-- Row Level Security for all user-owned tables

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pet_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cosmetics_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own row
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Pets: users can CRUD their own pets
CREATE POLICY "Users can view own pets"
  ON public.pets FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create own pets"
  ON public.pets FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own pets"
  ON public.pets FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can delete own pets"
  ON public.pets FOR DELETE
  USING (auth.uid() = owner_id);

-- Pet state: tied to pet ownership (via subquery)
CREATE POLICY "Users can view own pet state"
  ON public.pet_state FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.pets
      WHERE pets.id = pet_state.pet_id AND pets.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own pet state"
  ON public.pet_state FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.pets
      WHERE pets.id = pet_state.pet_id AND pets.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own pet state"
  ON public.pet_state FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.pets
      WHERE pets.id = pet_state.pet_id AND pets.owner_id = auth.uid()
    )
  );

-- Wallet: users can read/update their own wallet
CREATE POLICY "Users can view own wallet"
  ON public.wallet FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert own wallet"
  ON public.wallet FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own wallet"
  ON public.wallet FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Cosmetics catalog: readable by all authenticated users (static data)
CREATE POLICY "Authenticated users can view catalog"
  ON public.cosmetics_catalog FOR SELECT
  USING (auth.role() = 'authenticated');

-- Inventory items: users can CRUD their own items
CREATE POLICY "Users can view own inventory"
  ON public.inventory_items FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert own inventory"
  ON public.inventory_items FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own inventory"
  ON public.inventory_items FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can delete own inventory"
  ON public.inventory_items FOR DELETE
  USING (auth.uid() = owner_id);
