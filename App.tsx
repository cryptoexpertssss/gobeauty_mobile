import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { AppointmentsProvider } from './contexts/AppointmentsContext';
import ErrorBoundary from './components/ErrorBoundary';
import AppNavigator from './navigation/AppNavigator';

// Create query client
const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppointmentsProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </AppointmentsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}