import {
  Text,
  View,
  Button,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { styles } from "../../styles/mainCss";
import React, { useState, useRef, useEffect } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Header from "../Header";
import RemoteDataSetExample from "../components/GooglePlaces";
import IndividaulItems from "./IndividualItems";
import UploadImage from "../components/UploadImage";
import DateTimePickerComponent from "../components/DateTimePicker";
import axios from "axios";
import { AxiosRequestConfig } from "axios";

import { API_URL, API_TOKEN } from "@env";

export default function AddItem() {
  const [state, setState] = React.useState("");
  const [image, setImage] = React.useState("");
  const ref = useRef();
  const animatedButtonScale = new Animated.Value(1);
  const [formData, setFormData] = useState({
    title: "",
    address: {
      addressText: "",
      placeId: "",
    },
    images: [],
    description: "",
    eventStart: "",
    eventEnd: "",
    phone: "",
  });

  useEffect(() => {
    ref.current?.setAddressText("Some Text");
  }, []);

  const axiosInstance = axios.create({
    baseURL: API_URL, // use with scheme
    timeout: 30000,
    headers: {
      "X-Platform": "iOS",
      "X-App-Build-Number": "1.0.0",
    },
  });

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

  const submitButton = async () => {
    let formData1 = new FormData();
    let filterImages = JSON.stringify(formData);
    filterImages = JSON.parse(filterImages);
    delete filterImages.images;
    formData1.append("data", JSON.stringify(filterImages));

    formData.images.forEach((image, index) => {
      formData1.append("file", {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    });

    const config = {
      method: "post",
      url: `/upload`,
      responseType: "json",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (data, headers) => {
        return formData1;
      },
      onUploadProgress: (progressEvent) => {},
      data: formData,
    };

    //send post request and get response
    const response = await axiosInstance.request(config);
  };

  return (
    <View style={styles.containerFlex}>
      {/* Header */}
      <View style={styles.topBottomFlex}>
        <Header></Header>
      </View>
      {/* Body */}
      <View style={styles.body}>
        <KeyboardAwareScrollView>
          <View style={styles.body}>
            <View style={styles.addItem}>
              <Text style={{ fontSize: 18 }}>Title</Text>
              <TextInput
                style={styles.addItemTitleInput}
                onChangeText={(text) => {
                  setFormData({ ...formData, title: text });
                }}
              ></TextInput>
              <View style={{ zIndex: 100 }}>
                <RemoteDataSetExample cities={false} formData={formData.address}></RemoteDataSetExample>
              </View>

              {/* Upload images */}
              <View>
                <UploadImage formData={formData} setFormData={setFormData}></UploadImage>
              </View>

              {/* dates */}
              <View
                style={{
                  width: "100%",
                  overflow: "hidden",
                  padding: 5,
                  marginTop: 10,
                }}
              >
                <View style={{ margin: 5, flexDirection: "row", display: "flex" }}>
                  <Text style={{ fontSize: 18, width: "30%", marginTop: 4 }}>Event start </Text>
                  <DateTimePickerComponent
                    formData={formData}
                    setFormData={setFormData}
                    type="from"
                  ></DateTimePickerComponent>
                </View>
                <View style={{ margin: 5, flexDirection: "row", display: "flex" }}>
                  <Text style={{ fontSize: 18, width: "30%", marginTop: 4 }}>Event end</Text>
                  <DateTimePickerComponent
                    formData={formData}
                    setFormData={setFormData}
                    type="end"
                  ></DateTimePickerComponent>
                </View>
              </View>
              <Text style={{ fontSize: 18 }}>Add Phone Number</Text>
              <TextInput
                style={styles.addItemTitleInput}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setFormData({ ...formData, phone: text });
                }}
              ></TextInput>

              <Text style={{ fontSize: 18, marginTop: 15 }}>Description</Text>
              <TextInput
                style={styles.addItemTitleTextInput}
                multiline={true}
                onChangeText={(text) => {
                  setFormData({ ...formData, description: text });
                }}
              />
              <IndividaulItems></IndividaulItems>
              <TouchableWithoutFeedback onPress={() => submitButton()} onPressIn={onPressIn} onPressOut={onPressOut}>
                <Animated.View style={[styles.iconContainer, animatedScaleStyle]}>
                  <View style={[styles.loginButton, { width: "100%" }]}>
                    <Text style={styles.text}>Submit</Text>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
              <View>
                {image.length > 0 && (
                  <View style={styles.bodyView}>
                    <View style={styles.imagePicked}>
                      <Image
                        source={{
                          uri: `${image}`,
                        }}
                        style={styles.eachImagePicked}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
