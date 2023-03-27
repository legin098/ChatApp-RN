import { useContext } from "react";
import { Button } from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { MyButton } from "./MyButton";
import { MyInput } from "./MyInput";
import { MyText } from "./MyText";

export const ConfirmSignUp = () => {
  const { email, setEmail, setVerificationCode, handleConfirmSignUp } =
    useContext(AuthContext);

  return (
    <>
      <MyText type="title">Confirm Sing Up</MyText>
      <MyInput label={"Email"} value={email} onChangeText={setEmail} />
      <MyInput label={"Code"} onChangeText={setVerificationCode} />
      <MyButton title={"Confirm"} onPress={handleConfirmSignUp} />
      <Button title="Re-send Code" />
    </>
  );
};
