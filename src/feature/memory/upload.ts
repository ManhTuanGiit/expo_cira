import { supabase } from "@/src/lib/supabase";

function getFileExt(uri: string) {
  const match = uri.match(/\.([a-zA-Z0-9]+)$/);
  return match?.[1]?.toLowerCase() ?? "jpg";
}

export async function uploadImageToStorage(uri: string) {
  const ext = getFileExt(uri);
  const fileName = `${Date.now()}.${ext}`;
  const path = `uploads/${fileName}`;

  const res = await fetch(uri);
  const blob = await res.blob();

  const { error } = await supabase.storage.from("memories").upload(path, blob, {
    contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
    upsert: false,
  });

  if (error) throw error;
  return { path };
}
