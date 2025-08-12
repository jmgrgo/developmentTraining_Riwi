import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rjxjdicpomhrntsccgvl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqeGpkaWNwb21ocm50c2NjZ3ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTk0MzAsImV4cCI6MjA3MDU3NTQzMH0.YBMYshuAaGGc0qoFRydWi7uGhhz8JrvlK1_Az8huH7s";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
