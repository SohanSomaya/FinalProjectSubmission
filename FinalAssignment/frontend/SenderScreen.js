import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function SenderScreen() {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
  // Show a popup to notify that sending is starting
  Alert.alert('Sending...', 'Your message is being sent.');

  try {
    const response = await fetch('http://localhost/FinalAssignment/backend/sendMessage.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `sender=${sender}&recipient=${recipient}&message=${encodeURIComponent(message)}`
    });

    const result = await response.json();
    // After sending, show result in popup
    Alert.alert('Result', result.status);
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Failed to send message.');
  }
};


  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Sender" onChangeText={setSender} value={sender} />
      <TextInput placeholder="Recipient" onChangeText={setRecipient} value={recipient} />
      <TextInput placeholder="Message" onChangeText={setMessage} value={message} />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
