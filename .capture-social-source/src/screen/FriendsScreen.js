import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Dp1 from "../../assets/dp1.jpeg";

const friendRequests = [
  {
    id: "1",
    name: "Hammas Rashid",
    profileImage: Dp1,
    status: "Pending",
  },
  {
    id: "2",
    name: "Hamza Ali",
    profileImage: Dp1,
    status: "Pending",
  },
  {
    id: "3",
    name: "Jawad Khan",
    profileImage: Dp1,
    status: "Pending",
  },
];

const FriendRequestItem = ({
  id,
  name,
  profileImage,
  status,
  updateStatus,
}) => (
  <View style={styles.friendRequestContainer}>
    <Image source={profileImage} style={styles.profileImage} />
    <View style={styles.detailsContainer}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.buttonContainer}>
        {status === "Pending" ? (
          <>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => updateStatus(id, "Accepted")}
            >
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.declineButton}
              onPress={() => updateStatus(id, "Declined")}
            >
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        )}
      </View>
    </View>
  </View>
);

const FriendsScreen = () => {
  const [requests, setRequests] = useState(friendRequests);

  const updateStatus = (id, status) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friend Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendRequestItem
            id={item.id}
            name={item.name}
            profileImage={item.profileImage}
            status={item.status}
            updateStatus={updateStatus}
          />
        )}
        style={{ padding: 4 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 35,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 16,
  },
  friendRequestContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 6,
  },
  acceptButton: {
    backgroundColor: "#00CD9E",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 8,
  },
  acceptText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  declineButton: {
    backgroundColor: "#E4E6EB",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  declineText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  statusContainer: {
    backgroundColor: "grey",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 5,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default FriendsScreen;
