import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

// Import screens
import LocationScreen from '../screens/LocationScreen';
import SwipeScreen from '../screens/SwipeScreen';
import MyEventsScreen from '../screens/MyEventsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FreelanceScreen from '../screens/FreelanceScreen';
import HireDevsScreen from '../screens/HireDevsScreen';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator
const MainTabNavigator = ({ userLocation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen 
        name="Discover" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" size={size} color={color} />
          ),
        }}
      >
        {(props) => <SwipeScreen {...props} userLocation={userLocation} />}
      </Tab.Screen>
      
      <Tab.Screen 
        name="My Events" 
        component={MyEventsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Freelance" 
        component={FreelanceScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="briefcase" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Hire Devs" 
        component={HireDevsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Root navigator
const AppNavigator = ({ isLocationSet, setIsLocationSet, userLocation, setUserLocation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLocationSet ? (
        <Stack.Screen name="Location">
          {(props) => (
            <LocationScreen 
              {...props} 
              setIsLocationSet={setIsLocationSet} 
              setUserLocation={setUserLocation} 
            />
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="MainTabs">
          {(props) => (
            <MainTabNavigator 
              {...props} 
              userLocation={userLocation} 
            />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
