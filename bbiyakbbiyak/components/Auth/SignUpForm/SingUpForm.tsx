import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./SignUpFormStyle";
import EmailVerification from "../EmailVerification/EmailVerification";
import PasswordInput from "../PasswordInput/PasswordInput";
import OtherInputs from "../OtherInput/OtherInput";
import { valueType } from "../../../constants/models";

interface SignUpFormProps {
  formValues: {
    email: string;
    password: string;
    userName: string;
    phone: string;
  };
  setFormValues: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      userName: string;
      phone: string;
    }>
  >;
  isEmailSent: boolean;
  setIsEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCodeVerified: any;
  isCodeVerified: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  formValues,
  setFormValues,
  isEmailSent,
  setIsEmailSent,
  setIsCodeVerified,
  isCodeVerified,
}) => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [count, setCount] = useState(300);
  const [inputAuthCode, setInputAuthCode] = useState("");
  const [serverAuthCode, setServerAuthCode] = useState("");

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <EmailVerification
        styles={styles}
        formValues={formValues}
        setFormValues={setFormValues}
        isEmailSent={isEmailSent}
        setIsEmailSent={setIsEmailSent}
        setInputAuthCode={setInputAuthCode}
        inputAuthCode={inputAuthCode}
        serverAuthCode={serverAuthCode}
        setServerAuthCode={setServerAuthCode}
        count={count}
        setCount={setCount}
        isCodeVerified={isCodeVerified}
        setIsCodeVerified={setIsCodeVerified}
      />
      <PasswordInput
        styles={styles}
        placeholder="비밀번호"
        valueType={valueType.password}
        password={formValues.password}
        setFormValues={setFormValues}
        isLoginScreen={isLoginScreen}
      />
      <OtherInputs
        styles={styles}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </View>
  );
};

export default SignUpForm;
