import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const mockEvents = [
  {
    id: 1,
    name: 'TechCrunch Disrupt Hackathon',
    date: 'June 10-12, 2025',
    location: 'San Francisco, CA',
    imageUrl: 'https://placehold.co/600x400/4F46E5/FFFFFF',
    status: 'upcoming',
    role: 'participant',
    team: 'Team Innovate',
  },
  {
    id: 2,
    name: 'Google I/O Hackathon',
    date: 'July 5-6, 2025',
    location: 'Mountain View, CA',
    imageUrl: 'https://placehold.co/600x400/10B981/FFFFFF',
    status: 'upcoming',
    role: 'team leader',
    team: 'Code Warriors',
  },
  {
    id: 3,
    name: 'AWS Community Day Hackathon',
    date: 'May 1-2, 2025',
    location: 'Online',
    imageUrl: 'https://placehold.co/600x400/EF4444/FFFFFF',
    status: 'past',
    role: 'participant',
    team: 'Cloud Pioneers',
  },
];

const MyEventsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Events</Text>
        <TouchableOpacity style={styles.calendarButton}>
          <Feather name="calendar" size={20} color="#111827" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Past</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {mockEvents
          .filter(event => event.status === 'upcoming')
          .map(event => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <Image
                source={{ uri: event.imageUrl }}
                style={styles.eventImage}
                resizeMode="cover"
              />
              <View style={styles.eventDetails}>
                <Text style={styles.eventName}>{event.name}</Text>
                <View style={styles.eventMeta}>
                  <View style={styles.eventMetaItem}>
                    <Feather name="calendar" size={14} color="#6B7280" />
                    <Text style={styles.eventMetaText}>{event.date}</Text>
                  </View>
                  <View style={styles.eventMetaItem}>
                    <Feather name="map-pin" size={14} color="#6B7280" />
                    <Text style={styles.eventMetaText}>{event.location}</Text>
                  </View>
                </View>
                <View style={styles.teamInfo}>
                  <View style={styles.roleContainer}>
                    <Text style={styles.roleLabel}>Role</Text>
                    <View style={[
                      styles.roleBadge,
                      event.role === 'team leader' ? styles.leaderRoleBadge : styles.participantRoleBadge
                    ]}>
                      <Text style={[
                        styles.roleText,
                        event.role === 'team leader' ? styles.leaderRoleText : styles.participantRoleText
                      ]}>
                        {event.role === 'team leader' ? 'Team Leader' : 'Participant'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.teamContainer}>
                    <Text style={styles.teamLabel}>Team</Text>
                    <Text style={styles.teamName}>{event.team}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Feather name="more-vertical" size={20} color="#6B7280" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('SwipeScreen')}
        >
          <Feather name="home" size={24} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Find Hackathons</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="calendar" size={24} color="#4F46E5" />
          <Text style={[styles.tabLabel, styles.activeTabText]}>My Events</Text>
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
  calendarButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4F46E5',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#4F46E5',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  eventImage: {
    width: 80,
    height: '100%',
  },
  eventDetails: {
    flex: 1,
    padding: 12,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  eventMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  eventMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  eventMetaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleContainer: {
    marginRight: 16,
  },
  roleLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  participantRoleBadge: {
    backgroundColor: '#E0E7FF',
  },
  leaderRoleBadge: {
    backgroundColor: '#FEF3C7',
  },
  roleText: {
    fontSize: 12,
    fontWeight: '500',
  },
  participantRoleText: {
    color: '#4F46E5',
  },
  leaderRoleText: {
    color: '#D97706',
  },
  teamContainer: {
    flex: 1,
  },
  teamLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  teamName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
  },
  moreButton: {
    padding: 12,
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
});

export default MyEventsScreen;