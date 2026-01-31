export type MemoryType = "photo" | "video";

export type Memory = {
  id: string;
  type: MemoryType;
  storage_path: string;
  taken_at: string;
  note: string | null;
  tags: Record<string, any> | null;
  created_at: string;
};
