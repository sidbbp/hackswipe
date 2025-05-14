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
    height: 200,
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  profilePhotoContainer: {
    position: 'absolute',
    left: 16,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4F46E5',
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileName: {
    fontSize: 24,
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
});

export default ProfileScreen;
