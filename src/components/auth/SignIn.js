import { useContext } from "react";
import { Pressable } from "react-native";
import Colors from "../../../constants/colors";
import { AuthContext } from "../../Context/AuthContext";
import { MyButton } from "../MyButton";
import { MyInput } from "../MyInput";
import { MyText } from "../MyText";

export const SignIn = () => {
  const { setAuthState, setEmail, setPassword, handleSignIn, isLoading } =
    useContext(AuthContext);

  return (
    <>
      <MyText type="title" style={{ marginBottom: 30 }}>
        Login
      </MyText>
      <MyInput label={"Email"} onChangeText={setEmail} />
      <MyInput label={"Password"} secureTextEntry onChangeText={setPassword} />
      <Pressable onPress={() => setAuthState("forgotPassword")}>
        <MyText
          type="caption"
          style={{
            color: Colors.light.tint,
            position: "absolute",
            right: 0,
            top: -15,
          }}
        >
          Forgot Password?
        </MyText>
      </Pressable>
      <MyButton
        title={isLoading ? "Loading..." : "Sing In"}
        disabled={isLoading ? true : false}
        onPress={handleSignIn}
        style={{ marginTop: 20 }}
      />
      <MyButton
        title={"Go Back"}
        type={"secondary"}
        onPress={() => setAuthState("default")}
      />
    </>
  );
};
