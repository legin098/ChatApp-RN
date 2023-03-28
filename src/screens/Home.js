import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { MyText } from "../components/MyText";
import { View } from "../components/themed/Themed";

export const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function checkFirstLaunch() {
      const firstLaunch = await AsyncStorage.getItem("@firstLaunch");
      if (firstLaunch === null) navigation.navigate("Onboarding");
    }
    checkFirstLaunch();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MyText type="title">Home</MyText>
    </View>
  );
};
