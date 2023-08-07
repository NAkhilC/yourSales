import { Text, View, Button, Image, TextInput, Pressable, TouchableWithoutFeedback, Animated } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../styles/mainCss";
import Ionicons from "@expo/vector-icons/Ionicons";
import { themeColors } from "../styles/base";
import React, { useState } from "react";
import axios from "axios";
import { API_URL, API_TOKEN } from "@env";
import { useSelector, useDispatch } from "react-redux";
import { userState } from "../store/actions/user.action";

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
  const [toastBanner, setToastBanner] = useState(false);
  const [token, setToken] = useState("");
  const animatedButtonScale = new Animated.Value(1);

  const dispatch = useDispatch();

  //console.log(useSelector((store) => store));

  // React.useEffect(() => {
  //   axios.post(`${API_URL}/generateToken`, { headers: { "Content-Type": "application/json" } }).then((res) => {
  //     console.log(res.data);
  //     if (res.data.status === 200) {
  //       setToken(res.data.token);
  //       dispatch(
  //         userState({
  //           userid: "user123",
  //           email: "user123@gmail.com",
  //           token: res.data.token,
  //           name: "akhil",
  //           listings: [],
  //         })
  //       );
  //     } else {
  //       setToken("");
  //     }
  //   });
  // }, []);

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
  signUpForm = () => {
    if (validateSignUpForm()) {
      axios
        .post(`${API_URL}/signUp`, JSON.stringify(signUp), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(JSON.stringify(res.data));
          if (res.status === 200) {
            setToastBanner(true);
          } else if (res.status === 204) {
            alert("User exists");
          } else {
            alert("Something Wrong on our end. We Couldn't complete your registration");
          }
        });
    }
  };

  //login
  login = () => {
    if (loginForm.username.length > 0 && loginForm.password.length > 0) {
      axios
        .post(`${API_URL}/login`, JSON.stringify(loginForm), {
          headers: { "Content-Type": "application/json", Authorization: token },
        })
        .then((response) => {
          if (response.data.status === 200) {
            setIsSignedIn(true);
            let responseData = response.data.data;
            dispatch(
              userState({
                userid: responseData.email,
                email: responseData.email,
                token: responseData.token,
                name: responseData.name,
              })
            );
          } else if (response.data.status === 204) {
            alert("User doesn't exist");
          } else {
            alert("Sorry Something went wrong! We are looking into it");
          }
        })
        .catch((error) => console.log(error));
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
          <Pressable style={[styles.successToastButton]} onPress={() => setToastBanner(false)}>
            <Text style={[styles.toggleTextSuccessOk]}>Ok</Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
      <KeyboardAwareScrollView>
        <View style={[styles.toggleSwitchContainer, { opacity: toastBanner ? 0.2 : 1 }]}>
          <View style={styles.toggleSwitch}>
            <Pressable
              style={[
                styles.loginToggle,
                { borderBottomColor: isLogin ? themeColors.peimarynext : themeColors.primary },
              ]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={[styles.toggleText]}>Login</Text>
            </Pressable>
            <Pressable
              style={[
                styles.loginToggle,
                { borderBottomColor: isLogin ? themeColors.primary : themeColors.peimarynext },
              ]}
              onPress={() => setIsLogin(true)}
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
    </View>
  );
}
