import { Amplify, Hub, API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/app/store";
import awsConfig from "./src/aws-exports";
import { resetUser, setUser } from "./src/features/user";
import { getUser } from "./src/graphql/queries";
import Root from "./src/navigation/Root";
import AuthScreen from "./src/screens/Auth";
import { Splash } from "./src/screens/Splash";

Amplify.configure(awsConfig);

export default function Wrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = () => {
  const theme = useColorScheme();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const listener = async (data) => {
    switch (data.payload.event) {
      case "signIn":
        const user = await API.graphql(
          graphqlOperation(getUser, { id: data.payload.data.attributes.sub })
        );
        dispatch(
          setUser({
            id: user.data.getUser.id,
            firstName: user.data.getUser.firstName,
            lastName: user.data.getUser.lastName,
            profilePicture: user.data.getUser.profilePicture,
            email: user.data.getUser.email.toLowerCase(),
            status: user.data.getUser.status,
            notificationToken: user.data.getUser.notificationToken,
          })
        );
        console.log("user signed in");
        break;
      case "signOut":
        dispatch(resetUser());
        console.log("user signed out");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    Hub.listen("auth", listener);
  }, []);

  if (isLoading) return <Splash setIsLoading={setIsLoading} />;
  return user.email ? <Root colorScheme={theme} /> : <AuthScreen />;
};
