import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function CaptureScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <ThemedText type="title">Capture</ThemedText>
      <ThemedText style={{ marginTop: 8 }}>
        Nơi chụp ảnh/quay video (sẽ làm sau).
      </ThemedText>
    </ThemedView>
  );
}
