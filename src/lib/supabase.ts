import { createClient } from '@supabase/supabase-js';

// Default to the known Supabase URL if environment variable is not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hyfiubkfwkviactciqff.supabase.co';

// Check if the key is available
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that we have the required configuration
if (!supabaseKey) {
  console.error('Supabase Anon Key is missing. Please check your environment variables.');
}

// Create the Supabase client with error handling
export const supabase = createClient(supabaseUrl, supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5Zml1Ymtmd2t2aWFjdGNpcWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5MjI2MzksImV4cCI6MjAzMjQ5ODYzOX0.9YDEN41__xBFJU96yCmLnFyxIXxkgcjtlm-Qs7V-Joo');