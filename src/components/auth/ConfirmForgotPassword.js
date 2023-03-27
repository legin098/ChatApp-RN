import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { MyButton } from "../MyButton";
import { MyInput } from "../MyInput";
import { MyText } from "../MyText";

export const ConfirmForgotPassword = () => {
  const { setAuthState, isLoading } =
    useContext(AuthContext);

  return (
    <>
      <MyText type="title" style={{ marginBottom: 5 }}>
        Reset Password
      </MyText>
      <MyText type="caption" style={{ marginBottom: 15 }}>
        Enter your verification code and a new password.
      </MyText>
      <MyInput label={"Verification code"} />
      <MyInput label={"New Password"} secureTextEntry />
      <MyInput
        label={"Confirm New Password"}
        secureTextEntry
      />
      <MyButton
        title={isLoading ? "Loading..." : "Reset Password"}
        disabled={isLoading ? true : false}
        onPress={() => setAuthState("confirmForgotPassword")}
        style={{ marginTop: 20 }}
      />
      <MyButton
        title={"Back to Login"}
        type={"secondary"}
        onPress={() => setAuthState("signIn")}
      />
    </>
  );
};
