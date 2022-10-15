import React from "react";
import FavoritesScreen from "./../screens/favorites.screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const FavoritesStack = createNativeStackNavigator();

export const FavoritesStackScreen = () => {
  return (
    <FavoritesStack.Navigator
      screenOptions={{
        headerShown: false,
        headerMode: "none",
      }}
    >
      <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} />
    </FavoritesStack.Navigator>
  );
};
