import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ModalProvider } from './src/context/ModalContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <AuthProvider>
      <ModalProvider>
        <View style={styles.container}>
          <StatusBar barStyle={'light-content'} />
          <AppNavigator />
        </View>
      </ModalProvider>
    </AuthProvider>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
