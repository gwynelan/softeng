import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Accessories = () => {
  const navigation = useNavigation();

  const accessoriesData = [
    {
      id: 1,
      name: 'Wheels',
      price: 50,
      description: 'High-quality wheels for a smooth ride.',
      imageUrl: require('../../img/wheels.png'),
    },
    {
      id: 2,
      name: 'Gear',
      price: 30,
      description: 'Durable gears for precise shifting.',
      imageUrl: require('../../img/gear.png'),
    },
    {
      id: 3,
      name: 'Bike Helmet',
      price: 35,
      description: 'Protective helmet for safe cycling.',
      imageUrl: require('../../img/helmet.png'),
    },
    {
      id: 4,
      name: 'Bike Lights',
      price: 35,
      description: 'Bright lights for nighttime rides.',
      imageUrl: require('../../img/lights.png'),
    },
    {
      id: 5,
      name: 'Locks',
      price: 35,
      description: 'Secure your bike with strong locks.',
      imageUrl: require('../../img/locks.png'),
    },
    {
      id: 6,
      name: 'Bearing',
      price: 30,
      description: 'Smooth and durable bearings for your bike.',
      imageUrl: require('../../img/bearing.png'),
    },
  ];

  const handlePress = (accessory) => {
    navigation.navigate('AccessoriesDetails', { accessory });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.accessoryCard}>
      <Image source={item.imageUrl} style={styles.accessoryImage} />
      <Text style={styles.accessoryName}>{item.name}</Text>
      <Text style={styles.accessoryPrice}>₱{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={accessoriesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  accessoryCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  accessoryImage: {
    width: 130,
    height: 130,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  accessoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  accessoryPrice: {
    fontSize: 14,
    color: '#2ecc71',
  },
  listContainer: {
    paddingBottom: 10,
  },
});

export default Accessories;
