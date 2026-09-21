import React, { createContext, useState } from "react";

export const PostsContext = createContext();
import Dp1 from "../../assets/dp1.jpeg";
import Dp2 from "../../assets/dp2.jpeg";
import Post1 from "../../assets/post1.jpeg";
import Post2 from "../../assets/post2.jpeg";
export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: "1",
      userName: "Bety Miller",
      profilePic: Dp1,
      timeAgo: "2 minutes ago",
      postImage: "https://randomuser.me/api/portraits/men/1.jpg",
      caption: "Those who don’t believe in magic will never find it.",
      reactions: 252,
      reactionType: null,
      comments: [],
    },
    {
      id: "2",
      userName: "Gabriella",
      profilePic: Dp2,
      timeAgo: "2 minutes ago",
      caption: "Exploring the beautiful beaches!",
      postImage: "https://randomuser.me/api/portraits/men/3.jpg",
      reactions: 158,
      reactionType: null,
      comments: [],
    },
  ]);

  const addPost = (post) => {
    const newPost = { ...post, id: posts.length + 1 };
    setPosts([newPost, ...posts]);
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
