import { Text, View, TextInput, TouchableHighlight, Switch } from "react-native";
import { styles } from "../styles/mainCss";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { themeColors } from "../styles/base";
import AnimateButton from "./AddItems/animateButton";
import Header from "./Header";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import axios from "axios";
import { API_URL, API_TOKEN } from "@env";
import { updateNotifications } from "../services/api.service";

async function registerForPushNotificationsAsync(notificationStatus) {
  let token,
    finalStatus;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      if (!notificationStatus) {
        alert("Enable notifications from device settings");
      }
    }

    // Project ID can be found in app.json | app.config.js; extra > eas > projectId
    token = (await Notifications.getExpoPushTokenAsync({ projectId: "91921b16-568f-4d08-8edd-089abb995f8c" })).data;
    //token = (await Notifications.getExpoPushTokenAsync()).data;

    // The token should be sent to the server so that it can be used to send push notifications to the device
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      showBadge: true,
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FE9018",
    });
  }

  return { token: token, phoneNotifications: finalStatus === 'granted' ? true : false, appNotifications: !notificationStatus };
}

export default function Profile() {
  const [user, setUser] = useState(getUser());
  const [isEdit, setIsEdit] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);

  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  const toggleSwitch = () => {
    setIsNotificationsEnabled(previousState => !previousState);
    registerForPushNotificationsAsync(isNotificationsEnabled).then((token) => {
      setExpoPushToken(token);
      updateNotifications(token);
    });
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const {
        notification: {
          request: {
            content: {
              data: { screen },
            },
          },
        },
      } = response;

      // When the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
      if (screen) {
        props.navigation.navigate(screen);
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  };

  function getUser() {
    return useSelector((store) => store.appUser);
  }
  const updateInfo = (val) => {
  };

  const cancel = () => {
    console.log("cancel this");
  };
  return (
    <View style={styles.containerFlex}>
      {/* Header */}
      <View style={styles.topBottomFlex}>
        <Header name={"Profile"}></Header>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <KeyboardAwareScrollView>
          <View style={{ margin: 5 }}>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: "27%",
                  height: 100,
                  borderRadius: 999,
                  borderWidth: 2,
                  marginTop: 10,
                  borderColor: "green",
                }}
              ></View>
              <Text style={{ fontSize: 30 }}>{user && user.name} Akhil Nallamothu</Text>

              <TouchableHighlight onPress={() => setIsEdit(!isEdit)}>
                <View
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    padding: 5,
                    backgroundColor: themeColors.peimarynext,
                  }}
                >
                  <Text style={{ fontSize: 20, textDecorationLine: "underline" }}>Edit</Text>
                  <Text style={{ fontSize: 20, marginLeft: 5 }}>
                    <Ionicons name="pencil" size={20} color={themeColors.primary} />
                  </Text>
                </View>
              </TouchableHighlight>

              <View style={styles.switchMain}>
                <View style={styles.switchBar}></View>
                <Text style={styles.switchBarText}> {isNotificationsEnabled ? 'Disable' : 'Enable'} push notifications</Text>
                <View style={styles.switchSwitchView}>
                  <Switch
                    trackColor={{ false: themeColors.peimarynext, true: themeColors.primary }}
                    thumbColor={isNotificationsEnabled ? themeColors.peimarynext : themeColors.primary}
                    onValueChange={toggleSwitch}
                    value={isNotificationsEnabled}
                  />
                </View>
              </View>

              <View style={{ width: "100%" }}>
                <View style={[styles.loginTextInputBox, { width: "100%", backgroundColor: "#d4d6d9" }]}>
                  <View style={styles.loginTextInputIcon}>
                    <Text>
                      <Ionicons name="mail-outline" size={28} color={themeColors.primary} />
                    </Text>
                  </View>
                  <View style={styles.LoginInputValue}>
                    <TextInput
                      editable={false}
                      value={user && user.email}
                      placeholder="Enter Email"
                      style={{ height: "100%" }}
                      name="username"
                    ></TextInput>
                  </View>
                </View>
                <View
                  style={[
                    styles.loginTextInputBox,
                    { width: "100%", backgroundColor: isEdit ? themeColors.peimarynext : "#d4d6d9" },
                  ]}
                >
                  <View style={styles.loginTextInputIcon}>
                    <Text>
                      <Ionicons name="person-circle-outline" size={28} color={themeColors.primary} />
                    </Text>
                  </View>
                  <View style={styles.LoginInputValue}>
                    <TextInput
                      onChangeText={(text) => { }}
                      editable={isEdit}
                      value={user && user.name}
                      placeholder="Enter Name"
                      style={{ height: "100%" }}
                      name="username"
                    ></TextInput>
                  </View>
                </View>
                <View
                  style={[
                    styles.loginTextInputBox,
                    { width: "100%", backgroundColor: isEdit ? themeColors.peimarynext : "#d4d6d9" },
                  ]}
                >
                  <View style={styles.loginTextInputIcon}>
                    <Text>
                      <Ionicons name="lock-closed-outline" size={28} color={themeColors.primary} />
                    </Text>
                  </View>
                  <View style={styles.LoginInputValue}>
                    <TextInput
                      editable={isEdit}
                      onChangeText={(text) => {
                        //setSignUp({ ...signUp, password: text });
                      }}
                      placeholder="Old Password"
                      secureTextEntry={true}
                      style={{ height: "100%" }}
                      name="username"
                    ></TextInput>
                  </View>
                </View>
                <View
                  style={[
                    styles.loginTextInputBox,
                    { width: "100%", backgroundColor: isEdit ? themeColors.peimarynext : "#d4d6d9" },
                  ]}
                >
                  <View style={styles.loginTextInputIcon}>
                    <Text>
                      <Ionicons name="lock-closed-outline" size={28} color={themeColors.primary} />
                    </Text>
                  </View>
                  <View style={styles.LoginInputValue}>
                    <TextInput
                      editable={isEdit}
                      onChangeText={(text) => {
                        //setSignUp({ ...signUp, password: text });
                      }}
                      placeholder="New Password"
                      secureTextEntry={true}
                      style={{ height: "100%" }}
                      name="username"
                    ></TextInput>
                  </View>
                </View>
                <View
                  style={[
                    styles.loginTextInputBox,
                    { width: "100%", backgroundColor: isEdit ? themeColors.peimarynext : "#d4d6d9" },
                  ]}
                >
                  <View style={styles.loginTextInputIcon}>
                    <Text>
                      <Ionicons name="eye-outline" size={28} color={themeColors.primary} />
                    </Text>
                  </View>
                  <View style={styles.LoginInputValue}>
                    <TextInput
                      editable={isEdit}
                      onChangeText={(text) => {
                        //setSignUp({ ...signUp, password: text });
                      }}
                      placeholder="Confirm Password"
                      secureTextEntry={true}
                      style={{ height: "100%" }}
                      name="username"
                    ></TextInput>
                  </View>
                </View>
                <AnimateButton name={"submit"} callingFunction={updateInfo}></AnimateButton>
                <AnimateButton name={"cancel"} callingFunction={cancel}></AnimateButton>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>

      {/* Footer */}
    </View>
  );
}
