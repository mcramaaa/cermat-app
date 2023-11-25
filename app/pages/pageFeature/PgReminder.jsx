import { View, ScrollView, StatusBar, Text } from "react-native";
import React from "react";

export default function PgReminder() {
  const statusBarHeight = StatusBar.currentHeight || 0;
  const cermat = () => {
    Navigation.navigate("App");
    console.log("first");
  };

  return (
    <View
      style={{
        backgroundColor: "#9BACF1",
        height: "100%",
        paddingTop: statusBarHeight,
      }}
    >
      <View
        style={{ position: "relative", height: 100, justifyContent: "center" }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Poppins-Bold",
            fontSize: 30,
            color: "white",
            elevation: 5,
          }}
        >
          Reminder Sikat Gigi
        </Text>
      </View>
      <ScrollView
        style={{
          backgroundColor: "white",
          width: "100%",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingTop: 27,
          paddingHorizontal: 25,
          overflow: "hidden",
        }}
      >
        <View style={{ gap: 25, paddingBottom: 170 }}></View>
      </ScrollView>
    </View>
  );
}
