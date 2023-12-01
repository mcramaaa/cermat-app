import { View, ScrollView, Text, StatusBar } from "react-native";
import React, { useCallback } from "react";
import Reminder from "../components/cermatBtn/Reminder";
import Edukasi from "../components/cermatBtn/Edukasi";
import KalenderGigi from "../components/cermatBtn/KalenderGigi";
import Monitoring from "../components/cermatBtn/Monitoring";
import Carousel from "../components/cermatBtn/Carousel";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getTodayString } from "../helpers/getTodayString";
import { useRemoinder } from "../hook/useReminder.zustand";
import * as SQLite from "expo-sqlite";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default function Cermat() {
  const Navigation = useNavigation();
  const { setSikatGigi } = useRemoinder();
  const statusBarHeight = StatusBar.currentHeight || 0;
  const db = SQLite.openDatabase("cermat.db");

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

  function getReports() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT created_at AS date, COUNT(*) as status FROM reports GROUP BY created_at",
          [],
          (tx, { rows }) => {
            const reportRows = rows._array;
            resolve(reportRows);
          },
          (tx, error) => {
            reject(error);
          }
        );
      });
    });
  }

  useFocusEffect(
    useCallback(() => {
      getReports()
        .then((res) => {
          const todayString = getTodayString();
          const dataNow = res.filter((value) => value.date == todayString);
          if (dataNow.length > 0 && dataNow[0].status == 1) {
            setSikatGigi(1);
          }
          if (dataNow.length > 0 && dataNow[0].status >= 2) {
            setSikatGigi(2);
          }
          if (dataNow.length == 0) {
            setSikatGigi(0);
          }
        })
        .catch((err) => console.log(err));
    }, [])
  );
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
