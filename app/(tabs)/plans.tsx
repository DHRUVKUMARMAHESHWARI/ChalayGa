import { View, Text, StyleSheet } from "react-native";
import { COLORS, TYPOGRAPHY } from "../../src/constants/theme";

export default function PlansTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Plans ✨</Text>
      <Text style={styles.subtitle}>Coming soon! You'll be able to see all your upcoming meetups here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
