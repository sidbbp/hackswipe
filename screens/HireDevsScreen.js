import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Modal,
  ScrollView,
  TextInput,
  Dimensions,
  Switch,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { fetchDevelopers } from '../supabaseClient';
import { mockDevelopers } from '../data/mockData';
import ProfileCard from '../components/ProfileCard';

const { width } = Dimensions.get('window');

const HireDevsScreen = () => {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [overlayLabel, setOverlayLabel] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    skills: [],
    experience: [], // 'Junior', 'Mid', 'Senior'
    availability: [] // 'Now', 'Soon', 'Busy'
  });
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [inviteMessage, setInviteMessage] = useState('');

  useEffect(() => {
    loadDevelopers();
  }, []);

  useEffect(() => {
    // Apply filters
    filterDevelopers();
  }, [filters, developers]);

  const loadDevelopers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to fetch from Supabase
      const devsList = await fetchDevelopers();
      
      // If no developers from Supabase or there was an error, use mock data
      if (devsList.length === 0) {
        setDevelopers(mockDevelopers);
      } else {
        setDevelopers(devsList);
      }
      
      // Initialize filtered developers with all developers
      setFilteredDevelopers(developers);
    } catch (err) {
      console.error('Error loading developers:', err);
      setError('Failed to load developers. Please try again.');
      
      // Use mock data as fallback
      setDevelopers(mockDevelopers);
      setFilteredDevelopers(mockDevelopers);
    } finally {
      setLoading(false);
    }
  };

  const filterDevelopers = () => {
    let result = [...developers];
    
    // Apply skills filter
    if (filters.skills.length > 0) {
      result = result.filter(dev => 
        filters.skills.some(skill => dev.skills.includes(skill))
      );
    }
    
    // Apply experience level filter
    if (filters.experience.length > 0) {
      result = result.filter(dev => 
        filters.experience.includes(dev.experience)
      );
    }
    
    // Apply availability filter
    if (filters.availability.length > 0) {
      result = result.filter(dev => 
        filters.availability.includes(dev.availability)
      );
    }
    
    setFilteredDevelopers(result);
  };

  const toggleFilter = (category, value) => {
    const currentFilters = [...filters[category]];
    const filterIndex = currentFilters.indexOf(value);
    
    if (filterIndex >= 0) {
      currentFilters.splice(filterIndex, 1);
    } else {
      currentFilters.push(value);
    }
    
    setFilters({
      ...filters,
      [category]: currentFilters,
    });
  };

  const handleSkip = () => {
    setOverlayLabel('Skip');
    
    // Reset overlay after animation
    setTimeout(() => {
      setOverlayLabel(null);
      if (cardIndex < filteredDevelopers.length - 1) {
        setCardIndex(cardIndex + 1);
      }
    }, 500);
  };
  
  const handleInvite = () => {
    setOverlayLabel('Invite');
    
    if (filteredDevelopers[cardIndex]) {
      setSelectedDeveloper(filteredDevelopers[cardIndex]);
      setInviteModalVisible(true);
      
      // Move to next card
      setTimeout(() => {
        setOverlayLabel(null);
        if (cardIndex < filteredDevelopers.length - 1) {
          setCardIndex(cardIndex + 1);
        }
      }, 500);
    }
  };

  const handleSendInvite = () => {
    // In a real app, you would send the invitation to the developer
    Alert.alert(
      'Invitation Sent',
      `Your invitation has been sent to ${selectedDeveloper.name}.`,
      [{ text: 'OK', onPress: () => setInviteModalVisible(false) }]
    );
    setInviteMessage('');
  };

  const resetFilters = () => {
    setFilters({
      skills: [],
      experience: [],
      availability: [],
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading developers...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Feather name="alert-circle" size={40} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadDevelopers}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Developers</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Feather name="filter" size={20} color="#4F46E5" />
        </TouchableOpacity>
      </View>
      
      {filteredDevelopers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="users" size={48} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>No matching developers found</Text>
          <Text style={styles.emptyMessage}>
            Try adjusting your filters or check back later
          </Text>
          {(filters.skills.length > 0 || filters.experience.length > 0 || filters.availability.length > 0) && (
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
          <View style={styles.cardContainer}>
            {filteredDevelopers[cardIndex] && (
              <ProfileCard 
                developer={filteredDevelopers[cardIndex]} 
              />
            )}
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.skipButton]}
              onPress={handleSkip}
            >
              <Feather name="x" size={28} color="#EF4444" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.inviteButton]}
              onPress={handleInvite}
            >
              <Feather name="user-plus" size={28} color="#10B981" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.cardCount}>
            {cardIndex + 1} of {filteredDevelopers.length} developers
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
              <Text style={styles.modalTitle}>Filter Developers</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowFilters(false)}
              >
                <Feather name="x" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <Text style={styles.filterSectionTitle}>Skills</Text>
              <View style={styles.filterOptionsContainer}>
                {['React Native', 'JavaScript', 'Python', 'UI/UX', 'Node.js', 'Swift', 'Kotlin', 'Go', 'AWS'].map((skill, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterBadge,
                      filters.skills.includes(skill) && styles.filterSelected
                    ]}
                    onPress={() => toggleFilter('skills', skill)}
                  >
                    <Text style={[
                      styles.filterText,
                      filters.skills.includes(skill) && styles.filterTextSelected
                    ]}>
                      {skill}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={styles.filterSectionTitle}>Experience Level</Text>
              <View style={styles.filterOptionsContainer}>
                {['Junior', 'Mid', 'Senior'].map((level, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterBadge,
                      filters.experience.includes(level) && styles.filterSelected
                    ]}
                    onPress={() => toggleFilter('experience', level)}
                  >
                    <Text style={[
                      styles.filterText,
                      filters.experience.includes(level) && styles.filterTextSelected
                    ]}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={styles.filterSectionTitle}>Availability</Text>
              <View style={styles.filterOptionsContainer}>
                {['Now', 'Soon', 'Busy'].map((availability, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterBadge,
                      filters.availability.includes(availability) && styles.filterSelected
                    ]}
                    onPress={() => toggleFilter('availability', availability)}
                  >
                    <Text style={[
                      styles.filterText,
                      filters.availability.includes(availability) && styles.filterTextSelected
                    ]}>
                      {availability}
                    </Text>
                  </TouchableOpacity>
                ))}
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
      
      {/* Invite Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={inviteModalVisible}
        onRequestClose={() => setInviteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Invite to Team</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setInviteModalVisible(false)}
              >
                <Feather name="x" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            {selectedDeveloper && (
              <View style={styles.inviteModalBody}>
                <View style={styles.developerHeader}>
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarInitial}>
                      {selectedDeveloper.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.developerInfo}>
                    <Text style={styles.developerName}>{selectedDeveloper.name}</Text>
                    <Text style={styles.developerRole}>{selectedDeveloper.experience} Developer</Text>
                  </View>
                </View>
                
                <Text style={styles.messageLabel}>Invitation Message:</Text>
                <TextInput
                  style={styles.messageInput}
                  value={inviteMessage}
                  onChangeText={setInviteMessage}
                  placeholder="Write a personal message to the developer..."
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                
                <TouchableOpacity
                  style={styles.sendInviteButton}
                  onPress={handleSendInvite}
                >
                  <Text style={styles.sendInviteText}>Send Invitation</Text>
                </TouchableOpacity>
              </View>
            )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
  inviteButton: {
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
  filterOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  filterBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  filterText: {
    fontSize: 14,
    color: '#4B5563',
  },
  filterTextSelected: {
    color: '#4F46E5',
    fontWeight: '500',
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
  inviteModalBody: {
    padding: 16,
  },
  developerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  developerInfo: {
    flex: 1,
  },
  developerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  developerRole: {
    fontSize: 14,
    color: '#4B5563',
  },
  messageLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 120,
    marginBottom: 16,
  },
  sendInviteButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  sendInviteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HireDevsScreen;
