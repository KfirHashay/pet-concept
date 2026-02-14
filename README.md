# Pet Concept

A cross-platform modern Tamagotchi / lifestyle pet app built with **Expo** (React Native) for Android, iOS, and Web.

## Tech Stack

- **Expo** (React Native) + TypeScript (strict)
- **Expo Router** - file-based navigation (tabs + stacks)
- **Zustand** - state management
- **React Native Reanimated** - animations
- **Supabase** - Auth, Postgres, Row Level Security
- **@gorhom/bottom-sheet** - action sheet UI

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up Supabase

Run the SQL migrations in order against your Supabase project (via the SQL Editor or supabase db push):

```
supabase/migrations/001_initial_schema.sql   - Tables + indexes
supabase/migrations/002_rls_policies.sql     - Row Level Security
supabase/migrations/003_seed_cosmetics.sql   - Seed cosmetics catalog
```

### 4. Run the app

```bash
npx expo start
```

Then press:
- `w` for web
- `a` for Android
- `i` for iOS

## Project Structure

```
src/
  config/       # Environment config
  data/         # Supabase client + repositories
  engine/       # Game logic types + stubs
  state/        # Zustand stores
  theme/        # Design tokens + ThemeProvider
  ui/           # Reusable components

app/
  _layout.tsx   # Root layout (auth gate, providers)
  auth.tsx      # Sign in / Sign up
  onboarding.tsx # Create pet + traits
  (tabs)/
    _layout.tsx  # Tab navigator
    index.tsx    # Home (pet + stats + actions)
    closet.tsx   # Wardrobe / cosmetics
    settings.tsx # Theme + account

supabase/
  migrations/   # SQL schema + RLS + seed data
```

## Architecture

- **src/engine/** - Pure game logic (interfaces + stubs now; real engine plugs in later)
- **src/data/** - Supabase queries / data layer
- **src/state/** - Zustand stores (auth, pet, closet, theme)
- **src/theme/** - Design tokens + AppThemeProvider (dark-first, system toggle)
- **src/ui/** - Shared components (Button, Input, StatBar, Chip, PetAvatar)

## Version

v0.0.1 - Core foundation (auth, onboarding, home, closet, settings)
