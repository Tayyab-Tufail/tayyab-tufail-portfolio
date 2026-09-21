import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { PostsContext } from "../utils/PostsContext";
import Dp1 from "../../assets/dp1.jpeg";
import { Ionicons } from "@expo/vector-icons"; // Importing icons

const PostCreationScreen = ({ navigation }) => {
  const { addPost } = useContext(PostsContext);
  const [postText, setPostText] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePostSubmit = () => {
    if (postText || imageUri) {
      addPost({
        caption: postText,
        postImage: imageUri,
        profilePic: Dp1,
        userName: "Hammas",
        timeAgo: "Just now",
        reactions: 0,
        reactionType: null,
        comments: [],
      });
      setPostText("");
      setImageUri(null);
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create post</Text>
        <TouchableOpacity
          disabled={!postText && !imageUri}
          onPress={handlePostSubmit}
        >
          <Text style={[styles.postButton, { color: "#fff" }]}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image source={Dp1} style={styles.profilePic} />
        <View>
          <Text style={styles.userName}>Hammas Rashid</Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        placeholderTextColor="#888"
        value={postText}
        onChangeText={setPostText}
      />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.selectedImage} />
      )}

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={handleImagePicker}
        >
          <Ionicons name="image-outline" size={24} color="white" />
          <Text style={styles.imagePickerText}>Photo/video</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#00CD9E",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  postButton: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    color: "#000",
    fontSize: 16,
    padding: 10,
    borderBottomColor: "#00CD9E",
    borderBottomWidth: 1,
    marginHorizontal: 15,
    marginTop: 10,
  },
  selectedImage: {
    width: "100%",
    height: 200,
    marginVertical: 10,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.35,
    elevation: 5,
  },

  imagePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#00CD9E",
    borderRadius: 20,
  },
  imagePickerText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 500,
  },
});

export default PostCreationScreen;
