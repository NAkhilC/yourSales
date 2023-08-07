import { Text, View, TextInput, TouchableHighlight } from "react-native";
import { styles } from "../styles/mainCss";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { themeColors } from "../styles/base";
import AnimateButton from "./AddItems/animateButton";
import Header from "./Header";

export default function Profile() {
  const [user, setUser] = useState(getUser());
  const [isEdit, setIsEdit] = useState(false);

  function getUser() {
    return useSelector((store) => store.appUser);
  }
  const updateInfo = (val) => {
    console.log(val);
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
                      onChangeText={(text) => {}}
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
