import { Pressable, Text } from "react-native";

export default function PrimaryButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
        <Text>{title}</Text>
    </Pressable>
  );
}
