import React, { useState } from 'react';
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
import { mockUserEvents } from '../data/mockData'; // Importing mock data

const MyEventsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Use the mockUserEvents data directly
  const savedEvents = activeTab === 'upcoming' ? mockUserEvents.upcomingEvents : mockUserEvents.pastEvents;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Events</Text>
        <TouchableOpacity style={styles.calendarButton}>
          <Feather name="calendar" size={20} color="#111827" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {savedEvents.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#6B7280', marginTop: 40 }}>
            No {activeTab} events found.
          </Text>
        ) : (
          savedEvents.map(event => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <Image
                source={{ uri: event.hackathons.imageUrl || 'https://via.placeholder.com/80' }} // Default image if no URL
                style={styles.eventImage}
                resizeMode="cover"
              />
              <View style={styles.eventDetails}>
                <Text style={styles.eventName}>{event.hackathons.name}</Text>
                <View style={styles.eventMeta}>
                  <View style={styles.eventMetaItem}>
                    <Feather name="calendar" size={14} color="#6B7280" />
                    <Text style={styles.eventMetaText}>{event.hackathons.start_date}</Text>
                  </View>
                  <View style={styles.eventMetaItem}>
                    <Feather name="map-pin" size={14} color="#6B7280" />
                    <Text style={styles.eventMetaText}>{event.hackathons.location}</Text>
                  </View>
                </View>
                <View style={styles.teamInfo}>
                  <Text style={styles.teamLabel}>Team: {event.team_name || 'Solo'}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Feather name="more-vertical" size={20} color="#6B7280" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
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
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  calendarButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: { paddingVertical: 12, paddingHorizontal: 16, marginRight: 16 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#4F46E5' },
  tabText: { fontSize: 16, color: '#6B7280' },
  activeTabText: { color: '#4F46E5', fontWeight: '500' },
  content: { flex: 1, padding: 16 },
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
  eventImage: { width: 80, height: '100%' },
  eventDetails: { flex: 1, padding: 12 },
  eventName: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 },
  eventMeta: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  eventMetaItem: { flexDirection: 'row', alignItems: 'center', marginRight: 12, marginBottom: 4 },
  eventMetaText: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
  teamInfo: { flexDirection: 'row', alignItems: 'center' },
  teamLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  moreButton: { padding: 12, justifyContent: 'center' },
});

export default MyEventsScreen;
