import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import AdminScreen from '../screens/AdminScreen';
import BookingScreen from '../screens/BookingScreen';
import ExploreScreen from '../screens/ExploreScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TreatmentsScreen from '../screens/TreatmentsScreen';
import ModalScreen from '../screens/ModalScreen';

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main app
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2f95dc',
        tabBarInactiveTintColor: '#ccc',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Explore" 
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          // Add icon here if needed
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          // Add icon here if needed
        }}
      />
      <Tab.Screen 
        name="Treatments" 
        component={TreatmentsScreen}
        options={{
          tabBarLabel: 'Treatments',
          // Add icon here if needed
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          // Add icon here if needed
        }}
      />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Admin" 
        component={AdminScreen} 
        options={{ title: "Admin Dashboard" }} 
      />
      <Stack.Screen 
        name="Booking" 
        component={BookingScreen} 
        options={{ title: "Book Appointment" }} 
      />
      <Stack.Screen 
        name="Modal" 
        component={ModalScreen} 
        options={{ 
          presentation: 'modal',
          headerShown: false 
        }} 
      />
    </Stack.Navigator>
  );
}

// Auth wrapper component
function AuthenticatedApp() {
  const { user } = useAuth();
  
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: "Back" }}>
      {user ? (
        <>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Admin"
            component={AdminScreen}
            options={{ title: "Admin Dashboard" }}
          />
          <Stack.Screen
            name="Booking"
            component={BookingScreen}
            options={{ title: "Book Appointment" }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="Modal"
        component={ModalScreen}
        options={{
          presentation: 'modal',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return <AuthenticatedApp />;
}