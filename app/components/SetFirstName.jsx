import { View, Text, TextInput, Keyboard, Image } from "react-native";
import React, { useState } from "react";
// import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "./AppButton";
import { useUser } from "../hook/useUser.zustand";
import { useNavigation } from "@react-navigation/native";

export default function SetFirstName() {
  const { user, setUser } = useUser();
  const [userName, setUserName] = useState(user.name);
  const navigation = useNavigation();
  const handleSubmitName = () => {
    console.log(userName);
    Keyboard.dismiss();
    navigation.navigate("App");
  };
  return (
    <LinearGradient
      colors={["#9BACF1", "#ffffff"]}
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: "70%" }}
          resizeMode="contain"
        />
      </View> */}
      <View
        style={{
          width: 350,
          height: 175,
          backgroundColor: "white",
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          elevation: 4,
        }}
      >
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17 }}>
          Masukkan Nama:
        </Text>
        <TextInput
          placeholder="Masukkan Nama Kamu"
          style={{
            borderColor: "#9BACF1",
            borderWidth: 1,
            width: 250,
            height: 45,
            borderRadius: 10,
            marginTop: 5,
            paddingHorizontal: 10,
          }}
          onChangeText={setUserName}
        />
        <AppButton
          height={40}
          width={150}
          onPress={handleSubmitName}
          tittle="Simpan"
          marginTop={20}
        />
      </View>
    </LinearGradient>
  );
}
