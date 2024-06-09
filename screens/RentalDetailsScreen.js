import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getRental, addDatesBooked } from '../utils/web3';

const RentalDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [rental, setRental] = useState(null);

  useEffect(() => {
    const fetchRental = async () => {
      const rentalInfo = await getRental(id);
      setRental(rentalInfo);
    };

    fetchRental();
  }, [id]);

  const bookDates = async () => {
    const newBookings = ["2023-06-20", "2023-06-21"];
    await addDatesBooked(id, newBookings, "2");
    alert("Dates booked successfully");
  };

  if (!rental) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{rental[0]}</Text> {/* rental name */}
      <Text style={styles.price}>Price Per Day: {rental[1]} ETH</Text>
      <Button title="Book Dates" onPress={bookDates} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default RentalDetailScreen;
