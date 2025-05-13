import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const EventCard = ({ event, isPast, onRemove }) => {
  const hackathon = event.hackathons;
  
  // Format date to display in a readable format
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate event duration
  const getDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? '1 day' : `${diffDays} days`;
  };
  
  const handleRemoveConfirm = () => {
    Alert.alert(
      'Remove Event',
      `Are you sure you want to remove ${hackathon.name} from your events?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => onRemove(event.id),
          style: 'destructive',
        },
      ]
    );
  };
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{hackathon.name}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemoveConfirm}
        >
          <Feather name="trash-2" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Feather name="calendar" size={16} color="#4F46E5" />
          </View>
          <Text style={styles.infoText}>
            {formatDate(hackathon.start_date)} - {formatDate(hackathon.end_date)} 
            ({getDuration(hackathon.start_date, hackathon.end_date)})
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Feather name="map-pin" size={16} color="#EF4444" />
          </View>
          <Text style={styles.infoText}>{hackathon.location}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Feather 
              name={event.join_type === 'team' ? 'users' : 'user'} 
              size={16} 
              color="#10B981" 
            />
          </View>
          <Text style={styles.infoText}>
            Joined as: {event.join_type === 'team' ? `Team (${event.team_name})` : 'Solo'}
          </Text>
        </View>
      </View>
      
      <View style={styles.tagsContainer}>
        {hackathon.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      
      {isPast && (
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Completed</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    padding: 16,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  content: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#3B82F6',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#6B7280',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default EventCard;
