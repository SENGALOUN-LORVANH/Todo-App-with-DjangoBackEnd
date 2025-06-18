import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './App/context/AuthContext'; // Adjusted path
import LoginScreen from './App/auth/LoginScreen'; // Adjusted path
import RegisterScreen from './App/auth/RegisterScreen';
import ProfileScreen from './App/screens/ProfileScreen';
import HomeScreen from './App/screens/HomeScreen';
import TabNavigator from './App/navigation/TabNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="App"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}