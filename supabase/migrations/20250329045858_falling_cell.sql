/*
  # Create mentees table and related security policies

  1. New Tables
    - `mentees`
      - `id` (uuid, primary key)
      - `mentor_id` (uuid, references auth.users)
      - `name` (text)
      - `codechef_username` (text)
      - `codeforces_username` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `mentees` table
    - Add policies for mentors to manage their mentees
*/

CREATE TABLE IF NOT EXISTS mentees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  codechef_username text,
  codeforces_username text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE mentees ENABLE ROW LEVEL SECURITY;

-- Policy: Mentors can read their own mentees
CREATE POLICY "Mentors can read their own mentees"
  ON mentees
  FOR SELECT
  TO authenticated
  USING (auth.uid() = mentor_id);

-- Policy: Mentors can insert mentees
CREATE POLICY "Mentors can insert mentees"
  ON mentees
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = mentor_id);

-- Policy: Mentors can update their own mentees
CREATE POLICY "Mentors can update their own mentees"
  ON mentees
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = mentor_id)
  WITH CHECK (auth.uid() = mentor_id);

-- Policy: Mentors can delete their own mentees
CREATE POLICY "Mentors can delete their own mentees"
  ON mentees
  FOR DELETE
  TO authenticated
  USING (auth.uid() = mentor_id);