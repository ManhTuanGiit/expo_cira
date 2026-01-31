import { IconSymbol } from "@/components/ui/icon-symbol";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="timeline"
        options={{
          title: "Timeline",
          tabBarIcon: ({ color }) => <IconSymbol name="clock" color={color} />,
        }}
      />
      <Tabs.Screen
        name="capture"
        options={{
          title: "Capture",
          tabBarIcon: ({ color }) => <IconSymbol name="camera" color={color} />,
        }}
      />
      <Tabs.Screen
        name="family"
        options={{
          title: "Family",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="person.2" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="gearshape" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
