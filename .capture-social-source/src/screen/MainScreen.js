import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";

const MainScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.logo}>CyberShield</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => alert("Add New Content")}>
            <Text style={styles.icon}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Search")}>
            <Text style={styles.icon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
            <Text style={styles.icon}>💬</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar Section */}
      <View style={styles.searchSection}>
        <Image source={require("../images/img1.png")} style={styles.profileImage} />
        <TextInput
          style={styles.searchBar}
          placeholder="What's on your mind?"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={() => alert("Open Image Picker")}>
          <Image source={require("../images/img2.png")} style={styles.imageIcon} />
        </TouchableOpacity>
      </View>

      {/* Other content can go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  imageIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
});

export default MainScreen;
