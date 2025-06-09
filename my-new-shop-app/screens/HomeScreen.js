import React, { useState, useEffect, useMemo, useContext } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Chip } from 'react-native-paper';
import { getItems } from '../utils/Database';
import { CartContext } from '../context/CartContext';

export default function HomeScreen() {
  const { addToCart } = useContext(CartContext);

  const [allItems, setAllItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    getItems((itemsFromDB) => {
      setAllItems(itemsFromDB);
    });
  };

  const allTags = [...new Set(allItems.flatMap(item => item.tags))];

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => item.tags.includes(tag));

      const price = item.price;
      const withinMin = minPrice === '' || price >= parseFloat(minPrice);
      const withinMax = maxPrice === '' || price <= parseFloat(maxPrice);

      return matchesSearch && matchesTags && withinMin && withinMax;
    });
  }, [allItems, searchQuery, selectedTags, minPrice, maxPrice]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Shop Items
      </Text>

      <TextInput
        label="Search items"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        {allTags.map((tag) => (
          <Chip
            key={tag}
            selected={selectedTags.includes(tag)}
            onPress={() => toggleTag(tag)}
            style={styles.chip}
          >
            {tag}
          </Chip>
        ))}
      </ScrollView>

      <View style={styles.priceContainer}>
        <TextInput
          label="Min Price"
          value={minPrice}
          onChangeText={setMinPrice}
          keyboardType="numeric"
          style={[styles.input, { flex: 1, marginRight: 8 }]}
        />
        <TextInput
          label="Max Price"
          value={maxPrice}
          onChangeText={setMaxPrice}
          keyboardType="numeric"
          style={[styles.input, { flex: 1 }]}
        />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No items match your filters.</Text>}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text variant="titleMedium">{item.name}</Text>
            <Text>${item.price.toFixed(2)}</Text>
            <Text style={{ color: '#555', marginBottom: 8 }}>
              {item.tags.join(', ')}
            </Text>
            <Text style={{ marginBottom: 8 }}>
              Quantity: {item.quantity}
            </Text>
            <Button mode="contained" onPress={() => addToCart(item)}>
              Add to Cart
            </Button>
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
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  itemCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
});
