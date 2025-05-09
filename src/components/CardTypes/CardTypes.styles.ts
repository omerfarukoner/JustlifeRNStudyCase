import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: spacing.m,
  },
  title: {
    ...typography.header3,
    color: colors.text.primary,
    marginHorizontal: spacing.m,
    marginBottom: spacing.m,
  },
  contentContainer: {
    flex: 1,
  },
  listContainer: {
    padding: spacing.m,
  },
  loadingContainer: {
    paddingHorizontal: spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  centeredLoadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: spacing.m * 6.25,
    marginHorizontal: spacing.m,
  },
  loadingText: {
    marginTop: spacing.m,
    ...typography.body,
    color: colors.text.secondary,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: spacing.m * 6.25,
    marginHorizontal: spacing.m,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
  },
  noSpacingSection: {
    height: 'auto',
    padding: 0,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.m,
  },
});

export default styles;
