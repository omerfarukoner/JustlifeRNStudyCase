import React, { ReactNode } from 'react';
import { View, SafeAreaView, ViewStyle } from 'react-native';
import styles from './Screen.styles';

interface ScreenProps {
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
}

const Screen: React.FC<ScreenProps> = ({ children, style, backgroundColor }) => {
  const containerStyle = [styles.container, backgroundColor && { backgroundColor }, style];

  return (
    <View style={containerStyle}>
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </View>
  );
};

export default Screen;
