import { Modal, View, Text, Pressable } from "react-native";
import MapAreaSelector from "./MapAreaSelector";
import RemoteDataSetExample from "../components/GooglePlaces";
import { styles } from "../../styles/mainCss";
import React, { useCallback, useEffect, useState } from "react";
import { themeColors } from "../../styles/base";
import axios from "axios";
import AnimateButton from "../AddItems/animateButton";

export default function FilterData({ modalVisible, setModalVisible, formdata, setFormData, filterDataFunction }) {
  const [latLon, setLatLon] = useState({ longitude: "", latitude: "", latitudeDelta: 0.5, longitudeDelta: 0.5 });
  const [placeIdValue, setPlaceId] = useState();

  async function getLocation(placeId) {
    if (placeId !== placeIdValue) {
      setPlaceId(placeId);
      const response = await axios.post(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyDtaONwav4HNhpa-hDwzMwqIL_bQwse-lA`,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data && response.data.result && response.data.result.geometry) {
        setLatLon({
          latitude: response.data.result.geometry.location.lat,
          longitude: response.data.result.geometry.location.lng,
          latitudeDelta: 0.6,
          longitudeDelta: 0.6,
        });
      }
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ zIndex: 300 }}>
            <RemoteDataSetExample
              cities={true}
              formData={formdata.address}
              callingFunction={getLocation}
            ></RemoteDataSetExample>
          </View>
          <View style={{ width: "100%", height: 400, borderWidth: 2, borderColor: themeColors.primary }}>
            {latLon ? <MapAreaSelector locationInfo={latLon} formData={formdata}></MapAreaSelector> : ""}
          </View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Pressable style={{ padding: 2 }}>
              <AnimateButton name={"Cancel"} callingFunction={() => setModalVisible(!modalVisible)}></AnimateButton>
            </Pressable>
            <Pressable style={{ padding: 2 }}>
              <AnimateButton name={"Filter"} callingFunction={() => filterDataFunction()}></AnimateButton>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
