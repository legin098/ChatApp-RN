import { MyText } from "../components/MyText";
import { MyButton } from "../components/MyButton";
import { View } from "../components/themed/Themed";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Image, View as DefaultView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal } from "react-native";

export const Onboarding = () => {
  const navigation = useNavigation();

  async function handleOnContinue() {
    try {
      await AsyncStorage.setItem("@firstLaunch", "true");
      navigation.navigate("Home");
      //TODO: Ask permitions, get token and location
    } catch (error) {
      console.log("Onboarding error", error);
    }
  }

  return (
    <Modal presentationStyle="overFullScreen" visible={true}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <MyText style={styles.title} type="title">
          Welcome to
        </MyText>
        <MyText style={[styles.title, { marginBottom: 30 }]} type="title">
          Only Chats
        </MyText>
        {appFeatures.map((feature, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={feature.icon} style={styles.icon} />
            <DefaultView style={styles.textWrapper}>
              <MyText type="caption" style={{ fontWeight: "bold" }}>
                {feature.title}
              </MyText>
              <MyText type="caption">{feature.description}</MyText>
            </DefaultView>
          </View>
        ))}
        <MyButton
          style={{ marginTop: 50 }}
          title={"Continue"}
          onPress={handleOnContinue}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  icon: {
    width: 58,
    height: 58,
    marginRight: 13,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 13,
  },
  textWrapper: {
    flexShrink: 1,
  },
});

const appFeatures = [
  {
    icon: require("../../assets/post.png"),
    title: "Creating Post",
    description: "Create post and share ideas with members of the community",
  },
  {
    icon: require("../../assets/message.png"),
    title: "Create chats with friends",
    description:
      "Start a conversation with friends, send messages at the speed of light",
  },
  {
    icon: require("../../assets/bell.png"),
    title: "Keep updated with notifications",
    description:
      "Get notified whenever someone likes your posts or sends you a message",
  },
];
