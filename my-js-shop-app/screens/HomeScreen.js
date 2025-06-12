import React, { useContext, useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ItemContext } from '../context/ItemContext';
import { CartContext } from '../context/CartContext';
import { CurrencyContext } from '../context/CurrencyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const { items } = useContext(ItemContext);
  const { addToCart, cart } = useContext(CartContext);
  const { convert } = useContext(CurrencyContext);
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [tagSearch, setTagSearch] = useState('');

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesTag = tagSearch === '' || item.tags?.some(tag =>
        tag.toLowerCase().includes(tagSearch.toLowerCase())
      );
      const matchesMin = minPrice === '' || item.price >= parseFloat(minPrice);
      const matchesMax = maxPrice === '' || item.price <= parseFloat(maxPrice);
      return matchesSearch && matchesTag && matchesMin && matchesMax;
    });
  }, [items, search, minPrice, maxPrice, tagSearch]);

  const getRemainingStock = (item) => {
    const cartQty = cart.find(c => c.id === item.id)?.quantity || 0;
    return item.stock - cartQty;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.title}>🛍️ Shop Items</Text>
        <View style={styles.cartWrapper}>
          {totalItems > 0 && (
            <>
              <Text style={styles.cartTotal}>{convert(totalAmount)}</Text>
              <View style={styles.cartIconContainer}>
                <Icon
                  name="cart-outline"
                  size={28}
                  color="#000"
                  onPress={() => navigation.navigate('Cart')}
                />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              </View>
            </>
          )}
          {totalItems === 0 && (
            <Icon
              name="cart-outline"
              size={28}
              color="#000"
              onPress={() => navigation.navigate('Cart')}
            />
          )}
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search name..."
        value={search}
        onChangeText={setSearch}
      />
      <TextInput
        style={styles.input}
        placeholder="Min price"
        keyboardType="numeric"
        value={minPrice}
        onChangeText={setMinPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Max price"
        keyboardType="numeric"
        value={maxPrice}
        onChangeText={setMaxPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Search tag..."
        value={tagSearch}
        onChangeText={setTagSearch}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const remaining = getRemainingStock(item);
          return (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>
                {convert(item.price)} — {remaining > 0 ? `${remaining} left` : 'Out of Stock'}
              </Text>
              {item.tags?.length > 0 && (
                <Text style={styles.tags}>Tags: {item.tags.join(', ')}</Text>
              )}
              <Button
                title="Add to Cart"
                onPress={() => addToCart(item)}
                disabled={remaining <= 0}
                color={remaining <= 0 ? 'gray' : '#2196F3'}
              />
            </View>
          );
        }}
        ListEmptyComponent={<Text>No items match your filters</Text>}
      />

      <Button
        title="🧹 Reset Items"
        onPress={async () => {
          await AsyncStorage.removeItem('items');
          alert('Items reset! Restart the app to reload defaults.');
        }}
        color="#f39c12"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartTotal: {
    marginRight: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cartIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  item: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tags: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    marginBottom: 4,
  },
});
