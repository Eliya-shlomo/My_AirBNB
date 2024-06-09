import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { initWeb3, getRental } from '../utils/web3';

const HomeScreen = ({ navigation }) => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      const contract = await initWeb3();
      const rentalCount = await contract.counter();
      const rentalList = [];
      for (let i = 0; i < rentalCount; i++) {
        const rental = await getRental(i);
        rentalList.push({ ...rental, id: i });
      }
      setRentals(rentalList);
    };

    fetchRentals();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.rentalItem} onPress={() => navigation.navigate('RentalDetail', { id: item.id })}>
      <Text style={styles.rentalTitle}>{item[0]}</Text> {/* rental name */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Rentals</Text>
      <FlatList
        data={rentals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Add Rental" onPress={() => navigation.navigate('AddRental')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  rentalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rentalTitle: {
    fontSize: 18,
  },
});

export default HomeScreen;
