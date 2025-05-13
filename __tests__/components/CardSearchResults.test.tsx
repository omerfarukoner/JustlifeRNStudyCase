import { render } from '@testing-library/react-native';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { CardSearchResults } from '../../src/components';
import { Card } from '../../src/types';
import { mockSearchResults } from '../mocks/mockData';

interface SectionErrorProps {
  error: Error;
  containerStyle?: StyleProp<ViewStyle>;
}

interface CardsProps {
  cards: Card[];
}

jest.mock('../../src/components/StateViews', () => ({
  SectionError: ({ error, containerStyle }: SectionErrorProps) => {
    const { View, Text } = require('react-native');
    return (
      <View style={containerStyle} testID="section-error">
        <Text>{error?.message}</Text>
      </View>
    );
  },
  SectionLoading: jest.fn(),
  SectionEmpty: jest.fn(),
}));

jest.mock(
  '../../src/components/Cards',
  () =>
    function MockCards({ cards }: CardsProps) {
      const { View, Text } = require('react-native');
      return (
        <View testID="cards-container">
          {cards.map((card: Card) => (
            <Text key={card.cardId} testID={`card-item-${card.cardId}`}>
              {card.name}
            </Text>
          ))}
        </View>
      );
    },
);

describe('CardSearchResults', () => {
  it('renders nothing when search term is too short', () => {
    const { toJSON } = render(
      <CardSearchResults
        results={null}
        isSearching={false}
        searchTerm="a"
        onCardPress={jest.fn()}
        hasSearched={false}
      />,
    );
    expect(toJSON()).toBeNull();
  });

  it('shows loading indicator when isSearching is true', () => {
    const { getByText } = render(
      <CardSearchResults
        results={null}
        isSearching={true}
        searchTerm="mage"
        onCardPress={jest.fn()}
        hasSearched={true}
      />,
    );

    expect(getByText(/Searching/i)).toBeTruthy();
  });

  it('shows cards if results exist', () => {
    const { getByTestId } = render(
      <CardSearchResults
        results={mockSearchResults}
        isSearching={false}
        searchTerm="spell"
        onCardPress={jest.fn()}
        hasSearched={true}
      />,
    );

    expect(getByTestId('cards-container')).toBeTruthy();
  });

  it('shows empty message if results is empty', () => {
    const { getByText } = render(
      <CardSearchResults
        results={[]}
        isSearching={false}
        searchTerm="abc"
        onCardPress={jest.fn()}
        hasSearched={true}
      />,
    );

    expect(getByText(/No cards found/i)).toBeTruthy();
  });

  it('shows error if error exists', () => {
    const error = new Error('Something went wrong');
    const { getByTestId } = render(
      <CardSearchResults
        results={null}
        isSearching={false}
        searchTerm="abc"
        onCardPress={jest.fn()}
        error={error}
        hasSearched={true}
      />,
    );

    expect(getByTestId('section-error')).toBeTruthy();
  });
});
