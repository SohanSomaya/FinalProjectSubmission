import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const data = [
  { id: '1', title: 'Sunset', uri: 'https://i.imgur.com/unxqJNH.jpg' },
  { id: '2', title: 'Forest', uri: 'https://i.imgur.com/YCwhKEb.jpg' },
  { id: '3', title: 'Mountain', uri: 'https://i.imgur.com/raDEzYF.jpg' },
];

export default function GalleryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Picture', { image: item })}>
            <Image source={{ uri: item.uri }} style={styles.thumbnail} />
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
