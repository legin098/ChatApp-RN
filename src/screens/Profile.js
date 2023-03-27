import { useEffect, useState } from "react"
import { MyText } from "../components/MyText"
import { Auth } from "aws-amplify"
import { MyButton } from "../components/MyButton"
import { View } from "../components/themed/Themed"

export const Profile = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const { attributes } = await Auth.currentAuthenticatedUser()
        setUser(attributes)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

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
      <MyText>{user?.sub}</MyText>
      <MyText>{user?.email}</MyText>
      <MyButton title={"Sign Out"} onPress={handleSignOut} />
    </View>
  )
}