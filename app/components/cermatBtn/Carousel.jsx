import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Carousel({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
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
            name="view-carousel-outline"
            size={30}
            color="white"
          />
          <Text style={{ fontFamily: "Poppins-Medium", color: "white" }}>
            Presistensi Gigi
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontFamily: "Poppins-Medium", color: "white" }}>
            Kenali Presistensi Gigi {"\n"}Pada Anak
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
          <Text style={{ fontFamily: "Poppins-Medium" }}>Lihat Materi</Text>
          <AntDesign name="arrowright" size={15} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
