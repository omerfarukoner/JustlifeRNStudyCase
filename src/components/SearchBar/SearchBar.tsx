import React, { memo } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import styles from './SearchBar.styles';
import { colors } from '../../theme';
import { strings } from '../../constants';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = strings.search.defaultPlaceholder,
}) => {
  const handleClearText = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.text.secondary}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="sentences"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClearText} activeOpacity={0.7}>
          <Text style={styles.clearButtonText}>{strings.ui.closeButton}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(SearchBar);
