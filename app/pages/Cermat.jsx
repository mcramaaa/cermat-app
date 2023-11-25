import { View, Text, ScrollView } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Cermat() {
  return (
    <View style={{ backgroundColor: "#9BACF1", height: "100%" }}>
      <ScrollView
        style={{
          backgroundColor: "white",
          width: "100%",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingTop: 27,
          marginTop: 130,
          paddingHorizontal: 25,
        }}
      >
        <View style={{ gap: 25, paddingBottom: 170 }}>
          <View
            style={{
              height: 200,
              maxWidth: 350,
              borderRadius: 15,
              backgroundColor: "#9BACF1",
              padding: 15,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialCommunityIcons
                name="tooth-outline"
                size={30}
                color="white"
              />
              <Text style={{ fontFamily: "Poppins-Medium" }}>
                Reminder Sikat Gigi
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
