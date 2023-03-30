import { MyText } from "../components/MyText"
import { Auth } from "aws-amplify"
import { MyButton } from "../components/MyButton"
import { View } from "../components/themed/Themed"
import { useSelector } from "react-redux"
import { ProfilePicture } from "../components/ProfilePicture"
import { StatusBar, useColorScheme } from "react-native"

export const Profile = () => {

  const theme = useColorScheme();
  const user = useSelector((state) => state.user)

  const handleSignOut = async () => {
    try {
      await Auth.signOut()
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{flex: 1}}>
      <ProfilePicture />
      <MyButton title={"Sign Out"} onPress={handleSignOut} />
      <StatusBar
        barStyle={theme === "dark" ? "dark-content" : "light-content"}
      />
    </View>
  )
}