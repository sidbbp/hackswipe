import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [platformInfo, setPlatformInfo] = useState({});
  
  useEffect(() => {
    // Gather platform information for debugging
    setPlatformInfo({
      os: Platform.OS,
      version: Platform.Version,
      isExpo: !!global.expo,
      constants: global.expo?.Constants || {},
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>HackSwipe</Text>
          <Text style={styles.subtitle}>Coming Soon</Text>
          
          <View style={styles.debugSection}>
            <Text style={styles.debugTitle}>Debug Info</Text>
            <Text style={styles.debugText}>Platform: {Platform.OS}</Text>
            <Text style={styles.debugText}>Running on: {Platform.OS === 'web' ? 'Web Browser' : 'Mobile Device'}</Text>
            <Text style={styles.debugText}>Version: {JSON.stringify(Platform.Version)}</Text>
          </View>
          
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: Platform.OS === 'web' ? '100vh' : '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  debugSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  debugText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});
