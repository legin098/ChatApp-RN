import { useContext } from "react";
import { StatusBar } from "react-native";
import { useColorScheme, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../../constants/colors";
import { ConfirmForgotPassword } from "../components/auth/ConfirmForgotPassword";
import { ConfirmSignUp } from "../components/auth/ConfirmSignUp";
import { DefaultAuth } from "../components/auth/DefaultAuth";
import { ForgotPassword } from "../components/auth/ForgotPassword";
import { SignIn } from "../components/auth/SignIn";
import { SignUp } from "../components/auth/SignUp";
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
  const theme = useColorScheme();
  const image =
    theme === "dark"
      ? require("../../assets/LogoDark.png")
      : require("../../assets/LogoLight.png");

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor:
          theme === "dark" ? Colors.dark.background : Colors.light.background,
        paddingHorizontal: 17,
      }}
      contentContainerStyle={{ paddingVertical: 60 }}
    >
      <Image
        source={image}
        style={{ width: 178, height: 178, alignSelf: "center" }}
      />
      {authState === "default" && <DefaultAuth />}
      {authState === "signIn" && <SignIn />}
      {authState === "signUp" && <SignUp />}
      {authState === "confirmSignUp" && <ConfirmSignUp />}
      {authState === "forgotPassword" && <ForgotPassword />}
      {authState === "confirmForgotPassword" && <ConfirmForgotPassword />}
      <StatusBar
        barStyle={theme === "dark" ? "dark-content" : "light-content"}
      />
    </KeyboardAwareScrollView>
  );
};
