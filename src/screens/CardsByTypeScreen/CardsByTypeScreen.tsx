import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation.types';
import { Screen, Cards } from '../../components';
import { Card } from '../../types/card.types';
import { useAllCards } from '../../hooks';
import { strings } from '../../constants';
import styles from './CardsByTypeScreen.styles';

type CardsByTypeScreenRouteProp = RouteProp<RootStackParamList, 'CardsByType'>;

const CardsByTypeScreen: React.FC = () => {
  const route = useRoute<CardsByTypeScreenRouteProp>();
  const { type } = route.params;

  const { cardsByType, loading, error } = useAllCards();

  const cards = useMemo(() => {
    return cardsByType[type] || [];
  }, [cardsByType, type]);

  const handleCardPress = useCallback((card: Card) => {
    console.log(strings.debug.cardPressed, card.name);
  }, []);

  return (
    <Screen style={styles.container}>
      <View style={styles.cardsContainer}>
        <Cards
          cards={cards}
          onCardPress={handleCardPress}
          loading={loading}
          error={error}
          emptyMessage={strings.common.noCardsOfTypeFound.replace('{{type}}', type)}
        />
      </View>
    </Screen>
  );
};

export default CardsByTypeScreen;
