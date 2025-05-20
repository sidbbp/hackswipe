import React, { useContext, useState} from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { EventsContext } from "./EventsContext"; // corrected import path
import SwipeCard from "../components/SwipeCard";
import { mockHackathons } from "../data/mockData";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function SwipeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { saveEvent } = useContext(EventsContext);

  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const handleSwipeComplete = (direction) => {
    const event = mockHackathons[currentIndex];

    if (direction === "right") {
      // Ensure the event has the correct structure for MyEventsScreen
      saveEvent({
        id: event.id || `${event.name}-${Date.now()}`,
        hackathons: {
          name: event.name,
          start_date: event.start_date,
          location: event.location,
          imageUrl: event.imageUrl,
        },
        name: event.name,
        start_date: event.start_date,
        location: event.location,
        imageUrl: event.imageUrl,
        team_name: "Solo",
        join_type: "solo",
      });
    }

    setCurrentIndex((prev) =>
      prev + 1 < mockHackathons.length ? prev + 1 : 0
    );
    translateX.value = 0;
    rotate.value = 0;
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      rotate.value = event.translationX / 20;
    })
    .onEnd(() => {
      const shouldSwipe = Math.abs(translateX.value) > SWIPE_THRESHOLD;
      if (shouldSwipe) {
        const direction = translateX.value > 0 ? "right" : "left";
        translateX.value = withTiming(
          direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH,
          { duration: 300 },
          () => runOnJS(handleSwipeComplete)(direction)
        );
      } else {
        translateX.value = withTiming(0, { duration: 300 });
        rotate.value = withTiming(0, { duration: 300 });
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateZ: `${rotate.value}deg` },
    ],
  }));

  const currentHackathon = mockHackathons[currentIndex];

  return (
    <View style={styles.container}>
      {currentHackathon ? (
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.card, animatedCardStyle]}>
            <SwipeCard hackathon={currentHackathon} overlayLabel="" />
          </Animated.View>
        </GestureDetector>
      ) : (
        <Text style={styles.doneText}>No more hackathons</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "90%",
    height: "90%",
  },
  doneText: {
    fontSize: 18,
    color: "#6b7280",
  },
});
