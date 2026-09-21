import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const MyProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("Hammas Rashid");
  const [about, setAbout] = useState("Your About info goes here");
  const [selectedTab, setSelectedTab] = useState("Posts");

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const toggleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      {!isEditing ? (
        <View style={styles.profileContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../assets/dp1.jpeg")
            }
            style={styles.profileImage}
          />
          <Text style={styles.name}>{name}</Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.button} onPress={toggleEditProfile}>
              <Ionicons name="pencil" size={18} color="#000" />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-social" size={18} color="#fff" />
              <Text style={styles.shareButtonText}>Share Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <View style={styles.tabs}>
              <TouchableOpacity onPress={() => setSelectedTab("Posts")}>
                <Text
                  style={[
                    styles.tab,
                    selectedTab === "Posts" && styles.activeTab,
                  ]}
                >
                  Posts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTab("Photos")}>
                <Text
                  style={[
                    styles.tab,
                    selectedTab === "Photos" && styles.activeTab,
                  ]}
                >
                  Photos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTab("Videos")}>
                <Text
                  style={[
                    styles.tab,
                    selectedTab === "Videos" && styles.activeTab,
                  ]}
                >
                  Videos
                </Text>
              </TouchableOpacity>
            </View>

            {selectedTab === "Posts" && (
              <Text style={styles.content}>Your posts will appear here.</Text>
            )}
            {selectedTab === "Photos" && (
              <Text style={styles.content}>Your photos will appear here.</Text>
            )}
            {selectedTab === "Videos" && (
              <Text style={styles.content}>Your videos will appear here.</Text>
            )}

            <Text style={styles.details}>Details</Text>
            <Text style={styles.about}>{about}</Text>

            <TouchableOpacity style={styles.editDetailsButton}>
              <Text style={styles.editDetailsText}>Edit public details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.editProfileContainer}>
          <View style={styles.editHeader}>
            <TouchableOpacity
              onPress={toggleEditProfile}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../assets/dp1.jpeg")
              }
              style={styles.profileImage}
            />
            <Text style={styles.editImageText}>Edit Profile Picture</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
          />
          <TextInput
            style={styles.input}
            value={about}
            onChangeText={setAbout}
            placeholder="Enter About Info"
          />

          <TouchableOpacity
            style={styles.editDetailsButton}
            onPress={toggleEditProfile}
          >
            <Text style={styles.editDetailsText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    marginTop: 35,
  },
  profileContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#626262",
    marginVertical: 20,
  },
  actionButtons: {
    flexDirection: "row",
    marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ddd",
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 5,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00d084",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  shareButtonText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 5,
  },
  center: {
    width: "100%",
    backgroundColor: "#ededed",
    padding: 20,
    marginVertical: 20,
  },
  tabs: {
    flexDirection: "row",
    marginVertical: 20,
    width: "100%",
  },
  tab: {
    marginHorizontal: 10,
    fontSize: 18,
    color: "#666",
    padding: 10,
  },
  activeTab: {
    color: "#0dcfa2",
    fontWeight: "bold",
    backgroundColor: "#cef0e8",
    borderRadius: 5,
  },
  content: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "500",
  },
  details: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#626262",
  },
  about: {
    fontSize: 16,
    color: "#666",
    marginVertical: 10,
  },
  editDetailsButton: {
    backgroundColor: "#cef0e8",
    padding: 15,
    borderRadius: 5,
    marginVertical: 20,
  },
  editDetailsText: {
    color: "#1ad1a7",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
  },
  editProfileContainer: {
    alignItems: "center",
    padding: 20,
  },
  editHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
  },
  cancelButtonText: {
    fontSize: 18,
    color: "#ff5c5c",
  },
  editImageText: {
    color: "#1ad1a7",
    marginTop: 5,
    fontSize: 16,
    fontWeight: 600,
  },
  input: {
    width: "100%",
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#ececec",
    fontSize: 16,
  },
});

export default MyProfileScreen;
