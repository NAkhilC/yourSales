import { styles } from "../styles/mainCss";
import Header from "./Header";
import React, { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from "react-native";
import io from "socket.io-client";
import { themeColors } from "../styles/base";
export default function ChatUser(props) {
  const [username, setUsername] = useState("Hello@gmail.com");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [socket, setSocket] = useState(null);
  const route = useRoute();
  //const socket = new WebSocket("wss://172.22.80.1:4000", {});
  //const socket = io("http://10.0.0.118:3000");

  useEffect(() => {
    const socket = io("http://10.0.0.118:3000", { reconnection: true });
    // setTimeout(() => {
    //   console.log("**");
    joinChat();
    // }, 5000);

    setSocket(socket);
    console.log(socket.connected);
    socket.on("connect", () => {
      if (socket.connected) {
        socket.emit("join", username);
      }
    });
    socket.on("userJoined", (user) => {
      setMessages((prevMessages) => [...prevMessages, `${user} joined the chat`]);
    });

    socket.on("userLeft", (user) => {
      setMessages((prevMessages) => [...prevMessages, `${user} left the chat`]);
    });

    socket.on("reconnect", () => {
      console.log("***");
    });

    socket.on("receiveMessage", ({ sender, message }) => {
      console.log(sender, message);
      setMessages((prevMessages) => [...prevMessages, `${sender}: ${message}`]);
    });
    setUsername(route.params.data.id === "Hello@gmail.com" ? "Test@gmail.com" : "Hello@gmail.com");
    setReceiver(route.params.data.id);

    return () => {
      socket.disconnect();
    };
  }, [receiver, username]);

  const joinChat = () => {
    console.log(socket?.connected, "***");
    if (username && socket && socket?.connected) {
      console.log("rec=>", receiver, "user=>", username);
      socket.emit("join", username);
    }
  };

  const sendMessage = () => {
    if (message && receiver && socket) {
      socket.emit("sendMessage", { sender: username, receiver, message });
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <View style={styles.containerFlex}>
      {/* Header */}
      <View style={styles.topBottomFlex}>
        <Header name={"chat"}></Header>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>receiver me: {username}</Text>
          <Text>user: {receiver}</Text>
          {/* <TextInput
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: "80%" }}
          /> */}
          {/* <Button title="Join Chat" onPress={joinChat} /> */}

          <ScrollView style={{ flex: 1, marginTop: 10, width: "80%" }} contentContainerStyle={{ flexGrow: 1 }}>
            {messages.map((msg, index) => (
              <Text key={index}>{msg}</Text>
            ))}
          </ScrollView>
          <View style={{ width: "90%" }}>
            <FlatList
              data={messages}
              renderItem={({ item }) => (
                <View>
                  {item.slice(0, 3) != "You" ? (
                    <View
                      style={{ backgroundColor: themeColors.peimarynext, padding: 10, borderRadius: 5, marginTop: 5 }}
                    >
                      <Text>{item}</Text>
                    </View>
                  ) : (
                    <View style={{ backgroundColor: themeColors.primary, padding: 10, borderRadius: 5, marginTop: 5 }}>
                      <Text style={{ textAlign: "right" }}>{item}</Text>
                    </View>
                  )}
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          {/* <TextInput
            placeholder="Receiver"
            value={receiver}
            onChangeText={setReceiver}
            style={{ borderWidth: 1, padding: 10, marginBottom: 5, width: "80%" }}
          /> */}
          <TextInput
            placeholder="Enter your message"
            value={message}
            onChangeText={setMessage}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: "80%" }}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </View>
  );
}
