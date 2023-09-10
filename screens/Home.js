import {
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  Pressable,
  SectionList,
  FlatList,
  TouchableOpacity,
  PanResponder,
  SafeAreaView,
  LogBox
} from "react-native";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';

import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../styles/mainCss";
import Header from "./Header";
import Footer from "./Footer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import fakeData from "../constants/fakeData";
import axios from "axios";
import { API_URL, API_TOKEN } from "@env";
import { useIsFocused } from "@react-navigation/native";
import ShowAdd from "./AddManager/ShowAd";
import MapAreaSelector from "./components/MapAreaSelector";
import { themeColors } from "../styles/base";
import RemoteDataSetExample from "./components/GooglePlaces";
import { useDispatch } from "react-redux";
import { userPreferences } from "../store/actions/user.action";
import FilterData from "./components/FilterData";
import { userState } from "../store/actions/user.action";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getItemsForUser, userPreferencegetData } from "../services/api.service";

export default function Home({ navigation }) {
  const [searchTerm, onChangeSearchTerm] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalGooglePlaces, setModalGooglePlaces] = useState(false);
  const [images, setImages] = useState();
  const [listings, setListings] = useState([]);
  const [user, setUser] = useState(getUser());
  const [formData, setFormData] = useState();
  let listItems = fakeData;
  const dispatch = useDispatch();

  function getUser() {
    return useSelector((store) => store.appUser);
  }
  const userPreferencesData = useSelector((state) => state.userPreferences);

  const isFocused = useIsFocused();
  LogBox.ignoreLogs(['Sending']);

  // dispatch(
  //   userState({
  //     userid: 'Test1@gmail.com',
  //     email: 'Test1@gmail.com',
  //     token: 'responseData',
  //     name: 'Test1',
  //   })
  // );

  async function filterData() {
    setModalVisible(!modalVisible);
    //update state 
    if (formData) {
      dispatch(
        userPreferences({
          addressText: formData.address.addressText,
          placeId: formData.address.placeId,
          latitude: formData.address.latitude,
          longitude: formData.address.longitude,
          range: formData.range
        })
      );



      (async () => {
        const data = await userPreferencegetData(formData);
        if (data) {
          setListings(data);
        }
      })();
    }
  }


  React.useEffect(() => {
    if (userPreferencesData) {
      setFormData({
        address: {
          addressText: userPreferencesData?.addressText,
          placeId: userPreferencesData?.placeId,
          latitude: userPreferencesData?.latitude,
          longitude: userPreferencesData?.longitude
        },
        range: userPreferencesData?.range
      })
    } else {
      setFormData({
        address: {
          addressText: '',
          placeId: '',
          latitude: '',
          longitude: ''
        },
        range: 5
      })
    }

    if (isFocused) {
      (async () => {
        const userItems = await getItemsForUser();
        if (userItems) {
          setListings(userItems);
        }
      })();
    }

  }, [isFocused]);

  const dragDistance = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        dragDistance.current = gestureState.dy;
      },
      onPanResponderRelease: () => {
        if (dragDistance.current >= 100) {
          // Call your function here
          (async () => {
            const userItems = await getItemsForUser();
            if (userItems) {
              setListings(userItems);
            }
          })();
        }
        dragDistance.current = 0;
      },
    })
  ).current;

  const AD_DATA = [
    { id: "ad1", text: "Ad 1" },
    { id: "ad2", text: "Ad 2" },
    { id: "ad3", text: "Ad 3" },
    // ... add more advertisements ...
  ];

  //chat gpt
  const itemsPerRow = 1;
  const adInterval = 2;

  const dataWithAds = listings && listings?.flatMap((item, index) => {
    if ((index + 1) % adInterval === 0) {
      const adIndex = Math.floor(index / adInterval) % AD_DATA.length;
      return [item, { ...AD_DATA[adIndex], isAd: true }];
    }
    return item;
  }).flat();


  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ViewItem", { data: item.listingId, originPlaceId: formData.address?.placeId })}>
          <View style={styles.displayFlex}>
            <View style={styles.itemImage}>
              <Image style={styles.infoImage} resizeMode="cover" src={item.images[0]}></Image>
            </View>

            <View style={{ padding: 2, overflow: "hidden", height: 150, width: '50%' }}>
              <SafeAreaView>
                <View style={styles.displayFlex}>
                  <View style={{ width: '80%', maxHeight: 50 }}>
                    <Text style={{ fontWeight: 500, padding: 5 }}>{item && item.title}</Text>
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <Ionicons name="heart" size={25} color={"red"} />
                  </View>
                </View>
                <Text style={{ fontWeight: 500, padding: 5 }}>{item && item.currency} ${item && item.price}</Text>
                <View style={{ display: "flex", marginTop: 4, flexDirection: "row", overflow: "hidden" }}>
                  <Ionicons name="pin" size={20} color="#7a9e9f" />
                  <Text style={{ fontWeight: "500" }}>
                    {(item.address?.addressText).slice(0, 30)} {(item.address?.addressText).length > 30 ? "..." : ""}
                  </Text>
                </View>
                <View style={[styles.displayFlex, { marginTop: 10 }]}>
                  <View style={{ width: 50, height: 30, borderRadius: 3, backgroundColor: themeColors.primary, marginLeft: 5 }}>
                    <View style={[styles.displayFlex, { padding: 5 }]}>
                      <Ionicons name="bed" size={17} color="white" />
                      <Text style={{ color: 'white', marginLeft: 5, fontWeight: 500 }}>{item && item.beds}</Text>
                    </View>
                  </View>
                  <View style={{ width: 50, height: 30, borderRadius: 3, backgroundColor: themeColors.primary, marginLeft: 5 }}>
                    <View style={[styles.displayFlex, { padding: 5 }]}>
                      <MaterialCommunityIcons name="shower" size={17} color="white" />
                      <Text style={{ color: 'white', marginLeft: 5, fontWeight: 500 }}>{item && item.bath}</Text>
                    </View>
                  </View>
                </View>

              </SafeAreaView>
            </View>
          </View >
        </TouchableOpacity >
      </View >
    );
  };

  const renderAd = ({ item, index }) => {
    return (
      <View key={index} style={styles.adContainer}>
        {/* Advertisement content */}
        <Text style={styles.adText} key={index}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.containerFlex}>
      {/* Header */}
      <View style={styles.topBottomFlex}>
        <Header></Header>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <FilterData
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          formdata={formData}
          setFormData={setFormData}
          filterDataFunction={filterData}
        ></FilterData>

        <View style={styles.homeSearch}>
          <TextInput
            style={styles.input}
            onChangeText={() => {
            }}
            value={searchTerm}
            placeholder="Search Value"
          />
          <View style={styles.searchIcon}>
            <Ionicons name="search" size={30} color="#FFFFFF" />
          </View>
          <View style={styles.FilterIcon}>
            <Ionicons onPress={() => setModalVisible(true)} name="filter" size={30} color="#7a9e9f" />
          </View>
        </View>
        <View style={styles.homeMainText}>
          <TouchableHighlight onPress={() => setModalGooglePlaces(true)}>
            <View style={{ flexDirection: "row" }}>
              <>
                <Ionicons onPress={() => setModalVisible(true)} name="pin" size={23} color="#7a9e9f" />
                <Text style={{ fontSize: 15, color: "blue", textDecorationLine: "underline", marginTop: 5 }}>
                  {formData && formData.address && formData.address?.addressText} click
                </Text>
              </>
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <FlatList
            {...panResponder.panHandlers}
            data={dataWithAds}
            renderItem={({ item, index }) => (item.isAd ? renderAd({ item, index }) : renderItem({ item, index }))}
            keyExtractor={(item, index) => (item.isAd ? item.id : item.listingId)}
            contentContainerStyle={styles.container}
          />
        </View>
        {/* <View style={styles.bodyViewHome}>
            {listings.data?.map((item, index) => {
              return (
                <View key={index}>
                  {index % 2 === 0 ? (
                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                      <View key={index} style={styles.eachViewItem}>
                        <TouchableHighlight
                          key={index}
                          onPress={() => navigation.navigate("ViewItem", { data: item.listingId })}
                          underlayColor="#DDDDDD"
                        >
                          <View>
                            <View style={styles.itemImage}>
                              <Image style={styles.infoImage} resizeMode="cover" src={item.images[0]}></Image>
                            </View>
                            <Text style={styles.itemText}>{item.address.addressText}</Text>
                          </View>
                        </TouchableHighlight>
                      </View>
                      <View key={index + 1 + "margin"} style={{ width: "2%" }}></View>
                      <View key={index + 1} style={styles.eachViewItem}>
                        {listings.data[index + 1] ? (
                          <TouchableHighlight
                            key={index + 1}
                            onPress={() =>
                              navigation.navigate("ViewItem", { data: listings.data[index + 1].listingId })
                            }
                            underlayColor="#DDDDDD"
                          >
                            <View>
                              <View style={styles.itemImage}>
                                <Image
                                  style={styles.infoImage}
                                  resizeMode="cover"
                                  src={listings.data[index + 1].images[0]}
                                ></Image>
                              </View>
                              <Text style={styles.itemText}>{listings.data[index + 1].address.addressText}</Text>
                            </View>
                          </TouchableHighlight>
                        ) : (
                          ""
                        )}
                      </View>
                    </View>
                  ) : (
                    ""
                  )}
                  <View>{listings.data && (index + 1) % 6 === 0 ? <ShowAdd></ShowAdd> : <View></View>}</View>
                </View>
              );
            })}
          </View> */}
      </View>

      {/* Footer */}
    </View>
  );
}
