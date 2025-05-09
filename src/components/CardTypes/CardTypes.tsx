import React, { memo } from 'react';
import { FlatList, Text, View } from 'react-native';
import TypeItem from './TypeItem';
import styles from './CardTypes.styles';
import { SectionError, SectionLoading } from '..';
import { strings } from '../../constants/strings';

interface CardTypesProps {
  cardTypes: string[];
  onTypePress: (type: string) => void;
  title?: string;
  loading?: boolean;
  error?: Error | null;
}

const CardTypes: React.FC<CardTypesProps> = ({
  cardTypes,
  onTypePress,
  title = strings.cardTypes.title,
  loading = false,
  error = null,
}) => {
  if (!cardTypes && !loading && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.contentContainer}>
        {error ? (
          <SectionError error={error} />
        ) : loading && (!cardTypes || cardTypes.length === 0) ? (
          <SectionLoading message={strings.common.loadingCardTypes} />
        ) : (
          <FlatList
            data={cardTypes}
            renderItem={({ item }) => <TypeItem type={item} onPress={() => onTypePress(item)} />}
            keyExtractor={(item, index) => `${item}_${index}`}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <Text style={styles.emptyText}>{strings.cardTypes.noTypesFound}</Text>
            }
          />
        )}
      </View>
    </View>
  );
};

export default memo(CardTypes);
