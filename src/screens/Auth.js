import { useContext } from "react";
import { ConfirmSignUp } from "../components/ConfirmSignUp";
import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import { View } from "../components/themed/Themed";
import { AuthContext, AuthProvider } from "../Context/AuthContext";

export default function Wrapper() {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
}

const Auth = () => {
  const { authState } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {authState === "signIn" && <SignIn />}
      {authState === "signUp" && <SignUp />}
      {authState === "confirmSignUp" && <ConfirmSignUp />}
    </View>
  );
};
