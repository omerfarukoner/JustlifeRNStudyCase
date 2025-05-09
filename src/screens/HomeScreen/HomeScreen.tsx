import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Screen, SearchBar, CardTypes, CardSearchResults } from '../../components';
import { RootStackParamList } from '../../types/navigation.types';
import { Card } from '../../types/card.types';
import { useAllCards } from '../../hooks';
import { useDebounce } from '../../hooks/useDebounce';
import { strings } from '../../constants';
import styles from './HomeScreen.styles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedTerm = useDebounce(searchTerm, 300);

  const { allCards, uniqueTypes, loading, error } = useAllCards();

  const isValidSearch = debouncedTerm.length >= 2;

  const searchResults = useMemo(() => {
    if (!isValidSearch) return [];
    return allCards.filter(card => card.name.toLowerCase().includes(debouncedTerm.toLowerCase()));
  }, [allCards, debouncedTerm, isValidSearch]);

  const handleTypePress = (type: string) => {
    navigation.navigate('CardsByType', { type });
  };

  return (
    <Screen style={styles.container}>
      {!loading && (
        <SearchBar
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder={strings.home.searchCardsPlaceholder}
        />
      )}

      <View style={styles.searchResultsContainer}>
        {isValidSearch ? (
          <CardSearchResults
            results={searchResults}
            isSearching={loading}
            searchTerm={debouncedTerm}
            error={error}
            hasSearched={true}
          />
        ) : (
          <CardTypes
            cardTypes={uniqueTypes}
            onTypePress={handleTypePress}
            loading={loading}
            error={error}
          />
        )}
      </View>
    </Screen>
  );
};

export default HomeScreen;
