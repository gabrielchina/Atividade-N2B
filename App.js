import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import FavoritosScreen from './screens/FavoritosScreen';
import { FavoritosProvider } from './context/FavoritosContext';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <FavoritosProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Jogadores') {
                iconName = 'person'; 
              } else if (route.name === 'Favoritos') {
                iconName = 'heart'; 
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Jogadores" component={HomeScreen} />
          <Tab.Screen name="Favoritos" component={FavoritosScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritosProvider>
  );
};

export default App;
