import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { COLORS, TYPOGRAPHY, SPACING, SIZES, SHADOWS } from "../constants/theme";
import Icon from "../components/Icon";
import Button from "../components/Button";
import { getMeetup } from "../api/meetupApi";

interface SuggestionScreenProps {
  navigation: any;
  route?: any;
}

export default function SuggestionScreen({ navigation, route }: SuggestionScreenProps) {
  const meetupId = route?.params?.meetupId;
  const meetupCode = route?.params?.meetupCode || "----";
  const [meetupData, setMeetupData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetup = async () => {
      if (!meetupId) {
        setLoading(false);
        return;
      }
      try {
        const data = await getMeetup(meetupId);
        setMeetupData(data);
      } catch (error) {
        console.error("Error fetching meetup in suggestion:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetup();
  }, [meetupId]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.back()}
        >
          <Icon name="arrow-left" size={24} color={COLORS.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Plan Locked</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.screenTitle}>Meetup Locked 🎉</Text>
        
        {/* Code Display */}
        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>JOIN CODE</Text>
          <Text style={styles.codeValue}>{meetupCode}</Text>
        </View>

        {/* Place Card */}
        {meetupData?.selectedLocation ? (
          <View style={styles.placeCard}>
            <View style={styles.placeImagePlaceholder}>
              <Icon name="map-pin" size={40} color={COLORS.primary} />
            </View>
            
            <Text style={styles.placeName}>{meetupData.selectedLocation.name}</Text>
            <Text style={styles.placeDetails}>
              {meetupData.selectedLocation.address}
            </Text>
          </View>
        ) : (
          <View style={styles.placeCard}>
            <View style={[styles.placeImagePlaceholder, { backgroundColor: COLORS.border }]}>
              <Icon name="help-circle" size={40} color={COLORS.textTertiary} />
            </View>
            <Text style={styles.placeName}>TBD</Text>
            <Text style={styles.placeDetails}>Waiting for final selection</Text>
          </View>
        )}

        <View style={{ flex: 1 }} />
        
        {/* Done Button */}
        <Button 
            title="Back to Home"
            onPress={() => navigation.navigate("index")} 
            variant="secondary"
            fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    height: 56,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  screenTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    textAlign: "center",
  },
  codeContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: COLORS.primary,
    minWidth: 200,
    borderStyle: 'dashed',
  },
  codeLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
    letterSpacing: 1,
  },
  codeValue: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: 2,
  },
  placeCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SPACING.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.level1,
  },
  placeImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  placeName: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  placeDetails: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.textSecondary,
  },
});
