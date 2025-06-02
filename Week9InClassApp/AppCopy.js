import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { Picker } from 'react-native-web';

export default function App() {
  const [id, setId] = useState('');
  const [catId, setCatId] = useState('1');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');

  const handleAddProduct = async() => {
    if(!id || !catId || !name || !price){
      setStatus('Please enter values into all boxes.');
      return;
    }

    const query = `id=${id}&cat_id=${catId}&name=${name}&price=${price}`;
    const url = `https://www.cs.drexel.edu/~st3375/Week8_In_Class/AddProduct.php?${query}`;

    try {
      const response = await fetch(url, {method: 'GET'});
      const text = await response.text();
      setStatus(`${text} record(s) has been inserted into the database.`);
    }
    catch (error) {
      setStatus("Networking problem:" + error.message);
      console.log('Fetch error: ', error.message);
    }
  }
  return (
    <View style={styles.container}>
      <Text>Product Management</Text>
      <TextInput value={id} onChangeText={setId} />
      <Picker selectedValue={catId} onValueChange = {(itemValue) => setCatId(itemValue)}>
        <Picker.Item label="Piano" value="1" />
        <Picker.Item label="Violin" value="2" />
        <Picker.Item label="Violin" value="3" />
      </Picker>
      <TextInput value={name} onChangeText={setName} />
      <TextInput value={price} onChangeText={setPrice} />
      <Button title="Add Product" onPress={handleAddProduct} />
      <Text>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
