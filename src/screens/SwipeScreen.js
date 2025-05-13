import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import HackathonCard from '../components/HackathonCard';
import JoinModal from '../components/JoinModal';
import { mockHackathons } from '../utils/mockData';
import { calculateDistance } from '../utils/distanceCalculator';
import { UserContext } from '../context/UserContext';

const SwipeScreen = ({ route }) => {
  const { location } = route.params || {};
  const { userJoinedHackathons, addJoinedHackathon } = useContext(UserContext);
  
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  
  const swiperRef = useRef(null);

  // Filter hackathons by distance on component mount
  useEffect(() => {
    if (location) {
      setLoading(true);
      
      // Calculate distance for each hackathon and filter by 50km radius
      const hackathonsWithDistance = mockHackathons.map(hackathon => {
        const distance = calculateDistance(
          location.coords.latitude,
          location.coords.longitude,
          hackathon.latitude,
          hackathon.longitude
        );
        
        return {
          ...hackathon,
          distance: distance,
        };
      });
      
      // Filter by distance (50km = 50000m)
      const nearbyHackathons = hackathonsWithDistance
        .filter(hackathon => hackathon.distance <= 50)
        .sort((a, b) => a.distance - b.distance);
      
      setHackathons(nearbyHackathons);
      setLoading(false);
    }
  }, [location]);

  // Reset card index when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      setCardIndex(0);
      return () => {};
    }, [])
  );

  const handleSwipeRight = (index) => {
    setSelectedHackathon(hackathons[index]);
    setShowJoinModal(true);
  };
  
  const handleSwipeLeft = (index) => {
    console.log('Skipped hackathon:', hackathons[index].name);
  };

  const handleJoinConfirm = (hackathon, joinType, teamDetails = null) => {
    addJoinedHackathon({
      ...hackathon,
      joinType: joinType,
      teamDetails: teamDetails,
      joinedAt: new Date().toISOString(),
    });
    
    setShowJoinModal(false);
  };

  const manualSwipeLeft = () => {
    swiperRef.current.swipeLeft();
  };
  
  const manualSwipeRight = () => {
    swiperRef.current.swipeRight();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Finding hackathons near you...</Text>
      </View>
    );
  }

  if (hackathons.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Feather name="search" size={48} color="#94A3B8" />
          <Text style={styles.emptyTitle}>No Hackathons Found</Text>
          <Text style={styles.emptyText}>
            We couldn't find any hackathons within 50km of your location.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hackathons Near You</Text>
        <Text style={styles.headerSubtitle}>
          {hackathons.length} hackathons within 50km
        </Text>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={hackathons}
          renderCard={(card) => <HackathonCard hackathon={card} />}
          onSwipedRight={handleSwipeRight}
          onSwipedLeft={handleSwipeLeft}
          onSwiped={(cardIndex) => setCardIndex(cardIndex)}
          cardIndex={0}
          backgroundColor={'transparent'}
          stackSize={3}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          disableTopSwipe
          disableBottomSwipe
          overlayLabels={{
            left: {
              title: 'SKIP',
              style: {
                label: styles.overlayLabel,
                wrapper: styles.overlayWrapper,
              },
            },
            right: {
              title: 'JOIN',
              style: {
                label: {
                  ...styles.overlayLabel,
                  backgroundColor: '#10B981',
                  color: 'white',
                },
                wrapper: {
                  ...styles.overlayWrapper,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  marginRight: 30,
                },
              },
            },
          }}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.skipButton]}
          onPress={manualSwipeLeft}
        >
          <Feather name="x" size={24} color="#F43F5E" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.joinButton]}
          onPress={manualSwipeRight}
        >
          <Feather name="check" size={24} color="#10B981" />
        </TouchableOpacity>
      </View>

      {/* Join Modal */}
      <JoinModal
        visible={showJoinModal}
        hackathon={selectedHackathon}
        onClose={() => setShowJoinModal(false)}
        onJoin={handleJoinConfirm}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  swiperContainer: {
    flex: 1,
    position: 'relative',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  skipButton: {
    backgroundColor: 'white',
  },
  joinButton: {
    backgroundColor: 'white',
  },
  overlayLabel: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F43F5E',
    color: 'white',
  },
  overlayWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default SwipeScreen;
