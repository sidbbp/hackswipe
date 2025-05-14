import * as Location from 'expo-location';
import { Platform } from 'react-native';

/**
 * Check if the app has permission to access the user's location
 * @returns {Promise<boolean>} True if permission is granted, false otherwise
 */
export const checkLocationPermission = async () => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error checking location permission:', error);
    return false;
  }
};

/**
 * Request permission to access the user's location
 * @returns {Promise<boolean>} True if permission is granted, false otherwise
 */
export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};

/**
 * Get the user's current location
 * @returns {Promise<Object>} Location object with latitude and longitude
 */
export const getCurrentLocation = async () => {
  try {
    // For web platform
    if (Platform.OS === 'web') {
      if ('geolocation' in navigator) {
        const getWebLocation = () => {
          return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => resolve({
                coords: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }
              }),
              (error) => reject(error),
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          });
        };
        
        try {
          const position = await getWebLocation();
          return position;
        } catch (webError) {
          console.error('Error getting web location:', webError);
          return {
            coords: {
              latitude: 37.7749, // San Francisco
              longitude: -122.4194,
            }
          };
        }
      } else {
        console.log('Geolocation is not supported by this browser.');
        return {
          coords: {
            latitude: 37.7749, // San Francisco
            longitude: -122.4194,
          }
        };
      }
    } 
    // For mobile platforms
    else {
      const hasPermission = await checkLocationPermission();
      
      if (!hasPermission) {
        const permissionResult = await requestLocationPermission();
        
        if (!permissionResult) {
          return {
            coords: {
              latitude: 37.7749, // San Francisco
              longitude: -122.4194,
            }
          };
        }
      }
      
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      return location;
    }
  } catch (error) {
    console.error('Error getting location:', error);
    return {
      coords: {
        latitude: 37.7749, // San Francisco
        longitude: -122.4194,
      }
    };
  }
};

/**
 * Calculate distance between two coordinates using the Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
};

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} Radians
 */
export const deg2rad = (deg) => {
  return deg * (Math.PI/180);
};

/**
 * Use mock location for development (San Francisco)
 * @returns {Object} Location object with San Francisco coordinates
 */
export const useSanFranciscoLocation = () => {
  return {
    latitude: 37.7749,
    longitude: -122.4194,
  };
};