import React, { useContext, useState, useEffect } from 'react';
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
import { EventsContext } from './EventsContext';
import { mockUserEvents } from '../data/mockData';

const MyEventsScreen = () => {
  const { savedEvents, setSavedEvents } = useContext(EventsContext);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [_, forceUpdate] = useState(0); // force re-render

  useEffect(() => {
    // Force re-render when savedEvents changes (in case context doesn't trigger update)
    forceUpdate(n => n + 1);
  }, [savedEvents]);

  useEffect(() => {
    // Only set mock events if savedEvents is undefined (not null or empty array)
    if (typeof savedEvents === 'undefined' || savedEvents === null) {
      const allEvents = [
        ...(mockUserEvents.upcomingEvents || []),
        ...(mockUserEvents.pastEvents || [])
      ];
      setSavedEvents(allEvents);
    }
  }, [savedEvents, setSavedEvents]);

  // Filter events based on tab and date
  const now = new Date();
  // Fix for React Native mobile: always use a new array reference to trigger re-render
  const [eventsList, setEventsList] = useState([]);
  useEffect(() => {
    setEventsList(Array.isArray(savedEvents) ? [...savedEvents] : []);
  }, [savedEvents]);

  const eventsToShow = eventsList.filter(event => {
    const eventDate = new Date(event.hackathons?.start_date || event.start_date);
    return activeTab === 'upcoming'
      ? eventDate >= now
      : eventDate < now;
  });

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
          <Text
            style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'past' && styles.activeTabText,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {eventsToShow.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="calendar" size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>
              {activeTab === 'upcoming'
                ? 'No upcoming events'
                : 'No past events'}
            </Text>
            <Text style={styles.emptyMessage}>
              {activeTab === 'upcoming'
                ? 'Swipe right to join hackathons and they will appear here.'
                : 'Your completed hackathons will appear here.'}
            </Text>
          </View>
        ) : (
          eventsToShow.map((event) => {
            const hackathons = event.hackathons || {
              name: event.name,
              start_date: event.start_date,
              location: event.location,
              imageUrl: event.imageUrl,
            };
            return (
              <TouchableOpacity key={event.id} style={styles.eventCard}>
                <Image
                  source={{
                    uri:
                      hackathons.imageUrl?.trim() ||
                      'https://via.placeholder.com/80',
                  }}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                <View style={styles.eventDetails}>
                  <Text style={styles.eventName}>
                    {hackathons.name
                      ? String(hackathons.name)
                      : 'Unnamed Event'}
                  </Text>
                  <View style={styles.eventMeta}>
                    <View style={styles.eventMetaItem}>
                      <Feather name="calendar" size={14} color="#6B7280" />
                      <Text style={styles.eventMetaText}>
                        {hackathons.start_date
                          ? new Date(hackathons.start_date).toDateString()
                          : ''}
                      </Text>
                    </View>
                    <View style={styles.eventMetaItem}>
                      <Feather name="map-pin" size={14} color="#6B7280" />
                      <Text style={styles.eventMetaText}>
                        {hackathons.location
                          ? String(hackathons.location)
                          : ''}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.teamInfo}>
                    <Text style={styles.teamLabel}>
                      Team: {event.team_name ? String(event.team_name) : 'Solo'}
                    </Text>
                  </View>
                </View>
                <View style={styles.moreButton}>
                  <Feather name="more-vertical" size={20} color="#6B7280" />
                </View>
              </TouchableOpacity>
            );
          })
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
  eventMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  eventMetaText: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
  teamInfo: { flexDirection: 'row', alignItems: 'center' },
  teamLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  moreButton: { padding: 12, justifyContent: 'center' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default MyEventsScreen;
