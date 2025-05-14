import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSanFranciscoLocation } from './utils/locationUtils';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  // Add the location state to fix the missing setUserLocation error
  const [userLocation, setUserLocation] = useState(useSanFranciscoLocation());
  // We'll set location as already set to skip the location screen for now
  const [isLocationSet, setIsLocationSet] = useState(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator 
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            isLocationSet={isLocationSet}
            setIsLocationSet={setIsLocationSet}
          />
          <StatusBar style="auto" />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
