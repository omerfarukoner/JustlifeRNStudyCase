import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import styles from '../styles';

interface SectionErrorProps {
  error: Error;
  containerStyle?: ViewStyle;
}

const SectionError: React.FC<SectionErrorProps> = ({ error, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.errorText}>{error.message}</Text>
    </View>
  );
};

export default SectionError;
