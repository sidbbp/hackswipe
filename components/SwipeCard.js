import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.6;

const SwipeCard = ({ hackathon, overlayLabel }) => {
  const {
    name,
    start_date,
    end_date,
    application_deadline,
    location,
    distance,
    tags,
    max_team_size,
  } = hackathon;

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.card}>
      {/* Overlay Label (Skip/Join) */}
      {overlayLabel && (
        <View style={[
          styles.overlayLabel,
          { backgroundColor: overlayLabel === 'Join' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)' }
        ]}>
          <Text style={styles.overlayLabelText}>{overlayLabel}</Text>
        </View>
      )}

      {/* Card Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
      </View>

      {/* Card Body */}
      <View style={styles.body}>
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Feather name="calendar" size={20} color="#4F46E5" />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.label}>Dates</Text>
            <Text style={styles.value}>{formatDate(start_date)} - {formatDate(end_date)}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Feather name="clock" size={20} color="#F59E0B" />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.label}>Application Deadline</Text>
            <Text style={styles.value}>{formatDate(application_deadline)}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Feather name="map-pin" size={20} color="#EF4444" />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{location}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Feather name="navigation" size={20} color="#8B5CF6" />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.label}>Distance</Text>
            <Text style={styles.value}>{distance} km away</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Feather name="users" size={20} color="#10B981" />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.label}>Team Size</Text>
            <Text style={styles.value}>Up to {max_team_size} members</Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Card Footer */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.1)']}
        style={styles.footer}
      >
        <Text style={styles.swipeHint}>
          ← Swipe left to skip • Swipe right to join →
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  overlayLabel: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: 16,
  },
  overlayLabelText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    transform: [{ rotate: '-15deg' }],
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  body: {
    flex: 1,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoText: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  swipeHint: {
    color: '#6B7280',
    fontSize: 14,
  },
});

export default SwipeCard;
