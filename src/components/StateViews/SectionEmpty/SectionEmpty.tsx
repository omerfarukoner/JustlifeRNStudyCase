import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

interface SectionEmptyProps {
  message: string;
  containerStyle?: object;
}

const SectionEmpty: React.FC<SectionEmptyProps> = ({ message, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
};

export default SectionEmpty;
