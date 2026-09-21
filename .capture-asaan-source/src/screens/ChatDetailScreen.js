import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../Components/AppContext";

const ChatDetailScreen = ({ route }) => {
  const { jobId, chatPartner, orderId } = route.params; // chatPartner is always passed
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const { userData, userType } = useContext(AppContext);
  const flatListRef = useRef(null); // Ref for FlatList

  const fetchChatHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await api.get("/chats/history", {
        headers: { Authorization: `Bearer ${token}` },
        params: { recipientId: chatPartner._id }, // Pass recipientId as a parameter
      });

      if (response.data && response.data.messages) {
        setMessages(response.data.messages); // Update state with messages
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    try {
      const token = await AsyncStorage.getItem("authToken");
      const messageData = {
        recipientId: chatPartner._id,
        content: inputText.trim(),
        userType,
        jobId: jobId || null,
        orderId: orderId || null,
      };

      const response = await api.post("/chats/send", messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
          userId: userData._id,
        },
      });

      if (response.data && response.data.data) {
        setMessages((prev) => [...prev, response.data.data]);
        setInputText(""); // Clear input

        // Scroll to bottom
        setTimeout(
          () => flatListRef.current?.scrollToEnd({ animated: true }),
          100
        );
      }
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  };

  const isMyMessage = (senderId) => senderId === userData._id;

  useEffect(() => {
    fetchChatHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <FlatList
            ref={flatListRef} // Attach ref
            data={messages}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageContainer,
                  isMyMessage(item.sender.id)
                    ? styles.myMessage
                    : styles.userMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    isMyMessage(item.sender.id)
                      ? styles.myMessageText
                      : styles.userMessageText,
                  ]}
                >
                  {item.content}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => item._id || index.toString()}
            style={styles.messageList}
            contentContainerStyle={{ paddingBottom: 10 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            } // Scroll on initial load
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  innerContainer: {
    flex: 1,
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 20,
    marginVertical: 4,
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    marginLeft: "20%",
  },
  userMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E8E8E8",
    marginRight: "20%",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: "#FFFFFF",
  },
  userMessageText: {
    color: "#000000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#E8E8E8",
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ChatDetailScreen;
