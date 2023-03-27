import { Auth } from "aws-amplify";
import { createContext, useState } from "react";

const AuthContext = createContext({
  authState: "signIn",
  setAuthState: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  verificationCode: "",
  setVerificationCode: () => {},
  isLoading: false,
  handleSignIn: () => {},
  handleSignUp: () => {},
  handleConfirmSignUp: () => {},
});

const { Provider } = AuthContext;

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    if (!email || !password) {
      alert("please enter an email and password");
      return;
    }

    try {
      setIsLoading(true);
      const user = await Auth.signIn({ username: email, password });
      console.log("user signed In");
      setAuthState("signedIn");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
      console.log(error);
    }
  }

  async function handleSignUp() {
    if (!email || !password) {
      alert("please enter an email and password");
      return;
    }

    try {
      setIsLoading(true);
      await Auth.signUp({ username: email, password });
      setAuthState("confirmSignUp");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
      console.log(error);
    }
  }

  async function handleConfirmSignUp() {
    if (!verificationCode) {
      alert("please enter verification code");
      return;
    }

    try {
      setIsLoading(true);
      await Auth.confirmSignUp(email, verificationCode);
      alert("Confirmed", "You can now sign in.");
      setAuthState("signIn");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
      console.log(error);
    }
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        email,
        setEmail,
        password,
        setPassword,
        verificationCode,
        setVerificationCode,
        isLoading,
        handleSignIn,
        handleSignUp,
        handleConfirmSignUp,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
