import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const ChatScreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([
    { id: 1, name: "Tayyab Tufail" },
    { id: 2, name: "Hamza Ali" },
    { id: 3, name: "Muhummad Saad" },
    { id: 4, name: "Kinza Khatoon" },
    { id: 5, name: "Mahnoor Aftab" },
  ]);
  const defaultAvatar = require("../images/img2.png");

  const loadFonts = async () => {
    await Font.loadAsync({
      MontserratRegular: require("../../assets/fonts/Montserrat-Regular.ttf"),
      MontserratBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
      MontserratLight: require("../../assets/fonts/Montserrat-Light.ttf"),
      MontserratMedium: require("../../assets/fonts/Montserrat-Medium.ttf"),
      MontserratSemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = initialUsers.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(initialUsers);
    }
  };

  if (!fontsLoaded) {
    return <View style={styles.container}><Text>Loading Fonts...</Text></View>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <Icon
              name="search"
              size={20}
              color="#000"
              style={styles.searchIcon}
            />
          </View>
          {filteredUsers.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.userBox}
              onPress={() => navigation.navigate('ChatDetailScreen', { name: user.name })}
            >
              <Image
                source={defaultAvatar}
                style={styles.userAvatar}
              />
              <Text style={styles.userName}>{user.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopColor: "#ccc",
    borderTopWidth: 1.5,
  },
  inner: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
  },
  searchIcon: {
    marginLeft: 10,
  },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    flex: 1,
    fontFamily: 'MontserratSemiBold',
    fontWeight: '600',
    left: -10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "#000",
    borderWidth: 1,
    marginRight: 10,

  },
});

export default ChatScreen;
