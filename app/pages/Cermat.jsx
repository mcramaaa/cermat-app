import { View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Reminder from "../components/cermat/Reminder";
import Edukasi from "../components/cermat/Edukasi";
import KalenderGigi from "../components/cermat/KalenderGigi";
import Monitoring from "../components/cermat/Monitoring";
import { useNavigation } from "@react-navigation/native";
import PgKalenderGigi from "./pageFeature/PgKalenderGigi";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default function Cermat() {
  const Navigation = useNavigation();

  const goEdukasi = () => {
    Navigation.navigate("PgEdukasi");
    console.log("first");
  };
  const goReminder = () => {
    Navigation.navigate("PgReminder");
    console.log("first");
  };
  const goKalenderGigi = () => {
    Navigation.navigate("PgKalenderGigi");
    console.log("first");
  };
  const goMonitoring = () => {
    Navigation.navigate("PgMonitoring");
    console.log("first");
  };
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
          overflow: "hidden",
        }}
      >
        <View style={{ gap: 25, paddingBottom: 170 }}>
          <Edukasi onPress={goEdukasi} />
          <Reminder onPress={goReminder} />
          <KalenderGigi onPress={goKalenderGigi} />
          <Monitoring onPress={goMonitoring} />
        </View>
      </ScrollView>
    </View>
  );
}
