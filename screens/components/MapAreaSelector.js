import { View, Text } from "react-native";
import MapView, { Circle } from "react-native-maps";
import Slider from "@react-native-community/slider";
import { themeColors } from "../../styles/base";
import { useState } from "react";

export default function MapAreaSelector(props) {
  const [kmsRange, setKmsRange] = useState(5);
  props.formData.range = kmsRange;
  console.log(props);
  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} initialRegion={props.locationInfo} region={props.locationInfo}>
        <Circle center={props.locationInfo} radius={kmsRange * 1000} strokeColor={"white"} strokeWidth={3}></Circle>
      </MapView>
      <View style={{ alignItems: "center", flexDirection: "row", margin: 3 }}>
        <Slider
          style={{ width: "75%", height: 40 }}
          minimumValue={5}
          step={1}
          maximumValue={100}
          minimumTrackTintColor={themeColors.primary}
          maximumTrackTintColor="#000000"
          onValueChange={(someValue) => setKmsRange(Number(someValue))}
        />
        <Text style={{ marginLeft: 3 }}>{kmsRange} kms</Text>
      </View>
    </View>
  );
}
