import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  loadingText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.s,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    padding: spacing.m,
  },
  noResultsText: {
    ...typography.header3,
    color: colors.text.secondary,
    textAlign: 'center',
    padding: spacing.m,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  placeholderText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  listContainer: {
    padding: spacing.m,
  },
  container: {
    flex: 1,
    paddingVertical: spacing.m,
  },
  sectionTitle: {
    ...typography.header2,
    color: colors.text.primary,
    marginBottom: spacing.m,
    marginHorizontal: spacing.m,
  },
});

export default styles;
