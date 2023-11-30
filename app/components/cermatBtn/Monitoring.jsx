import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

export default function Monitoring({ onPress }) {
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
          <FontAwesome5 name="tasks" size={24} color="white" />
          <Text style={{ fontFamily: "Poppins-Medium", color: "white" }}>
            Monitoring Gigi dan Mulut
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontFamily: "Poppins-Medium", color: "white" }}>
            Ayo selamatkan gigimu dan kunjungi{"\n"}dokter gigi secara rutin{" "}
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
            Monitoring Gigi dan Mulut
          </Text>
          <AntDesign name="arrowright" size={15} color="black" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
