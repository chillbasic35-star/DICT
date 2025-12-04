import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';
import { UserProvider } from '../src/context/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(citizen)" />
          <Stack.Screen name="(staff)" />
          <Stack.Screen name="(admin)" />
          <Stack.Screen name="(supervisor)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AuthProvider>
    </UserProvider>
  );
}
