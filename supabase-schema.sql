-- Supabase SQL Editor에서 실행하세요

-- 1. profiles 테이블
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  name TEXT,
  title TEXT,
  avatar_url TEXT,
  bg_color TEXT DEFAULT '#e9d5ff',
  social_twitter TEXT,
  social_telegram TEXT,
  social_linkedin TEXT,
  social_whatsapp TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. links 테이블
CREATE TABLE links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT DEFAULT 'custom',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RLS (Row Level Security) 설정
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- 프로필 정책: 누구나 읽기 가능, 본인만 수정 가능
CREATE POLICY "Public profiles are viewable by everyone" 
  ON profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = user_id);

-- 링크 정책: 누구나 읽기 가능, 프로필 소유자만 수정 가능
CREATE POLICY "Public links are viewable by everyone" 
  ON links FOR SELECT 
  USING (true);

CREATE POLICY "Users can manage links for their profiles" 
  ON links FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = links.profile_id 
      AND profiles.user_id = auth.uid()
    )
  );

-- 4. 인덱스
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_links_profile_id ON links(profile_id);
CREATE INDEX idx_links_order ON links(profile_id, order_index);
