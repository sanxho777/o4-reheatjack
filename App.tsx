import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CourseMapScreen from './src/screens/CourseMapScreen';
import ScorecardScreen from './src/screens/ScorecardScreen';
import HistoryScreen from './src/screens/HistoryScreen';

export type RootStackParamList = {
  CourseMap: undefined;
  Scorecard: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CourseMap">
        <Stack.Screen name="CourseMap" component={CourseMapScreen} options={{ title: 'Map' }} />
        <Stack.Screen name="Scorecard" component={ScorecardScreen} options={{ title: 'Scorecard' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
