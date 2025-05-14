import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const data = [
  { id: '1', title: 'Sunset', uri: require('./assets/sunset.jpeg') },
  { id: '2', title: 'Forest', uri: require('./assets/forest.png') },
  { id: '3', title: 'Mountain', uri: require('./assets/mountain.jpeg') },
];

export default function GalleryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Picture', { image: item })}>
            <Image source={item.uri} style={styles.thumbnail} />
            <Text style={styles.caption}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  caption: { textAlign: 'center', marginBottom: 16 },
});
