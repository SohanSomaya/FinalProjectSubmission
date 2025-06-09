import React, { useContext, useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { UserContext } from '../context/UserContext';
import { OrderContext } from '../context/OrderContext';
import { insertItem, deleteUser, updateUserPassword } from '../utils/Database';
import { Text, Button, TextInput } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(UserContext);
  const { orders } = useContext(OrderContext);

  const [newPassword, setNewPassword] = useState('');

  // For Admin - Add Item
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleChangePassword = () => {
    if (!newPassword) {
      alert('Please enter a new password');
      return;
    }

    updateUserPassword(user.username, newPassword, () => {
      alert('Password updated!');
      setNewPassword('');
    });
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteUser(user.username, () => {
              logout();
              navigation.replace('Login');
              alert('Your account has been deleted.');
            });
          },
        },
      ]
    );
  };

  const handleAddItem = () => {
    if (!name || !price || !quantity) {
      alert('Please fill all fields!');
      return;
    }

    const newItem = {
      id: uuidv4(),
      name,
      price: parseFloat(price),
      tags: tags.split(',').map(tag => tag.trim()),
      quantity: parseInt(quantity),
    };

    insertItem(newItem);
    alert('Item added!');
    setName('');
    setPrice('');
    setTags('');
    setQuantity('');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Profile
      </Text>

      <Text style={{ marginBottom: 8 }}>Username: {user?.username}</Text>
      <Text style={{ marginBottom: 8 }}>Admin: {user?.isAdmin ? 'Yes' : 'No'}</Text>

      <Button mode="outlined" onPress={() => {
        logout();
        navigation.replace('Login');
      }} style={{ marginBottom: 16 }}>
        Logout
      </Button>

      <Text variant="titleLarge" style={{ marginBottom: 8 }}>
        Change Password
      </Text>
      <TextInput
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleChangePassword} style={{ marginBottom: 16 }}>
        Save New Password
      </Button>

      <Button mode="outlined" onPress={handleDeleteAccount} style={{ marginBottom: 24 }} color="red">
        Delete Account
      </Button>

      {/* Admin Actions */}
      {user?.isAdmin && (
        <>
          <Text variant="titleLarge" style={{ marginBottom: 16 }}>
            Admin Actions - Add Item
          </Text>

          <TextInput
            label="Item Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Tags (comma-separated)"
            value={tags}
            onChangeText={setTags}
            style={styles.input}
          />
          <TextInput
            label="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button mode="contained" onPress={handleAddItem} style={{ marginBottom: 24 }}>
            Add Item
          </Button>
        </>
      )}

      <Text variant="titleLarge" style={{ marginVertical: 16 }}>
        Order History
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(order) => order.orderId}
        ListEmptyComponent={<Text>No orders yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Text>Date: {item.date}</Text>
            <Text>Total: ${item.total.toFixed(2)}</Text>
            <Text>Items:</Text>
            {item.items.map((orderItem) => (
              <Text key={orderItem.id}>
                - {orderItem.name} (x{orderItem.quantity})
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
  orderCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
});
