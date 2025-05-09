import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows, typography, dimensions } from '../../../theme';

const itemWidth = dimensions.screen.width * 0.25;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    padding: spacing.m,
    marginVertical: spacing.xs,
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: colors.background.secondary,
  },
  image: {
    width: itemWidth - spacing.m * 2,
    marginHorizontal: spacing.m,
    aspectRatio: 16 / 9,
    backgroundColor: colors.background.primary,
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
  },
  name: {
    ...typography.body,
    color: colors.text.primary,
  },
});

export default styles;
