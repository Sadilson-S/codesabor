import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and key from environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hyfiubkfwkviactciqff.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5Zml1Ymtmd2t2aWFjdGNpcWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODA0MDcsImV4cCI6MjA2NDA1NjQwN30.j3vQCo_-i89Db_FU2IDiZ5Smm_YdpRr66XXZOFKigYQ';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Log connection status (for debugging)
console.log('Supabase client initialized with URL:', supabaseUrl);