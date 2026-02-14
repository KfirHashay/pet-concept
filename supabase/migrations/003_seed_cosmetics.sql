-- 003_seed_cosmetics.sql
-- Seed data for cosmetics catalog

INSERT INTO public.cosmetics_catalog (category, name, asset_key, unlock_type, unlock_value) VALUES
  ('hat', 'Party Hat', 'hat_party', 'coins', 50),
  ('hat', 'Beanie', 'hat_beanie', 'coins', 30),
  ('hat', 'Crown', 'hat_crown', 'gems', 5),
  ('accessory', 'Bow Tie', 'acc_bowtie', 'coins', 25),
  ('accessory', 'Sunglasses', 'acc_sunglasses', 'coins', 40),
  ('accessory', 'Scarf', 'acc_scarf', 'coins', 35),
  ('outfit', 'Pajamas', 'outfit_pajamas', 'coins', 60),
  ('outfit', 'Tuxedo', 'outfit_tuxedo', 'gems', 10),
  ('background', 'Meadow', 'bg_meadow', 'coins', 80),
  ('background', 'Night Sky', 'bg_nightsky', 'coins', 100),
  ('background', 'Beach', 'bg_beach', 'gems', 8)
ON CONFLICT DO NOTHING;
