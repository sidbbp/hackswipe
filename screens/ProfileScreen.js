import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput,
  ScrollView,
  Switch,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const ProfileScreen = () => {
  // For a real app, this would come from your authentication state
  const [profile, setProfile] = useState({
    name: 'Jane Developer',
    role: 'Full Stack Developer',
    location: 'San Francisco, CA',
    skills: ['React Native', 'JavaScript', 'Node.js', 'UI/UX', 'GraphQL'],
    isAvailable: true,
    hackathonsJoined: 8,
    bio: 'Passionate developer with 4 years of experience building mobile and web applications. Love participating in hackathons and building new technologies.'
  });
  
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editableProfile, setEditableProfile] = useState({...profile});
  const [newSkill, setNewSkill] = useState('');

  const handleEditProfile = () => {
    setEditableProfile({...profile});
    setIsEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    // Validate
    if (!editableProfile.name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }
    
    // In a real app, you would update the profile in Supabase
    setProfile(editableProfile);
    setIsEditModalVisible(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editableProfile.skills.includes(newSkill.trim())) {
      setEditableProfile({
        ...editableProfile,
        skills: [...editableProfile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditableProfile({
      ...editableProfile,
      skills: editableProfile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleUploadResume = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
      
      if (result.type === 'success') {
        // In a real app, you would upload this to Supabase storage
        Alert.alert('Success', 'Resume uploaded successfully: ' + result.name);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to upload resume');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{profile.name.charAt(0)}</Text>
          </View>
          
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.role}>{profile.role}</Text>
          
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={16} color="#EF4444" />
            <Text style={styles.locationText}>{profile.location}</Text>
          </View>
          
          <View style={styles.availabilityContainer}>
            <Text style={styles.availabilityLabel}>
              {profile.isAvailable ? 'Available for Hackathons' : 'Busy at the moment'}
            </Text>
            <View style={[
              styles.availabilityIndicator,
              { backgroundColor: profile.isAvailable ? '#10B981' : '#EF4444' }
            ]} />
          </View>
        </View>
        
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.hackathonsJoined}</Text>
            <Text style={styles.statLabel}>Hackathons</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.skills.length}</Text>
            <Text style={styles.statLabel}>Skills</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{profile.bio}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {profile.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleEditProfile}
          >
            <Feather name="edit-2" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleUploadResume}
          >
            <Feather name="file-text" size={20} color="#4F46E5" />
            <Text style={styles.secondaryButtonText}>Upload Resume</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Feather name="x" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <Text style={styles.fieldLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={editableProfile.name}
                onChangeText={(text) => setEditableProfile({...editableProfile, name: text})}
                placeholder="Your name"
              />
              
              <Text style={styles.fieldLabel}>Role</Text>
              <TextInput
                style={styles.input}
                value={editableProfile.role}
                onChangeText={(text) => setEditableProfile({...editableProfile, role: text})}
                placeholder="Your professional role"
              />
              
              <Text style={styles.fieldLabel}>Location</Text>
              <TextInput
                style={styles.input}
                value={editableProfile.location}
                onChangeText={(text) => setEditableProfile({...editableProfile, location: text})}
                placeholder="Your location"
              />
              
              <Text style={styles.fieldLabel}>Bio</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={editableProfile.bio}
                onChangeText={(text) => setEditableProfile({...editableProfile, bio: text})}
                placeholder="Tell us about yourself"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              
              <Text style={styles.fieldLabel}>Skills</Text>
              <View style={styles.skillsEditor}>
                {editableProfile.skills.map((skill, index) => (
                  <View key={index} style={styles.editableSkill}>
                    <Text style={styles.editableSkillText}>{skill}</Text>
                    <TouchableOpacity
                      style={styles.removeSkillButton}
                      onPress={() => handleRemoveSkill(skill)}
                    >
                      <Feather name="x" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              
              <View style={styles.addSkillContainer}>
                <TextInput
                  style={[styles.input, styles.skillInput]}
                  value={newSkill}
                  onChangeText={setNewSkill}
                  placeholder="Add a skill"
                />
                <TouchableOpacity
                  style={styles.addSkillButton}
                  onPress={handleAddSkill}
                >
                  <Feather name="plus" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Available for Hackathons</Text>
                <Switch
                  value={editableProfile.isAvailable}
                  onValueChange={(value) => 
                    setEditableProfile({...editableProfile, isAvailable: value})
                  }
                  trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
                  thumbColor={editableProfile.isAvailable ? '#10B981' : '#9CA3AF'}
                />
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginRight: 8,
  },
  availabilityIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#EBF5FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  secondaryButtonText: {
    color: '#4F46E5',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    marginBottom: 16,
  },
  textArea: {
    minHeight: 100,
  },
  skillsEditor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  editableSkill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    paddingLeft: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  editableSkillText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginRight: 6,
  },
  removeSkillButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSkillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  skillInput: {
    flex: 1,
    marginBottom: 0,
    marginRight: 8,
  },
  addSkillButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProfileScreen;
