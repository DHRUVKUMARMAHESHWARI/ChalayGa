import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { COLORS } from "../src/constants/theme";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const onboarded = await AsyncStorage.getItem("@meetup_app:onboarding_completed");
      const token = await AsyncStorage.getItem("userToken");
      
      setHasOnboarded(onboarded === "true");
      setIsAuthenticated(!!token);
    } catch (e) {
      setHasOnboarded(false);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!hasOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  return <Redirect href="/(tabs)" />;
}
