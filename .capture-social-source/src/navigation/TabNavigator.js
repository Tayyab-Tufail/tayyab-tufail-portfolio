// MainTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/MyProfileScreen";
import NotificationScreen from "../screen/NotificationScreen";
import FriendsScreen from "../screen/FriendsScreen";
import AddPostScreen from "../screen/AddPostScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const iconMap = {
  Home: "home-outline",
  Friends: "people-outline",
  AddPost: "add-circle-outline",
  Notification: "heart-outline",
  Profile: "person-outline",
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = iconMap[route.name];
          return (
            <Ionicons
              name={focused ? iconName.replace("-outline", "") : iconName}
              size={
                iconName === "home-outline" || iconName === "person-outline"
                  ? 26
                  : 30
              }
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#8ce8d3",
        tabBarStyle: {
          backgroundColor: "#00CD9E",
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="AddPost" component={AddPostScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
