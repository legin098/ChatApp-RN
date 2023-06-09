import * as Notifications from "expo-notifications";
import { isDevice } from "expo-device";
import { Alert, Linking } from "react-native";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
  let token;

  if (isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Notifications permission denied",
        "Please enable notifications for this app in your phone settings",
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
                startActivityAsync(ActivityAction.NOTIFICATION_SETTINGS);
              } else {
                return;
              }
            },
            style: "default",
          },
        ]
      );
      return null;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("This is the token", token);
  } else {
    return;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#ff231f7c",
    });
  }

  return token;
}
