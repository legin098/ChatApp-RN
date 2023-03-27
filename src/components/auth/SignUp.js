import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { MyButton } from "../MyButton";
import { MyInput } from "../MyInput";
import { MyText } from "../MyText";

export const SignUp = () => {
  const {
    setAuthState,
    setEmail,
    setPassword,
    handleSignUp,
    setFirstName,
    setLastName,
    setConfirmPassword,
  } = useContext(AuthContext);

  return (
    <>
      <MyText type="title" style={{ marginBottom: 35 }}>
        Join the amazing community
      </MyText>
      <MyInput label={"First Name"} onChangeText={setFirstName} />
      <MyInput label={"Last Name"} onChangeText={setLastName} />
      <MyInput label={"Email"} onChangeText={setEmail} />
      <MyInput label={"Password"} secureTextEntry onChangeText={setPassword} />
      <MyInput
        label={"Confirm Password"}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />
      <MyButton title={"Join Me"} onPress={handleSignUp} />
      <MyButton
        title={"Go Back"}
        type={"secondary"}
        onPress={() => setAuthState("default")}
      />
    </>
  );
};
