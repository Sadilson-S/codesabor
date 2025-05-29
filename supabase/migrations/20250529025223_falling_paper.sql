/*
  # Update Tournament Registration RLS Policies

  1. Changes
    - Update RLS policies for tournament_registrations table
    - Add policy for insert operations
    - Ensure proper access control for registrations

  2. Security
    - Enable RLS on tournament_registrations table
    - Allow public users to insert new registrations
    - Maintain existing read access policy
*/

-- First ensure RLS is enabled
ALTER TABLE tournament_registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing insert policy if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tournament_registrations' 
    AND cmd = 'INSERT'
  ) THEN
    DROP POLICY IF EXISTS "Allow authenticated users to insert tournament_registrations" ON tournament_registrations;
  END IF;
END $$;

-- Create new insert policy that allows public access
CREATE POLICY "Allow public to insert tournament_registrations"
ON tournament_registrations
FOR INSERT
TO public
WITH CHECK (true);

-- Ensure the select policy exists and is correct
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tournament_registrations' 
    AND cmd = 'SELECT'
  ) THEN
    CREATE POLICY "Allow public read access to tournament_registrations"
    ON tournament_registrations
    FOR SELECT
    TO public
    USING (true);
  END IF;
END $$;