import { createClient } from '@supabase/supabase-js';

// Hardcode the Supabase URL and key for production deployment
const supabaseUrl = 'https://hyfiubkfwkviactciqff.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5Zml1Ymtmd2t2aWFjdGNpcWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODA0MDcsImV4cCI6MjA2NDA1NjQwN30.j3vQCo_-i89Db_FU2IDiZ5Smm_YdpRr66XXZOFKigYQ';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);