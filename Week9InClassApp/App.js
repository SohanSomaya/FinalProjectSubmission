import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, FlatList } from 'react-native';
import { ActivityIndicator, Picker } from 'react-native-web';

export default function App() {
  const [students, setStudents] = useState('');
  const [catloading, setLoading] = useState('1');
  const [error, setError] = useState('');

  const fetchStudents = async() => {
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

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleItem = async() => (
    <View>
      <Text>Name: {item.name}</Text>
      <Text>Year: {item.year}</Text>
    </View>
  )
  return (
    <View style={styles.container}>
      {loading? (
        <ActivityIndicator size="large"/>
      ) : error?
        (
          <Text>{error}</Text>
        ) : (
          <FlatList data={students} keyExtractor={(item) => item._id} renderItem={handleItem}/>
        );
      }
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
