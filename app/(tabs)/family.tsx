import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function FamilyScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <ThemedText type="title">Family</ThemedText>
      <ThemedText style={{ marginTop: 8 }}>
        Album gia đình: tạo nhóm, mời bằng mã/email, xem cập nhật con cháu.
      </ThemedText>
    </ThemedView>
  );
}
