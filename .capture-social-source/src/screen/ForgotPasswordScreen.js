import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Refs for each OTP input
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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

  useEffect(() => {
    loadFonts();
  }, []);

  const handleSend = () => {
    if (email.trim() === "") {
      Alert.alert("Alert", "Enter Email Address");
    } else {
      setOtpSent(true);
      // Your logic to send OTP to the email
    }
  };

  const handleVerify = () => {
    if (otp.some((digit) => digit.trim() === "")) {
      Alert.alert("Alert", "Enter complete OTP");
    } else {
      // Your verification logic here
      const fullOtp = otp.join("");
      console.log("Full OTP:", fullOtp);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value) || value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus the next input
    if (value !== "" && index < 3) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator  color="#00CD9E" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.innerContainer}>
          <Image source={require("../images/img3.png")} style={styles.logo} />
          <Text style={styles.instructions}>
            Fill your email address and we will send you an OTP to change your
            password
          </Text>
          <View style={styles.inputContainer}>
            <Icon
              name="envelope"
              size={25}
              style={styles.inputIcon}
              color="#00CD9E"
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          {otpSent && (
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={otpInputRefs[index]}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              ))}
            </View>
          )}
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={otpSent ? handleVerify : handleSend}
          >
            <Text style={styles.verifyButtonText}>
              {otpSent ? "Verify" : "Send"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderTopColor: "black",
    borderTopWidth: 1,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  instructions: {
    textAlign: "center",
    paddingHorizontal: 30,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "normal",
    fontFamily: "Font1",
    top: -15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3FFFC",
    borderWidth: 1,
    borderColor: "#00CD9E", // Updated color
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 15,
    marginBottom: 25,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Font4", // Use custom font
    color: "black", // Updated color
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#00CD9E", // Updated color
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    width: 50,
    height: 50,
    fontFamily: "Font3",
    color: "black", // Updated color
  },
  verifyButton: {
    backgroundColor: "#00CD9E", // Updated color
    paddingVertical: 13,
    paddingHorizontal: 140,
    borderRadius: 25,
    marginTop: 10,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Font2", // Use custom font
  },
});

export default ForgotPasswordScreen;
