import React from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../src/context/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  if (user.role === 'ADMIN') {
    return <Redirect href="/(admin)/" />;
  }

  if (user.role === 'SUPERVISOR') {
    return <Redirect href="/(supervisor)/" />;
  }

  if (user.role === 'STAFF') {
    return <Redirect href="/(staff)/" />;
  }

  return <Redirect href="/(citizen)/" />;
}
