import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function SettingsScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <ThemedText type="title">Settings</ThemedText>
      <ThemedText style={{ marginTop: 8 }}>
        Cài đặt: font lớn, tương phản cao, giọng đọc (sẽ làm sau).
      </ThemedText>
    </ThemedView>
  );
}
