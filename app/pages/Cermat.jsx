import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import React from "react";
import Reminder from "../components/cermatBtn/Reminder";
import Edukasi from "../components/cermatBtn/Edukasi";
import KalenderGigi from "../components/cermatBtn/KalenderGigi";
import Monitoring from "../components/cermatBtn/Monitoring";
import { useNavigation } from "@react-navigation/native";
import Carousel from "../components/cermatBtn/Carousel";

export default function Cermat() {
  const Navigation = useNavigation();
  const statusBarHeight = StatusBar.currentHeight || 0;

  const goCarousel = () => {
    Navigation.navigate("PgCarousel");
  };
  const goEdukasi = () => {
    Navigation.navigate("PgEdukasi");
  };
  const goReminder = () => {
    Navigation.navigate("PgReminder");
  };
  const goKalenderGigi = () => {
    Navigation.navigate("PgKalenderGigi");
  };
  const goMonitoring = () => {
    Navigation.navigate("PgMonitoring");
  };
  return (
    <View style={{ backgroundColor: "#9BACF1", height: "100%" }}>
      <Text
        style={{
          marginTop: statusBarHeight,
          textAlign: "center",
          fontFamily: "Poppins-SemiBold",
          fontSize: 25,
          paddingVertical: 20,
          color: "white",
        }}
      >
        Bersama Cermat {"\n"}untuk Gigi yang lebih Sehat
      </Text>
      <ScrollView
        style={{
          backgroundColor: "white",
          width: "100%",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingTop: 27,
          // marginTop: 130,
          // paddingHorizontal: 25,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            gap: 25,
            paddingBottom: 170,
            alignItems: "center",
            marginHorizontal: 10,
            // paddingHorizontal: 10,
          }}
        >
          <Carousel onPress={goCarousel} />
          <Edukasi onPress={goEdukasi} />
          <Reminder onPress={goReminder} />
          <KalenderGigi onPress={goKalenderGigi} />
          <Monitoring onPress={goMonitoring} />
        </View>
      </ScrollView>
    </View>
  );
}
