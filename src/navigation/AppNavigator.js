import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';

// Import screens
import LocationScreen from '../screens/LocationScreen';
import SwipeScreen from '../screens/SwipeScreen';
import MyEventsScreen from '../screens/MyEventsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FreelanceScreen from '../screens/FreelanceScreen';
import HireDevsScreen from '../screens/HireDevsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for location and swipe flow
const SwipeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LocationPicker" component={LocationScreen} />
      <Stack.Screen name="Swipe" component={SwipeScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Discover') {
            iconName = 'compass';
          } else if (route.name === 'My Events') {
            iconName = 'calendar';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Freelance') {
            iconName = 'briefcase';
          } else if (route.name === 'Hire') {
            iconName = 'users';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 60,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen name="Discover" component={SwipeStack} />
      <Tab.Screen name="My Events" component={MyEventsScreen} />
      <Tab.Screen name="Freelance" component={FreelanceScreen} />
      <Tab.Screen name="Hire" component={HireDevsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
