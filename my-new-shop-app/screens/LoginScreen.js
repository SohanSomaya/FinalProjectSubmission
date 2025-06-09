import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { UserContext } from '../context/UserContext';
import { getUser } from '../utils/Database';

export default function LoginScreen({ navigation }) {
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    getUser(username, password, (userRecord) => {
      if (userRecord) {
        setUser({
          username: userRecord.username,
          isAdmin: userRecord.isAdmin === 1,
        });
        navigation.replace('MainTabs');
      } else {
        alert('Invalid username or password');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
        Login
      </Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={{ marginBottom: 16 }}>
        Login
      </Button>

      <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
        Create Account
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 16,
  },
});
