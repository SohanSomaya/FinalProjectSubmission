import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PictureScreen({ route }) {
  const { image } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: image.uri }} style={styles.fullImage} />
      <Text style={styles.title}>{image.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  fullImage: { width: '90%', height: 300, resizeMode: 'contain' },
  title: { fontSize: 18, marginTop: 10 },
});
