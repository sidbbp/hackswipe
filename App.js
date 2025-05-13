import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { supabase } from './supabaseClient';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs(['Warning: ...']); // Ignore specific warnings

export default function App() {
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Check if the user has already set their location
    const checkLocationStatus = async () => {
      try {
        // You might store this in AsyncStorage or Supabase in a real app
        // For now, we'll just use state
        if (userLocation) {
          setIsLocationSet(true);
        }
      } catch (error) {
        console.error('Error checking location status:', error);
      }
    };

    checkLocationStatus();
  }, [userLocation]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator 
            isLocationSet={isLocationSet} 
            setIsLocationSet={setIsLocationSet}
            userLocation={userLocation}
            setUserLocation={setUserLocation}
          />
          <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
