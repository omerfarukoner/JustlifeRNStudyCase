/**
 * @format
 */

import { render } from '@testing-library/react-native';
import React from 'react';
import App from '../App';

jest.mock(
  '../src/navigation/AppNavigator',
  () =>
    function AppNavigator() {
      const { View } = require('react-native');
      return <View testID="mocked-app-navigator" />;
    },
);

jest.mock('../src/components', () => ({
  ConnectivityBanner: () => null,
}));

jest.mock('../src/context/ConnectivityContext', () => {
  const React = require('react');
  return {
    ConnectivityProvider: ({ children }: { children: React.ReactNode }) => children,
    useConnectivity: () => ({
      isConnected: true,
      isDismissed: false,
      dismissBanner: jest.fn(),
    }),
  };
});

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});
