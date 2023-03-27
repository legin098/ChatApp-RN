import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { MyButton } from "../MyButton";
import { MyText } from "../MyText";

export const DefaultAuth = () => {
  const { setAuthState } = useContext(AuthContext);

  return (
    <>
      <MyText type="title" style={{ marginBottom: 35 }}>
        The new way of messaging
      </MyText>
      <MyButton
        title={"Create account"}
        onPress={() => setAuthState("signUp")}
      />
      <MyButton
        title={"Login"}
        type={"secondary"}
        onPress={() => setAuthState("signIn")}
      />
      <MyText
        type="caption"
        style={{ textAlign: "center", marginVertical: 12 }}
      >
        -Or
      </MyText>
      <MyButton
        title={"Sign in With Google"}
        type={"secondary"}
        //onPress={() => Auth.federatedSignIn()}
      />
      <MyButton
        title={"Sign in With Apple"}
        type={"secondary"}
        //onPress={() => Auth.federatedSignIn()}
      />
    </>
  );
};
