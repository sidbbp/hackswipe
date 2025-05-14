import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const mockProfile = {
  name: 'Alex Johnson',
  role: 'Full Stack Developer',
  location: 'San Francisco, CA',
  availability: 'Available',
  skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'UI/UX', 'MongoDB'],
  about: 'Passionate developer with 5+ years of experience building web and mobile applications. Specialized in React, Node.js, and cloud technologies.'
};

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Feather name="settings" size={20} color="#111827" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <ImageBackground
          style={styles.coverPhoto}
          source={{ uri: 'https://placehold.co/600x200/111827/111827' }}
        >
          <View style={styles.profilePhotoContainer}>
            <View style={styles.profilePhoto}>
              <Text style={styles.profileInitial}>{mockProfile.name[0]}</Text>
            </View>
            <TouchableOpacity style={styles.editPhotoButton}>
              <Feather name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        
        <View style={styles.profileInfo}>
          <View style={styles.profileHeader}>
            <View>
              <Text style={styles.profileName}>{mockProfile.name}</Text>
              <Text style={styles.profileRole}>{mockProfile.role}</Text>
              <View style={styles.locationContainer}>
                <Feather name="map-pin" size={14} color="#6B7280" />
                <Text style={styles.locationText}>{mockProfile.location}</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.editButton}>
              <Feather name="edit-2" size={16} color="#4F46E5" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.availabilityDot} />
              <Text style={styles.availabilityLabel}>Availability Status</Text>
              <Text style={styles.availabilityValue}>{mockProfile.availability}</Text>
              <Feather name="chevron-down" size={16} color="#6B7280" />
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {mockProfile.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>{mockProfile.about}</Text>
          </View>
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
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Freelance')}
        >
          <Feather name="briefcase" size={24} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Freelance</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('HireDevs')}
        >
          <Feather name="users" size={24} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Hire Devs</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="user" size={24} color="#4F46E5" />
          <Text style={[styles.tabLabel, styles.activeTabText]}>Profile</Text>
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
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  coverPhoto: {
    height: 150,
    justifyContent: 'flex-end',
  },
  profilePhotoContainer: {
    position: 'relative',
    marginLeft: 16,
    marginBottom: -40,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6B7280',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    backgroundColor: '#FFFFFF',
    paddingTop: 48,
    paddingHorizontal: 16,
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    color: '#4F46E5',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  availabilityLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  availabilityValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
    marginRight: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  skillsContainer: {
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
    fontSize: 14,
    color: '#4B5563',
  },
  aboutText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
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

export default ProfileScreen;