import React, { useState, useEffect } from "react";
import { Image, View, Pressable, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../styles/mainCss";
export default function UploadImage({ formData, setFormData }) {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const addImage = async () => {
    let _images = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      aspect: [4, 3],
      quality: 5,
      allowsMultipleSelection: true,
      //base64: true,
    }).then((images) => {
      for (let image of images.assets) {
        setImages((images) => [...images, image.uri]);
      }
      setFormData({ ...formData, images: images.assets });
    });
  };

  const removeImage = (index) => {
    let imagesCopy = [...images];
    imagesCopy.splice(index, 1);
    setImages([...imagesCopy]);
    setFormData({ ...formData, images: images.assets });
  };

  return (
    <View>
      <View>
        {images.length > 0 && (
          <View style={styles.bodyView}>
            {images?.map((imageuri, index) => {
              return (
                <View style={styles.imagePicked}>
                  <Image key={index} source={{ uri: imageuri }} resizeMode="cover" style={styles.eachImagePicked} />
                  <View style={styles.removelinkOnImgae}>
                    <Pressable onPress={() => removeImage(index)}>
                      <Text style={{ fontSize: 15, color: "blue", textDecorationLine: "underline" }}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
      <View style={imageUploaderStyles.container}>
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn}>
            <Text>{image ? "Edit" : "Upload"} Image</Text>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const imageUploaderStyles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 5,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    padding: 3,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "100%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
