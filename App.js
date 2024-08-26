import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Index from './src/navigation/index'; 
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Index />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
