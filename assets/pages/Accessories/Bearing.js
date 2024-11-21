import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Accessories = () => {
  const navigation = useNavigation();

  const accessoriesData = [
    {
      id: 1,
      name: 'Bike Helmet',
      price: 25,
      imageUrl: require('../../img/6.jpg'),
      description: 'Protect your head with a stylish and durable helmet.',
    },
    {
      id: 2,
      name: 'Water Bottle Holder',
      price: 15,
      imageUrl: require('../../img/6.jpg'),
      description: 'Convenient holder for carrying your water bottle on the go.',
    },
    {
      id: 3,
      name: 'Bike Lock',
      price: 30,
      imageUrl: require('../../img/6.jpg'),
      description: 'Ensure the safety of your bike with this secure lock.',
    },
    {
      id: 4,
      name: 'LED Bike Light',
      price: 20,
      imageUrl: require('../../img/6.jpg'),
      description: 'Illuminate your path with this bright LED bike light.',
    },
    {
      id: 5,
      name: 'Bike Gloves',
      price: 18,
      imageUrl: require('../../img/6.jpg'),
      description: 'Comfortable gloves for better grip and hand protection.',
    },
    {
      id: 6,
      name: 'Bike Pump',
      price: 22,
      imageUrl: require('../../img/6.jpg'),
      description: 'A portable pump to keep your tires inflated on the go.',
    },
  ];

  const handlePress = (accessory) => {
    navigation.navigate('AccessoryDetails', { accessory }); // Pass the selected accessory to the AccessoryDetails screen
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
    height: 120,
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
