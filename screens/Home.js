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
} from "react-native";
import React, { useState, useRef } from "react";
import Modal from "react-native-modal";

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
import { userListings } from "../store/actions/user.action";
import FilterData from "./components/FilterData";

export default function Home({ navigation }) {
  const [searchTerm, onChangeSearchTerm] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalGooglePlaces, setModalGooglePlaces] = useState(false);
  const [images, setImages] = useState();
  const [listings, setListings] = useState([]);
  let listItems = fakeData;
  const dispatch = useDispatch();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const isFocused = useIsFocused();

  const [location, setLocation] = useState({
    address: {
      addressText: "",
      placeId: "",
    },
    range: "",
  });

  function filterData() {
    setModalVisible(!modalVisible);
    console.log(location);
  }

  React.useEffect(() => {
    axios.get(`${API_URL}/items`).then((a) => {
      if (a.status === 200) {
        //setListings({});
        setListings(a.data);
        dispatch(
          userListings({
            listings: a.data,
          })
        );
      }
    });
  }, []);

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
          axios.get(`${API_URL}/items`).then((a) => {
            if (a.status === 200) {
              //setListings({});
              setListings(a.data);
              dispatch(
                userListings({
                  listings: a.data,
                })
              );
            }
          });
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

  React.useEffect(() => {
    console.log(location, "- Has changed");
  }, [location.address.placeId]);

  //chat gpt
  const itemsPerRow = 2;
  const adInterval = 4;

  const dataWithAds = listings.data
    ?.flatMap((item, index) => {
      if ((index + 1) % adInterval === 0) {
        const adIndex = Math.floor(index / adInterval) % AD_DATA.length;
        return [item, { ...AD_DATA[adIndex], isAd: true }];
      }
      return item;
    })
    .flat();

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ViewItem", { data: item.listingId })}>
          <View style={styles.itemImage}>
            <Image style={styles.infoImage} resizeMode="cover" src={item.images[0]}></Image>
          </View>

          {/* <Text style={styles.itemText}>{item.address?.addressText}</Text> */}
          <View style={{ padding: 2, overflow: "hidden" }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Ionicons name="calendar" size={17} color="#7a9e9f" />
              <Text style={{ marginLeft: 2, fontWeight: "500" }}>
                {new Date(item?.eventStart).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
            <View style={{ display: "flex", marginTop: 4, flexDirection: "row", overflow: "hidden" }}>
              <Ionicons name="pin" size={20} color="#7a9e9f" />
              <Text style={{ fontWeight: "500" }}>
                {(item.address?.addressText).slice(0, 30)} {(item.address?.addressText).length > 30 ? "..." : ""}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
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
          formdata={location}
          setFormData={setLocation}
          filterDataFunction={filterData}
        ></FilterData>

        <View style={styles.homeSearch}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeSearchTerm}
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
                  {location.address.addressText}j
                </Text>
              </>
            </View>
          </TouchableHighlight>
          <Text style={{ fontSize: 20 }} onPress={() => navigation.navigate("addItem")}>
            <Ionicons onPress={() => setModalVisible(true)} name="add-outline" size={25} color="#7a9e9f" />
            Add Item
          </Text>
        </View>
        <View>
          <FlatList
            {...panResponder.panHandlers}
            data={dataWithAds}
            renderItem={({ item, index }) => (item.isAd ? renderAd({ item, index }) : renderItem({ item, index }))}
            keyExtractor={(item, index) => (item.isAd ? item.id : item.listingId)}
            numColumns={itemsPerRow}
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
