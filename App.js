import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { supabase } from './supabase'; // Using our updated Supabase client
import 'react-native-gesture-handler';
import { LogBox, Text, View } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs(['Warning: ...']); // Ignore specific warnings

export default function App() {
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [supabaseError, setSupabaseError] = useState(null);

  useEffect(() => {
    // Verify Supabase configuration is working
    const checkSupabaseConnection = async () => {
      try {
        // Simple test to see if Supabase is configured correctly
        const { error } = await supabase.from('hackathons').select('count', { count: 'exact', head: true });
        
        if (error && error.message && error.message.includes('supabaseUrl is required')) {
          setSupabaseError('Supabase configuration missing or invalid');
        } else if (error) {
          console.warn('Supabase query error:', error);
          // This is fine - it might just mean the table doesn't exist yet,
          // but the connection is configured correctly
        }
      } catch (err) {
        console.error('Supabase connection error:', err);
        setSupabaseError(err.message);
      }
    };

    checkSupabaseConnection();
  }, []);

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

  // Show error screen if there's a Supabase configuration issue
  if (supabaseError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Configuration Error</Text>
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>
          There was a problem connecting to the database. Please check your Supabase configuration.
        </Text>
        <Text style={{ color: '#666', fontSize: 14 }}>{supabaseError}</Text>
      </View>
    );
  }

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
