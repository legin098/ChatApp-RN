import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { MyButton } from "./MyButton";
import { MyInput } from "./MyInput";
import { MyText } from "./MyText";

export const SignIn = () => {
  const { setAuthState, setEmail, setPassword, handleSignIn } =
    useContext(AuthContext);

  return (
    <>
      <MyText type="title">Sing In</MyText>
      <MyInput label={"Email"} onChangeText={setEmail} />
      <MyInput label={"Password"} secureTextEntry onChangeText={setPassword} />
      <MyButton title={"Sing In"} onPress={handleSignIn} />
      <MyButton title={"Sing Up"} type={"secondary"} onPress={() => setAuthState("signUp")} />
    </>
  );
};
