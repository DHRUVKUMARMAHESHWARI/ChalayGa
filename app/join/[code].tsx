import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getMeetupByCode } from '../../src/api/meetupApi';
import { COLORS, TYPOGRAPHY } from '../../src/constants/theme';

export default function AutoJoinMeetup() {
  const { code } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (code) {
      autoJoin();
    }
  }, [code]);

  const autoJoin = async () => {
    try {
      const meetup = await getMeetupByCode(code as string);
      
      router.replace({
        pathname: "/room",
        params: {
          meetupId: meetup._id,
          meetupType: meetup.type,
          meetupCode: meetup.code,
          hostName: meetup.hostName,
          meetupTitle: meetup.title
        }
      });
    } catch (error) {
      console.error("Auto-join error:", error);
      // If code is invalid, fallback to the manual join screen
      router.replace("/join");
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>Joining meetup...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textSecondary,
  },
});
