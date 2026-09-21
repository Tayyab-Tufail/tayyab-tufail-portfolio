import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as Font from 'expo-font';

const ServiceDetailScreen = ({ route }) => {
  const { uri, price, experience, name, experties, rating, additionalImages, deliveredTime } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  if (!fontsLoaded) {
    return null; // or a loader component
  }

  const renderDetailItem = (label, value) => (
    <View style={styles.detailContainer}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.text}>{value}</Text>
    </View>
  );

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <TouchableOpacity onPress={() => handleImagePress(uri)}>
              <View style={styles.imageContainer}>
                <Image source={uri} style={styles.mainImage} />
              </View>
            </TouchableOpacity>
            {renderDetailItem("Name", name)}
            {renderDetailItem("Experience", experience)}
            {renderDetailItem("Rating", rating)}

            <Text style={styles.additionalImagesTitle}>Previous Work Photos</Text>
          </>
        }
        data={additionalImages}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <View style={styles.itemContainer}>
              <Image source={item} style={styles.itemImage} />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.container}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedImage && (
              <Image source={selectedImage} style={styles.modalImage} />
            )}
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopColor: '#ccc',
    borderTopWidth: 2,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mainImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  detailContainer: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 3,
    color: "#007AFF",
    fontFamily: 'MontserratSemiBold',
  },
  text: {
    fontSize: 17,
    marginVertical: 2,
    color: "#333",
    backgroundColor: "white",
    fontFamily: 'MontserratMedium',
  },
  additionalImagesTitle: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'MontserratSemiBold',
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5, // Space between images vertically
    backgroundColor: "white",
    borderRadius: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#ccc",
    width: "100%", // Ensure each item takes up roughly half the width with some spacing
    marginHorizontal: 5, // Space between images horizontally
    paddingHorizontal: 3,
    resizeMode: "contain",
  },
  itemImage: {
    width: 150,
    height: 120,
    borderRadius: 5,
    resizeMode: "contain",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: 'MontserratSemiBold',
  },
});

export default ServiceDetailScreen;
