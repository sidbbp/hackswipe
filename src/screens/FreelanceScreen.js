import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ActivityIndicator, 
  Animated 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import FilterModal from '../components/FilterModal';
import FreelanceCard from '../components/FreelanceCard';
import { mockFreelanceGigs } from '../utils/mockData';

const FreelanceScreen = () => {
  const [gigs, setGigs] = useState(mockFreelanceGigs);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    skills: [],
    minBudget: 0,
    maxBudget: 10000,
    remoteOnly: false,
  });
  const [loading, setLoading] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const swiperRef = useRef(null);

  // Animation for filter button
  const filterButtonAnimatedValue = useRef(new Animated.Value(1)).current;

  const applyFilters = (newFilters) => {
    setLoading(true);
    setFilters(newFilters);
    
    // Filter gigs based on criteria
    const filteredGigs = mockFreelanceGigs.filter(gig => {
      // Search text
      if (
        newFilters.search &&
        !gig.title.toLowerCase().includes(newFilters.search.toLowerCase())
      ) {
        return false;
      }
      
      // Skills
      if (
        newFilters.skills.length > 0 &&
        !newFilters.skills.some(skill => gig.skillsRequired.includes(skill))
      ) {
        return false;
      }
      
      // Budget range
      if (
        gig.payRange.min < newFilters.minBudget ||
        gig.payRange.max > newFilters.maxBudget
      ) {
        return false;
      }
      
      // Remote only
      if (newFilters.remoteOnly && !gig.remote) {
        return false;
      }
      
      return true;
    });
    
    setGigs(filteredGigs);
    setCardIndex(0);
    setShowFilterModal(false);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleSwipeRight = (cardIndex) => {
    console.log('Applied to gig:', gigs[cardIndex].title);
  };

  const handleSwipeLeft = (cardIndex) => {
    console.log('Skipped gig:', gigs[cardIndex].title);
  };

  const manualSwipeLeft = () => {
    swiperRef.current.swipeLeft();
  };
  
  const manualSwipeRight = () => {
    swiperRef.current.swipeRight();
  };

  const animateFilterButton = () => {
    Animated.sequence([
      Animated.timing(filterButtonAnimatedValue, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(filterButtonAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Applying filters...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Freelance Gigs</Text>
          <Text style={styles.headerSubtitle}>
            {gigs.length} available opportunities
          </Text>
        </View>
        
        <Animated.View style={{ transform: [{ scale: filterButtonAnimatedValue }] }}>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => {
              animateFilterButton();
              setShowFilterModal(true);
            }}
          >
            <Feather name="sliders" size={20} color="#4F46E5" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {gigs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="search" size={48} color="#94A3B8" />
          <Text style={styles.emptyTitle}>No Gigs Found</Text>
          <Text style={styles.emptyText}>
            Try adjusting your filters to see more opportunities
          </Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => applyFilters({
              search: '',
              skills: [],
              minBudget: 0,
              maxBudget: 10000,
              remoteOnly: false,
            })}
          >
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiperRef}
            cards={gigs}
            renderCard={(card) => <FreelanceCard gig={card} />}
            onSwipedRight={handleSwipeRight}
            onSwipedLeft={handleSwipeLeft}
            onSwiped={(cardIndex) => setCardIndex(cardIndex)}
            cardIndex={cardIndex}
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
                title: 'APPLY',
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
      )}

      {gigs.length > 0 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.skipButton]}
            onPress={manualSwipeLeft}
          >
            <Feather name="x" size={24} color="#F43F5E" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.applyButton]}
            onPress={manualSwipeRight}
          >
            <Feather name="check" size={24} color="#10B981" />
          </TouchableOpacity>
        </View>
      )}

      <FilterModal
        visible={showFilterModal}
        filters={filters}
        onClose={() => setShowFilterModal(false)}
        onApply={applyFilters}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  swiperContainer: {
    flex: 1,
    position: 'relative',
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
  applyButton: {
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
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Don't forget to import useRef
import { useRef } from 'react';

export default FreelanceScreen;
