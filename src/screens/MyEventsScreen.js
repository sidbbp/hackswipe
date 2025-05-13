import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import EventItem from '../components/EventItem';
import { UserContext } from '../context/UserContext';

const MyEventsScreen = () => {
  const { userJoinedHackathons, removeJoinedHackathon } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('upcoming');

  // Filter hackathons by date
  const currentDate = new Date();
  
  const upcomingEvents = userJoinedHackathons.filter(
    hackathon => new Date(hackathon.endDate) >= currentDate
  ).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  
  const pastEvents = userJoinedHackathons.filter(
    hackathon => new Date(hackathon.endDate) < currentDate
  ).sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Feather name="calendar" size={48} color="#94A3B8" />
      <Text style={styles.emptyTitle}>
        {activeTab === 'upcoming' ? 'No Upcoming Events' : 'No Past Events'}
      </Text>
      <Text style={styles.emptyText}>
        {activeTab === 'upcoming'
          ? 'When you join hackathons, they will appear here'
          : 'Your completed hackathons will be shown here'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Events</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'upcoming' && styles.activeTab,
          ]}
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
          style={[
            styles.tab,
            activeTab === 'past' && styles.activeTab,
          ]}
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

      <FlatList
        data={activeTab === 'upcoming' ? upcomingEvents : pastEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventItem
            event={item}
            onRemove={() => removeJoinedHackathon(item.id)}
          />
        )}
        contentContainerStyle={styles.eventList}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  activeTabText: {
    color: '#4F46E5',
  },
  eventList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default MyEventsScreen;
