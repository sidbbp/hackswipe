import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Modal,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-deck-swiper';
import Slider from '@react-native-community/slider';
import { Feather } from '@expo/vector-icons';
import { fetchFreelanceGigs } from '../supabaseClient';
import { mockFreelanceGigs } from '../data/mockData';

const { width } = Dimensions.get('window');

const FreelanceCard = ({ gig, overlayLabel }) => {
  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString()}`;
  };

  return (
    <View style={styles.card}>
      {/* Overlay Label (Skip/Apply) */}
      {overlayLabel && (
        <View style={[
          styles.overlayLabel,
          { backgroundColor: overlayLabel === 'Apply' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)' }
        ]}>
          <Text style={styles.overlayLabelText}>{overlayLabel}</Text>
        </View>
      )}

      <View style={styles.cardHeader}>
        <Text style={styles.title}>{gig.title}</Text>
        <View style={[
          styles.remoteBadge,
          { backgroundColor: gig.remote ? '#D1FAE5' : '#FEE2E2' }
        ]}>
          <Text style={[
            styles.remoteBadgeText,
            { color: gig.remote ? '#10B981' : '#EF4444' }
          ]}>
            {gig.remote ? 'Remote' : 'On-site'}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Feather name="calendar" size={20} color="#4F46E5" />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.label}>Event</Text>
            <Text style={styles.value}>{gig.event}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Feather name="dollar-sign" size={20} color="#10B981" />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.label}>Pay Range</Text>
            <Text style={styles.value}>
              {formatCurrency(gig.pay_range.min)} - {formatCurrency(gig.pay_range.max)}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Feather name="clock" size={20} color="#F59E0B" />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.label}>Deadline</Text>
            <Text style={styles.value}>{new Date(gig.deadline).toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.skillsContainer}>
          <Text style={styles.skillsTitle}>Skills Required</Text>
          <View style={styles.skillBadgesContainer}>
            {gig.skills_required.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillBadgeText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.description}>{gig.description}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.swipeHint}>
          ← Swipe left to skip • Swipe right to apply →
        </Text>
      </View>
    </View>
  );
};

const FreelanceScreen = () => {
  const swiperRef = useRef(null);
  const [gigs, setGigs] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [overlayLabel, setOverlayLabel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    skills: [],
    budgetRange: [500, 10000],
    remoteOnly: false,
  });
  const [availableSkills, setAvailableSkills] = useState([]);

  useEffect(() => {
    loadGigs();
  }, []);

  useEffect(() => {
    // Apply filters and search
    filterGigs();
  }, [searchQuery, filters, gigs]);

  const loadGigs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to fetch from Supabase
      const freelanceGigs = await fetchFreelanceGigs();
      
      // If no gigs from Supabase or there was an error, use mock data
      if (freelanceGigs.length === 0) {
        setGigs(mockFreelanceGigs);
        
        // Extract unique skills for filters
        const skills = new Set();
        mockFreelanceGigs.forEach(gig => {
          gig.skills_required.forEach(skill => skills.add(skill));
        });
        setAvailableSkills(Array.from(skills));
      } else {
        setGigs(freelanceGigs);
        
        // Extract unique skills for filters
        const skills = new Set();
        freelanceGigs.forEach(gig => {
          gig.skills_required.forEach(skill => skills.add(skill));
        });
        setAvailableSkills(Array.from(skills));
      }
      
      // Initialize filtered gigs with all gigs
      setFilteredGigs(gigs);
    } catch (err) {
      console.error('Error loading gigs:', err);
      setError('Failed to load freelance gigs. Please try again.');
      
      // Use mock data as fallback
      setGigs(mockFreelanceGigs);
      setFilteredGigs(mockFreelanceGigs);
      
      // Extract unique skills for filters
      const skills = new Set();
      mockFreelanceGigs.forEach(gig => {
        gig.skills_required.forEach(skill => skills.add(skill));
      });
      setAvailableSkills(Array.from(skills));
    } finally {
      setLoading(false);
    }
  };

  const filterGigs = () => {
    let result = [...gigs];
    
    // Apply search query filter
    if (searchQuery) {
      result = result.filter(gig => 
        gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.event.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply skills filter
    if (filters.skills.length > 0) {
      result = result.filter(gig => 
        filters.skills.some(skill => gig.skills_required.includes(skill))
      );
    }
    
    // Apply budget range filter
    result = result.filter(gig => 
      gig.pay_range.max >= filters.budgetRange[0] && 
      gig.pay_range.min <= filters.budgetRange[1]
    );
    
    // Apply remote only filter
    if (filters.remoteOnly) {
      result = result.filter(gig => gig.remote);
    }
    
    setFilteredGigs(result);
  };

  const toggleSkillFilter = (skill) => {
    const currentSkills = [...filters.skills];
    const skillIndex = currentSkills.indexOf(skill);
    
    if (skillIndex >= 0) {
      currentSkills.splice(skillIndex, 1);
    } else {
      currentSkills.push(skill);
    }
    
    setFilters({
      ...filters,
      skills: currentSkills,
    });
  };

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      // Apply for the gig
      setOverlayLabel('Apply');
    } else {
      // Skip
      setOverlayLabel('Skip');
    }
    
    // Reset overlay after animation
    setTimeout(() => {
      setOverlayLabel(null);
    }, 500);
  };

  const resetFilters = () => {
    setFilters({
      skills: [],
      budgetRange: [500, 10000],
      remoteOnly: false,
    });
    setSearchQuery('');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading freelance gigs...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Feather name="alert-circle" size={40} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadGigs}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search freelance gigs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={20} color="#6B7280" />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Feather name="filter" size={20} color="#4F46E5" />
        </TouchableOpacity>
      </View>
      
      {filteredGigs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="briefcase" size={48} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>No matching gigs found</Text>
          <Text style={styles.emptyMessage}>
            Try adjusting your filters or check back later for new opportunities
          </Text>
          {(filters.skills.length > 0 || filters.remoteOnly || searchQuery) && (
            <TouchableOpacity 
              style={styles.resetFiltersButton}
              onPress={resetFilters}
            >
              <Text style={styles.resetFiltersText}>Reset Filters</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.swiperContainer}>
          <Swiper
            ref={swiperRef}
            cards={filteredGigs}
            renderCard={(gig) => <FreelanceCard gig={gig} overlayLabel={overlayLabel} />}
            onSwiped={(index) => setCardIndex(index + 1)}
            onSwipedLeft={() => handleSwipe('left')}
            onSwipedRight={() => handleSwipe('right')}
            cardIndex={0}
            backgroundColor={'transparent'}
            stackSize={3}
            stackSeparation={15}
            disableTopSwipe
            disableBottomSwipe
            animateOverlayLabelsOpacity
            overlayLabels={{
              left: {
                title: 'SKIP',
                style: {
                  label: {
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    color: 'white',
                    fontSize: 24,
                    borderWidth: 2,
                    borderColor: 'white',
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    fontWeight: '600',
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginLeft: 30,
                    marginTop: 30,
                  },
                },
              },
              right: {
                title: 'APPLY',
                style: {
                  label: {
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    color: 'white',
                    fontSize: 24,
                    borderWidth: 2,
                    borderColor: 'white',
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    fontWeight: '600',
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginRight: 30,
                    marginTop: 30,
                  },
                },
              },
            }}
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.skipButton]}
              onPress={() => {
                setOverlayLabel('Skip');
                swiperRef.current.swipeLeft();
              }}
            >
              <Feather name="x" size={28} color="#EF4444" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.applyButton]}
              onPress={() => {
                setOverlayLabel('Apply');
                swiperRef.current.swipeRight();
              }}
            >
              <Feather name="check" size={28} color="#10B981" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.cardCount}>
            {cardIndex + 1} of {filteredGigs.length} gigs
          </Text>
        </View>
      )}
      
      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilters}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Gigs</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowFilters(false)}
              >
                <Feather name="x" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <Text style={styles.filterSectionTitle}>Skills</Text>
              <View style={styles.skillsFilterContainer}>
                {availableSkills.map((skill, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.skillFilterBadge,
                      filters.skills.includes(skill) && styles.skillFilterSelected
                    ]}
                    onPress={() => toggleSkillFilter(skill)}
                  >
                    <Text style={[
                      styles.skillFilterText,
                      filters.skills.includes(skill) && styles.skillFilterTextSelected
                    ]}>
                      {skill}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={styles.filterSectionTitle}>Budget Range</Text>
              <View style={styles.budgetRangeContainer}>
                <Text style={styles.budgetValue}>
                  ${filters.budgetRange[0].toLocaleString()} - ${filters.budgetRange[1].toLocaleString()}
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={500}
                  maximumValue={10000}
                  step={500}
                  minimumTrackTintColor="#4F46E5"
                  maximumTrackTintColor="#D1D5DB"
                  thumbTintColor="#4F46E5"
                  value={filters.budgetRange[0]}
                  onValueChange={(value) => 
                    setFilters({
                      ...filters, 
                      budgetRange: [value, filters.budgetRange[1]]
                    })
                  }
                />
                <Slider
                  style={styles.slider}
                  minimumValue={500}
                  maximumValue={10000}
                  step={500}
                  minimumTrackTintColor="#4F46E5"
                  maximumTrackTintColor="#D1D5DB"
                  thumbTintColor="#4F46E5"
                  value={filters.budgetRange[1]}
                  onValueChange={(value) => 
                    setFilters({
                      ...filters, 
                      budgetRange: [filters.budgetRange[0], value]
                    })
                  }
                />
              </View>
              
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Remote Only</Text>
                <Switch
                  value={filters.remoteOnly}
                  onValueChange={(value) => 
                    setFilters({...filters, remoteOnly: value})
                  }
                  trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
                  thumbColor={filters.remoteOnly ? '#10B981' : '#9CA3AF'}
                />
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetFilters}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.applyFiltersButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyFiltersText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#1F2937',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
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
  emptyTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  emptyMessage: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  resetFiltersButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#4F46E5',
  },
  resetFiltersText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  swiperContainer: {
    flex: 1,
  },
  card: {
    width: width * 0.9,
    height: '85%',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  overlayLabel: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: 16,
  },
  overlayLabelText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    transform: [{ rotate: '-15deg' }],
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  remoteBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  remoteBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardBody: {
    flex: 1,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoText: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  skillsContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  skillsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  skillBadgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillBadgeText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    alignItems: 'center',
  },
  swipeHint: {
    color: '#6B7280',
    fontSize: 14,
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
  applyButton: {
    backgroundColor: '#D1FAE5',
  },
  cardCount: {
    textAlign: 'center',
    padding: 16,
    color: '#6B7280',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  skillsFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  skillFilterBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  skillFilterSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  skillFilterText: {
    fontSize: 14,
    color: '#4B5563',
  },
  skillFilterTextSelected: {
    color: '#4F46E5',
    fontWeight: '500',
  },
  budgetRangeContainer: {
    marginBottom: 24,
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  switchLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginRight: 8,
  },
  resetButtonText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '500',
  },
  applyFiltersButton: {
    flex: 2,
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  applyFiltersText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FreelanceScreen;
