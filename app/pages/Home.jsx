import { View, Text, StatusBar, Dimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

export default function Home() {
  const statusBarHeight = StatusBar.currentHeight || 0;
  const navigation = useNavigation();
  let userName = "Rama";

  const profileBtn = () => {
    navigation.navigate("Profile");
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
          }}
        >
          <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 25 }}>
            Hallo {userName}
          </Text>
          <TouchableOpacity onPress={profileBtn}>
            <Ionicons name="md-person-circle-sharp" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
