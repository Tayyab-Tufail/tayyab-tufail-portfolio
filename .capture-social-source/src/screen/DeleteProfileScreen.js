import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

const DeleteProfileScreen = ({ navigation }) => {
  const handleDeleteProfile = () => {
    // Add deletion logic here, e.g., API call
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete your profile? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
          // Navigate back to a safe screen after deletion
          navigation.navigate("Home");
          Alert.alert("Profile Deleted", "Your profile has been deleted.");
        }},
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Profile</Text>
      <Text style={styles.warningText}>
        Warning: Deleting your profile is permanent and cannot be undone.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleDeleteProfile}>
        <Text style={styles.buttonText}>Delete Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  warningText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DeleteProfileScreen;
