import * as Location from "expo-location";
import { Alert, Linking } from "react-native";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";

export async function requestLocationPermissions() {
  let { status } = await Location.requestForegroundPermissionsAsync()
  if( status !== "granted") {
    Alert.alert(
      "Location permission denied",
      "Please enable location for this app in your phone settings",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
          style: "cancel",
        },
        {
          text: "Go to Settings",
          onPress: () => {
            if (Platform.OS === "ios") {
              Linking.openURL("app-settings:notifications");
            } else if (Platform.OS === "android") {
              startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
            } else {
              return;
            }
          },
          style: "default",
        },
      ]
    );
    return null
  }
  const location = await Location.getCurrentPositionAsync({})
  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude

  return {
    latitude,
    longitude
  }
}