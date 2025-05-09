import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius, iconSizes, dimensions } from '../../theme';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.m,
    marginTop: spacing.l,
    marginBottom: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    ...typography.body,
    backgroundColor: colors.background.primary,
    color: colors.text.primary,
    borderRadius: radius.medium,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderWidth: 1,
    borderColor: colors.secondary,
    flex: 1,
    paddingRight: spacing.xl,
    width: dimensions.screen.width - spacing.m * 2,
  },
  clearButton: {
    position: 'absolute',
    right: spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: radius.round,
    backgroundColor: colors.secondary,
    zIndex: 1,
  },
  clearButtonText: {
    fontSize: iconSizes.xs,
    color: colors.text.secondary,
  },
});

export default styles;
