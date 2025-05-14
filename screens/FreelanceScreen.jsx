import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const mockGig = {
  id: 1,
  title: 'React Frontend Developer for Hackathon Project',
  remote: true,
  skills: ['React', 'TypeScript', 'UI/UX'],
  deadline: 'May 15, 2025',
  payRange: '$500 - $1000',
  description: 'Looking for a React developer to help build the frontend for our hackathon project. The project is a platform for connecting developers with hackathon teams. You\'ll be working with our designer to implement the UI/UX.'
};

const FreelanceScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
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
      
      <ScrollView style={styles.content}>
        <View style={styles.gigCard}>
          <View style={styles.gigHeader}>
            <Text style={styles.gigTitle}>{mockGig.title}</Text>
            <View style={styles.remoteContainer}>
              <Feather name="map-pin" size={14} color="#10B981" />
              <Text style={styles.remoteText}>Remote</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Required Skills</Text>
          <View style={styles.skillsContainer}>
            {mockGig.skills.map((skill, index) => (
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
                <Text style={styles.detailText}>{mockGig.deadline}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Pay Range</Text>
              <View style={styles.detailValue}>
                <Feather name="dollar-sign" size={14} color="#4B5563" />
                <Text style={styles.detailText}>{mockGig.payRange}</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{mockGig.description}</Text>
          
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('SwipeScreen')}
        >
          <Feather name="home" size={24} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Find Hackathons</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('MyEvents')}
        >
          <Feather name="calendar" size={24} color="#9CA3AF" />
          <Text style={styles.tabLabel}>My Events</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="briefcase" size={24} color="#4F46E5" />
          <Text style={[styles.tabLabel, styles.activeTabText]}>Freelance</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('HireDevs')}
        >
          <Feather name="users" size={24} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Hire Devs</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Feather name="user" size={24} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 16,
  },
  gigCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
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
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  activeTabText: {
    color: '#4F46E5',
  },
});

export default FreelanceScreen;