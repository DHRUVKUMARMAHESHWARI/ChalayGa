import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";

import { COLORS, TYPOGRAPHY, SPACING, SIZES, SHADOWS } from "../../src/constants/theme";
import Icon from "../../src/components/Icon";
import { getMyCircles } from "../../src/api/circleApi";

export default function CirclesScreen() {
  const router = useRouter();
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCircles = React.useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const data = await getMyCircles();
      console.log("Fetched circles:", data);
      setCircles(data || []);
    } catch (error) {
      console.error("Error fetching circles:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchCircles(circles.length === 0);
    }, [fetchCircles, circles.length])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchCircles();
  };

  const renderCircleItem = ({ item, index }: { item: any, index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <Pressable 
        style={styles.circleCard}
        onPress={() => router.push(`/circle/${item._id}`)}
      >
        <View style={styles.circleIcon}>
          <Icon name="users" size={24} color={COLORS.primary} />
        </View>
        <View style={styles.circleInfo}>
          <Text style={styles.circleName}>{item.name}</Text>
          <Text style={styles.circleMembers}>
            {item.members?.length || 0} members
          </Text>
        </View>
        <Icon name="chevron-right" size={20} color={COLORS.textTertiary} />
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Circles</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/create-circle")}
        >
          <Icon name="plus" size={20} color={COLORS.white} />
          <Text style={styles.addButtonText}>New Circle</Text>
        </Pressable>
      </View>

      {loading && !refreshing ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : circles.length === 0 ? (
        <View style={styles.centerContainer}>
          <View style={styles.emptyIcon}>
            <Icon name="users" size={64} color={COLORS.border} />
          </View>
          <Text style={styles.emptyTitle}>No Circles Yet</Text>
          <Text style={styles.emptySubtitle}>
            Groups you create with your friends will appear here.
          </Text>
          <Pressable
            style={styles.emptyButton}
            onPress={() => router.push("/create-circle")}
          >
            <Text style={styles.emptyButtonText}>Create Your First Circle</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={circles}
          renderItem={renderCircleItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  headerTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    ...SHADOWS.level1,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 14,
  },
  listContent: {
    padding: SPACING.lg,
  },
  circleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.md,
    ...SHADOWS.level1,
  },
  circleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  circleInfo: {
    flex: 1,
  },
  circleName: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  circleMembers: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    marginBottom: SPACING.lg,
    opacity: 0.5,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.xl,
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: SIZES.radius,
  },
  emptyButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
