import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Screen({
  children,
  scroll = true,
}: {
  children: React.ReactNode;
  scroll?: boolean;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-50" style={{ paddingTop: insets.top }}>
      {scroll ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View className="flex-1">{children}</View>
      )}
    </View>
  );
}

type SectionTitleProps = {
  title: string;
  count?: number;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionTitle({
  title,
  count,
  actionLabel,
  onActionPress,
}: SectionTitleProps) {
  return (
    <View className="flex-row items-center justify-between mt-6 mb-2">
      <Text className="text-base font-bold text-slate-900">
        {title}
        {count !== undefined && (
          <Text className="font-medium text-slate-400"> {count}</Text>
        )}
      </Text>

      {actionLabel && (
        <Pressable onPress={onActionPress} hitSlop={8}>
          <Text className="text-sm font-semibold text-indigo-600">
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

type ChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
  dotColor?: string;
};

export function Chip({ label, active, onPress, dotColor }: ChipProps) {
  const containerStyle = active
    ? "bg-slate-900 border-slate-900"
    : "bg-white border-slate-200";
  const textStyle = active ? "text-white" : "text-slate-600";

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center rounded-full px-4 py-2 border ${containerStyle}`}
    >
      {dotColor && (
        <View
          className="w-2 h-2 rounded-full mr-2"
          style={{ backgroundColor: dotColor }}
        />
      )}
      <Text className={`text-sm font-semibold ${textStyle}`}>{label}</Text>
    </Pressable>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <View className="h-2 rounded-full overflow-hidden bg-white/25">
      <View
        className="h-2 rounded-full bg-white"
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </View>
  );
}

export function AddButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel="Add task"
      className="absolute right-5 bottom-6 w-14 h-14 rounded-2xl bg-indigo-600 items-center justify-center active:bg-indigo-700"
      style={{
        elevation: 6,
        shadowColor: "#4338CA",
        shadowOpacity: 0.35,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      }}
    >
      <Ionicons name="add" size={30} color="#fff" />
    </Pressable>
  );
}
