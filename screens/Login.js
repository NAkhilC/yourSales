import { Text, View, Button, Image, TextInput, Pressable, TouchableWithoutFeedback, Animated } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../styles/mainCss";
import Ionicons from "@expo/vector-icons/Ionicons";
import { themeColors } from "../styles/base";
import React, { useState } from "react";
import axios from "axios";
import { API_URL, API_TOKEN } from "@env";
import { useSelector, useDispatch } from "react-redux";
import { userPreferences, userState } from "../store/actions/user.action";
import { userLogin, userSignUp } from "../services/api.service";

export default function Login({ isSignedIn, setIsSignedIn }) {
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const [signUp, setSignUp] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toastBanner, setToastBanner] = useState(true);
  const [token, setToken] = useState("");
  const animatedButtonScale = new Animated.Value(1);

  const dispatch = useDispatch();

  validateSignUpForm = () => {
    if (signUp.email.length > 0 && signUp.email.match(isValidEmail)) {
      if (signUp.name.length > 0) {
        if (signUp.password.length > 0 && signUp.password === confirmPassword) {
          return true;
        } else {
          alert("Password is Invalid! Must be 8 Characters in length and passwords must match");
          return false;
        }
      } else {
        alert("name Feild is invalid");
        return false;
      }
    } else {
      alert("Email is Invalid");
      return false;
    }
  };

  //signup
  signUpForm = async () => {
    if (validateSignUpForm()) {
      const userStatus = await userSignUp(signUp);
      if (userStatus) {
        setToastBanner(true);
      }
    }
  };

  const getLogin = () => {
    return useSelector(store => store.isSignedIn)
  }

  React.useEffect(() => {
    //setIsSignedIn(getLogin);
  })

  //login
  login = async () => {
    if (loginForm.username?.length > 0 && loginForm.password?.length > 0) {
      if (await userLogin(loginForm)) {
        setIsSignedIn(true);
      }
    }
  };

  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  return (
    <View style={styles.containerFlex}>
      {toastBanner ? (
        <View style={styles.mainToastBanner}>
          <View style={styles.toastBanner}>
            <View>
              <Text>
                <Ionicons name="checkmark-done-circle-outline" size={60} color={themeColors.success} />
              </Text>
            </View>
            <Text style={{ color: themeColors.success, fontSize: 23 }}> Successfully Registered</Text>
          </View>
          <Pressable style={[styles.successToastButton]} onPress={() => {
            setToastBanner(false);
            setSignUp({
              email: "",
              name: "",
              password: ""
            });
            setLoginForm({ username: "", password: "" });
          }}>
            <Text style={[styles.toggleTextSuccessOk]}>Ok</Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )
      }
      <KeyboardAwareScrollView>
        <View style={[styles.toggleSwitchContainer, { opacity: toastBanner ? 0.2 : 1 }]}>
          <View style={styles.toggleSwitch}>
            <Pressable
              style={[
                styles.loginToggle,
                { borderBottomColor: isLogin ? themeColors.peimarynext : themeColors.primary },
              ]}
              onPress={() => { setIsLogin(false); setSignUp({ username: null, password: null }) }}
            >
              <Text style={[styles.toggleText]}>Login</Text>
            </Pressable>
            <Pressable
              style={[
                styles.loginToggle,
                { borderBottomColor: isLogin ? themeColors.primary : themeColors.peimarynext },
              ]}
              onPress={() => { setIsLogin(true); setLoginForm({ username: null, password: null }) }}
            >
              <Text style={[styles.toggleText]}>Register</Text>
            </Pressable>
          </View>
          {!isLogin ? (
            <View style={styles.loginContainer}>
              <View>
                <Text style={styles.signUpHeaderText}>Login</Text>
              </View>
              <View style={styles.loginTextInput}>
                <View style={styles.loginTextInputBox}>
                  <View style={styles.loginTextInputIcon}>
                    <Text>
                      <Ionicons name="person-outline" size={28} color={themeColors.primary} />
                    </Text>
                  </View>
                  <View style={styles.LoginInputValue}>
                    <TextInput
                      style={{ height: "100%" }}
                      name="username"
                      placeholder="Enter emial"
                      onChangeText={(text) => {
                        setLoginForm({ ...loginForm, username: text });
                      }}
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.loginTextInputBox}>
                  <View style={styles.loginTextInputIcon}>
                    <Ionicons name="lock-open-outline" size={28} color={themeColors.primary} />
                  </View>
                  <View style={styles.LoginInputValue}>
                    <TextInput
                      style={{ height: "100%" }}
                      name="password"
                      placeholder="Enter Password"
                      secureTextEntry={true}
                      onChangeText={(text) => {
                        setLoginForm({ ...loginForm, password: text });
                      }}
                    ></TextInput>
                  </View>
                </View>
              </View>
              <TouchableWithoutFeedback onPress={() => login()} onPressIn={onPressIn} onPressOut={onPressOut}>
                <Animated.View style={[styles.iconContainer, animatedScaleStyle]}>
                  <View style={[styles.loginButton]}>
                    <Text style={styles.text}>Login</Text>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
              {/* <View style={styles.loginButton}>
                <Pressable onPress={() => login()}>
                  <Text style={styles.text}>Login</Text>
                </Pressable>
              </View> */}
            </View>
          ) : (
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpHeaderText}>Register Here</Text>

              <View style={styles.loginTextInput}>
                <View style={styles.loginTextInputBox}>
                  <View style={styles.loginTextInputIcon}>
                    <Text>
                      <Ionicons name="mail-outline" size={28} color={themeColors.primary} />
                    </Text>
                  </View>
                  <View style={styles.LoginInputValue}>
                    <TextInput
                      onChangeText={(text) => {
                        setSignUp({ ...signUp, email: text });
                      }}
                      placeholder="Enter Email"
                      style={{ height: "100%" }}
                      name="username"
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.loginTextInputBox}>
                  <View style={styles.loginTextInputIcon}>
                    <Text>
                      <Ionicons name="person-circle-outline" size={28} color={themeColors.primary} />
                    </Text>
                  </View>
                  <View style={styles.LoginInputValue}>
                    <TextInput
                      onChangeText={(text) => {
                        setSignUp({ ...signUp, name: text });
                      }}
                      placeholder="Enter Name"
                      secureTextEntry={false}
                      style={{ height: "100%" }}
                      name="username"
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.loginTextInputBox}>
                  <View style={styles.loginTextInputIcon}>
                    <Text>
                      <Ionicons name="lock-closed-outline" size={28} color={themeColors.primary} />
                    </Text>
                  </View>
                  <View style={styles.LoginInputValue}>
                    <TextInput
                      onChangeText={(text) => {
                        setSignUp({ ...signUp, password: text });
                      }}
                      placeholder="Create Password"
                      secureTextEntry={true}
                      style={{ height: "100%" }}
                      name="username"
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.loginTextInputBox}>
                  <View style={styles.loginTextInputIcon}>
                    <Text>
                      <Ionicons name="eye-outline" size={28} color={themeColors.primary} />
                    </Text>
                  </View>
                  <View style={styles.LoginInputValue}>
                    <TextInput
                      onChangeText={(text) => {
                        setConfirmPassword(text);
                      }}
                      placeholder="Confirm Password"
                      secureTextEntry={true}
                      style={{ height: "100%" }}
                      name="username"
                    ></TextInput>
                  </View>
                </View>
                <TouchableWithoutFeedback onPress={() => signUpForm()} onPressIn={onPressIn} onPressOut={onPressOut}>
                  <Animated.View style={[styles.iconContainer, animatedScaleStyle]}>
                    <View style={[styles.loginButton]}>
                      <Text style={styles.text}>Register</Text>
                    </View>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View >
  );
}
