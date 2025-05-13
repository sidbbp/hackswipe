import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import EventCard from '../components/EventCard';
import { fetchUserEvents } from '../supabaseClient';
import { mockUserEvents } from '../data/mockData';

const MyEventsScreen = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState({ upcomingEvents: [], pastEvents: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you'd get the user ID from authentication
      const mockUserId = '123e4567-e89b-12d3-a456-426614174000';
      
      // Try to fetch from Supabase
      const userEvents = await fetchUserEvents(mockUserId);
      
      // If no events or there was an error, use mock data
      if (userEvents.upcomingEvents.length === 0 && userEvents.pastEvents.length === 0) {
        setEvents(mockUserEvents);
      } else {
        setEvents(userEvents);
      }
    } catch (err) {
      console.error('Error loading events:', err);
      setError('Failed to load your events. Please try again.');
      
      // Use mock data as fallback
      setEvents(mockUserEvents);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveEvent = async (eventId) => {
    try {
      // In a real app, you would call Supabase to remove the event
      
      // For now, just update local state
      const updatedUpcomingEvents = events.upcomingEvents.filter(
        event => event.id !== eventId
      );
      
      const updatedPastEvents = events.pastEvents.filter(
        event => event.id !== eventId
      );
      
      setEvents({
        upcomingEvents: updatedUpcomingEvents,
        pastEvents: updatedPastEvents
      });
      
      Alert.alert('Success', 'Event removed successfully');
    } catch (error) {
      console.error('Error removing event:', error);
      Alert.alert('Error', 'Failed to remove event. Please try again.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Loading your events...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Feather name="alert-circle" size={40} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadEvents}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const activeEvents = activeTab === 'upcoming' 
    ? events.upcomingEvents 
    : events.pastEvents;

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
          {events.upcomingEvents.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{events.upcomingEvents.length}</Text>
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
          {events.pastEvents.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{events.pastEvents.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      {activeEvents.length === 0 ? (
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
          {activeEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isPast={activeTab === 'past'}
              onRemove={handleRemoveEvent}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
});

export default MyEventsScreen;
