import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import { TaskProvider } from "../features/tasks";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="task-form" options={{ presentation: "modal" }} />
        </Stack>
      </TaskProvider>
    </SafeAreaProvider>
  );
}
