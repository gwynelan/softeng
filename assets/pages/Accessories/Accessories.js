import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const accessoriesData = [
  { id: '1', name: 'Wheels', price: '₱50', image: require('../../img/6.jpg'), navigateTo: 'AccessoryDetails' },
  { id: '2', name: 'Gear', price: '₱50', image: require('../../img/6.jpg'), navigateTo: 'AccessoryDetails' },
  { id: '3', name: 'Bike Helmet', price: '₱35', image: require('../../img/6.jpg'), navigateTo: 'AccessoryDetails' },
  { id: '4', name: 'Bike Lights', price: '₱35', image: require('../../img/6.jpg'), navigateTo: 'AccessoryDetails' },
  { id: '5', name: 'Locks', price: '₱35', image: require('../../img/6.jpg'), navigateTo: 'AccessoryDetails' },
  { id: '6', name: 'Bearing', price: '₱35', image: require('../../img/6.jpg'), navigateTo: 'AccessoryDetails' },
  { id: '7', name: 'Saddle Bag', price: '₱40', image: require('../../img/6.jpg'), navigateTo: 'AccessoryDetails' },
  { id: '8', name: 'Water Bottle Holder', price: '₱20', image: require('../../img/6.jpg'), navigateTo: 'AccessoryDetails' },
  { id: '9', name: 'Chain Lubricant', price: '₱15', image: require('../../img/6.jpg'), navigateTo: 'AccessoryDetails' },
  { id: '10', name: 'Bell', price: '₱10', image: require('../../img/6.jpg'), navigateTo: 'AccessoryDetails' },

];

const Accessories = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Scrollable Accessories List */}
      <ScrollView contentContainerStyle={styles.grid}>
        {accessoriesData.map((item) => (
          <AccessoryItem
            key={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            onPress={() => item.navigateTo && navigation.navigate(item.navigateTo)} // Navigation logic
          />
        ))}
      </ScrollView>
    </View>
  );
};

const AccessoryItem = ({ name, price, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}> {/* Wrap the item in TouchableOpacity */}
      <Image source={image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemPrice}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Accessories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 8,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
  },
  infoContainer: {
    padding: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#FF6347',
  },
});
