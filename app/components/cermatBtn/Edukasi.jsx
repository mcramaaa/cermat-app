import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

export default function Edukasi({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#9BACF1", "#9BACF1"]}
        style={{
          height: 200,
          maxWidth: 350,
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
          <Octicons name="video" size={30} color="white" />
          <Text style={{ fontFamily: "Poppins-Medium", color: "white" }}>
            Video Edukasi
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontFamily: "Poppins-Medium", color: "white" }}>
            Gigi dan Mulut Sehat {"\n"}Cerminan Kesehatan Tubuh
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
            gap: 10,
          }}
        >
          <Text style={{ fontFamily: "Poppins-Medium" }}>
            Lihat Video Edukasi
          </Text>
          <AntDesign name="arrowright" size={15} color="black" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
