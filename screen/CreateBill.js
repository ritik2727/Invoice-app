import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import dateformat from 'dateformat';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CreateBill({navigation}) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedItem, setSelectedItem] = useState('black pen');
  const now = new Date();
  const [Invoice, setInvoice] = useState(dateformat(now, 'ddmmyyhhMss'));
  const [Total, setTotal] = useState('');


  const handleAddInvoice = async () => {
    try {
      // Retrieve existing invoices from AsyncStorage
      const existingInvoices = JSON.parse(await AsyncStorage.getItem('invoices')) || [];

      // Create a new invoice object
      const newInvoice = { id: String(Date.now()), name,address,selectedItem,Invoice,Total };

      // Update the list of invoices
      const updatedInvoices = [...existingInvoices, newInvoice];

      // Save the updated list of invoices to AsyncStorage
      await AsyncStorage.setItem('invoices', JSON.stringify(updatedInvoices));

      // Navigate back to the InvoiceList screen
      navigation.goBack();
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };
 
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.InputContainer}>
          <Text>Name</Text>
          <TextInput
            placeholder="Enter name"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.InputContainer}>
          <Text>Address</Text>
          <TextInput
            placeholder="Enter address"
            value={address}
            onChangeText={text => setAddress(text)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.InputContainer}>
          <Text>Item :</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedItem}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedItem(itemValue)
              }>
              <Picker.Item label="black pen" value="black pen" />
              <Picker.Item label="red pen" value="red pen" />
              <Picker.Item label="green pen" value="green pen" />
            </Picker>
          </View>
        </View>
        <View style={styles.InputContainer}>
          <Text>Invoice No : </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setInvoice(text)}
            value={Invoice}
            placeholder="Invoice No"
          />
        </View>
        <View style={styles.InputContainer}>
          <Text>Total : </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={text => setTotal(text)}
            value={Total}
            placeholder="Total ₹"
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={handleAddInvoice}>
            <Text style={{fontWeight: 'bold'}}>Add Invoice</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingTop: 15,
    paddingBottom: 15,
  },
  InputContainer: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  textInput: {
    marginTop: 4,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    marginBottom: 6,
    borderRadius: 10,
  },
  pickerContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'lightblue',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
});

export default CreateBill;
