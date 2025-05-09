import { StyleSheet } from 'react-native';
import { colors, spacing, typography, shadows, radius, dimensions } from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: radius.medium,
    marginVertical: spacing.xs,
    overflow: 'hidden',
    ...shadows.small,
    width: (dimensions.screen.width - spacing.m * 3) / 2,
    margin: spacing.xs,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  contentContainer: {
    padding: spacing.m,
  },
  title: {
    ...typography.header3,
    color: colors.text.primary,
  },
});

export default styles;
