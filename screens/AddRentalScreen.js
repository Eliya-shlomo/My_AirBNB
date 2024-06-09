import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { addRental } from '../utils/web3';

const AddRentalScreen = ({ navigation }) => {
  const [rentalInfo, setRentalInfo] = useState({
    name: '',
    city: '',
    lat: '',
    long: '',
    unoDescription: '',
    dosDescription: '',
    imgUrl: '',
    maxGuests: 0,
    pricePerDay: 0,
    datesBooked: [],
  });

  const handleInputChange = (field, value) => {
    setRentalInfo({ ...rentalInfo, [field]: value });
  };

  const handleSubmit = async () => {
    await addRental(rentalInfo);
    alert("Rental added successfully");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        onChangeText={(text) => handleInputChange('city', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        onChangeText={(text) => handleInputChange('lat', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        onChangeText={(text) => handleInputChange('long', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description 1"
        onChangeText={(text) => handleInputChange('unoDescription', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description 2"
        onChangeText={(text) => handleInputChange('dosDescription', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        onChangeText={(text) => handleInputChange('imgUrl', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Max Guests"
        keyboardType="numeric"
        onChangeText={(text) => handleInputChange('maxGuests', parseInt(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="Price Per Day"
        keyboardType="numeric"
        onChangeText={(text) => handleInputChange('pricePerDay', parseInt(text))}
      />
      <Button title="Add Rental" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AddRentalScreen;
