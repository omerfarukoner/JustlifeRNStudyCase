import React from 'react';
import { Text, View, ActivityIndicator, ViewStyle } from 'react-native';
import { colors } from '../../../theme';
import styles from '../styles';

interface SectionLoadingProps {
  message?: string;
  containerStyle?: ViewStyle;
}

const SectionLoading: React.FC<SectionLoadingProps> = ({ message, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? <Text style={styles.loadingText}>{message}</Text> : null}
    </View>
  );
};

export default SectionLoading;
