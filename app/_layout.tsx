import { Stack } from "expo-router";
import * as Notifications from 'expo-notifications';
import React from 'react';

import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const responseListener = React.useRef<Notifications.Subscription | undefined>();
  const notificationListener = React.useRef<Notifications.Subscription | undefined>();

  React.useEffect(() => {
    // Create the channel for Android
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('--- NOTIFICATION RECEIVED ---');
      console.log(notification);
      console.log('-----------------------------');
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('--- NOTIFICATION RESPONSE ---');
      console.log(response);
      console.log('-----------------------------');
    });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}

