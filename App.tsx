/**
 * Justlife React Native Case Study
 *
 * @format
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { ConnectivityProvider } from './src/context/ConnectivityContext';
import { ConnectivityBanner } from './src/components';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ConnectivityProvider>
        <View style={styles.container}>
          <AppNavigator />
          <ConnectivityBanner />
        </View>
      </ConnectivityProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
