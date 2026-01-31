import { createClient } from "@supabase/supabase-js";
import "expo-sqlite/localStorage/install";
import "react-native-url-polyfill/auto";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log("ENV supabaseUrl:", supabaseUrl);
console.log("ENV supabaseKey:", supabaseKey?.slice(0, 20));

if (!supabaseUrl) throw new Error("EXPO_PUBLIC_SUPABASE_URL is missing");
if (!supabaseKey)
  throw new Error(
    "EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or ANON_KEY) is missing",
  );

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
