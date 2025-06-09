import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { insertUser } from '../utils/Database';
import { UserContext } from '../context/UserContext';

export default function RegisterScreen({ navigation }) {
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    insertUser(username, password, () => {
      setUser({
        username: username,
        isAdmin: false,
      });
      navigation.replace('MainTabs');
    }, (error) => {
      if (error.code === 6) {
        alert('Username already exists!');
      } else {
        console.error('Error inserting user:', error);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
        Create Account
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
      <Button mode="contained" onPress={handleRegister}>
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
