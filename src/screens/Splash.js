import { useEffect } from "react";
import { View } from "react-native";
import { MyText } from "../components/MyText";
import { Auth } from "aws-amplify";

export const Splash = ({ setUser, setIsLoading }) => {
  useEffect(() => {
    (async () => {
      try {
        const { attributes } = await Auth.currentAuthenticatedUser();
        setUser(attributes);
        setIsLoading(false);
        console.log(attributes);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MyText type="title">🕰️</MyText>
      <MyText type="title">Loading...</MyText>
    </View>
  );
};
