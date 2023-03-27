import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { MyButton } from "../MyButton";
import { MyInput } from "../MyInput";
import { MyText } from "../MyText";

export const ForgotPassword = () => {
  const { setAuthState, setEmail, isLoading } = useContext(AuthContext);

  return (
    <>
      <MyText type="title" style={{ marginBottom: 5 }}>
        Forgot Password
      </MyText>
      <MyText type="caption" style={{ marginBottom: 15 }}>
        Enter your email address and we'll send you a code to reset your
        password.
      </MyText>
      <MyInput label={"Email"} onChangeText={setEmail} />
      <MyButton
        title={isLoading ? "Sending Code..." : "Send Code"}
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
