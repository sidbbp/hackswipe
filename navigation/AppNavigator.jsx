import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import SwipeScreen from '../screens/SwipeScreen.jsx';
import MyEventsScreen from '../screens/MyEventsScreen.jsx';
import FreelanceScreen from '../screens/FreelanceScreen.jsx';
import HireDevsScreen from '../screens/HireDevsScreen.jsx';
import ProfileScreen from '../screens/ProfileScreen.jsx';

// Changed from Stack to NativeStack for better performance and compatibility
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Create a TabNavigator for the main app screens
const MainTabNavigator = ({ userLocation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingVertical: 10,
          height: 60,
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen 
        name="SwipeScreen" 
        options={{
          tabBarLabel: 'Find Hackathons',
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      >
        {(props) => <SwipeScreen {...props} userLocation={userLocation} />}
      </Tab.Screen>
      
      <Tab.Screen 
        name="MyEvents" 
        component={MyEventsScreen}
        options={{
          tabBarLabel: 'My Events',
          tabBarIcon: ({ color }) => (
            <Feather name="calendar" size={24} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Freelance" 
        component={FreelanceScreen}
        options={{
          tabBarLabel: 'Freelance',
          tabBarIcon: ({ color }) => (
            <Feather name="briefcase" size={24} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="HireDevs" 
        component={HireDevsScreen}
        options={{
          tabBarLabel: 'Hire Devs',
          tabBarIcon: ({ color }) => (
            <Feather name="users" size={24} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main app navigator
const AppNavigator = ({ userLocation, setUserLocation, isLocationSet, setIsLocationSet }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="MainTabs">
        {(props) => <MainTabNavigator {...props} userLocation={userLocation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;