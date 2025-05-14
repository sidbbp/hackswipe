import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  Dimensions,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import SwipeCard from '../components/SwipeCard';
import JoinModal from '../components/JoinModal';
import { fetchHackathonsNearby } from '../supabaseClient';
import { mockHackathons } from '../data/mockData';

const { width } = Dimensions.get('window');

const SwipeScreen = ({ userLocation }) => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [overlayLabel, setOverlayLabel] = useState(null);

  useEffect(() => {
    loadHackathons();
  }, [userLocation]);

  const loadHackathons = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!userLocation) {
        throw new Error('User location is not set');
      }
      
      // Try to fetch from Supabase
      const nearbyHackathons = await fetchHackathonsNearby(
        userLocation.latitude,
        userLocation.longitude,
        50 // 50km radius
      );
      
      // If no hackathons from Supabase or there was an error, use mock data
      if (nearbyHackathons.length === 0) {
        // Use mock data for demonstration
        setHackathons(mockHackathons);
      } else {
        setHackathons(nearbyHackathons);
      }
    } catch (err) {
      console.error('Error loading hackathons:', err);
      setError('Failed to load hackathons. Please try again.');
      
      // Use mock data as fallback
      setHackathons(mockHackathons);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    setOverlayLabel('Skip');
    // Add animation or visual feedback here
    setTimeout(() => {
      setOverlayLabel(null);
      if (cardIndex < hackathons.length - 1) {
        setCardIndex(cardIndex + 1);
      }
    }, 10);
  };
  
  const handleJoin = () => {
    setOverlayLabel('Join');
    // Add animation or visual feedback here
    setTimeout(() => {
      setOverlayLabel(null);
      setSelectedHackathon(hackathons[cardIndex]);
      setShowJoinModal(true);
      if (cardIndex < hackathons.length - 1) {
        setCardIndex(cardIndex + 1);
      }
    }, 10);
  };

  const onJoinModalClose = () => {
    setShowJoinModal(false);
    setSelectedHackathon(null);
  };

  const onJoinSuccess = () => {
    setShowJoinModal(false);
    setSelectedHackathon(null);
    // You could update the UI here to reflect that the user has joined
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading hackathons near you...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Feather name="alert-circle" size={40} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadHackathons}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (hackathons.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Feather name="search" size={40} color="#6B7280" />
        <Text style={styles.emptyText}>No hackathons found nearby</Text>
        <Text style={styles.emptySubText}>Try expanding your search radius or check back later</Text>
      </SafeAreaView>
    );
  }

  const currentHackathon = hackathons[cardIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Hackathons</Text>
        {userLocation && (
          <View style={styles.locationBadge}>
            <Feather name="map-pin" size={14} color="#4F46E5" />
            <Text style={styles.locationText}>
              {userLocation.latitude === 37.7749 && userLocation.longitude === -122.4194
                ? 'San Francisco'
                : 'Current Location'}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.swiperContainer}>
        <View style={styles.cardContainer}>
          {currentHackathon && (
            <SwipeCard 
              hackathon={currentHackathon} 
              overlayLabel={overlayLabel} 
            />
          )}
        </View>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.skipButton]}
          onPress={handleSkip}
        >
          <Feather name="x" size={28} color="#EF4444" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.joinButton]}
          onPress={handleJoin}
        >
          <Feather name="check" size={28} color="#10B981" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.cardCount}>
        {cardIndex + 1} of {hackathons.length} hackathons
      </Text>
      
      <JoinModal
        visible={showJoinModal}
        hackathon={selectedHackathon}
        onClose={onJoinModalClose}
        onSuccess={onJoinSuccess}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#4B5563',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  emptySubText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 4,
  },
  swiperContainer: {
    flex: 1,
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: width * 0.9,
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  skipButton: {
    backgroundColor: '#FEE2E2',
  },
  joinButton: {
    backgroundColor: '#D1FAE5',
  },
  cardCount: {
    textAlign: 'center',
    padding: 16,
    color: '#6B7280',
    fontSize: 14,
  },
});

export default SwipeScreen;
