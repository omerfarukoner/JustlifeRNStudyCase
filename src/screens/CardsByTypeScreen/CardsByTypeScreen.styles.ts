import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  title: {
    ...typography.header2,
    color: colors.text.primary,
    marginHorizontal: spacing.m,
    marginVertical: spacing.m,
  },
  cardsContainer: {
    flex: 1,
  },
});

export default styles;
