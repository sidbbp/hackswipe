import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { mockDevelopers } from '../data/mockData';

const SCREEN_WIDTH = Dimensions.get('window').width;

const HireDevsScreen = () => {
  const [index, setIndex] = useState(0);
  const translateX = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  const handleNextCard = () => {
    setIndex(prev => (prev + 1 < mockDevelopers.length ? prev + 1 : 0));
    translateX.value = 0;
    rotateZ.value = 0;
  };

  const pan = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX;
      rotateZ.value = (e.translationX / SCREEN_WIDTH) * 15;
    })
    .onEnd(e => {
      if (Math.abs(e.translationX) > SCREEN_WIDTH * 0.25) {
        translateX.value = withTiming(
          e.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
          { duration: 300 },
          () => runOnJS(handleNextCard)()
        );
      } else {
        translateX.value = withTiming(0, { duration: 300 });
        rotateZ.value = withTiming(0, { duration: 300 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateZ: `${rotateZ.value}deg` },
    ],
  }));

  const developer = mockDevelopers[index];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hire Developers</Text>
        <Feather name="sliders" size={20} color="#111827" />
      </View>

      <View style={styles.cardContainer}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.card, animatedStyle]}>
            <View style={styles.profileHeader}>
              <View style={styles.profilePhoto}>
                <Text style={styles.initial}>{developer.name[0]}</Text>
              </View>
              <View>
                <Text style={styles.name}>{developer.name}</Text>
                <Text style={styles.experience}>{developer.experience} level</Text>
              </View>
              <View style={styles.availability}>
                <View style={styles.dot} />
                <Text style={styles.availabilityText}>{developer.availability}</Text>
              </View>
            </View>

            <Text style={styles.bio}>{developer.bio}</Text>

            <View style={styles.skills}>
              {developer.skills.map((skill, i) => (
                <View key={i} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  initial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  experience: {
    fontSize: 14,
    color: '#6B7280',
  },
  availability: {
    marginLeft: 'auto',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  availabilityText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  bio: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 16,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 13,
    color: '#4B5563',
  },
});

export default HireDevsScreen;
