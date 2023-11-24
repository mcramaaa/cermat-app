import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import AppButton from "../components/AppButton";

const Profile = () => {
  let userName = "Rama";

  const submitName = () => {
    console.log("Ganti Nama");
  };
  return (
    <LinearGradient colors={["#9BACF1", "#ffffff"]} style={{ height: "100%" }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          height: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 350,
            height: 250,
            backgroundColor: "white",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 20 }}>
            Nama:
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 25,
              paddingVertical: 20,
            }}
          >
            {userName}
          </Text>
          <AppButton
            height={40}
            width={150}
            tittle="Ubah Nama"
            onPress={submitName}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Profile;
