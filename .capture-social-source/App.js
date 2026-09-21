import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native"; // Import Image from React Native
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/screen/SplashScreen";
import WelcomeScreen from "./src/screen/WelcomeScreen";
import LoginScreen from "./src/screen/LoginScreen";
import RegisterScreen from "./src/screen/RegisterScreen";
import ForgotPasswordScreen from "./src/screen/ForgotPasswordScreen";
import HomeScreen from "./src/screen/HomeScreen";
import ChatScreen from "./src/screen/ChatScreen";
import NotificationScreen from "./src/screen/NotificationScreen";
import FriendsScreen from "./src/screen/FriendsScreen";
import AddScreen from "./src/screen/AddScreen";
import ProfileScreen from "./src/screen/ProfileScreen";
import ChangePasswordScreen from "./src/screen/ChangePasswordScreen";
import DeleteProfileScreen from "./src/screen/DeleteProfileScreen";
import MyProfileScreen from "./src/screen/MyProfileScreen";
import ChatDetailScreen from "./src/screen/ChatDetailScreen";
import TabNavigator from "./src/navigation/TabNavigator";
import { PostsProvider } from "./src/utils/PostsContext";
const Stack = createStackNavigator();

const App = () => {
  return (
    <PostsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerShown: true, 
              headerTitle: () => (
                <Image
                  source={require("./src/images/img2.png")} 
                  style={{ width: 60, height: 60 }} 
                />
              ),
              headerTitleAlign: "center", 
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: true, title: null }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: true, title: null }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
              title: "Forgot Password",
              headerBackTitleVisible: false,
              headerShown: true,
            }}
          />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Notifications" component={NotificationScreen} />
          <Stack.Screen name="Friends" component={FriendsScreen} />
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
          />
          <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />

          <Stack.Screen
            name="DeleteProfileScreen"
            component={DeleteProfileScreen}
          />
          <Stack.Screen
            name="ChatDetailScreen"
            component={ChatDetailScreen}
            options={({ route }) => ({ title: route.params.name })}
          />
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PostsProvider>
  );
};

export default App;
