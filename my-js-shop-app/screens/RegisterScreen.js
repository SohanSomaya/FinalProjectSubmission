import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { UserContext } from '../context/UserContext';
import { saveData, loadData } from '../utils/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const listUsers = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const userKeys = keys.filter((key) => key.startsWith('user_'));
    const userData = await AsyncStorage.multiGet(userKeys);
    console.log('📦 Registered users:');
    userData.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  } catch (e) {
    console.error('❌ Error listing users:', e);
  }
};

export default function RegisterScreen({ navigation }) {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    listUsers();
  }, []);

  const handleRegister = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const existingUser = await loadData(`user_${username}`);
    if (existingUser) {
      setError('Username already exists');
      return;
    }

    await saveData(`user_${username}`, { username, password });
    const success = await login(username, password);
    if (success) {
      navigation.replace('Home');
    } else {
      setError('Error logging in after registration');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <Button title="Register and Login" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    marginTop: 20,
    color: '#4dc9ff',
    textAlign: 'center',
  },
});
