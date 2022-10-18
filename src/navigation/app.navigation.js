import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Like from "./../assets/icons/like";
import HomeFilled from "./../assets/icons/home-filled";
import { FavoritesStackScreen } from "./favorites.navigation";
import { HomeStackScreen } from "./home.navigation";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: HomeFilled,
  Favorites: Like,
};

const createScreenOptions = ({ route }) => {
  const Icon = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => <Icon />,
    tabBarShowLabel: false,
    headerShown: false,
    headerMode: "none",
  };
};

export const AppNavigator = ({ navigation, route }) => (
  <NavigationContainer>
    <Tab.Navigator initialRouteName="Home" screenOptions={createScreenOptions}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
