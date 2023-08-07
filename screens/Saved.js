import { styles } from "../styles/mainCss";
import { Text, View, Image, Pressable, TouchableHighlight, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { themeColors } from "../styles/base";
import { useState } from "react";
import Header from "./Header";
import { useIsFocused } from "@react-navigation/native";
import { API_URL, API_TOKEN } from "@env";
import React from "react";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Saved({ navigation }) {
  const [isSaved, setIsSaved] = useState(true);
  const isFocused = useIsFocused();
  const [saved, setSaved] = useState();
  const [interested, setInterested] = useState();
  React.useEffect(() => {
    if (isFocused) {
      axios.get(`${API_URL}/items/getSavedInterested`).then((items) => {
        if (items.data.status === 200) {
          console.log(items.data);
          if (items.data && items.data.items && items.data.items.saved.length > 0) {
            setSaved(items.data.items.saved);
          }
          if (items.data && items.data.items && items.data.items.interested.length > 0) {
            setInterested(items.data.items.interested);
          }
        }
      });
    }
  }, [isFocused]);

  return (
    <View style={styles.containerFlex}>
      <View style={styles.topBottomFlex}>
        <Header name={"Saved"}></Header>
      </View>

      <View style={styles.body}>
        <View style={[styles.toggleSwitch, { height: 50 }]}>
          <Pressable
            style={[styles.loginToggle, { borderBottomColor: isSaved ? themeColors.peimarynext : themeColors.primary }]}
            onPress={() => setIsSaved(false)}
          >
            <Text style={[styles.toggleText, { fontSize: 25 }]}>Saved</Text>
          </Pressable>
          <Pressable
            style={[styles.loginToggle, { borderBottomColor: isSaved ? themeColors.primary : themeColors.peimarynext }]}
            onPress={() => setIsSaved(true)}
          >
            <Text style={[styles.toggleText, { fontSize: 25 }]}>Interested</Text>
          </Pressable>
        </View>
        <KeyboardAwareScrollView>
          {isSaved ? (
            <View>
              {interested && interested.length > 0 ? (
                <View style={styles.savedInterestedView}>
                  {interested.map((item, index) => {
                    return (
                      <TouchableHighlight
                        key={index}
                        onPress={() => navigation.navigate("ViewItem", { data: item.listingId })}
                        underlayColor="#DDDDDD"
                      >
                        <View
                          style={[
                            styles.savedInterestedViewItem,
                            { backgroundColor: index % 2 === 0 ? "white" : themeColors.peimarynext },
                          ]}
                        >
                          <View style={[styles.itemImage, styles.savedInterestedViewItemImage]}>
                            <Image style={styles.infoImage} resizeMode="cover" src={item.images[0]}></Image>
                          </View>
                          <View style={styles.savedInterestedViewItemText}>
                            {item.title ? <Text style={{ marginTop: 5 }}>{item.title}</Text> : ""}
                            {item.address && item.address.addressText ? (
                              <View style={styles.addressFlexItem}>
                                <Ionicons name="pin" size={35} color="#7a9e9f" />
                                <Text style={{ flex: 1 }}>{item.address.addressText}</Text>
                              </View>
                            ) : (
                              ""
                            )}
                          </View>
                        </View>
                      </TouchableHighlight>
                    );
                  })}
                </View>
              ) : (
                <View>
                  <Text>Interested items not found</Text>
                </View>
              )}
            </View>
          ) : (
            <View>
              {saved && saved.length > 0 ? (
                <View style={styles.savedInterestedView}>
                  {saved.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          styles.savedInterestedViewItem,
                          { backgroundColor: index % 2 === 0 ? "white" : themeColors.peimarynext },
                        ]}
                      >
                        <View style={[styles.itemImage, styles.savedInterestedViewItemImage]}>
                          <Image style={styles.infoImage} resizeMode="cover" src={item.images[0]}></Image>
                        </View>
                        <View style={styles.savedInterestedViewItemText}>
                          {item.title ? <Text style={{ marginTop: 5 }}>{item.title}</Text> : ""}
                          {item.address && item.address.addressText ? (
                            <View style={styles.addressFlexItem}>
                              <Ionicons name="pin" size={35} color="#7a9e9f" />
                              <Text style={{ flex: 1 }}>{item.address.addressText}</Text>
                            </View>
                          ) : (
                            ""
                          )}
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View>
                  <Text>Saved items not found</Text>
                </View>
              )}
            </View>
          )}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
