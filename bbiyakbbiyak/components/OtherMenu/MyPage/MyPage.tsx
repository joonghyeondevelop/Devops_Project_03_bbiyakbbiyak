import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { styles } from "./MyPageStyle";
import { GlobalTheme } from "../../../constants/theme";
import MyPageTextForm from "./MyPageTextForm";
import { useAtom } from "jotai";
import { userAtom, User } from "../../../store/userAtom";
import { useMutation } from "@tanstack/react-query";
import { updateGoogleUserName } from "../../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../constants/models";
import { StackNavigationProp } from "@react-navigation/stack";

interface MyPageType {
  name?: string | undefined;
  email?: undefined | string;
  password?: string | undefined;
  rePassword?: string | undefined;
  userName?: string | undefined;
}

type NavigationProps = StackNavigationProp<RootStackParamList>;
const MyPage = () => {
  const [name, setName] = useState<MyPageType>();
  const [token, setToken] = useAtom<User>(userAtom);
  const [bbiyakUpdate, setBbiyakUpdate] = useState();

  const navigation = useNavigation<NavigationProps>();

  const updateInfo = () => {
    navigation.navigate("Logined");
  };

  console.log(bbiyakUpdate);
  /** 구글OAuth 닉네임 변경 */
  const mutation = useMutation({
    mutationFn: (data: MyPageType | undefined) => updateGoogleUserName(data),
    onSuccess: async (data) => {
      if (name) {
        await AsyncStorage.removeItem("@user");
        await AsyncStorage.setItem("@user", JSON.stringify(name));

        Alert.alert("정보 변경", data, [{ text: "확인" }]);
      } else {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.setItem("token", data);
        console.log(await AsyncStorage.getItem("token"));
        setBbiyakUpdate((prev: any) => ({
          ...prev,
          password: "",
          rePassword: "",
        }));
        Alert.alert("정보 변경", "정보 변경이 완료되셨습니다.", [
          { text: "확인", onPress: updateInfo },
        ]);
      }
    },
    onError: (error) => {
      Alert.alert("요청 실패", error.message, [{ text: "확인" }]);
    },
  });

  const handleUpdate = () => {
    if (name !== null) {
      mutation.mutate(name);
    } else {
      console.log(bbiyakUpdate, 222);
      mutation.mutate(bbiyakUpdate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.empty}></Text>
      <MyPageTextForm
        name={name}
        setName={setName}
        token={token}
        bbiyakUpdate={bbiyakUpdate}
        setBbiyakUpdate={setBbiyakUpdate}
      />
      <Pressable
        android_ripple={{ color: GlobalTheme.colors.gray300 }}
        onPress={handleUpdate}
        style={({ pressed }) => [
          styles.pressed,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>변경하기</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default MyPage;