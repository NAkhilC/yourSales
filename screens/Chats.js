import { styles } from "../styles/mainCss";
import Header from "./Header";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import io from "socket.io-client";
import { themeColors } from "../styles/base";
import axios from "axios";
import { API_URL, API_TOKEN } from "@env";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
const moment = require('moment')


const users = [
  { id: "Hello@gmail.com", name: "Hello User 1 Hello" },
  { id: "Test@gmail.com", name: "Test User 1 Hi" },
  // Add more users as needed
];

export default function Chat({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(getUser().email);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      axios.get(`${API_URL}/getChatsForUser`).then((a) => {
        if (a.status === 200 && a.data && a.data.data) {
          setConversations(a.data.data);
        }
      });
    }
  }, [isFocused]);

  function getUser() {
    return useSelector((store) => store.appUser);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.conversation_Id} onPress={() => navigation.navigate("ChatUser", { itemListedUserId: item.itemOwner !== user ? item.itemOwner : item.oppChatUser, conversationId: item.conversation_Id, listingId: item?.listingId })}>
      <View
        style={{ padding: 13, borderBottomWidth: 1, borderBottomColor: "#ddd", display: "flex", flexDirection: "row", maxHeight: 70 }}
      >
        <View
          style={{
            width: "14%",
            height: 50,
            backgroundColor: themeColors.primary,
            borderRadius: 999,
            overflow: "hidden",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Text style={{ fontSize: 35, marginTop: 3 }}>{item.itemOwner !== user ? item.itemOwner.slice(0, 1) : item.oppChatUser.slice(0, 1)}</Text>
        </View>
        <View style={{ marginLeft: 15, width: '60%', padding: 2 }}>
          <Text>{item.chatUserName}</Text>
          <Text style={{ marginTop: 4 }}>{(item.lastMessageContent?.data[0].context).slice(0, 30)}</Text>
        </View>
        <View style={{ marginLeft: '5%', width: '20%' }}>
          <Text>{item.lastMessageTime ?
            new Date(item.lastMessageTime).toLocaleString("en-US",
              {
                month: "short",
                day: "2-digit",
                hour: '2-digit', minute: '2-digit'
              }) : null}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.containerFlex}>
      {/* Header */}
      <View style={styles.topBottomFlex}>
        <Header name={"chat"}></Header>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <View>
          {conversations ?
            <FlatList data={conversations} renderItem={renderItem} keyExtractor={(item, id) => id} /> : null}
        </View>
      </View>
    </View>
  );
}
