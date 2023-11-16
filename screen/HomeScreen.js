import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

function HomeScreen({navigation}) {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      // Retrieve invoices from AsyncStorage
      const storedInvoices =
        JSON.parse(await AsyncStorage.getItem('invoices')) || [];
      setInvoices(storedInvoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchInvoices();
    }, []),
  );

  const handleRemoveInvoice = async id => {
    try {
      // Retrieve existing invoices from AsyncStorage
      const existingInvoices =
        JSON.parse(await AsyncStorage.getItem('invoices')) || [];

      // Filter out the invoice with the specified id
      const updatedInvoices = existingInvoices.filter(
        invoice => invoice.id !== id,
      );

      // Save the updated list of invoices to AsyncStorage
      await AsyncStorage.setItem('invoices', JSON.stringify(updatedInvoices));

      // Update the state to reflect the removal
      setInvoices(updatedInvoices);
    } catch (error) {
      console.error('Error removing invoice:', error);
    }
  };
  // return (
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          Invoice Lists
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CreateBill')}>
          <Text style={{fontWeight: 'bold'}}>Create Invoice</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={invoices}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => handleRemoveInvoice(item.id)}>
            <View>
              <Text style={styles.title}>Invoice No: {item.Invoice}</Text>
              <Text style={styles.title}>
                User Name :{' '}
                {item.name.length > 20 ? item.name.substring(0, 20) : item.name}
              </Text>
              <Text style={styles.title}>Product: {item.selectedItem}</Text>
              <Text style={styles.title}>Address: {item.address}</Text>
              <Text style={styles.title}>
                Total Amount : {'₹' + item.Total}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#AA70FF',
    padding: 10,
  },
  container: {
    width: Dimensions.get('window').width - 20,
    // height: 100,
    backgroundColor: '#E5E5E5',
    marginTop: 5,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    width: 120,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
