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
export async function createMemory(input: {
  type: "photo" | "video";
  storage_path: string;
  note?: string | null;
  taken_at?: string;
}) {
  const payload = {
    user_id: crypto.randomUUID(), // tạm thời cho MVP (khi làm auth sẽ đổi sang auth.uid)
    type: input.type,
    storage_path: input.storage_path,
    note: input.note ?? null,
    taken_at: input.taken_at ?? new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("memories")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
