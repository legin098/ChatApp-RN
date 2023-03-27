import { useContext } from "react";
import { Button } from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { MyButton } from "./MyButton";
import { MyInput } from "./MyInput";
import { MyText } from "./MyText";

export const SignUp = () => {
  const { setAuthState, setEmail, setPassword, handleSignUp } =
    useContext(AuthContext);

  return (
    <>
      <MyText type="title">Sing Up</MyText>
      <MyInput label={"Email"} onChangeText={setEmail} />
      <MyInput label={"Password"} secureTextEntry onChangeText={setPassword} />
      <MyButton title={"Sing Up"} onPress={handleSignUp} />
      <MyButton title={"Sing In"} type={"secondary"} onPress={() => setAuthState("signIn")} />
    </>
  );
};
