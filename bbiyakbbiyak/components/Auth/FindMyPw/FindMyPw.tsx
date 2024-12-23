import React, { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./FindMyPwStyle";
import Header from "../../UI/Header/Header";
import CustomInput from "../../UI/Input/CustomInput";
import Button from "../../UI/Button/Button";
import { GlobalTheme } from "../../../constants/theme";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import {
  RootStackParamList,
  Valuetype,
  valueType,
} from "../../../constants/models";
import { useMutation } from "@tanstack/react-query";
import { findPW, NavigationPw } from "../../../api";
import VerifyCode from "../VerifyCode/VerifyCode";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const FindMyPw = () => {
  const navigation = useNavigation<NavigationProps>();

  const [searchUser, setSearchUser] = useState({
    email: "",
    phone: "",
  });
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [inputAuthCode, setInputAuthCode] = useState("");
  const [serverAuthCode, setServerAuthCode] = useState("");
  const [count, setCount] = useState(300);

  const mutation = useMutation({
    mutationFn: (data: { email: string; phone: string }) => NavigationPw(data),
    onSuccess: () => {
      navigation.navigate("changePW", { data: searchUser.email });
    },
    onError: (error) => {
      Alert.alert("요청 실패", error.message, [{ text: "확인" }]);
    },
  });

  function searchPW() {
    if (isCodeVerified !== true) {
      Alert.alert("요청 실패", "인증을 해주세요.", [{ text: "확인" }]);
      return null;
    }
    mutation.mutate(searchUser);
  }

  function setValueState(inputType: Valuetype, value: string | any) {
    setSearchUser((prev) => ({ ...prev, [inputType]: value }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="비밀번호찾기" />
      </View>
      <View style={styles.PwSearch}>
        <CustomInput
          style={styles.inputStyle}
          placeholder="이메일"
          value={searchUser.email}
          inputType={valueType.email}
          inputValue={setValueState}
          onChangeText={(text: any) => {
            if (setValueState) {
              setValueState(valueType.email, text);
            }
          }}
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder="전화번호"
          inputType={valueType.phone}
          inputValue={setValueState}
          value={searchUser.phone}
          onChangeText={(text: any) => {
            if (setValueState) {
              setValueState(valueType.phone, text);
            }
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <VerifyCode
          formValues={searchUser}
          setFormValues={setSearchUser}
          isAuthCodeSent={isAuthCodeSent}
          isCodeVerified={isCodeVerified}
          setIsAuthCodeSent={setIsAuthCodeSent}
          setInputAuthCode={setInputAuthCode}
          setServerAuthCode={setServerAuthCode}
          setIsCodeVerified={setIsCodeVerified}
          setCount={setCount}
          count={count}
          inputAuthCode={inputAuthCode}
          serverAuthCode={serverAuthCode}
          page="FindMyPw"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={searchPW}
          buttonContainerStyle={styles.buttonStyle}
          color={GlobalTheme.colors.primary300}
        >
          비밀번호 찾기
        </Button>
      </View>
    </View>
  );
};

export default FindMyPw;
