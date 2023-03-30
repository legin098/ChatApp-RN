import { Auth } from "aws-amplify";
import { MyButton } from "../components/MyButton";
import { ScrollView } from "../components/themed/Themed";
import { ProfilePicture } from "../components/profile/ProfilePicture";
import { StatusBar, useColorScheme } from "react-native";
import { ProfileInformation } from "../components/profile/ProfileInformation";

export const Profile = () => {
  const theme = useColorScheme();

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <ProfilePicture />
      <ProfileInformation />
      <MyButton title={"Sign Out"} onPress={handleSignOut} />
      <StatusBar
        barStyle={theme === "dark" ? "dark-content" : "light-content"}
      />
    </ScrollView>
  );
};
