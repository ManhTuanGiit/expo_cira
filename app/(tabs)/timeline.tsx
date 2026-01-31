import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";

// ✅ CHÚ Ý: features (có "s")
import { listMemories, type Memory } from "@/src/feature/memory/api";

export default function TimelineScreen() {
  const [items, setItems] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setErrorMsg(null);

    try {
      const data = await listMemories(50);

      // debug: xem data có về không
      console.log("memories fetched:", data);

      setItems(data);
    } catch (e: any) {
      console.log("listMemories error:", e);
      setErrorMsg(
        e?.message ??
          e?.toString?.() ??
          "Failed to load memories (unknown error)",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Timeline</ThemedText>

      <Pressable
        onPress={load}
        style={{
          marginTop: 12,
          alignSelf: "flex-start",
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 10,
          borderWidth: 1,
        }}
      >
        <ThemedText>{loading ? "Loading..." : "Refresh"}</ThemedText>
      </Pressable>

      {!!errorMsg && (
        <ThemedText style={{ marginTop: 12, fontSize: 14 }}>
          Error: {errorMsg}
        </ThemedText>
      )}

      <FlatList
        style={{ marginTop: 12 }}
        data={items}
        keyExtractor={(it) => it.id}
        ListEmptyComponent={
          <ThemedText style={{ marginTop: 20 }}>
            {loading ? "Đang tải..." : "Chưa có ký ức nào."}
          </ThemedText>
        }
        renderItem={({ item }) => (
          <ThemedView
            style={{
              padding: 12,
              borderRadius: 14,
              borderWidth: 1,
              marginBottom: 10,
            }}
          >
            <ThemedText type="defaultSemiBold">
              {item.type.toUpperCase()} •{" "}
              {new Date(item.taken_at).toLocaleString()}
            </ThemedText>

            <ThemedText style={{ marginTop: 6 }}>
              {item.note ?? "(no note)"}
            </ThemedText>

            <ThemedText style={{ marginTop: 6, opacity: 0.7 }}>
              {item.storage_path}
            </ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}
