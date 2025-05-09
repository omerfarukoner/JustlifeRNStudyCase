import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  header1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  header2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  header3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  body: {
    fontSize: 16,
    color: colors.text.primary,
  },
  bodySmall: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.secondary,
  },
});
