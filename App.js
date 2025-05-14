import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSanFranciscoLocation } from "./utils/locationUtils";
import AppNavigator from "./navigation/AppNavigator";
import { EventsProvider } from "./screens/EventsContext"; // Import context provider
import "react-native-gesture-handler";

export default function App() {
  const [userLocation, setUserLocation] = useState(useSanFranciscoLocation());
  const [isLocationSet, setIsLocationSet] = useState(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <EventsProvider>
          <NavigationContainer>
            <AppNavigator
              userLocation={userLocation}
              setUserLocation={setUserLocation}
              isLocationSet={isLocationSet}
              setIsLocationSet={setIsLocationSet}
            />
            <StatusBar style="auto" />
          </NavigationContainer>
        </EventsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
