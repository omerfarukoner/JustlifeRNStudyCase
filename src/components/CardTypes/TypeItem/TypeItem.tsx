import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './TypeItem.styles';

interface TypeItemProps {
  type: string;
  onPress: (type: string) => void;
}

const TypeItem: React.FC<TypeItemProps> = ({ type, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(type)} activeOpacity={0.7}>
      <Text style={styles.name}>{type}</Text>
    </TouchableOpacity>
  );
};

export default memo(TypeItem);
