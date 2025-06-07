import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = '1592602d2270b2a52fb11d07'; // replace with your real key!

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'success') {
          const codes = data.supported_codes.map(([code, name]) => code);
          setCurrencyOptions(codes);
        } else {
          alert('Failed to load currency codes.');
        }
      })
      .catch((error) => {
        console.error('Error fetching currency codes:', error);
      });
  }, []);

  const handleConvert = () => {
    if (parseFloat(amount) <= 0) {
      alert('Please enter a positive amount.');
      return;
    }

    setIsLoading(true);

    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'success' && data.conversion_result !== undefined) {
          setConvertedAmount(data.conversion_result);
          setConversionRate(data.conversion_rate);
        } else {
          setConvertedAmount(null);
          setConversionRate(null);
          alert('Conversion failed. Please try again.');
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching conversion:', error);
        alert('Error fetching conversion. Please try again.');
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <Text>From:</Text>
      <Picker
        selectedValue={fromCurrency}
        onValueChange={(itemValue) => {
          setFromCurrency(itemValue);
          setConvertedAmount(null);
          setConversionRate(null);
        }}
        style={styles.picker}
      >
        {currencyOptions.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>

      <Text>To:</Text>
      <Picker
        selectedValue={toCurrency}
        onValueChange={(itemValue) => {
          setToCurrency(itemValue);
          setConvertedAmount(null);
          setConversionRate(null);
        }}
        style={styles.picker}
      >
        {currencyOptions.map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>

      <Text>Amount:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => {
          setAmount(text);
          setConvertedAmount(null);
          setConversionRate(null);
        }}
      />

      <Button title="Convert" onPress={handleConvert} />

      {isLoading && <ActivityIndicator size="large" style={{ marginTop: 10 }} />}

      {convertedAmount !== null && conversionRate !== null && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.result}>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </Text>
          <Text>
            Conversion rate: 1 {fromCurrency} = {conversionRate} {toCurrency}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 15,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
  