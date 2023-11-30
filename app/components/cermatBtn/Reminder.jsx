import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Reminder({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#9BACF1", "#9BACF1"]}
        style={{
          height: 200,
          minWidth: 320,
          maxWidth: 450,
          borderRadius: 15,
          backgroundColor: "#9BACF1",
          padding: 15,
          position: "relative",
          overflow: "hidden",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            position: "absolute",
            top: 10,
            left: 10,
          }}
        >
          <MaterialCommunityIcons
            name="tooth-outline"
            size={30}
            color="white"
          />
          <Text style={{ fontFamily: "Poppins-Medium", color: "white" }}>
            Reminder Sikat Gigi
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontFamily: "Poppins-Medium", color: "white" }}>
            Mulai hari dengan sikat gigi,{"\n"}lindungi senyumanmu {"\n"}
            sepanjang hari !! :{")"}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            width: 350,
            bottom: 0,
            position: "absolute",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "Poppins-Medium" }}>
            Kamu sudah sikat gigi 1x hari ini
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
