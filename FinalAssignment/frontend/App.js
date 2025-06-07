import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SenderScreen from './SenderScreen';
import ReceiverScreen from './ReceiverScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Send">
        <Stack.Screen name="Send" component={SenderScreen} />
        <Stack.Screen name="Receive" component={ReceiverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
