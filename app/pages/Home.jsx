import { View, Text, StatusBar, Dimensions, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import AppButton from "../components/AppButton";
import { useUser } from "../hook/useUser.zustand";

export default function Home() {
  const statusBarHeight = StatusBar.currentHeight || 0;
  const Navigation = useNavigation();
  const { user } = useUser();

  const profileBtn = () => {
    Navigation.navigate("Profile");
  };

  const setFirstNameBtn = () => {
    Navigation.navigate("firstName");
  };

  return (
    <LinearGradient colors={["#9BACF1", "#ffffff"]} style={{ height: "100%" }}>
      <StatusBar style="Dark" />
      <View style={{ marginTop: statusBarHeight }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            marginTop: 5,
            alignItems: "center",
            position: "absolute",
            width: "100%",
          }}
        >
          <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 25 }}>
            Hallo {user.name}
          </Text>
          <TouchableOpacity onPress={profileBtn}>
            <Ionicons name="md-person-circle-sharp" size={40} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: "70%" }}
            resizeMode="contain"
          />
        </View>
        {/* <AppButton
          tittle="setFirstName page"
          height={50}
          width={200}
          onPress={setFirstNameBtn}
        /> */}
      </View>
    </LinearGradient>
  );
}
