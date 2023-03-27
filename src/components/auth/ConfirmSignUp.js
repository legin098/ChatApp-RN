import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { MyButton } from "../MyButton";
import { MyInput } from "../MyInput";
import { MyText } from "../MyText";

export const ConfirmSignUp = () => {
  const { setVerificationCode, handleConfirmSignUp, setAuthState } =
    useContext(AuthContext);

  return (
    <>
      <MyText type="title" style={{ marginBottom: 5 }}>
        Confirm Sign Up
      </MyText>
      <MyText type="caption" style={{ marginBottom: 15 }}>
        Enter your verification code.
      </MyText>

      <MyInput label={"Verification Code"} onChangeText={setVerificationCode} />
      <MyButton title={"Create Account"} onPress={handleConfirmSignUp} />
      <MyButton title={"Resend Code"} type={"secondary"} />
      <MyButton
        title={"Back to Login"}
        type={"secondary"}
        onPress={() => setAuthState("signIn")}
      />
    </>
  );
};
