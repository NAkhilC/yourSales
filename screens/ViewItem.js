import { Text, View, TouchableHighlight, Image, TextInput, Pressable, Linking, Modal } from "react-native";
import Header from "./Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../styles/mainCss";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { themeColors } from "../styles/base";
import MapView, { Marker } from "react-native-maps";
import React, { useState } from "react";
import axios from "axios";
import { API_URL, API_TOKEN } from "@env";
import Communications from "react-native-communications";

export default function ViewItem() {
  const route = useRoute();
  const data = route.params?.data;
  const [currentData, setCurrentData] = useState();
  const [currentImage, setCurrentImage] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [latLon, setLatLon] = useState({
    latitude: "",
    longitude: "",
    latitudeDelta: "",
    longitudeDelta: "",
  });

  const isFocused = useIsFocused();

  const handleOpenMap = () => {
    // const address = "1600 Amphitheatre Parkway, Mountain View, CA"; // Replace with your desired address
    // const url = `http://maps.google.com/?q=${encodeURIComponent(address)}`;

    // Communications.web(url);
    setModalVisible(!isModalVisible);
  };

  React.useEffect(() => {
    if (isFocused && data) {
      axios.get(`${API_URL}/item/${data}`).then((itemDetails) => {
        if (itemDetails.data.status === 200) {
          setCurrentData(itemDetails.data.data);
          console.log(itemDetails.data.data.saved);
          if (itemDetails.data.data?.images.length > 0) {
            setCurrentImage(0);
          }
          if (itemDetails.data.data?.address?.placeId) {
            getLatAndLon(itemDetails.data.data.address.placeId);
          }
        }
      });
    }
  }, [isFocused]);

  function changeImage(direction) {
    let imgIndex = currentImage;
    console.log(imgIndex);
    if (direction === "right" && currentData && currentData.images.length > imgIndex + 1) {
      imgIndex++;
      setCurrentImage(imgIndex);
    } else if (direction === "left" && currentData && imgIndex > 0) {
      imgIndex--;
      setCurrentImage(imgIndex);
    }
    console.log(imgIndex);
  }

  function getLatAndLon(placeId) {
    console.log(placeId);
    axios
      .request({
        method: "post",
        url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyDtaONwav4HNhpa-hDwzMwqIL_bQwse-lA`,
      })
      .then((response) => {
        setLatLon({
          latitude: response.data.result.geometry.location.lat,
          longitude: response.data.result.geometry.location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        console.log(latLon, "****");
      })
      .catch((e) => {
        console.log(e.response);
      });
  }

  interestedItem = () => {
    axios
      .post(`${API_URL}/items/interested`, JSON.stringify({ listingId: currentData?.listingId }), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          setCurrentData({ ...currentData, interested: !currentData.interested });
        } else {
          alert("Action cannot be performed!");
        }
      });
  };

  savedItem = () => {
    axios
      .post(`${API_URL}/items/saved`, JSON.stringify({ listingId: currentData?.listingId }), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          setCurrentData({ ...currentData, saved: !currentData.saved });
        } else {
          alert("Action cannot be performed!");
        }
      });
  };

  function penGoogleMaps() {
    const address = "1600 Amphitheatre Parkway, Mountain View, CA"; // Replace with your desired address
    const url = `http://maps.google.com/?q=${(latLon.latitude, latLon.longitude)}`;

    Communications.web(url);
  }

  //console.log(findListingInUser);
  return (
    <View style={[styles.containerFlex, { opacity: isModalVisible ? 0.5 : 1 }]}>
      {/* Header */}
      <View style={styles.topBottomFlex}>
        <Header></Header>
      </View>

      {/* Body */}
      {/* {currentData ? ( */}

      <View style={styles.body}>
        <KeyboardAwareScrollView>
          <View style={styles.mainItemView}>
            {/* Image */}
            <View style={styles.itemViewImageContainer}>
              <View style={styles.itemViewImage}>
                {currentData ? (
                  <View>
                    <View style={styles.imageChangerLeftButton}>
                      <TouchableHighlight onPress={() => changeImage("left")}>
                        <Text style={{ height: "100%" }}></Text>
                      </TouchableHighlight>
                    </View>

                    <Image style={styles.infoImage} resizeMode="cover" src={currentData.images[currentImage]}></Image>
                    <View style={styles.currentImageHighlighter}>
                      <View style={styles.currentImageInnerView}>
                        {currentData &&
                          currentData.images.map((img, index) => {
                            return (
                              <Text style={{ padding: 2 }}>
                                <Ionicons
                                  name="ellipse"
                                  size={currentImage === index ? 12 : 10}
                                  color={currentImage === index ? "white" : "gray"}
                                />
                              </Text>
                            );
                          })}
                      </View>
                    </View>
                    <View style={styles.imageChangerRightButton}>
                      <TouchableHighlight onPress={() => changeImage("right")}>
                        <Text style={{ height: "100%" }}></Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                ) : (
                  <Text>No image</Text>
                )}
              </View>
              <View style={styles.imageMainFooter}>
                <View style={styles.imageSubFooter1}>
                  <View style={styles.imageFooterIcon1}>
                    <Pressable
                      onPress={() => {
                        interestedItem();
                      }}
                    >
                      {currentData && currentData.interested ? (
                        <Ionicons name="heart" size={30} color={themeColors.primary} />
                      ) : (
                        <Ionicons name="heart-outline" size={30} color={themeColors.primary} />
                      )}
                      <Text>Interested</Text>
                    </Pressable>
                  </View>
                  {/* <View style={styles.imageFooterIcon1}>
                    <Pressable
                      onPress={() => {
                        savedItem();
                      }}
                    >
                      {currentData?.saved ? (
                        <Ionicons name="save" size={30} color={themeColors.primary} />
                      ) : (
                        <Ionicons name="save-outline" size={30} color={themeColors.primary} />
                      )}
                      <Text>Save</Text>
                    </Pressable>
                  </View> */}
                </View>
                <View style={styles.imageSubFooter1}>
                  <View style={styles.imageFooterIcon2}>
                    <Ionicons name="eye-outline" size={30} color={themeColors.primary} />
                    <Text>2136</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.itemViewGeneralInfo}>
              <Text style={styles.viewItemName}>{currentData?.title ? currentData?.title : "No Title"}</Text>
              <View style={styles.viewItemDetails}>
                <Text style={styles.viewItemDetailLabel}>Event Details</Text>
                <>
                  <Text style={styles.timeAndLocation}>Time</Text>
                  <Text>
                    {new Date(currentData?.eventStart).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <Text> - </Text>
                    {new Date(currentData?.eventEnd).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </>

                {/* {currentData?.location ? ( */}
                <>
                  <Text style={styles.timeAndLocation}>Location</Text>
                  <Text>{currentData?.address.addressText}</Text>
                </>
                {/* ) : (
                  {}
                )} */}
              </View>
            </View>

            <View style={styles.itemViewGeneralInfoDesc}>
              <Text style={styles.viewItemName}>Description</Text>
              <View style={styles.viewItemDetails}>
                <Text>{currentData?.description ? currentData?.description : "No description"}</Text>
              </View>
            </View>

            {/* map location */}
            <View style={styles.itemViewGeneralInfo}>
              {latLon ? (
                <MapView style={{ flex: 1 }} initialRegion={latLon} region={latLon}>
                  <Marker key="1" coordinate={latLon} />
                </MapView>
              ) : (
                <Text>No map preview Available</Text>
              )}
              <Text>
                <TouchableHighlight onPress={handleOpenMap}>
                  <Text>Open</Text>
                </TouchableHighlight>
              </Text>
              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                  setModalVisible(!isModalVisible);
                }}
              >
                <View style={[styles.centeredView, { marginTop: 350 }]}>
                  <View style={styles.modalViewSmall}>
                    <View
                      style={{
                        marginTop: 20,
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <TouchableHighlight
                        onPress={() => {
                          setModalVisible(!isModalVisible);
                          try {
                            const url = `http://maps.google.com/?q=${latLon.latitude},${latLon.longitude}`;
                            Communications.web(url);
                          } catch (e) {
                            alert("cannot open");
                          }
                        }}
                      >
                        <View style={{ height: 30, backgroundColor: "white" }}>
                          <Text style={{ fontSize: 20 }}>Google Maps</Text>
                        </View>
                      </TouchableHighlight>
                    </View>

                    <View
                      style={{
                        marginTop: 20,
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <TouchableHighlight
                        onPress={() => {
                          setModalVisible(!isModalVisible);
                        }}
                      >
                        <View style={{ height: 30, backgroundColor: "white" }}>
                          <Text style={{ fontSize: 20 }}>Apple Maps</Text>
                        </View>
                      </TouchableHighlight>
                    </View>

                    <View
                      style={{
                        marginTop: 20,
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <TouchableHighlight
                        onPress={() => {
                          setModalVisible(!isModalVisible);
                          try {
                            const url = `maps.apple.com/?ll=${latLon.latitude},${latLon.longitude}`;
                            Communications.web(url);
                          } catch (e) {
                            alert("cannot open");
                          }
                        }}
                      >
                        <View style={{ height: 30, backgroundColor: "white" }}>
                          <Text style={{ fontSize: 20 }}>Close</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      {/* ) : (
        <Text>Loading</Text>
      )} */}
    </View>
  );
}
