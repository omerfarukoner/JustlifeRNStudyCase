import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { RootStackParamList } from '../types/navigation.types';
import { HomeScreen, CardsByTypeScreen } from '../screens';
import { colors } from '../theme';
import { strings } from '../constants';
import type { StackScreenProps } from '@react-navigation/stack';

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.text.white,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: strings.navigation.homeTitle }}
        />
        <Stack.Screen
          name="CardsByType"
          component={CardsByTypeScreen}
          options={({ route }: StackScreenProps<RootStackParamList, 'CardsByType'>) => ({
            title: `${route.params.type}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
