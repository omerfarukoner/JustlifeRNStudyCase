import { StyleSheet } from 'react-native';
import { colors, radius, spacing, shadows, typography, dimensions, iconSizes } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    width: dimensions.screen.width - spacing.m * 2,
    borderRadius: radius.medium,
    marginTop: spacing.s,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    ...shadows.small,
  },
  iconContainer: {
    marginRight: spacing.s,
    width: spacing.xl,
    height: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningIcon: {
    fontSize: iconSizes.m,
  },
  warningText: {
    flex: 1,
    ...typography.header3,
    color: colors.text.primary,
  },
  closeButton: {
    width: spacing.xl,
    height: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.s,
  },
  closeIcon: {
    fontSize: iconSizes.l,
    color: colors.text.secondary,
  },
  hitSlop: {
    top: spacing.m,
    right: spacing.m,
    bottom: spacing.m,
    left: spacing.m,
  },
});

export const getContainerStyles = (topInset: number) => [
  styles.container,
  { paddingTop: Math.max(topInset, spacing.s) },
];
