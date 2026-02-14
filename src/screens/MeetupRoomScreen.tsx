import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView, Share, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, TYPOGRAPHY, SPACING, SIZES, SHADOWS } from "../constants/theme";
import Icon from "../components/Icon";
import { getMeetup, joinMeetup } from "../api/meetupApi";
import socket from "../socket/socket";

interface MeetupRoomScreenProps {
  navigation: any;
  route: any;
}

interface Participant {
  id: string;
  name: string;
  vote: "yes" | "no" | "maybe";
  initials: string;
}

export default function MeetupRoomScreen({
  navigation,
  route,
}: MeetupRoomScreenProps) {
  const meetupId = route?.params?.meetupId;
  const [user, setUser] = useState<any>(null);
  const [meetupData, setMeetupData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  const fetchMeetupData = async () => {
    if (!meetupId) return;
    try {
      const data = await getMeetup(meetupId);
      setMeetupData(data);
      
      // Check if current user has already voted by userId
      if (user) {
        const userVote = data.participants.find((p: any) => p.userId === user.id);
        if (userVote) {
          setSelectedVote(userVote.vote);
        }
      }
    } catch (error) {
      console.error("Error fetching meetup:", error);
      Alert.alert("Error", "Could not load meetup details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    import("../api/storage").then(({ getUserProfile }) => {
      getUserProfile().then((profile) => {
        if (profile) setUser(profile);
      });
    });
  }, []);

  useEffect(() => {
    if (user && meetupId) {
      fetchMeetupData();
      
      // Join Socket Room
      socket.emit("joinMeetup", meetupId);

      // Listen for updates
      const onMeetupUpdated = (updatedMeetup: any) => {
        if (updatedMeetup._id === meetupId) {
          setMeetupData(updatedMeetup);
          
          // Also update selectedVote if user is in updatedMeetup
          const userVote = updatedMeetup.participants.find((p: any) => p.userId === user.id);
          if (userVote) {
            setSelectedVote(userVote.vote);
          }
        }
      };

      socket.on("meetupUpdated", onMeetupUpdated);

      return () => {
        socket.off("meetupUpdated", onMeetupUpdated);
      };
    }
  }, [user, meetupId]);

  const handleVote = async (vote: "yes" | "no" | "maybe") => {
    if (!user || !meetupId || isVoting) return;
    
    setIsVoting(true);
    setSelectedVote(vote);
    try {
      const updatedMeetup = await joinMeetup(meetupId, user.id, user.name, user.username, vote);
      setMeetupData(updatedMeetup);
    } catch (error) {
      console.error("Error voting:", error);
      Alert.alert("Error", "Could not update vote. Try again.");
    } finally {
      setIsVoting(false);
    }
  };

  const meetupType = meetupData?.type || route?.params?.meetupType || "cafe";
  const meetupCode = meetupData?.code || route?.params?.meetupCode || "----";
  const participants = meetupData?.participants || [];

  const getMeetupEmoji = (type: string) => {
    switch (type.toLowerCase()) {
      case 'cafe': return '☕';
      case 'food': return '🍔';
      case 'walk': return '🚶';
      default: return '🎉';
    }
  };

  const handleShare = async () => {
    const emoji = getMeetupEmoji(meetupType);
    const capitalizedType = meetupType.charAt(0).toUpperCase() + meetupType.slice(1);
    const message = `${user?.name || "A friend"} invited you for a ${capitalizedType} meetup ${emoji}\n\nTap to join instantly:\nchalayga://join/${meetupCode}`;

    try {
      await Share.share({
        message,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const counts = {
    yes: participants.filter((p: any) => p.vote === "yes").length,
    no: participants.filter((p: any) => p.vote === "no").length,
    maybe: participants.filter((p: any) => p.vote === "maybe").length,
  };

  const getVoteStatus = (vote: string) => {
    switch (vote) {
      case "yes":
        return { text: "On the way", color: COLORS.success, icon: "check" };
      case "no":
        return { text: "Can't make it", color: COLORS.danger, icon: "x" };
      case "maybe":
        return { text: "Maybe", color: COLORS.warning, icon: "help-circle" };
      default:
        return { text: "", color: COLORS.textTertiary, icon: "help-circle" };
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: SPACING.md, ...TYPOGRAPHY.bodyRegular }}>Loading Room...</Text>
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
        <Text style={styles.headerTitle}>Meetup Details</Text>
        <Pressable style={styles.shareButton}>
          <Icon name="users" size={24} color={COLORS.textSecondary} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Status Banner */}
        <View style={styles.statusBanner}>
          <Text style={styles.meetupTitle}>
            {meetupData?.title || `${meetupType.charAt(0).toUpperCase() + meetupType.slice(1)} Plan`}
          </Text>
          <Text style={styles.meetupSubtitle}>
            {meetupData?.hostName || "Someone"} started a {meetupType} meetup
          </Text>
          
          {/* Poll Counters */}
          <View style={styles.statsRow}>
            <View style={styles.statPill}>
              <Text style={styles.statEmoji}>✅</Text>
              <Text style={styles.statText}>In: {counts.yes}</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={styles.statEmoji}>🤔</Text>
              <Text style={styles.statText}>Maybe: {counts.maybe}</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={styles.statEmoji}>❌</Text>
              <Text style={styles.statText}>Out: {counts.no}</Text>
            </View>
          </View>
        </View>

        {/* Invite Code Card */}
        <View style={styles.inviteCard}>
          <View>
            <Text style={styles.inviteLabel}>Invite Code</Text>
            <Text style={styles.inviteCode}>{meetupCode}</Text>
          </View>
          <Pressable 
            style={({pressed}) => [
              styles.shareInviteButton, 
              pressed && { opacity: 0.7 }
            ]}
            onPress={handleShare}
          >
            <Text style={styles.shareInviteText}>Share Link 🔗</Text>
          </Pressable>
        </View>

        {/* Location Card - Only show if finalized/selected */}
        {meetupData?.selectedLocation && (
          <View style={styles.locationCard}>
            <Text style={styles.locationLabel}>BEST SPOT</Text>
            <Text style={styles.locationName}>{meetupData.selectedLocation.name}</Text>
            
            <View style={styles.locationDetails}>
              {meetupData.selectedLocation.rating && (
                <>
                  <View style={styles.locationDetail}>
                    <Icon name="star" size={16} color={COLORS.textSecondary} />
                    <Text style={styles.locationDetailText}>{meetupData.selectedLocation.rating}</Text>
                  </View>
                  <Text style={styles.locationDetailDivider}>•</Text>
                </>
              )}
              <View style={styles.locationDetail}>
                <Icon name="map-pin" size={16} color={COLORS.textSecondary} />
                <Text style={styles.locationDetailText}>{meetupData.selectedLocation.address || 'Location Details'}</Text>
              </View>
            </View>

            <Pressable style={styles.viewMapButton}>
              <Text style={styles.viewMapText}>View on Map</Text>
              <Icon name="arrow-right" size={14} color={COLORS.primary} />
            </Pressable>
          </View>
        )}

        {/* Attendance Section - Who's In? */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who's In?</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.attendanceRow}
          >
            {participants.map((participant: any, index: number) => {
              const status = getVoteStatus(participant.vote);
              const emoji = participant.vote === "yes" ? "✅" : participant.vote === "no" ? "❌" : "🤔";
              return (
                <View key={participant._id || index} style={styles.participantCardHorizontal}>
                  <View style={[styles.participantAvatarLarge, { backgroundColor: COLORS.primaryLight }]}>
                    <Text style={styles.participantInitialsLarge}>
                      {participant.name ? participant.name[0].toUpperCase() : "U"}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
                      <Icon name={status.icon as any} size={12} color={COLORS.white} strokeWidth={3} />
                    </View>
                  </View>
                  <Text style={styles.participantNameHorizontal}>
                    {participant.name} {emoji}
                  </Text>
                  <Text style={[styles.participantStatusHorizontal, { color: status.color }]}>
                    {status.text}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Response Buttons */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Response</Text>
            {isVoting && <ActivityIndicator size="small" color={COLORS.primary} />}
          </View>
          <View style={styles.responseContainer}>
             {/* Keep existing radio buttons logic but ensuring it renders correctly */}
             {/* I will keep the radio buttons as they are in the original file, just ensuring context remains valid */}
            <Pressable
              style={[
                styles.radioOption,
                selectedVote === "yes" && [
                  styles.radioOptionSelected,
                  { borderColor: COLORS.success, backgroundColor: `${COLORS.success}0D` }
                ]
              ]}
              onPress={() => handleVote("yes")}
            >
              <View style={[
                styles.radioCircle,
                selectedVote === "yes" && [styles.radioCircleSelected, { borderColor: COLORS.success }]
              ]}>
                {selectedVote === "yes" && <View style={[styles.radioInner, { backgroundColor: COLORS.success }]} />}
              </View>
              <Text style={[
                styles.radioText,
                selectedVote === "yes" && { color: COLORS.success }
              ]}>
                I'm In
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.radioOption,
                selectedVote === "no" && [
                  styles.radioOptionSelected,
                  { borderColor: COLORS.danger, backgroundColor: `${COLORS.danger}0D` }
                ]
              ]}
              onPress={() => handleVote("no")}
            >
              <View style={[
                styles.radioCircle,
                selectedVote === "no" && [styles.radioCircleSelected, { borderColor: COLORS.danger }]
              ]}>
                {selectedVote === "no" && <View style={[styles.radioInner, { backgroundColor: COLORS.danger }]} />}
              </View>
              <Text style={[
                styles.radioText,
                selectedVote === "no" && { color: COLORS.danger }
              ]}>
                Can't
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.radioOption,
                selectedVote === "maybe" && [
                  styles.radioOptionSelected,
                  { borderColor: COLORS.warning, backgroundColor: `${COLORS.warning}0D` }
                ]
              ]}
              onPress={() => handleVote("maybe")}
            >
              <View style={[
                styles.radioCircle,
                selectedVote === "maybe" && [styles.radioCircleSelected, { borderColor: COLORS.warning }]
              ]}>
                {selectedVote === "maybe" && <View style={[styles.radioInner, { backgroundColor: COLORS.warning }]} />}
              </View>
              <Text style={[
                styles.radioText,
                selectedVote === "maybe" && { color: COLORS.warning }
              ]}>
                Maybe
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Share Location Button Card */}
        <View style={styles.section}>
          <Pressable style={styles.shareLocationButton}>
            <Icon name="map-pin" size={20} color={COLORS.primary} />
            <Text style={styles.shareLocationText}>
              Share Location for Best Suggestion
            </Text>
          </Pressable>
        </View>

        {/* Lock Plan Button */}
        <View style={styles.section}>
          <Pressable 
            style={styles.lockButton}
            onPress={() => navigation.push({
              pathname: "/suggestion",
              params: { meetupCode, meetupId }
            })}
          >
            <Text style={styles.lockButtonText}>Lock the Plan</Text>
            <Icon name="arrow-right" size={20} color={COLORS.white} />
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // Header
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
  shareButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  
  // Status Banner
  statusBanner: {
    paddingHorizontal: SIZES.cardPadding,
    paddingVertical: SPACING.lg,
  },
  meetupTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xxs,
  },
  meetupSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  
  // Location Card
  locationCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: SIZES.cardPadding,
    ...SHADOWS.level1,
  },
  locationLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  locationName: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  locationDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  locationDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationDetailText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  locationDetailDivider: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginHorizontal: SPACING.xs,
  },
  viewMapButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xxs,
  },
  viewMapText: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.primary,
    fontWeight: "500",
  },
  
  // Sections
  section: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.bodyRegular,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  
  // Attendance List
  attendanceRow: {
    paddingHorizontal: SPACING.sm,
    gap: SPACING.md,
  },
  participantCardHorizontal: {
    alignItems: "center",
    width: 90,
    marginRight: SPACING.xs,
  },
  participantAvatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xs,
    position: "relative",
  },
  participantInitialsLarge: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.primary,
  },
  statusBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  participantNameHorizontal: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textPrimary,
    marginBottom: 4,
    textAlign: "center",
  },
  participantStatusHorizontal: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
  },
  
  // Response Radio Buttons
  responseContainer: {
    gap: SPACING.xs,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    borderRadius: SIZES.radiusSmall,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: "transparent",
  },
  radioOptionSelected: {
    // Border color and background set dynamically
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  radioCircleSelected: {
    // Border color set dynamically
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // Background color set dynamically
  },
  radioText: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
  
  // Share Location Button
  shareLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
    ...SHADOWS.level1,
  },
  shareLocationText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
  },

  // Lock Button
  lockButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radius,
    gap: SPACING.sm,
    ...SHADOWS.level2,
  },
  lockButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
  },
  
  // Stats Row
  statsRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  statEmoji: {
    fontSize: 12,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  // Invite Card
  inviteCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  inviteLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inviteCode: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary,
    letterSpacing: 1,
  },
  shareInviteButton: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SIZES.radius,
  },
  shareInviteText: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
