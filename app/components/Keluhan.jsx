import {
  View,
  Text,
  TextInput,
  Keyboard,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function Keluhan() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const noWhatsApp = "81945389062";
  const handleSubmit = () => {
    Keyboard.dismiss();
    // navigation.navigate("App");
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=62${noWhatsApp}&text=${text}`
    );
  };

  function cancel() {
    navigation.navigate("App");
  }

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
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={cancel}
            true
            style={{
              backgroundColor: "pink",
              minWidth: 150,
              maxWidth: 250,
              paddingHorizontal: 10,
              maxWidth: 200,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                color: "white",
                fontSize: 20,
              }}
            >
              Batal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "#9BACF1",
              minWidth: 150,
              maxWidth: 250,
              paddingHorizontal: 10,
              maxWidth: 200,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                color: "white",
                fontSize: 20,
              }}
            >
              Kirim
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
