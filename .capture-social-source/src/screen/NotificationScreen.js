import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const initialNotifications = [
  {
    id: "1",
    message: "Alice liked your post",
    timestamp: "2 minutes ago",
    icon: "thumbs-up",
    read: false,
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    message: "Bob commented on your photo",
    timestamp: "10 minutes ago",
    icon: "comment",
    read: true,
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: "3",
    message: "Carolyn sent you a friend request",
    timestamp: "1 hour ago",
    icon: "user-plus",
    read: false,
    imageUrl: "https://via.placeholder.com/50",
  },
  // Add more sample notifications as needed
];

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const toggleFilter = () => setShowUnreadOnly((prev) => !prev);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  const handleNotificationClick = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  const filteredNotifications = showUnreadOnly
    ? notifications.filter((notification) => !notification.read)
    : notifications;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleFilter} style={styles.filterButton}>
          <Text style={styles.buttonText}>
            {showUnreadOnly ? "Show All" : "Show Unread"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
          <Text style={styles.buttonText}>Mark All as Read</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotificationClick(item.id)}>
            <NotificationItem
              icon={item.icon}
              message={item.message}
              timestamp={item.timestamp}
              imageUrl={item.imageUrl}
              read={item.read}
            />
          </TouchableOpacity>
        )}
        style={{ padding: 4 }}
      />
    </View>
  );
};

const NotificationItem = ({ icon, message, timestamp, imageUrl, read }) => (
  <View
    style={[
      styles.notificationContainer,
      {
        backgroundColor: read ? "#fff" : "#e0e0e0",
        shadowOpacity: read && 0.1,
      },
    ]}
  >
    <Image source={{ uri: imageUrl }} style={styles.image} />
    <View style={styles.detailsContainer}>
      <Text style={[styles.message, { fontWeight: read ? 600 : 700 }]}>
        {message}
      </Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
    <View style={styles.iconContainer}>
      <FontAwesome name={icon} size={24} color="#00CD9E" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
    paddingTop: 35,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#00CD9E",
    borderRadius: 20,
  },
  markAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#00CD9E",
    borderRadius: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  notificationContainer: {
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  timestamp: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  iconContainer: {
    marginLeft: 12,
  },
});

export default NotificationScreen;
