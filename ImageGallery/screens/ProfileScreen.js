import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Switch, Text } from 'react-native-paper';

export default function ProfileScreen() {
  const [profile, setProfile] = useState({ name: '', email: '', notifications: false });

  useEffect(() => {
    AsyncStorage.getItem('userProfile').then((data) => {
      if (data) setProfile(JSON.parse(data));
    });
  }, []);

  const saveProfile = async () => {
    if (!profile.name || !profile.email) {
      Alert.alert('Error', 'Name and Email required');
      return;
    }
    await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    Alert.alert('Saved', 'Profile updated');
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={profile.name}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={profile.email}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
        style={styles.input}
        keyboardType="email-address"
      />
      <View style={styles.row}>
        <Text>Notifications</Text>
        <Switch
          value={profile.notifications}
          onValueChange={(val) => setProfile({ ...profile, notifications: val })}
        />
      </View>
      <Button mode="contained" onPress={saveProfile}>Save</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
});
