import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert } from 'react-native';

export default function ReceiverScreen() {
  const [recipient, setRecipient] = useState('');
  const [messages, setMessages] = useState([]);

  const retrieveMessages = async () => {
    if (!recipient.trim()) {
      Alert.alert('Please enter a recipient');
      return;
    }

    try {
      const response = await fetch(`http://localhost/FinalAssignment/backend/retrieveMessages.php?recipient=${recipient}`);
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Recipient" onChangeText={setRecipient} value={recipient} />
      <Button title="Retrieve" onPress={retrieveMessages} />
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
}
