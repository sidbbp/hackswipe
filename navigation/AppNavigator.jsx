import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SwipeScreen from '../screens/SwipeScreen.jsx';
import MyEventsScreen from '../screens/MyEventsScreen.jsx';
import FreelanceScreen from '../screens/FreelanceScreen.jsx';
import HireDevsScreen from '../screens/HireDevsScreen.jsx';
import ProfileScreen from '../screens/ProfileScreen.jsx';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SwipeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SwipeScreen" component={SwipeScreen} />
      <Stack.Screen name="MyEvents" component={MyEventsScreen} />
      <Stack.Screen name="Freelance" component={FreelanceScreen} />
      <Stack.Screen name="HireDevs" component={HireDevsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;