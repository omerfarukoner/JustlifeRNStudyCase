import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useConnectivity } from '../../context/ConnectivityContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles, getContainerStyles } from './styles';
import { strings } from '../../constants';

const ConnectivityBanner: React.FC = () => {
  const { isConnected, isDismissed, dismissBanner } = useConnectivity();
  const insets = useSafeAreaInsets();

  if (isConnected || isDismissed) {
    return null;
  }

  return (
    <View style={getContainerStyles(insets.top)}>
      <View style={styles.banner}>
        <View style={styles.iconContainer}>
          <Text style={styles.warningIcon}>{strings.ui.warningIcon}</Text>
        </View>
        <Text style={styles.warningText}>{strings.connectivity.noConnection}</Text>
        <TouchableOpacity
          onPress={dismissBanner}
          hitSlop={styles.hitSlop}
          style={styles.closeButton}
        >
          <Text style={styles.closeIcon}>{strings.ui.closeButton}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConnectivityBanner;
