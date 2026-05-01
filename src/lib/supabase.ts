import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ovnblccunyanzffvgvsj.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92bmJsY2N1bnlhbnpmZnZndnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NjQ4OTAsImV4cCI6MjA5MjE0MDg5MH0._W_s-2aseCoGNuSN861_N1HKoouBKv3oKw30OxjYq58";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
