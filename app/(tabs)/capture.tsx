import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { createMemory } from "@/src/feature/memory/api";
import { uploadImageToStorage } from "@/src/feature/memory/upload";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Pressable } from "react-native";

export default function CaptureScreen() {
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function pickAndUpload() {
    setStatus("");
    setLoading(true);
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        setStatus("Bạn cần cấp quyền truy cập thư viện ảnh.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.9,
      });

      if (result.canceled) return;

      const uri = result.assets[0].uri;
      setLocalUri(uri);

      setStatus("Đang upload...");
      const { path } = await uploadImageToStorage(uri);

      setStatus("Đang lưu vào database...");
      await createMemory({
        type: "photo",
        storage_path: path,
        note: "Ảnh mới từ Capture",
      });

      setStatus("✅ Xong! Mở Timeline để xem.");
      // Option: tự chuyển qua Timeline
      // router.push("/(tabs)/timeline");
    } catch (e: any) {
      setStatus("❌ Lỗi: " + (e?.message ?? String(e)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Capture</ThemedText>

      <Pressable
        onPress={pickAndUpload}
        disabled={loading}
        style={{
          marginTop: 12,
          alignSelf: "flex-start",
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 10,
          borderWidth: 1,
          opacity: loading ? 0.6 : 1,
        }}
      >
        <ThemedText>
          {loading ? "Đang xử lý..." : "Chọn ảnh & Upload"}
        </ThemedText>
      </Pressable>

      {status ? (
        <ThemedText style={{ marginTop: 12 }}>{status}</ThemedText>
      ) : null}

      {localUri ? (
        <Image
          source={{ uri: localUri }}
          style={{
            marginTop: 16,
            width: "100%",
            height: 260,
            borderRadius: 12,
          }}
          resizeMode="cover"
        />
      ) : null}
    </ThemedView>
  );
}
