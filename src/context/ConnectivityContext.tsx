import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import Logger from '../utils/logger';
import { strings } from '../constants';

interface ConnectivityContextProps {
  isConnected: boolean | null;
  isDismissed: boolean;
  dismissBanner: () => void;
}

const ConnectivityContext = createContext<ConnectivityContextProps>({
  isConnected: true,
  isDismissed: false,
  dismissBanner: () => {},
});

interface ConnectivityProviderProps {
  children: ReactNode;
}

export const ConnectivityProvider: React.FC<ConnectivityProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const prevConnected = isConnected;
      setIsConnected(state.isConnected);

      if (prevConnected !== state.isConnected) {
        Logger.info(strings.logs.networkConnectivityChanged, {
          connected: state.isConnected,
          type: state.type,
          isInternetReachable: state.isInternetReachable,
        });
      }

      if (state.isConnected) {
        setIsDismissed(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  const dismissBanner = () => {
    setIsDismissed(true);
  };

  return (
    <ConnectivityContext.Provider
      value={{
        isConnected,
        isDismissed,
        dismissBanner,
      }}
    >
      {children}
    </ConnectivityContext.Provider>
  );
};

export const useConnectivity = () => useContext(ConnectivityContext);
