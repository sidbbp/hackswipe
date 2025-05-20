import React, { useContext, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { EventsContext } from './EventsContext';

const MyEventsScreen = () => {
  const { savedEvents } = useContext(EventsContext);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(false);

  // Filter events based on tab and date
  const now = new Date();
  const eventsToShow = savedEvents.filter(event => {
    const eventDate = new Date(event.start_date || event.hackathons?.start_date);
    return activeTab === 'upcoming'
      ? eventDate >= now
      : eventDate < now;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Events</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'upcoming' && styles.activeTab
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'upcoming' && styles.activeTabText
          ]}>
            Upcoming
          </Text>
          {eventsToShow.filter(e => {
            const eventDate = new Date(e.start_date || e.hackathons?.start_date);
            return eventDate >= now;
          }).length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {eventsToShow.filter(e => {
                  const eventDate = new Date(e.start_date || e.hackathons?.start_date);
                  return eventDate >= now;
                }).length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'past' && styles.activeTab
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'past' && styles.activeTabText
          ]}>
            Past
          </Text>
          {eventsToShow.filter(e => {
            const eventDate = new Date(e.start_date || e.hackathons?.start_date);
            return eventDate < now;
          }).length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {eventsToShow.filter(e => {
                  const eventDate = new Date(e.start_date || e.hackathons?.start_date);
                  return eventDate < now;
                }).length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.loadingText}>Loading your events...</Text>
        </View>
      ) : eventsToShow.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="calendar" size={48} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>
            {activeTab === 'upcoming' 
              ? 'No upcoming events' 
              : 'No past events'}
          </Text>
          <Text style={styles.emptyMessage}>
            {activeTab === 'upcoming' 
              ? 'Swipe to join hackathons and they will appear here' 
              : 'Your completed hackathons will appear here'}
          </Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.eventsList}
          contentContainerStyle={styles.eventsListContent}
        >
          {eventsToShow.map((event) => {
            const hack = event.hackathons || {};
            return (
              <View key={event.id} style={styles.eventCard}>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventName}>
                    {hack.name || event.name}
                  </Text>
                  <Text style={styles.eventMetaText}>
                    {hack.start_date || event.start_date} | {hack.location || event.location}
                  </Text>
                  <Text style={styles.teamLabel}>
                    Team: {event.team_name || 'Solo'}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
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
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4F46E5',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#EBF5FF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    maxWidth: '80%',
  },
  eventsList: {
    flex: 1,
  },
  eventsListContent: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventDetails: {
    // ...existing code...
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  eventMetaText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  teamLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#4B5563',
  },
});

export default MyEventsScreen;
