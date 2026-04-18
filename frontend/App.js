import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import DashboardScreen from './screens/DashboardScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0F172A',
    card: '#1E293B',
    text: '#F8FAFC',
    primary: '#6366F1',
    border: '#334155'
  }
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#6366F1',
          tabBarInactiveTintColor: '#64748B',
          tabBarStyle: {
            height: 64,
            paddingBottom: 8,
            paddingTop: 8,
            backgroundColor: '#1E293B',
            borderTopColor: '#334155'
          },
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Dashboard: 'dashboard',
              Transactions: 'receipt-long',
              Add: 'add-circle'
            };
            return <MaterialIcons name={icons[route.name]} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Transactions" component={TransactionsScreen} />
        <Tab.Screen name="Add" component={AddExpenseScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
