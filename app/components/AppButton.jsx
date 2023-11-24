import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AppButton({ onPress, tittle, width, height }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ height: height + 30 }}>
      <View
        style={{
          marginTop: 15,
          width: width,
          height: height,
          backgroundColor: "#CCA39D",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          elevation: 3,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
          {tittle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
