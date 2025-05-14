import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const mockDeveloper = {
  name: 'Alex Johnson',
  role: 'Full Stack Developer',
  skills: ['React', 'Node.js', 'AWS'],
  experience: 'Senior',
  availability: 'Available'
};

const HireDevsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hire Developers</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color="#111827" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.developerCard}>
          <View style={styles.profileContainer}>
            <View style={styles.profilePhoto}>
              <Text style={styles.profileInitial}>{mockDeveloper.name[0]}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.developerName}>{mockDeveloper.name}</Text>
              <Text style={styles.developerRole}>{mockDeveloper.role}</Text>
            </View>
            <View style={styles.availabilityContainer}>
              <View style={styles.availabilityDot} />
              <Text style={styles.availabilityText}>{mockDeveloper.availability}</Text>
            </View>
          </View>
          
          <View style={styles.skillsContainer}>
            {mockDeveloper.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.declineButton}>
              <Feather name="x" size={20} color="#EF4444" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewProfileButton}>
              <Text style={styles.viewProfileButtonText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inviteButton}>
              <Feather name="user-plus" size={20} color="#4F46E5" />
            </TouchableOpacity>
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
        
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="users" size={24} color="#4F46E5" />
          <Text style={[styles.tabLabel, styles.activeTabText]}>Hire Devs</Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  developerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  profileInfo: {
    flex: 1,
  },
  developerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  developerRole: {
    fontSize: 14,
    color: '#4B5563',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  availabilityText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
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
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  declineButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewProfileButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  viewProfileButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  inviteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
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

export default HireDevsScreen;