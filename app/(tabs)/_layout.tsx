import { useEffect } from "react";
import { Tabs } from "expo-router";
import { COLORS } from "../../src/constants/theme";
import Icon from "../../src/components/Icon";
import { registerForPushNotifications } from "../../src/notifications/registerPushToken";
import { savePushToken } from "../../src/api/userApi";

export default function TabLayout() {
  useEffect(() => {
    const registerPush = async () => {
      try {
        const token = await registerForPushNotifications();
        if (token) {
          console.log('[TabsLayout] Push token obtained:', token);
          await savePushToken(token);
          console.log('[TabsLayout] Push token saved to server');
        } else {
          console.log('[TabsLayout] No push token obtained');
        }
      } catch (error) {
        console.error('[TabsLayout] Error registering push token:', error);
      }
    };
    registerPush();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="circles"
        options={{
          title: "Circles",
          tabBarIcon: ({ color }) => <Icon name="users" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Icon name="user-circle" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
