/*
  # Tournament System Tables

  1. New Tables
    - `tournaments`
      - `id` (uuid, primary key)
      - `game_id` (text, required)
      - `status` (text, either 'active' or 'closed')
      - `registered_players` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `tournament_registrations`
      - `id` (uuid, primary key)
      - `game_id` (text, required)
      - `player_name` (text, required)
      - `status` (text, default 'registered')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated insert access
*/

-- Create tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id text NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'closed')),
  registered_players integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tournament_registrations table
CREATE TABLE IF NOT EXISTS tournament_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id text NOT NULL,
  player_name text NOT NULL,
  status text DEFAULT 'registered' CHECK (status IN ('registered', 'waitlist')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for tournaments table
CREATE POLICY "Allow public read access to tournaments"
  ON tournaments
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to update tournaments"
  ON tournaments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for tournament_registrations table
CREATE POLICY "Allow public read access to tournament_registrations"
  ON tournament_registrations
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert tournament_registrations"
  ON tournament_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert initial tournament data for each game
INSERT INTO tournaments (game_id, status, registered_players) VALUES
  ('gow', 'active', 0),
  ('mk11', 'active', 0),
  ('fc24', 'active', 0),
  ('naruto', 'active', 0)
ON CONFLICT (id) DO NOTHING;