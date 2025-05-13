import React, { memo } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Card } from '../../types/card.types';
import styles from './CardItem.styles';
import { OptimizedImage } from '..';

interface CardItemProps {
  card: Card;
  onPress?: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
      testID={`card-item-${card.cardId}`}
    >
      <OptimizedImage
        source={{ uri: card.img }}
        style={styles.image}
        resizeMode="contain"
        priority="high"
        cacheControl="immutable"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {card.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CardItem);
