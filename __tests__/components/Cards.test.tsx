import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Cards } from '../../src/components';
import { Card } from '../../src/types';
import { largeCardSet, mockCards } from '../mocks/mockData';

jest.mock('../../src/components/StateViews', () => ({
  SectionError: ({ error }: { error: Error }) => {
    const { View, Text } = require('react-native');
    return (
      <View testID="section-error">
        <Text testID="error-message">{error?.message}</Text>
      </View>
    );
  },
  SectionLoading: ({ message }: { message: string }) => {
    const { View, Text } = require('react-native');
    return (
      <View testID="section-loading">
        <Text>{message}</Text>
      </View>
    );
  },
  SectionEmpty: ({ message }: { message: string }) => {
    const { View, Text } = require('react-native');
    return (
      <View testID="section-empty">
        <Text>{message}</Text>
      </View>
    );
  },
}));

jest.mock(
  '../../src/components/CardItem',
  () =>
    function CardItem({ card, onPress }: { card: Card; onPress: () => void }) {
      const { TouchableOpacity, Text } = require('react-native');
      return (
        <TouchableOpacity testID={`card-item-${card.cardId}`} onPress={onPress}>
          <Text>{card.name}</Text>
        </TouchableOpacity>
      );
    },
);

describe('Cards component', () => {
  it('renders cards correctly', () => {
    const onCardPress = jest.fn();
    const { getByTestId } = render(<Cards cards={mockCards} onCardPress={onCardPress} />);
    expect(getByTestId('card-item-1')).toBeTruthy();
    expect(getByTestId('card-item-2')).toBeTruthy();
  });

  it('shows loading state when loading is true', () => {
    const { getByTestId } = render(
      <Cards cards={mockCards} onCardPress={jest.fn()} loading={true} />,
    );
    expect(getByTestId('section-loading')).toBeTruthy();
  });

  it('shows error state when error is provided', () => {
    const error = new Error('Test error');
    const { getByTestId } = render(
      <Cards cards={mockCards} onCardPress={jest.fn()} error={error} />,
    );
    expect(getByTestId('section-error')).toBeTruthy();
    expect(getByTestId('error-message').props.children).toBe('Test error');
  });

  it('shows empty state when card list is empty', () => {
    const { getByTestId } = render(<Cards cards={[]} onCardPress={jest.fn()} />);
    expect(getByTestId('section-empty')).toBeTruthy();
  });

  it('calls onCardPress with the correct card when clicked', () => {
    const onCardPress = jest.fn();
    const { getByTestId } = render(<Cards cards={mockCards} onCardPress={onCardPress} />);
    fireEvent.press(getByTestId('card-item-1'));
    expect(onCardPress).toHaveBeenCalledWith(mockCards[0]);
  });

  it('renders only itemsPerPage number of cards initially', () => {
    const customItemsPerPage = 2;
    const { getByTestId, queryByTestId } = render(
      <Cards cards={mockCards} onCardPress={jest.fn()} itemsPerPage={customItemsPerPage} />,
    );
    expect(getByTestId('card-item-1')).toBeTruthy();
    expect(getByTestId('card-item-2')).toBeTruthy();
    expect(queryByTestId('card-item-3')).toBeNull();
  });

  it('displays custom empty message when provided', () => {
    const customMessage = 'No cards available';
    const { getByText } = render(
      <Cards cards={[]} onCardPress={jest.fn()} emptyMessage={customMessage} />,
    );
    expect(getByText(customMessage)).toBeTruthy();
  });

  it('loads more cards when end of list is reached', () => {
    const itemsPerPage = 5;
    const { getAllByTestId, getByTestId } = render(
      <Cards cards={largeCardSet} onCardPress={jest.fn()} itemsPerPage={itemsPerPage} />,
    );

    // First 5 cards should be visible
    expect(getAllByTestId(/^card-item-/).length).toBe(itemsPerPage);

    // Simulate reaching the end of the list
    fireEvent(getByTestId('card-item-5'), 'onEndReached');

    // Next 5 cards should now be rendered
    expect(getAllByTestId(/^card-item-/).length).toBe(itemsPerPage * 2);
    expect(getByTestId('card-item-10')).toBeTruthy();
  });

  it('does not load more cards when loading is true', () => {
    const itemsPerPage = 5;
    const { getByTestId } = render(
      <Cards
        cards={largeCardSet}
        onCardPress={jest.fn()}
        itemsPerPage={itemsPerPage}
        loading={true}
      />,
    );

    expect(getByTestId('section-loading')).toBeTruthy();
  });

  it('does not load more cards if all cards are already rendered', () => {
    const itemsPerPage = 10;
    const exactCardSet = largeCardSet.slice(0, 10);

    const { getAllByTestId } = render(
      <Cards cards={exactCardSet} onCardPress={jest.fn()} itemsPerPage={itemsPerPage} />,
    );

    expect(getAllByTestId(/^card-item-/).length).toBe(itemsPerPage);

    fireEvent(getAllByTestId(/^card-item-/)[9], 'onEndReached');

    expect(getAllByTestId(/^card-item-/).length).toBe(itemsPerPage);
  });
});
