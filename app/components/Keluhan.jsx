import { View, Text, TextInput, Keyboard, Linking } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "./AppButton";
import { useUser } from "../hook/useUser.zustand";
import { useNavigation } from "@react-navigation/native";

export default function Keluhan() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const noWhatsApp = "81330129266";
  const handleSubmit = () => {
    Keyboard.dismiss();
    // navigation.navigate("App");
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=62${noWhatsApp}&text=${text}`
    );
  };

  return (
    <LinearGradient
      colors={["#9BACF1", "#ffffff"]}
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          width: 350,
          height: "auto",
          backgroundColor: "white",
          borderRadius: 15,
          padding: 20,
          elevation: 4,
        }}
      >
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17 }}>
          Tuliskan Keluhan :
        </Text>
        <View>
          <TextInput
            style={{
              borderWidth: 3,
              padding: 10,
              borderRadius: 10,
              width: "100%",
              borderColor: "#9BACF1",
            }}
            multiline={true}
            numberOfLines={10}
            onChangeText={(inputText) => setText(inputText)}
            value={text}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <AppButton
            height={40}
            width={200}
            onPress={handleSubmit}
            tittle="Kirim Keluhan"
            marginTop={20}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
