import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function TimelineScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <ThemedText type="title">Timeline</ThemedText>
      <ThemedText style={{ marginTop: 8 }}>
        Nơi hiển thị ký ức theo ngày/tháng (ảnh/video + tags + ghi chú).
      </ThemedText>
    </ThemedView>
  );
}
