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
  Alert,
  Button, // Import Button for showing DateTimePicker
} from "react-native";
import * as Font from "expo-font";
import { FontAwesome, Feather } from "react-native-vector-icons"; // Importing icons
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker
import { Picker } from "@react-native-picker/picker"; // Import Picker for gender selection

const SignUpScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Toggle for confirm password visibility
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false); // Toggle DatePicker visibility
  const [gender, setGender] = useState(""); // State for gender selection

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

  // Function to store user data (email and password) in AsyncStorage
  const storeUserData = async (email, password, dob, gender) => {
    try {
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
      await AsyncStorage.setItem("userDOB", dob.toISOString()); // Storing DOB as ISO string
      await AsyncStorage.setItem("userGender", gender);
      console.log("User data stored successfully.");
    } catch (error) {
      console.log("Error storing user data: ", error);
    }
  };

  // Validation and storing data when Sign Up is clicked
  const handleSignUp = () => {
    // Check if all fields are filled
    if (!email || !password || !confirmPassword || !gender) {
      Alert.alert("Error", "All fields must be filled.");
      return;
    }

    // Check if password is at least 5 characters long
    if (password.length < 5) {
      Alert.alert("Error", "Password must be at least 5 characters long.");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Password and Confirm Password do not match.");
      return;
    }

    // Store user data if validation passes
    storeUserData(email, password, dateOfBirth, gender); // Corrected to use dateOfBirth
    navigation.navigate("Login"); // Navigate to Login screen after successful sign-up
  };

  // Show ActivityIndicator until fonts are loaded
  if (!fontsLoaded) {
    return <ActivityIndicator  color="#00CD9E" />;
  }
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the date picker after selecting a date
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-GB"); // Format date to DD/MM/YYYY
      setDateOfBirth(formattedDate);
    }
  };

  return (
    <ImageBackground
      source={require("../images/img5.png")} // Background image
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Title Section */}
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Create an account so you can explore all the existing jobs
          </Text>

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
              value={email}
              onChangeText={setEmail} // Handle email input
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
              secureTextEntry={!passwordVisible} // Toggle password visibility
              value={password}
              onChangeText={setPassword} // Handle password input
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Feather
                name={passwordVisible ? "eye" : "eye-off"} // Toggle icon based on state
                size={24}
                color="#00CD9E"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <FontAwesome
              name="lock"
              size={25}
              color="#00CD9E"
              style={styles.icon}
            />
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword} // Handle confirm password input
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <Feather
                name={confirmPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="#00CD9E"
              />
            </TouchableOpacity>
          </View>

          {/* DOB Picker */}
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <FontAwesome
                name="calendar"
                size={20}
                color="#00CD9E"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Date of Birth (DD/MM/YYYY)"
              value={dateOfBirth}
              onFocus={() => setShowDatePicker(true)} // Show date picker when the input is focused
              style={[styles.input, { color: "#000" }]} // Explicitly set the text color to black (or any color you prefer)
              editable={false} // Make the TextInput non-editable to ensure only date picker is used
            />
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={new Date()} // Default date value (can be modified)
              mode="date" // Date picker mode
              display="default" // Display style (can be "spinner", "calendar", "default")
              onChange={onChangeDate} // Callback function on date change
            />
          )}

          {/* Gender Picker */}
          <View style={styles.genderContainer}>
            <Picker
              selectedValue={gender}
              style={styles.picker}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp} // Call handleSignUp when button is pressed
          >
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>

          {/* Already have an account */}
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.haveAccountText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.clickHereText}>Sign in</Text>
            </TouchableOpacity>
          </View>

          {/* Social Media Login */}
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../images/google.png")} // Google logo
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../images/fb.png")} // Facebook logo
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../images/iphone.png")} // Apple logo
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// Styles for the SignUp Screen
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
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
    fontFamily: "Font2",
    color: "#000",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 35,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Font5",
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
    borderColor: "#00CD9E",
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: "Font2",
  },
  dobContainer: {
    marginVertical: 15,
  },
  dobText: {
    fontSize: 16,
    fontFamily: "Font1",
    color: "#000",
  },
  genderContainer: {
    width: "100%",
    marginBottom: 15,
  },
  genderText: {
    fontSize: 16,
    fontFamily: "Font1",
    color: "#000",
    marginBottom: 5,
  },
  picker: {
    width: "100%",
    backgroundColor: "#F3FFFC",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00CD9E",
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "#00CD9E",
    paddingVertical: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 15,
  },
  signUpText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Font2",
  },
  haveAccountText: {
    color: "black",
    marginBottom: 20,
    fontFamily: "Font5",
  },
  clickHereText: {
    color: "#00CD9E",
    fontFamily: "Font5",
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
    elevation: 9,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
});

export default SignUpScreen;
