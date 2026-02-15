import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Svg, { Circle, Path, G, Rect, Text as SvgText } from "react-native-svg";
import AnimatedRe, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring, 
  FadeInDown, 
  FadeIn,
  ZoomIn,
} from "react-native-reanimated";

import { COLORS, TYPOGRAPHY, SPACING, SIZES, SHADOWS } from "../constants/theme";
import Icon from "../components/Icon";

const { width } = Dimensions.get("window");

// --- Constants & Data ---

const SLIDES = [
  {
    id: "1",
    title: "Plan in Seconds",
    subtitle: "Create a meetup in just 2 taps",
    visual: "calendar",
  },
  {
    id: "2",
    title: "Friends Vote Fast",
    subtitle: "No WhatsApp chaos. Just Yes / No / Maybe",
    visual: "friends",
  },
  {
    id: "3",
    title: "Best Spot Suggested",
    subtitle: "We find the best place near everyone",
    visual: "location",
  },
];

// --- Components ---

const SlideVisual = ({ type, isActive }: { type: string; isActive: boolean }) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      scale.value = withSpring(1, { damping: 12 });
      opacity.value = withTiming(1, { duration: 400 });
    } else {
      scale.value = 0.8;
      opacity.value = 0;
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const renderContent = () => {
    switch (type) {
      case "calendar":
        return (
          <Svg width={240} height={240} viewBox="0 0 240 240">
            {/* Background elements */}
            <Circle cx="40" cy="40" r="20" fill={COLORS.primary} opacity={0.05} />
            <Circle cx="200" cy="200" r="30" fill={COLORS.primary} opacity={0.05} />
            
            {/* Main Calendar */}
            <G transform="translate(60, 50)">
              <Rect x="0" y="0" width="120" height="140" rx="16" fill="white" stroke={COLORS.primary} strokeWidth="3" />
              <Path d="M0 40h120" stroke={COLORS.primary} strokeWidth="2" opacity={0.5} />
              <Path d="M30 0v20 M90 0v20" stroke={COLORS.primary} strokeWidth="4" strokeLinecap="round" />
            </G>

            {/* Accents: Pin & Check */}
            <G transform="translate(150, 30)">
               <Path d="M15 0c8.3 0 15 6.7 15 15 0 12-15 30-15 30S0 27 0 15C0 6.7 6.7 0 15 0z" fill={COLORS.danger} opacity={0.9} />
               <Circle cx="15" cy="15" r="5" fill="white" />
            </G>
            
            <G transform="translate(40, 160)">
               <Circle cx="25" cy="25" r="25" fill={COLORS.success} />
               <Path d="M15 25l7 7 13-13" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </G>
          </Svg>
        );
      case "friends":
        return (
          <Svg width={280} height={240} viewBox="0 0 280 240">
             {/* Connecting arcs */}
             <Path d="M70 100 Q 140 40 210 100" stroke={COLORS.border} strokeWidth="2" strokeDasharray="5,5" fill="none" />
             <Path d="M70 100 Q 140 180 210 100" stroke={COLORS.border} strokeWidth="2" strokeDasharray="5,5" fill="none" />

             {/* User 1 (Top) */}
             <G transform="translate(105, 10)">
                <Circle cx="35" cy="35" r="35" fill="white" stroke={COLORS.success} strokeWidth="3" />
                <Circle cx="35" cy="25" r="12" fill={COLORS.textSecondary} />
                <Path d="M35 60c-10 0-18-5-18-12h36c0 7-8 12-18 12z" fill={COLORS.textSecondary} />
                <Circle cx="55" cy="55" r="16" fill={COLORS.success} />
                <Path d="M49 55l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
             </G>

             {/* User 2 (Left) */}
             <G transform="translate(20, 100)">
                <Circle cx="35" cy="35" r="35" fill="white" stroke={COLORS.danger} strokeWidth="3" />
                 <Circle cx="35" cy="25" r="12" fill={COLORS.textSecondary} />
                <Path d="M35 60c-10 0-18-5-18-12h36c0 7-8 12-18 12z" fill={COLORS.textSecondary} />
                <Circle cx="55" cy="55" r="16" fill={COLORS.danger} />
                <Path d="M50 50l10 10 M60 50l-10 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
             </G>
             
             {/* User 3 (Right) */}
             <G transform="translate(190, 100)">
                <Circle cx="35" cy="35" r="35" fill="white" stroke={COLORS.warning} strokeWidth="3" />
                 <Circle cx="35" cy="25" r="12" fill={COLORS.textSecondary} />
                <Path d="M35 60c-10 0-18-5-18-12h36c0 7-8 12-18 12z" fill={COLORS.textSecondary} />
                <Circle cx="55" cy="55" r="16" fill={COLORS.warning} />
                <SvgText x="51" y="61" fontSize="16" fontWeight="bold" fill="white">?</SvgText>
             </G>
          </Svg>
        );
      case "location":
        return (
           <Svg width={260} height={260} viewBox="0 0 260 260">
            {/* Radiating circles */}
            <Circle cx="130" cy="130" r="120" stroke={COLORS.primary} strokeWidth="1" strokeOpacity={0.1} fill="none" />
            <Circle cx="130" cy="130" r="90" stroke={COLORS.primary} strokeWidth="1" strokeOpacity={0.2} fill="none" />
            <Circle cx="130" cy="130" r="60" stroke={COLORS.primary} strokeWidth="1" strokeOpacity={0.3} fill="none" />
            
            {/* Small pins comparing */}
            <Circle cx="130" cy="40" r="4" fill={COLORS.success} opacity={0.6} />
            <Circle cx="60" cy="170" r="4" fill={COLORS.warning} opacity={0.6} />
            <Circle cx="200" cy="170" r="4" fill={COLORS.danger} opacity={0.6} />

            {/* Main Pin */}
            <G transform="translate(90, 70)">
              <Path
                d="M40 0c22 0 40 18 40 40 0 28-40 80-40 80S0 68 0 40C0 18 18 0 40 0z"
                fill={COLORS.primary}
              />
              <Circle cx="40" cy="40" r="15" fill="white" />
              {/* Rating stars above */}
               <G transform="translate(10, -25)">
                 <Path d="M5 0l1.5 3h3.5l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3.5z" fill={COLORS.success} transform="translate(0, 5) scale(1.5)" />
                 <Path d="M5 0l1.5 3h3.5l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3.5z" fill={COLORS.success} transform="translate(20, 0) scale(1.8)" />
                 <Path d="M5 0l1.5 3h3.5l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3.5z" fill={COLORS.success} transform="translate(45, 5) scale(1.5)" />
               </G>
            </G>
          </Svg>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatedRe.View style={[styles.visualContainer, animatedStyle]}>
      {renderContent()}
    </AnimatedRe.View>
  );
};

// --- Main Screen ---

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem("@meetup_app:onboarding_completed", "true");
      router.replace("/"); // Navigate to Home
    } catch (e) {
      console.error("Failed to save onboarding status", e);
      router.replace("/");
    }
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  // Stable viewability config
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // Optimizes scrollToIndex reliability
  const getItemLayout = (data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Render Slide Item
  const renderItem = ({ item, index }: { item: typeof SLIDES[0]; index: number }) => {
    const isActive = index === currentIndex;
    
    return (
      <View style={styles.slideContainer}>
        <View style={styles.contentContainer}>
          {/* Visual Area */}
          <SlideVisual type={item.visual} isActive={isActive} />
          
          {/* Text Area */}
          <View style={styles.textContainer}>
            {isActive && (
              <>
                <AnimatedRe.View 
                  entering={FadeInDown.delay(300).duration(500).springify()}
                  style={styles.titleWrapper}
                >
                  <Text style={styles.title}>{item.title}</Text>
                </AnimatedRe.View>
                
                <AnimatedRe.View 
                  entering={FadeInDown.delay(400).duration(500).springify()}
                  style={styles.subtitleWrapper}
                >
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                </AnimatedRe.View>

                {/* Feature Content based on Slide ID */}
                <AnimatedRe.View 
                  entering={FadeIn.delay(600).duration(500)}
                  style={styles.featureContainer}
                >
                  {item.id === "1" && (
                    <View style={styles.featureRow}>
                      <Text style={styles.featureItem}>⚡ Fast</Text>
                      <Text style={styles.featureItem}>👥 Social</Text>
                      <Text style={styles.featureItem}>📍 Smart</Text>
                    </View>
                  )}
                  {item.id === "2" && (
                     <View style={styles.statsRow}>
                        <View style={styles.statCard}><Text style={styles.statVal}>3</Text><Text style={styles.statLabel}>tap</Text></View>
                        <View style={styles.statCard}><Text style={styles.statVal}>1</Text><Text style={styles.statLabel}>sec</Text></View>
                        <View style={styles.statCard}><Text style={styles.statVal}>✓</Text><Text style={styles.statLabel}>done</Text></View>
                     </View>
                  )}
                  {item.id === "3" && (
                     <View style={styles.cardRow}>
                        <View style={[styles.featureCard, {backgroundColor: COLORS.success + '10'}]}>
                           <Text style={styles.cardIcon}>⭐</Text>
                           <Text style={styles.cardLabel}>Rate</Text>
                        </View>
                        <View style={[styles.featureCard, {backgroundColor: COLORS.primary + '10'}]}>
                           <Text style={styles.cardIcon}>📍</Text>
                           <Text style={styles.cardLabel}>Near</Text>
                        </View>
                        <View style={[styles.featureCard, {backgroundColor: COLORS.warning + '10'}]}>
                           <Text style={styles.cardIcon}>💰</Text>
                           <Text style={styles.cardLabel}>Fair</Text>
                        </View>
                     </View>
                  )}
                </AnimatedRe.View>
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Top Controls */}
      <View style={styles.topControls}>
        <View style={styles.progressContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentIndex ? styles.progressDotActive : styles.progressDotInactive,
              ]}
            />
          ))}
        </View>
        
        {currentIndex < SLIDES.length - 1 && (
          <Pressable onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        )}
      </View>

      {/* Main Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        scrollEventThrottle={32}
      />

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        {currentIndex === SLIDES.length - 1 ? (
          <AnimatedRe.View entering={ZoomIn.duration(400)}>
            <Pressable 
              style={({pressed}) => [styles.letsGoButton, pressed && styles.pressed]}
              onPress={handleComplete}
            >
              <Text style={styles.letsGoText}>Let's Go 🚀</Text>
            </Pressable>
          </AnimatedRe.View>
        ) : (
          <Pressable 
            style={({pressed}) => [styles.nextButton, pressed && styles.pressed]}
            onPress={handleNext}
          >
            <Icon name="arrow-right" size={24} color={COLORS.white} />
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    height: 60,
    position: 'relative',
  },
  progressContainer: {
    flexDirection: "row",
    gap: 8,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
  },
  progressDotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  progressDotInactive: {
    width: 8,
    backgroundColor: COLORS.border,
  },
  skipButton: {
    position: 'absolute',
    right: SPACING.md,
    top: SPACING.lg + 4,
    padding: 8,
  },
  skipText: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  slideContainer: {
    width: width,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    paddingBottom: 100, 
  },
  visualContainer: {
    width: 280,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  textContainer: {
    alignItems: "center",
    width: '100%',
  },
  titleWrapper: {
    marginBottom: SPACING.sm,
  },
  subtitleWrapper: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: COLORS.textPrimary,
    lineHeight: 34,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.textSecondary,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 280,
  },
  featureContainer: {
    marginTop: SPACING.md,
    alignItems: 'center',
    width: '100%',
  },
  featureRow: {
    flexDirection: 'row',
    gap: 24,
  },
  featureItem: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    width: 60,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  statVal: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  featureCard: {
    width: 72,
    height: 68,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  bottomControls: {
    position: "absolute",
    bottom: 50,
    right: SPACING.lg,
    left: SPACING.lg,
    alignItems: "flex-end", // Align Next button to right
    justifyContent: 'center', 
  },
  nextButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.level2,
  },
  letsGoButton: {
    width: width - (SPACING.lg * 2), // Full width minus padding
    height: 52,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center', // Center it
    ...SHADOWS.level3,
  },
  letsGoText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
