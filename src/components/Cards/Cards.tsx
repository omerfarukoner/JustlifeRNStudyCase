import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, ViewStyle, ActivityIndicator } from 'react-native';
import { Card } from '../../types/card.types';
import { SectionError, SectionLoading, SectionEmpty, CardItem } from '..';
import { strings } from '../../constants';
import styles from './Cards.styles';

type Props = {
  cards: Card[];
  onCardPress?: (card: Card) => void;
  contentContainerStyle?: ViewStyle;
  loading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  itemsPerPage?: number;
};

const Cards: React.FC<Props> = ({
  cards,
  onCardPress,
  contentContainerStyle,
  loading = false,
  error = null,
  emptyMessage = strings.common.noCardsFound,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedCards, setDisplayedCards] = useState<Card[]>([]);

  useEffect(() => {
    setDisplayedCards(cards.slice(0, itemsPerPage));
    setCurrentPage(1);
  }, [cards, itemsPerPage]);

  const hasMoreCards = useMemo(
    () => currentPage * itemsPerPage < cards.length,
    [currentPage, itemsPerPage, cards.length],
  );

  const loadMoreCards = useCallback(() => {
    if (!hasMoreCards || loading) return;

    const nextPage = currentPage + 1;
    const nextCards = cards.slice(0, nextPage * itemsPerPage);

    setDisplayedCards(nextCards);
    setCurrentPage(nextPage);
  }, [currentPage, hasMoreCards, itemsPerPage, cards, loading]);

  const renderCard: ListRenderItem<Card> = useCallback(
    ({ item }) => <CardItem card={item} onPress={() => onCardPress?.(item)} />,
    [onCardPress],
  );

  const renderFooter = useMemo(() => {
    return hasMoreCards ? <ActivityIndicator style={styles.loadingFooter} /> : null;
  }, [hasMoreCards]);

  if (error) return <SectionError error={error} />;
  if (loading) return <SectionLoading message={strings.common.loadingCards} />;
  if (!cards.length) return <SectionEmpty message={emptyMessage} />;

  return (
    <FlatList
      data={displayedCards}
      renderItem={renderCard}
      keyExtractor={item => item.cardId}
      contentContainerStyle={[styles.listContainer, contentContainerStyle]}
      ListFooterComponent={renderFooter}
      onEndReached={loadMoreCards}
      onEndReachedThreshold={0.3}
      initialNumToRender={itemsPerPage}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      windowSize={5}
      removeClippedSubviews={true}
      maxToRenderPerBatch={itemsPerPage}
      updateCellsBatchingPeriod={50}
    />
  );
};

export default Cards;
