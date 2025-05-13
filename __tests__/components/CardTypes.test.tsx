import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { CardTypes } from '../../src/components';
import { strings } from '../../src/constants/strings';
import { mockCardTypes } from '../mocks/mockData';

interface SectionLoadingProps {
  message: string;
}

interface SectionErrorProps {
  error: Error;
}

interface TypeItemProps {
  type: string;
  onPress: () => void;
}

jest.mock('../../src/components/StateViews', () => ({
  SectionLoading: (props: SectionLoadingProps) => {
    const MockText = require('react-native').Text;
    return <MockText testID="loading">{props.message}</MockText>;
  },
  SectionError: (props: SectionErrorProps) => {
    const MockText = require('react-native').Text;
    return <MockText testID="error">{props.error.message}</MockText>;
  },
}));

jest.mock(
  '../../src/components/CardTypes/TypeItem',
  () =>
    function TypeItem(props: TypeItemProps) {
      const { TouchableOpacity, Text } = require('react-native');
      return (
        <TouchableOpacity testID={`type-${props.type}`} onPress={props.onPress}>
          <Text>{props.type}</Text>
        </TouchableOpacity>
      );
    },
);

describe('CardTypes', () => {
  it('renders null when no cardTypes and no loading/error states', () => {
    const { toJSON } = render(
      <CardTypes
        cardTypes={undefined as any}
        onTypePress={jest.fn()}
        loading={false}
        error={null}
      />,
    );

    expect(toJSON()).toBeNull();
  });

  it('shows loading when loading is true and no data', () => {
    const { getByTestId } = render(
      <CardTypes cardTypes={[]} onTypePress={jest.fn()} loading={true} />,
    );

    expect(getByTestId('loading')).toBeTruthy();
  });

  it('shows error message when error exists', () => {
    const error = new Error('Failed to fetch');
    const { getByTestId } = render(
      <CardTypes cardTypes={[]} onTypePress={jest.fn()} error={error} />,
    );

    expect(getByTestId('error')).toBeTruthy();
  });

  it('renders types and handles press', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <CardTypes cardTypes={mockCardTypes} onTypePress={onPressMock} />,
    );

    const firstTypeButton = getByTestId('type-Spell');
    fireEvent.press(firstTypeButton);

    expect(onPressMock).toHaveBeenCalledWith('Spell');
  });

  it('shows empty component when cardTypes is empty array', () => {
    const { getByText } = render(
      <CardTypes cardTypes={[]} onTypePress={jest.fn()} loading={false} error={null} />,
    );

    expect(getByText(strings.cardTypes.noTypesFound)).toBeTruthy();
  });
});
