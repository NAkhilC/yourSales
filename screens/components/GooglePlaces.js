import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

const API_KEY = "Your-API-Key";

export default class GooglePlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: "",
      searchResults: [],
      isShowingResults: false,
      placeId: null,
      geoPosition: null,
    };
  }

  componentDidUpdate(prevProps) {
    this.props.formData.addressText = this.state.searchKeyword;
    this.props.formData.placeId = this.state.placeId;
    if (this.state.searchKeyword.length > 3 && !this.state.isShowingResults && this.props?.callingFunction) {
      this.props.callingFunction(this.state.placeId);
    }
  }

  searchLocation = async (text) => {
    this.setState({ searchKeyword: text });
    if (text.length > 2) {
      axios
        .request({
          method: "post",
          url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${"AIzaSyDtaONwav4HNhpa-hDwzMwqIL_bQwse-lA"}&sensor=false&${
            this.props.cities ? "types=(cities)" : ""
          }&input=${this.state.searchKeyword}`,
        })
        .then((response) => {
          this.setState({
            searchResults: response.data.predictions,
            isShowingResults: true,
            placeId: response.data.predictions[0]?.place_id,
          });
        })
        .catch((e) => {
          console.log(e.response);
        });
    } else {
      this.setState({
        searchResults: "",
        isShowingResults: false,
        placeId: "",
      });
    }
  };

  changeLocation = (e) => {
    this.setState({
      searchResults: "",
      isShowingResults: false,
      placeId: "",
      searchKeyword: "",
    });
  };

  render() {
    return (
      <>
        <View style={styles.autocompleteContainer}>
          <TextInput
            placeholder="Type address"
            returnKeyType="search"
            style={styles.searchBox}
            placeholderTextColor="#000"
            onChangeText={(text) => this.searchLocation(text)}
            value={this.state.searchKeyword}
          />

          {this.state.isShowingResults && (
            <FlatList
              data={this.state.searchResults}
              scrollEnabled={false}
              key={this.state.searchResults}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={styles.resultItem}
                    key={index}
                    onPress={() =>
                      this.setState({
                        searchKeyword: item.description,
                        isShowingResults: false,
                      })
                    }
                  >
                    <Text>{item.description}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id}
              style={styles.searchResultsContainer}
            />
          )}
        </View>
        <Text style={{ color: "blue", padding: 2 }} onPress={this.changeLocation}>
          Change location
        </Text>
        <View style={styles.dummmy}>
          {/* <View style={styles.itemViewGeneralInfo}>
            {this.state.geoPosition?.lat && this.state.geoPosition?.lng ? (
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: this.state.geoPosition?.lat,
                  longitude: this.state.geoPosition?.lng,
                  latitudeDelta: 0.03358723958820065,
                  longitudeDelta: 0.04250270688370961,
                }}
              >
                <Marker
                  key="1"
                  coordinate={{
                    latitude: this.state.geoPosition?.lat,
                    longitude: this.state.geoPosition?.lng,
                    latitudeDelta: 0.03358723958820065,
                    longitudeDelta: 0.04250270688370961,
                  }}
                />
              </MapView>
            ) : (
              ""
            )}
          </View> */}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    zIndex: 200,
    width: "90%",
  },
  searchResultsContainer: {
    height: 200,
    backgroundColor: "#fff",
    position: "absolute",
    top: 50,
  },
  dummmy: {
    height: 10,
    marginTop: 20,
  },
  resultItem: {
    width: "100%",
    justifyContent: "center",
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  searchBox: {
    width: 300,
    height: 40,
    fontSize: 18,
    marginTop: 20,
    color: "#000",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
  itemViewGeneralInfo: {
    backgroundColor: "white",
    marginTop: 10,
    height: 200,
    padding: 15,
  },
});
