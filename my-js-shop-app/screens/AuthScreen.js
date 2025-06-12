import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';

export default function AuthScreen() {
  const { user, login, register } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true); // Toggle state

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleAuth = async () => {
    const action = isLogin ? login : register;
    const result = await action(username, password);
    if (result.success) {
      setStatus(`✅ ${isLogin ? 'Logged in' : 'Registered'} successfully!`);
    } else {
      setStatus(`❌ ${result.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>

      {user ? (
        <Text style={styles.success}>✅ Logged in as {user.username}</Text>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title={isLogin ? 'Login' : 'Register'} onPress={handleAuth} />
          {status ? <Text style={styles.status}>{status}</Text> : null}

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.link}>
              {isLogin
                ? "Don't have an account? Register here"
                : 'Already have an account? Log in'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5
  },
  status: { marginTop: 10, color: 'red', textAlign: 'center' },
  success: { color: 'green', textAlign: 'center', fontSize: 18 },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#3399ff',
    textDecorationLine: 'underline',
  },
});
