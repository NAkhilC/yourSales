import { styles } from "../styles/mainCss";
import Header from "./Header";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import io from "socket.io-client";
import { themeColors } from "../styles/base";

const users = [
  { id: "Hello@gmail.com", name: "Hello User 1 Hello" },
  { id: "Test@gmail.com", name: "Test User 1 Hi" },
  // Add more users as needed
];

export default function Chat({ navigation }) {
  const [selectedUserId, setSelectedUserId] = useState(null);

  function onPressUser(item) {
    console.log(item);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("ChatUser", { data: item })}>
      <View
        style={{ padding: 13, borderBottomWidth: 1, borderBottomColor: "#ddd", display: "flex", flexDirection: "row" }}
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
          <Text style={{ fontSize: 35, marginTop: 3 }}>{item.name.slice(0, 1)}</Text>
        </View>
        <View style={{ marginLeft: 15 }}>
          <Text>{item.name}</Text>
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
          <FlatList data={users} renderItem={renderItem} keyExtractor={(item) => item.id} />
        </View>
      </View>
    </View>
  );
}
