import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const mockHackathon = {
  id: 1,
  name: 'TechCrunch Disrupt Hackathon',
  date: 'June 10-12, 2025',
  location: 'San Francisco, CA',
  imageUrl: 'https://placehold.co/600x400/4F46E5/FFFFFF',
  description: 'Join the TechCrunch Disrupt Hackathon and build innovative solutions in just 48 hours. Connect with developers, designers, and entrepreneurs from around the world.',
  prizes: ['$10,000 Grand Prize', 'Business Mentorship', 'AWS Credits'],
  technologies: ['AI/ML', 'Blockchain', 'IoT', 'Web3', 'Cloud'],
  participants: 320,
  teamsFormed: 68,
  deadline: 'May 25, 2025',
};

const SwipeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <Feather name="user" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HackSwipe</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color="#111827" />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
        </View>
      ) : (
        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <Image
              source={{ uri: mockHackathon.imageUrl }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.cardGradient}
            >
              <Text style={styles.cardTitle}>{mockHackathon.name}</Text>
              <View style={styles.cardMeta}>
                <View style={styles.cardMetaItem}>
                  <Feather name="calendar" size={14} color="#FFFFFF" />
                  <Text style={styles.cardMetaText}>{mockHackathon.date}</Text>
                </View>
                <View style={styles.cardMetaItem}>
                  <Feather name="map-pin" size={14} color="#FFFFFF" />
                  <Text style={styles.cardMetaText}>{mockHackathon.location}</Text>
                </View>
              </View>
            </LinearGradient>
            
            <View style={styles.cardDetails}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.description}>{mockHackathon.description}</Text>
              
              <Text style={styles.sectionTitle}>Prizes</Text>
              <View style={styles.prizesContainer}>
                {mockHackathon.prizes.map((prize, index) => (
                  <View key={index} style={styles.prizeItem}>
                    <Feather name="award" size={16} color="#4F46E5" />
                    <Text style={styles.prizeText}>{prize}</Text>
                  </View>
                ))}
              </View>
              
              <Text style={styles.sectionTitle}>Technologies</Text>
              <View style={styles.technologiesContainer}>
                {mockHackathon.technologies.map((tech, index) => (
                  <View key={index} style={styles.techBadge}>
                    <Text style={styles.techText}>{tech}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{mockHackathon.participants}</Text>
                  <Text style={styles.statLabel}>Participants</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{mockHackathon.teamsFormed}</Text>
                  <Text style={styles.statLabel}>Teams Formed</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{mockHackathon.deadline}</Text>
                  <Text style={styles.statLabel}>Registration Deadline</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.declineButton}>
                <Feather name="x" size={24} color="#EF4444" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.laterButton}>
                <Feather name="clock" size={24} color="#4B5563" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="home" size={24} color="#4F46E5" />
          <Text style={[styles.tabLabel, styles.activeTabText]}>Find Hackathons</Text>
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
  profileButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 80,
    justifyContent: 'flex-end',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: 'row',
  },
  cardMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  cardMetaText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  cardDetails: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  prizesContainer: {
    marginBottom: 16,
  },
  prizeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  prizeText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 8,
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  techBadge: {
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  techText: {
    fontSize: 14,
    color: '#4B5563',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  declineButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButton: {
    backgroundColor: '#000000',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  laterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
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

export default SwipeScreen;