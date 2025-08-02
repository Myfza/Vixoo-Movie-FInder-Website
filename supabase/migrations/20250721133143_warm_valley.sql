/*
  # Create favorites table for Movie Finder app

  1. New Tables
    - `favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)  
      - `movie_id` (int, TMDb movie ID)
      - `movie_title` (text, movie title)
      - `movie_poster` (text, poster URL)
      - `movie_rating` (float, movie rating)
      - `movie_release_date` (text, release date)
      - `created_at` (timestamp, auto-generated)

  2. Security
    - Enable RLS on `favorites` table
    - Add policy for authenticated users to access only their own favorites
*/

CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  movie_id int NOT NULL,
  movie_title text NOT NULL,
  movie_poster text,
  movie_rating float,
  movie_release_date text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own favorites"
  ON favorites
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);