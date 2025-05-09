import React, { memo } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Card } from '../../types/card.types';
import { Cards, SectionError } from '..';
import { colors } from '../../theme';
import { strings } from '../../constants';
import styles from './CardSearchResults.styles';

interface CardSearchResultsProps {
  results: Card[] | null;
  isSearching: boolean;
  searchTerm: string;
  onCardPress?: (card: Card) => void;
  error?: Error | null;
  hasSearched: boolean;
}

const CardSearchResults: React.FC<CardSearchResultsProps> = ({
  results,
  isSearching,
  searchTerm,
  onCardPress,
  error,
  hasSearched,
}) => {
  const isValid = searchTerm.length >= 2;
  const noResults = hasSearched && (!results || (results?.length ?? 0) === 0);
  const hasResults = hasSearched && (results?.length ?? 0) > 0;

  if (!isValid) return null;

  if (error) {
    return <SectionError error={error} containerStyle={styles.centeredContainer} />;
  }

  if (isSearching) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={styles.loadingText}>{strings.search.searching}</Text>
      </View>
    );
  }

  if (noResults) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.noResultsText}>
          {strings.search.noCardsFound.replace('{{term}}', searchTerm)}
        </Text>
      </View>
    );
  }

  if (hasResults) {
    return <Cards cards={results || []} contentContainerStyle={styles.listContainer} />;
  }

  return null;
};

export default memo(CardSearchResults);
