import React, { useEffect, useState } from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { styles } from "./LoginScreenStyle";
import Header from "../../UI/Header/Header";
import CustomInput from "../../UI/Input/CustomInput";
import Button from "../../UI/Button/Button";
import { GlobalTheme } from "../../../constants/theme";
import { Valuetype, valueType } from "../../../constants/models";
import AtagContent from "../AtagContent/AtagContent";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../../api";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/userAtom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../../navigation/Navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { GoogleOAuth } from "../../../oauth/GoogleOAuth";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const dummyData = {
    id: "test",
    pw: "test",
  };

  const [stateValue, setStateValue] = useState({
    id: "",
    password: "",
  });
  const [user, setUser] = useAtom(userAtom);

  // 로그인 후 토큰 기기에 저장
  const mutation = useMutation({
    mutationFn: (stateValue: any) => loginAPI(stateValue),
    onSuccess: async (_data) => {
      const { data, message } = _data; // 데이터 구조분해 할당
      const { access_token } = data; // 토큰 값
      Alert.alert("로그인", message, [{ text: "확인" }]);
      await AsyncStorage.setItem("token", access_token);
      // 또한 유저 정보 atom에 저장해놓기
      setUser((prev) => ({
        ...prev,
        token: access_token,
        isAuthenticated: true,
        authenticate: (token: string) => {
          setUser((prev) => ({
            ...prev,
            token,
            isAuthenticated: true,
          }));
        },
        logout: () => {
          setUser((prev) => ({
            ...prev,
            token: "",
            isAuthenticated: false,
          }));
          AsyncStorage.removeItem("token");
        },
      }));

      setStateValue({
        id: "",
        password: "",
      });
    },
  });
  function handleLogin() {
    console.log("ID:", stateValue.id);
    console.log("Password:", stateValue.password);
    // dummyData 나중에 서버에서 응답 받아서 응답받은 데이터로 바꾸기

    if (
      stateValue.id !== dummyData.id &&
      stateValue.password !== dummyData.pw
    ) {
      Alert.alert("로그인", "아이디 또는 비밀번호를 확인해주세요", [
        { text: "확인" },
      ]);
    } else {
      mutation.mutate(stateValue);
    }
  }

  function setValueState(inputType: Valuetype, value: string | any) {
    setStateValue((prev) => ({ ...prev, [inputType]: value }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Header
          title="개인 회원으로 로그인"
          subtitle="개인화된 경험을 시작하세요."
        />
        <View style={styles.inputContainer}>
          <CustomInput
            style={styles.textInput}
            placeholder="아이디"
            inputValue={setValueState}
            inputType={valueType.id}
            value={stateValue.id}
            onChangeText={(text: any) => {
              if (setValueState) {
                setValueState(valueType.id, text); // inputType을 사용하여 직접 전달
              }
            }}
          />
          <CustomInput
            style={styles.textInput}
            placeholder="비밀번호"
            inputValue={setValueState}
            inputType={valueType.password}
            value={stateValue.password}
            onChangeText={(text: any) => {
              if (setValueState) {
                setValueState(valueType.password, text); // inputType을 사용하여 직접 전달
              }
            }}
          />
          <Button
            buttonContainerStyle={styles.buttonStyle}
            color={GlobalTheme.colors.primary300}
            onPress={handleLogin}
          >
            로그인
          </Button>
        </View>
        <View style={styles.imageContainer}>
          {/* <TouchableOpacity
            style={styles.image}
            activeOpacity={0.6}
            onPress={() => {
              promptAsync();
            }}
          >
            <Image
              resizeMode={"contain"}
              source={require("../../../assets/images/smallGoogle.png")}
            />
          </TouchableOpacity> */}
          <GoogleOAuth />
          <AtagContent />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
