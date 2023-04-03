import {
  useColorScheme,
  View,
  StyleSheet,
  Switch,
  Alert,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../../constants/colors";
import { MyText } from "../MyText";
import { isDevice } from "expo-device";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import {
  deleteUser,
  updateUserLocation,
  updateUserNotificationToken,
} from "../../utils/userOperations";
import {
  resetLocation,
  resetNotificationToken,
  resetUser,
} from "../../features/user";
import { requestLocationPermissions } from "../../utils/requestUserLocation";
import { Auth } from "aws-amplify";

export const ProfilePermissions = () => {
  const theme = useColorScheme();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function handleToggleNotifications() {
    if (isDevice) {
      if (user.notificationToken === null) {
        const token = await registerForPushNotificationsAsync();
        if (token !== null) {
          await updateUserNotificationToken(user.id, token);
          dispatch(resetNotificationToken(token));
          console.log(token);
        }
      } else {
        await updateUserNotificationToken(user.id, null);
        dispatch(resetNotificationToken(null));
      }
    } else {
      alert("This do not work on a simulator");
    }
  }

  async function handleToggleLocation() {
    if (user.latitude === null) {
      const location = await requestLocationPermissions();
      if (location !== null) {
        await updateUserLocation(user.id, location);
        dispatch(resetLocation(location));
      }
    } else {
      await updateUserLocation(user.id, { latitude: null, longitude: null });
      dispatch(resetLocation({ latitude: null, longitude: null }));
    }
  }

  async function handleSignOut() {
    try {
      Auth.signOut();
      dispatch(resetUser());
    } catch (error) {
      console.log("handleSignOut", error);
    }
  }

  async function handleDeleteAccount() {
    Alert.alert(
      "Delete Account",
      "Your information will be permanently deleted, you can't revert this action",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
          style: "cancel",
        },
        {
          text: "Delete Account",
          onPress: async () => {
            await deleteUser(user.id);
            await Auth.deleteUser();
            dispatch(resetUser());
            console.log("Account deleted successfully");
          },
          style: "destructive",
        },
      ]
    );
  }

  return (
    <View>
      <MyText
        type="caption"
        style={{ fontWeight: "600", color: Colors[theme].text + "40" }}
      >
        PERMISSIONS
      </MyText>
      <InfoField
        label={"Notifications"}
        value={user.notificationToken ? true : false}
        theme={theme}
        handleUpdate={handleToggleNotifications}
      />
      <InfoField
        label={"Location"}
        value={user.latitude ? true : false}
        theme={theme}
        handleUpdate={handleToggleLocation}
      />
      <Pressable
        style={[
          styles.fieldContainer,
          { borderBottomColor: Colors[theme].text + "80", paddingVertical: 22 },
        ]}
        onPress={handleSignOut}
      >
        <MyText
          type="caption"
          style={{
            fontWeight: "500",
            color: Colors[theme].text + "80",
            paddingRight: 10,
          }}
        >
          Sign out
        </MyText>
      </Pressable>
      <Pressable
        style={[
          styles.fieldContainer,
          { borderBottomColor: Colors[theme].text + "80", paddingVertical: 22 },
        ]}
        onPress={handleDeleteAccount}
      >
        <MyText
          type="caption"
          style={{
            fontWeight: "500",
            color: Colors[theme].red,
            paddingRight: 10,
          }}
        >
          Delete Account
        </MyText>
      </Pressable>
    </View>
  );
};

function InfoField({ label, value, theme, handleUpdate }) {
  return (
    <View
      style={[
        styles.fieldContainer,
        { borderBottomColor: Colors[theme].text + 80 },
      ]}
    >
      <MyText
        type="caption"
        style={{
          fontWeight: "500",
          color: Colors[theme].text + "80",
          paddingRight: 10,
        }}
      >
        {label}
      </MyText>
      <Switch value={value} onChange={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15,
    alignItems: "center",
  },
});
