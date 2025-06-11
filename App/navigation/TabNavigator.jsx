import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../auth/LoginScreen';
import RegisterScreen from '../auth/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Profile') {
        iconName = focused ? 'person' : 'person-outline';
      }
      return <Ionicons name={iconName} size={24} color={color} />;
    },
    tabBarActiveTintColor: '#0066FF',
    tabBarInactiveTintColor: '#888',
  })}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const TabNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Auth" component={AuthStack} />
    <Stack.Screen name="App" component={AppTabs} />
  </Stack.Navigator>
);

export default TabNavigator;