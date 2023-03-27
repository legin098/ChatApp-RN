import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { MyButton } from "../MyButton";
import { MyInput } from "../MyInput";
import { MyText } from "../MyText";

export const ConfirmSignUp = () => {
  const {
    setVerificationCode,
    handleConfirmSignUp,
    setAuthState,
    setEmail,
    email,
    handleResendVerificationCode,
  } = useContext(AuthContext);

  return (
    <>
      <MyText type="title" style={{ marginBottom: 5 }}>
        Confirm Sign Up
      </MyText>
      <MyText type="caption" style={{ marginBottom: 15 }}>
        Enter your verification code.
      </MyText>
      <MyInput label={"Email"} value={email} onChangeText={setEmail} />
      <MyInput label={"Verification Code"} onChangeText={setVerificationCode} />
      <MyButton title={"Create Account"} onPress={handleConfirmSignUp} />
      <MyButton
        title={"Re-send Code"}
        type={"secondary"}
        onPress={handleResendVerificationCode}
      />
      <MyButton
        title={"Back to Login"}
        type={"secondary"}
        onPress={() => setAuthState("signIn")}
      />
    </>
  );
};
