import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const mockGigs = [
  {
    id: 1,
    title: 'React Frontend Developer for Hackathon Project',
    remote: true,
    skills: ['React', 'TypeScript', 'UI/UX'],
    deadline: 'May 15, 2025',
    payRange: '$500 - $1000',
    description:
      'Looking for a React developer to help build the frontend for our hackathon project.',
  },
  {
    id: 2,
    title: 'Backend Developer with Node.js',
    remote: false,
    skills: ['Node.js', 'Express', 'MongoDB'],
    deadline: 'May 20, 2025',
    payRange: '$400 - $800',
    description:
      'Join our backend team to create scalable APIs for our hackathon app.',
  },
];

const FreelanceScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handleSwipeComplete = () => {
    setCurrentIndex((prev) => (prev + 1 < mockGigs.length ? prev + 1 : 0));
    translateX.value = 0;
    rotate.value = 0;
    opacity.value = 1;
  };

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      rotate.value = event.translationX / 20;
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        translateX.value = withTiming(
          translateX.value > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
          { duration: 300 },
          () => {
            runOnJS(handleSwipeComplete)();
          }
        );
        opacity.value = withTiming(0, { duration: 300 });
      } else {
        translateX.value = withTiming(0, { duration: 300 });
        rotate.value = withTiming(0, { duration: 300 });
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const currentGig = mockGigs[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Freelance Gigs</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color="#111827" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search gigs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Feather name="x" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cardWrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.gigCard, animatedCardStyle]}>
            <View style={styles.gigHeader}>
              <Text style={styles.gigTitle}>{currentGig.title}</Text>
              <View style={styles.remoteContainer}>
                <Feather name="map-pin" size={14} color="#10B981" />
                <Text style={styles.remoteText}>
                  {currentGig.remote ? 'Remote' : 'On-site'}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Required Skills</Text>
            <View style={styles.skillsContainer}>
              {currentGig.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Deadline</Text>
                <View style={styles.detailValue}>
                  <Feather name="calendar" size={14} color="#4B5563" />
                  <Text style={styles.detailText}>{currentGig.deadline}</Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Pay Range</Text>
                <View style={styles.detailValue}>
                  <Feather name="dollar-sign" size={14} color="#4B5563" />
                  <Text style={styles.detailText}>{currentGig.payRange}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{currentGig.description}</Text>

            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#111827',
  },
  cardWrapper: {
    flex: 1,
    padding: 16,
  },
  gigCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gigHeader: {
    marginBottom: 16,
  },
  gigTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  remoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remoteText: {
    fontSize: 14,
    color: '#10B981',
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
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
    fontSize: 14,
    color: '#4B5563',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FreelanceScreen;
