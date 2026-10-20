-- ============================================================================
-- Supabase PostgreSQL Schema for AI Skill Mentor
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ============================================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student',
  career_goal TEXT DEFAULT 'Software Engineer',
  country TEXT DEFAULT 'India',
  skills JSONB DEFAULT '[]'::jsonb,
  interests JSONB DEFAULT '[]'::jsonb,
  languages JSONB DEFAULT '["English", "Hindi"]'::jsonb,
  education JSONB DEFAULT '{}'::jsonb,
  school_education JSONB DEFAULT '{}'::jsonb,
  experience JSONB DEFAULT '[]'::jsonb,
  achievements JSONB DEFAULT '[]'::jsonb,
  student_projects JSONB DEFAULT '[]'::jsonb,
  student_courses JSONB DEFAULT '[]'::jsonb,
  is_profile_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 2. Roadmaps Table
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  career_id TEXT NOT NULL,
  career_title TEXT NOT NULL,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  progress_percent INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 3. Resume Scans Table
CREATE TABLE IF NOT EXISTS public.resume_scans (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 80,
  score_breakdown JSONB DEFAULT '{}'::jsonb,
  extracted_data JSONB DEFAULT '{}'::jsonb,
  strengths JSONB DEFAULT '[]'::jsonb,
  weaknesses JSONB DEFAULT '[]'::jsonb,
  suggestions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 4. Mock Interviews Table
CREATE TABLE IF NOT EXISTS public.mock_interviews (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  career TEXT NOT NULL,
  interview_type TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  questions JSONB DEFAULT '[]'::jsonb,
  overall_score INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 5. Enable Row Level Security (RLS) & Permissive Policies for Public App Access
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_interviews ENABLE ROW LEVEL SECURITY;

-- Allow public access for reading & writing application records
CREATE POLICY "Public Profiles Access" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Roadmaps Access" ON public.roadmaps FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Resume Scans Access" ON public.resume_scans FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Mock Interviews Access" ON public.mock_interviews FOR ALL USING (true) WITH CHECK (true);

-- Enable Realtime replication (optional, for real-time dashboards)
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.roadmaps;
