import { Auth } from "aws-amplify";
import { createContext, useState } from "react";

const AuthContext = createContext({
  authState: "default",
  setAuthState: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  verificationCode: "",
  setVerificationCode: () => {},
  isLoading: false,
  firstName: "",
  setFirstName: () => {},
  lastName: "",
  confirmPassword: "",
  setConfirmPassword: () => {},
  setLastName: () => {},
  handleSignIn: () => {},
  handleSignUp: () => {},
  handleConfirmSignUp: () => {},
  handleForgotPassword: () => {},
  handleResetPassword: () => {},
  handleResendVerificationCode: () => {},
});

const { Provider } = AuthContext;

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState("default");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      setIsLoading(false);
      setAuthState("signedIn");
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
      console.log(error);
    }
  }

  async function handleSignUp() {
    if (!firstName || !lastName) {
      alert("please enter a first name and last name");
      return;
    }

    if (!email || !password) {
      alert("please enter an email and password");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name: firstName,
          family_name: lastName,
        },
      });
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
      alert("Confirmed, You can now sign in.");
      setAuthState("signIn");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
      console.log(error);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      alert("Please enter an email");
      return;
    }

    try {
      setIsLoading(true);
      await Auth.forgotPassword(email);
      setIsLoading(false);
      setAuthState("confirmForgotPassword");
    } catch (error) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!verificationCode || verificationCode.length !== 6) {
      alert("Please enter a valid verificarion code");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      await Auth.forgotPasswordSubmit(email, verificationCode, password);
      alert("Password reset successfully, Now you can Sign In");
      setIsLoading(false);
      setAuthState("signIn");
    } catch (error) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleResendVerificationCode() {
    try {
      await Auth.resendSignUp(email);
      alert(`Successfully resent confirmation code to ${email}`);
    } catch (error) {
      alert(e.message);
    }
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        verificationCode,
        setVerificationCode,
        isLoading,
        handleSignIn,
        handleSignUp,
        handleConfirmSignUp,
        handleForgotPassword,
        handleResetPassword,
        handleResendVerificationCode,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
