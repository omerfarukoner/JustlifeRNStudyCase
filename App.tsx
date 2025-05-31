/**
 * Justlife React Native Case Study
 *
 * @format
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ConnectivityBanner } from './src/components';
import { ConnectivityProvider } from './src/context/ConnectivityContext';
import AppNavigator from './src/navigation/AppNavigator';
import './src/utils/wdyr';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackAllComponents: true,
    exclude: [/^RCT/, /^RN/],
  });
}

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

App.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'App',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
