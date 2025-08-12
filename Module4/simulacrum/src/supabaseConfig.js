import './styles.css'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://aaaourjcdnawncyclcwa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhYW91cmpjZG5hd25jeWNsY3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4ODIyMjMsImV4cCI6MjA3MDQ1ODIyM30.DFsctqTZdWKhFkueeNfU4evQoV24S9rjIrf-Ka4EcEw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;