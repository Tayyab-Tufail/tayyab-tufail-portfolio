import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import { HeartIcon, ChatBubbleLeftIcon } from "react-native-heroicons/outline";
import Dp1 from "../../assets/dp1.jpeg";
import Dp2 from "../../assets/dp2.jpeg";
import Post1 from "../../assets/post1.jpeg";
import Post2 from "../../assets/post2.jpeg";
import { PostsContext } from "../utils/PostsContext";

const stories = [
  {
    id: "1",
    userName: "You",
    profilePic: Dp1,
    image: Post1,
    timeAgo: "Just now",
    read: true,
  },
  {
    id: "2",
    userName: "Jack",
    profilePic: Dp2,
    image: Post2,
    timeAgo: "5 minutes ago",
    read: false,
  },
  {
    id: "3",
    userName: "Luna",
    profilePic: Dp1,
    image: Post1,
    timeAgo: "10 minutes ago",
    read: false,
  },
  {
    id: "4",
    userName: "Luna",
    profilePic: Dp1,
    image: Post1,
    timeAgo: "10 minutes ago",
    read: false,
  },
];

const SocialFeedScreen = ({ navigation }) => {
  const [storiesData, setStoriesData] = useState(stories);
  const { posts, setPosts } = useContext(PostsContext);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  const openStory = (index) => {
    setSelectedStoryIndex(index);
    setStoriesData((prevStories) =>
      prevStories.map((story, i) =>
        i === index ? { ...story, read: true } : story
      )
    );
  };

  const closeStory = () => setSelectedStoryIndex(null);

  const handleNextStory = () => {
    if (selectedStoryIndex < storiesData.length - 1) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
    } else {
      closeStory();
    }
  };

  const handleReaction = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactionType: post.reactionType === "love" ? null : "love",
            }
          : post
      )
    );
  };

  const toggleCommentInput = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, showCommentInput: !post.showCommentInput }
          : post
      )
    );
  };

  const handleAddComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  text: comment,
                  userName: "CurrentUserName",
                  // profilePic: "https://via.placeholder.com/30",
                },
              ],
              showCommentInput: false,
            }
          : post
      )
    );
    setCommentInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.postInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="#888"
          editable={false}
          onPress={() => navigation.navigate("AddPost")}
        />
        <TouchableOpacity
          style={styles.topRightImageMain}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image source={Dp1} style={styles.userImage} />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={storiesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => openStory(index)}
            style={styles.storyContainer}
          >
            <View style={styles.storyListProfileMain}>
              <Image
                source={item.profilePic}
                style={styles.storyListProfilePic}
              />
            </View>
            <Image
              source={item.image}
              style={[styles.storyImage, item.read && styles.readStory]}
            />
            <View style={styles.storyListUsernameMain}>
              <Text style={styles.storyListUserName}>{item.userName}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesList}
        style={{ height: 350 }}
      />

      {selectedStoryIndex !== null && (
        <Modal
          isVisible={true}
          style={styles.storyFullScreen}
          onSwipeComplete={closeStory}
          swipeDirection="down"
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.8}
        >
          <TouchableOpacity
            style={styles.storyFullScreen}
            onPress={handleNextStory}
            activeOpacity={1}
          >
            <View style={styles.storyHeader}>
              <Image
                source={storiesData[selectedStoryIndex].profilePic}
                style={styles.profilePic}
              />
              <View>
                <Text style={styles.storyUserName}>
                  {storiesData[selectedStoryIndex].userName}
                </Text>
                <Text style={styles.timeAgo}>
                  {storiesData[selectedStoryIndex].timeAgo}
                </Text>
              </View>
            </View>
            <Image
              source={storiesData[selectedStoryIndex].image}
              style={styles.fullScreenStoryImage}
            />
          </TouchableOpacity>
        </Modal>
      )}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image source={item.profilePic} style={styles.profileImage} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.timeAgo}>{item.timeAgo}</Text>
              </View>
            </View>
            <Image source={{ uri: item.postImage }} style={styles.postImage} />
            <Text style={styles.caption}>{item.caption}</Text>

            <View style={styles.reactionsContainer}>
              <Pressable onPress={() => handleReaction(item.id)}>
                <HeartIcon
                  size={24}
                  color={item.reactionType === "love" ? "#FF0000" : "#CCC"}
                />
              </Pressable>
              <TouchableOpacity onPress={() => toggleCommentInput(item.id)}>
                <ChatBubbleLeftIcon
                  size={24}
                  color="#007BFF"
                  style={styles.iconSpacing}
                />
              </TouchableOpacity>

              <Text style={styles.reactionsText}>{item.reactions} replies</Text>
            </View>

            {item.showCommentInput && (
              <View style={styles.commentsContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Write a comment..."
                  value={commentInput}
                  onChangeText={setCommentInput}
                  onSubmitEditing={() =>
                    handleAddComment(item.id, commentInput)
                  }
                />
              </View>
            )}
            {item.comments.map((comment) => (
              <View style={styles.commentMain} key={comment.id}>
                <Image source={Dp1} style={styles.commentProfileImage} />
                <View style={styles.commentContent}>
                  <Text style={styles.commentUserName}>Hammas</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 35,
  },
  topRightImageMain: {
    width: "20%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  postInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  input: {
    width: "80%",
    fontSize: 18,
    padding: 20,
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft: 10,
    resizeMode: "center",
  },

  storiesList: {
    paddingLeft: 10,
    height: 200,
  },
  storyContainer: {
    position: "relative",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 10,
  },
  storyImage: {
    width: 120,
    height: 190,
    borderRadius: 10,
    marginBottom: 5,
    opacity: 0.5,
  },
  readStory: {
    opacity: 1,
  },
  storyUserName: {
    fontSize: 14,
    color: "red",
    textAlign: "center",
  },
  storyListUsernameMain: {
    backgroundColor: "#484a4f",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    padding: 5,
  },
  storyListUserName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  storyFullScreen: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    margin: 0,
  },
  fullScreenStoryImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
    marginTop: 10,
  },
  storyHeader: {
    position: "absolute",
    top: 50,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    resizeMode: "center",
  },
  storyUserName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF",
  },
  storyListProfileMain: {
    width: 50,
    height: 50,
    backgroundColor: "#006d8f",
    position: "absolute",
    top: -10,
    zIndex: 2,
    left: -10,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  storyListProfilePic: { width: 43, height: 43, borderRadius: 50 },

  timeAgo: {
    fontSize: 12,
    color: "#CCC",
  },
  postContainer: {
    backgroundColor: "#ececec",
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 18,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: "bold",
  },
  timeAgo: {
    fontSize: 12,
    color: "#888",
  },
  postImage: {
    width: "100%",
    height: 300,
    marginVertical: 10,
    borderRadius: 10,
  },
  caption: {
    fontSize: 16,
    color: "#333",
  },
  reactionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  reactionsText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
    fontWeight: "600",
  },
  iconSpacing: {
    marginLeft: 10,
  },
  commentsContainer: { marginVertical: 10 },
  commentInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  commentMain: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  commentProfileImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentUserName: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 2,
    color: "#333",
  },
  commentText: {
    fontSize: 14,
    color: "#555",
  },

  postsList: {
    paddingBottom: 20,
  },
});

export default SocialFeedScreen;
