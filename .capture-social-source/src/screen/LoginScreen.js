import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert, // Import Alert for showing error messages
} from "react-native";
import * as Font from "expo-font";
import { FontAwesome, Feather } from "react-native-vector-icons"; // Importing icons
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const LoginScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input

  // Font loading function
  const loadFonts = async () => {
    await Font.loadAsync({
      Font1: require("../../assets/fonts/Montserrat-Regular.ttf"),
      Font2: require("../../assets/fonts/Montserrat-Bold.ttf"),
      Font3: require("../../assets/fonts/Montserrat-Light.ttf"),
      Font4: require("../../assets/fonts/Montserrat-Medium.ttf"),
      Font5: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    });
    setFontsLoaded(true);
  };

  // Load fonts using useEffect
  useEffect(() => {
    loadFonts();
  }, []);

  // Function to validate user credentials
  const handleLogin = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedPassword = await AsyncStorage.getItem("userPassword");

      // Check if the entered email and password match the stored data
      if (email === storedEmail && password === storedPassword) {
        Alert.alert("Success", "Login successful!");
        // Navigate to the next screen (e.g., home/dashboard)
        navigation.navigate("TabNavigator"); // Replace "Home" with your actual home screen
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    } catch (error) {
      console.log("Error retrieving user data: ", error);
      Alert.alert("Error", "There was a problem logging in.");
    }
  };

  // Show ActivityIndicator until fonts are loaded
  if (!fontsLoaded) {
    return <ActivityIndicator  color="#0000ff" />;
  }

  return (
    <ImageBackground
      source={require("../images/img5.png")} // Your background image path
      style={styles.background}
      resizeMode="cover" // Ensure the image covers the whole screen
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Title Section */}
          <Text style={styles.title}>Login here</Text>
          <Text style={styles.subtitle}>Welcome back you've been missed!</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <FontAwesome
              name="envelope"
              size={20}
              color="#00CD9E"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              value={email} // Bind to email state
              onChangeText={setEmail} // Update email state on change
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <FontAwesome
              name="lock"
              size={25}
              color="#00CD9E"
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={!passwordVisible} // Toggle between secure and normal text
              value={password} // Bind to password state
              onChangeText={setPassword} // Update password state on change
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
            >
              <Feather
                name={passwordVisible ? "eye" : "eye-off"} // Change icon based on visibility state
                size={24}
                color="#00CD9E"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleLogin} // Call handleLogin on sign in button press
          >
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>

          {/* Create Account */}
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.createAccountText}>Create new account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.clickHereText}>Click here</Text>
            </TouchableOpacity>
          </View>

          {/* Social Media Login */}
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../images/google.png")} // Replace with your Google logo image
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../images/fb.png")} // Replace with your Facebook logo image
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../images/iphone.png")} // Replace with your Apple logo image
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// Styles for the Login Screen
const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the background image covers the whole screen
  },
  keyboardAvoidingView: {
    flex: 1, // Allows it to stretch and adjust content accordingly
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "absolute",
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontFamily: "Font2", // Use the loaded font Montserrat-Bold
    color: "#000",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 35,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Font5", // Use the loaded font Montserrat-Light
    color: "black",
    marginBottom: 30,
    textAlign: "center",
    fontSize: 20,
    width: 300,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F3FFFC",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00CD9E", // Same as your accent color
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: "Font2",
  },
  forgotPasswordText: {
    color: "black",
    alignSelf: "flex-end",
    marginBottom: 30,
    fontFamily: "Font1",
    left: 70,
    fontSize: 16,
  },
  signInButton: {
    width: "100%",
    backgroundColor: "#00CD9E", // Button color
    paddingVertical: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 15, // For Android shadow
  },
  signInText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Font2", // Use the loaded font Montserrat-SemiBold
  },
  createAccountText: {
    color: "black",
    marginBottom: 20,
    fontFamily: "Font5",
  },
  clickHereText: {
    color: "#00CD9E", // Highlight color for the clickable text
    fontFamily: "Font5", // Font you're using for bold text
    fontSize: 16,
    top: -2,
  },
  orText: {
    color: "black",
    marginBottom: 15,
    fontFamily: "Font5",
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButton: {
    width: 55,
    height: 55,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 9, // For Android shadow
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
});

export default LoginScreen;
