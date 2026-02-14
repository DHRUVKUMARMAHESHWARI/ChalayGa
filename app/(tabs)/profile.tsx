import { View, Text, StyleSheet } from "react-native";
import { COLORS, TYPOGRAPHY } from "../../src/constants/theme";

export default function ProfileTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile 👤</Text>
      <Text style={styles.subtitle}>Coming soon! Manage your settings and personality here.</Text>
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
