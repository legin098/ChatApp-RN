import { useEffect } from "react";
import { View } from "react-native";
import { MyText } from "../components/MyText";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user";
import { getUser } from "../graphql/queries";

export const Splash = ({ setIsLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { attributes } = await Auth.currentAuthenticatedUser();
        const { data } = await API.graphql(
          graphqlOperation(getUser, { id: attributes.sub })
        );
        console.log(data);
        dispatch(
          setUser({
            id: attributes.sub,
            firstName: data.getUser.given_name,
            lastName: data.getUser.family_name,
            profilePicture: data.getUser.profilePicture,
            email: attributes.email.toLowerCase(),
            status: data.getUser.status,
            notificationToken: data.getUser.notificationToken,
          })
        );
        setIsLoading(false);
        console.log({attributes});
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
