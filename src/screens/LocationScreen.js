import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocation } from '../hooks/useLocation';
import { useNavigation } from '@react-navigation/native';

const LocationScreen = () => {
  const navigation = useNavigation();
  const { location, error, loading, getLocation } = useLocation();
  const [locationRequested, setLocationRequested] = useState(false);

  useEffect(() => {
    // If location is obtained, navigate to swipe screen
    if (location && locationRequested) {
      navigation.navigate('Swipe', { location });
    }
  }, [location, locationRequested, navigation]);

  const handleUseLocation = async () => {
    setLocationRequested(true);
    await getLocation();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Feather name="map-pin" size={60} color="#4F46E5" style={styles.icon} />
        
        <Text style={styles.title}>Find Hackathons Near You</Text>
        <Text style={styles.subtitle}>
          Discover the best hackathons happening within 50km of your location
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleUseLocation}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Feather name="navigation" size={18} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Use My Location</Text>
            </>
          )}
        </TouchableOpacity>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.infoText}>
              Using San Francisco as default location.
            </Text>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Feather name="info" size={16} color="#64748B" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            We'll only show hackathons within 50km of your location.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    color: '#64748B',
    fontSize: 14,
  },
});

export default LocationScreen;
