import { Amplify, Hub } from "aws-amplify";
import { useState } from "react";
import { useColorScheme } from "react-native";
import awsConfig from "./src/aws-exports";
import { Root } from "./src/navigation/Root";
import AuthScreen from "./src/screens/Auth";
import { Splash } from "./src/screens/Splash";

Amplify.configure(awsConfig);

export default App = () => {
  const theme = useColorScheme()
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const listener = (data) => {
    switch (data.payload.event) {
      case "signIn":
        const { attributes } = data.payload.data;
        setUser(attributes);
        console.log("user signed in from Hub");
        break;
      case "signOut":
        setUser(null);
        console.log("user signed out");
      default:
        break;
    }
  };

  Hub.listen("auth", listener)

  if (isLoading) return <Splash setUser={setUser} setIsLoading={setIsLoading} />;
  return user ? <Root colorScheme={theme} /> : <AuthScreen />;
};
