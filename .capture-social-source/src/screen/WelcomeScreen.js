import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import * as Font from "expo-font";

// Font loading function
const loadFonts = async () => {
  await Font.loadAsync({
    Font1: require("../../assets/fonts/Montserrat-Regular.ttf"),
    Font2: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Font3: require("../../assets/fonts/Montserrat-Light.ttf"),
    Font4: require("../../assets/fonts/Montserrat-Medium.ttf"),
    Font5: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });
};

// Main WelcomeScreen component
const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load fonts using useEffect
  useEffect(() => {
    const fetchFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    fetchFonts();
  }, []);

  // Show ActivityIndicator until fonts are loaded
  if (!fontsLoaded) {
    return <ActivityIndicator color="#0000ff" />;
  }

  // Render WelcomeScreen once fonts are loaded
  return (
    <ImageBackground
      source={require("../images/img4.png")} // Your background image path
      style={styles.background}
      resizeMode="cover" // Adjust this if you want a different fit (contain, stretch, etc.)
    >
      <View style={styles.container}>
        {/* Top Illustration */}
        <Image
          source={require("../images/img3.png")}
          style={styles.illustration}
        />

        {/* Text Content */}
        <Text style={styles.title}>Get Rid of Cyber Bullying Today</Text>
        <Text style={styles.subtitle}>
          "Welcome. This platform ensures a safe environment by preventing the
          upload of abusive or inappropriate content."
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")} // Navigate to LoginScreen
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")} // Navigate to RegisterScreen
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

// Styles with custom fonts applied
const styles = StyleSheet.create({
  background: {
    flex: 1,
    // Make sure the background image covers the whole screen
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Optional: adds a white tint overlay to the background
    padding: 20,
    borderTopColor: "black",
    borderTopWidth: 1,
  },
  illustration: {
    width: 300, // Adjust according to your design
    height: 300,
    marginBottom: 50,
    marginTop: -50,
  },
  title: {
    fontSize: 24,
    fontFamily: "Font5", // Using the Montserrat-SemiBold font
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Font3", // Using the Montserrat-Light font
    color: "black",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#00CD9E",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginRight: 20,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#888",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginText: {
    color: "#FFFFFF",
    fontFamily: "Font2", // Using the Montserrat-SemiBold font
    textAlign: "center",
    fontSize: 20,
  },
  registerText: {
    color: "black",
    fontFamily: "Font2", // Using the Montserrat-Bold font
    textAlign: "center",
    fontSize: 20,
  },
});

export default WelcomeScreen;
