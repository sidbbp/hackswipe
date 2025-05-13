import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // San Francisco coordinates for testing
  const defaultLocation = {
    coords: {
      latitude: 37.7749,
      longitude: -122.4194,
    }
  };

  const getLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      // For web platform
      if (Platform.OS === 'web') {
        if ('geolocation' in navigator) {
          const getWebLocation = () => {
            return new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error),
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
              );
            });
          };
          
          try {
            const position = await getWebLocation();
            setLocation(position);
          } catch (webError) {
            console.error('Error getting web location:', webError);
            setLocation(defaultLocation); // Fallback to SF coordinates
          }
        } else {
          console.log('Geolocation is not supported by this browser.');
          setLocation(defaultLocation); // Fallback to SF coordinates
        }
      } 
      // For mobile platforms
      else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          setLocation(defaultLocation); // Fallback to SF coordinates
          return;
        }
        
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        
        setLocation(position);
      }
    } catch (err) {
      console.error('Error getting location:', err);
      setError('Failed to get location');
      setLocation(defaultLocation); // Fallback to SF coordinates
    } finally {
      setLoading(false);
    }
  };

  return { location, error, loading, getLocation };
};
