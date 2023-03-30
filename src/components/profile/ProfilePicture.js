import { View, StyleSheet, Image, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MyText } from "../MyText";
import * as ImagePicker from "expo-image-picker";
import { CLOUD_NAME, UPLOAD_PRESET } from "@env";
import { resetProfilePicture } from "../../features/user";
import { updateUserPicture } from "../../utils/userOperations";

function ProfileFallback({ firstName }) {
  return (
    <View style={styles.fallback}>
      <MyText style={styles.initialLetter}>{firstName[0]}</MyText>
    </View>
  );
}

export const ProfilePicture = () => {
  const user = useSelector((state) => state.user);
  const { firstName, lastName, profilePicture, id } = user;
  const dispatch = useDispatch();

  const pickeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
      base64: true,
    });

    let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
    const data = new FormData();
    data.append("file", base64Img);
    data.append("upload_preset", UPLOAD_PRESET);

    if (!result.canceled) {
      savePhotoInCloudinary(data);
    }
  };

  const savePhotoInCloudinary = async (data) => {
    let apiUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: data,
      });
      const json = await response.json();
      //save to db
      await updateUserPicture(id, json.url);
      //set image to redux
      dispatch(resetProfilePicture(json.url));
    } catch (error) {
      console.log("savePhotoInCloudinary error", error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pickeImage}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        ) : (
          <ProfileFallback firstName={firstName} />
        )}
      </Pressable>
      <MyText style={{ fontWeight: "bold" }}>
        {firstName} {lastName}
      </MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
  },
  fallback: {
    backgroundColor: "lightcoral",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 6,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 6,
  },
  initialLetter: {
    fontSize: 60,
    textAlign: "center",
    color: "white",
  },
});
