-- SUPABASE SETUP SQL
-- Run this in your Supabase SQL Editor

-- 0. Make provider_voice_id nullable for dynamic voice strategy
ALTER TABLE voices ALTER COLUMN provider_voice_id DROP NOT NULL;

-- 1. Create function to auto-create profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, credits, created_at, updated_at)
  VALUES (new.id, new.email, 5, now(), now())
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE voices ENABLE ROW LEVEL SECURITY;
ALTER TABLE audios ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- 4. Profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 5. Voices policies
DROP POLICY IF EXISTS "Users can view own voices" ON voices;
CREATE POLICY "Users can view own voices" ON voices
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own voices" ON voices;
CREATE POLICY "Users can insert own voices" ON voices
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own voices" ON voices;
CREATE POLICY "Users can delete own voices" ON voices
  FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own voices" ON voices;
CREATE POLICY "Users can update own voices" ON voices
  FOR UPDATE USING (auth.uid() = user_id);

-- 6. Audios policies
DROP POLICY IF EXISTS "Users can view own audios" ON audios;
CREATE POLICY "Users can view own audios" ON audios
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own audios" ON audios;
CREATE POLICY "Users can insert own audios" ON audios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 7. Credit transactions policies
DROP POLICY IF EXISTS "Users can view own transactions" ON credit_transactions;
CREATE POLICY "Users can view own transactions" ON credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own transactions" ON credit_transactions;
CREATE POLICY "Users can insert own transactions" ON credit_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
