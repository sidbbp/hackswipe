import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProfileCard = ({ developer, onSwipe }) => {
  // Function to determine experience level color
  const getExperienceLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'junior':
        return '#10B981'; // green
      case 'mid':
        return '#3B82F6'; // blue
      case 'senior':
        return '#8B5CF6'; // purple
      default:
        return '#6B7280'; // gray
    }
  };
  
  // Function to determine availability color
  const getAvailabilityColor = (status) => {
    switch (status.toLowerCase()) {
      case 'now':
        return '#10B981'; // green
      case 'soon':
        return '#F59E0B'; // amber
      case 'busy':
        return '#EF4444'; // red
      default:
        return '#6B7280'; // gray
    }
  };
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarInitial}>
            {developer.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{developer.name}</Text>
          <View style={[
            styles.availabilityBadge, 
            { backgroundColor: getAvailabilityColor(developer.availability) }
          ]}>
            <Text style={styles.availabilityText}>{developer.availability}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.experienceContainer}>
        <Text style={[
          styles.experienceText,
          { color: getExperienceLevelColor(developer.experience) }
        ]}>
          {developer.experience} Developer
        </Text>
      </View>
      
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>{developer.bio}</Text>
      </View>
      
      <View style={styles.skillsContainer}>
        <Text style={styles.skillsTitle}>Skills</Text>
        <View style={styles.tagContainer}>
          {developer.skills.map((skill, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.skipButton]}
          onPress={() => onSwipe('left')}
        >
          <Feather name="x" size={24} color="#EF4444" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.inviteButton]}
          onPress={() => onSwipe('right')}
        >
          <Feather name="user-plus" size={24} color="#10B981" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    padding: 20,
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  availabilityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  experienceContainer: {
    marginBottom: 12,
  },
  experienceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bioContainer: {
    marginBottom: 16,
  },
  bioText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  skillsContainer: {
    marginBottom: 20,
  },
  skillsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#4B5563',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#FEE2E2',
  },
  inviteButton: {
    backgroundColor: '#D1FAE5',
  },
});

export default ProfileCard;
