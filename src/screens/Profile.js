import { ScrollView } from "../components/themed/Themed";
import { ProfilePicture } from "../components/profile/ProfilePicture";
import { StatusBar, useColorScheme } from "react-native";
import { ProfileInformation } from "../components/profile/ProfileInformation";
import { ProfilePermissions } from "../components/profile/ProfilePermissions";

export const Profile = () => {
  const theme = useColorScheme();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 50 }} >
      <ProfilePicture />
      <ProfileInformation />
      <ProfilePermissions />
      <StatusBar
        barStyle={theme === "dark" ? "dark-content" : "light-content"}
      />
    </ScrollView>
  );
};
