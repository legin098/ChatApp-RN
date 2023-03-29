import { MyText } from "../components/MyText"
import { Auth } from "aws-amplify"
import { MyButton } from "../components/MyButton"
import { View } from "../components/themed/Themed"
import { useSelector } from "react-redux"

export const Profile = () => {

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
      <MyText type="title">Welcome back! 🚀</MyText>
      <MyText>{user.id}</MyText>
      <MyText>{user.email}</MyText>
      <MyText>{user.firstName}</MyText>
      <MyText>{user.lastName}</MyText>
      <MyButton title={"Sign Out"} onPress={handleSignOut} />
    </View>
  )
}