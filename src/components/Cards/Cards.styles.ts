import { StyleSheet } from 'react-native';
import { spacing, colors } from '../../theme';

const styles = StyleSheet.create({
  listContainer: {
    padding: spacing.m,
    paddingBottom: spacing.xl * 2,
  },
  loadingFooter: {
    paddingVertical: spacing.l,
    marginTop: spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: spacing.xl,
    color: colors.text.secondary,
  },
});

export default styles;
