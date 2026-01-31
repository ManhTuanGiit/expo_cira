import { supabase } from "@/src/lib/supabase";

export type Memory = {
  id: string;
  type: "photo" | "video";
  storage_path: string;
  taken_at: string;
  note: string | null;
  tags: any | null;
  created_at: string;
};

export async function listMemories(limit = 50): Promise<Memory[]> {
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .order("taken_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}
