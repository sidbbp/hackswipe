import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.85;


const SwipeCard = ({ hackathon, overlayLabel }) => {
  const {
    name,
    image,
    start_date,
    end_date,
    application_deadline,
    location,
    distance = 0,
    tags = [],
    max_team_size = 1,
  } = hackathon;

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const InfoRow = ({ icon, color, label, value }) => (
    <View style={styles.infoRow}>
      <View style={[styles.iconContainer, { backgroundColor: '#F3F4F6' }]}>
        <Feather name={icon} size={20} color={color} />
      </View>
      <View style={styles.infoText}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      {overlayLabel && (
        <View
          style={[
            styles.overlayLabel,
            {
              backgroundColor:
                overlayLabel === 'Join'
                  ? 'rgba(16, 185, 129, 0.85)'
                  : 'rgba(239, 68, 68, 0.85)',
            },
          ]}
        >
          <Text style={styles.overlayLabelText}>{overlayLabel}</Text>
        </View>
      )}

      <Image
        source={
          require('D:\\programmingStuff\\AI-apps\\SmartTracker\\assets\\splash.png')
        }
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
      </View>

      <View style={styles.body}>
        <InfoRow icon="calendar" color="#4F46E5" label="Dates" value={`${formatDate(start_date)} - ${formatDate(end_date)}`} />
        <InfoRow icon="clock" color="#F59E0B" label="Application Deadline" value={formatDate(application_deadline)} />
        <InfoRow icon="map-pin" color="#EF4444" label="Location" value={location} />
        <InfoRow icon="navigation" color="#8B5CF6" label="Distance" value={`${distance} km away`} />
        <InfoRow icon="users" color="#10B981" label="Team Size" value={`Up to ${max_team_size} members`} />

        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.06)']} style={styles.footer}>
        <Text style={styles.swipeHint}>← Swipe left to skip • Swipe right to join →</Text>
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
  image: {
    width: '100%',
    height: '40%',
    resizeMode: 'cover',
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
