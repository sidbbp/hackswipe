import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';
import { checkLocationPermission, requestLocationPermission } from '../utils/locationUtils';

const LocationScreen = ({ navigation, setUserLocation, setIsLocationSet }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const getDeviceLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    
    try {
      // First check if we have permission
      const hasPermission = await checkLocationPermission();
      
      if (!hasPermission) {
        // Request permission
        const permissionResult = await requestLocationPermission();
        
        if (!permissionResult) {
          setErrorMsg('Location permission was denied. Please enable it in settings.');
          setLoading(false);
          return;
        }
      }
      
      // Now get the location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      // Set user location in app state
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      // Set location flag to true
      setIsLocationSet(true);
      
      // Navigate to main screen
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Error getting location:', error);
      setErrorMsg('Could not get your location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const useSanFranciscoLocation = () => {
    // Use San Francisco coordinates as specified in requirements
    setUserLocation({
      latitude: 37.7749,
      longitude: -122.4194,
    });
    
    // Set location flag to true
    setIsLocationSet(true);
    
    // Navigate to main screen
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Feather name="map-pin" size={100} color="#4F46E5" />
        </View>
        
        <Text style={styles.title}>Find Hackathons Near You</Text>
        
        <Text style={styles.description}>
          To show you the best hackathons in your area, we need your location.
        </Text>
        
        {errorMsg && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        )}
        
        <TouchableOpacity
          style={styles.locationButton}
          onPress={getDeviceLocation}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Feather name="navigation" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>Use My Location</Text>
            </>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.alternateButton}
          onPress={useSanFranciscoLocation}
        >
          <Text style={styles.alternateButtonText}>Use San Francisco (Demo)</Text>
        </TouchableOpacity>
        
        <View style={styles.privacyContainer}>
          <Feather name="shield" size={16} color="#6B7280" />
          <Text style={styles.privacyText}>
            Your location is only used to find nearby events.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#EEF2FF',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
  },
  locationButton: {
    flexDirection: 'row',
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  alternateButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 24,
  },
  alternateButtonText: {
    color: '#4B5563',
    fontWeight: '500',
    fontSize: 16,
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  privacyText: {
    color: '#6B7280',
    fontSize: 14,
    marginLeft: 6,
  },
});

export default LocationScreen;
