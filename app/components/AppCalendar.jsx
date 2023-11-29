import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import {
  dayNames,
  dayNamesShort,
  monthNames,
  today,
} from "../constants/calendar-config";
import * as SQLite from "expo-sqlite";
import { useFocusEffect } from "@react-navigation/native";
import { getTodayString } from "../helpers/getTodayString";

LocaleConfig.locales["fr"] = {
  monthNames: monthNames,
  dayNames: dayNames,
  dayNamesShort: dayNamesShort,
  today: today,
};

LocaleConfig.defaultLocale = "fr";

export default function AppCalendar() {
  const db = SQLite.openDatabase("cermat.db");
  const DotStyle = {
    width: 30,
    height: 30,
    marginTop: -25,
    borderRadius: 15,
    zIndex: -10,
  };

  const [dataSikatGigi, setdataSikatGigi] = useState([]);

  const [isDisable, setIsDisable] = useState({
    sekali: false,
    duakali: true,
  });
  const sikatGigiSekaliBtn = () => {
    // console.log("sikat gigi sekali");
    createReport();
  };

  const sikatGigiDuaKaliBtn = () => {
    createReport();
  };

  const [isCrud, setIsCrud] = useState(0);
  console.log(isCrud);

  function createReport() {
    const todayString = getTodayString();
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO reports (created_at) VALUES (?)",
          [`${todayString}`],
          (_, { insertId, rowsAffected }) => {
            if (rowsAffected > 0) {
              setIsCrud((oldValue) => oldValue + 1);
              resolve(rowsAffected, insertId);
            } else {
              reject(new Error("Failed to insert user"));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

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

  const riwayatSikatGigiArray = [];

  dataSikatGigi.forEach((data) => {
    riwayatSikatGigiArray.push(
      Object.assign({
        [data.date]: {
          marked: data.status === 0 ? false : true,
          dotColor: `${data.status === 1 ? "pink" : "#9BACF1"}`,
        },
      })
    );
  });
  const riwayatSikatGigi = {};
  riwayatSikatGigiArray.forEach((item) => {
    for (const date in item) {
      if (item.hasOwnProperty(date)) {
        riwayatSikatGigi[date] = item[date];
      }
    }
  });

  useFocusEffect(
    useCallback(() => {
      getReports()
        .then((res) => {
          setdataSikatGigi(res);
          const todayString = getTodayString();
          const dataNow = res.filter((value) => value.date == todayString);
          if (dataNow.length > 0 && dataNow[0].status == 1) {
            setIsDisable({ sekali: true, duakali: false });
          }
          if (dataNow.length > 0 && dataNow[0].status >= 2) {
            setIsDisable({ sekali: true, duakali: true });
          }
        })
        .catch((err) => console.log(err));
    }, [isCrud])
  );
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 0.5,
        borderColor: "#9BACF1",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Poppins-SemiBold",
            paddingLeft: 20,
            fontSize: 25,
            color: "#9BACF1",
          }}
        >
          Riwayat Sikat Gigi
        </Text>
      </View>
      <Calendar
        markedDates={riwayatSikatGigi}
        theme={{
          dotStyle: DotStyle,
          todayTextColor: "black",
          todayBackgroundColor: "#e3f5fc",
          arrowColor: "#9BACF1",
        }}
        style={{ borderBottomWidth: 0.7, borderBottomColor: "#d9d9d9" }}
      />

      {/* KETERANGAN */}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 7,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              height: 14,
              width: 14,
              backgroundColor: "pink",
              borderRadius: 7,
            }}
          ></View>
          <Text>Sikat Gigi sekali</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              height: 14,
              width: 14,
              backgroundColor: "#9BACF1",
              borderRadius: 7,
            }}
          ></View>
          <Text>Sikat Gigi dua kali</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          gap: 10,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          disabled={isDisable.sekali}
          onPress={sikatGigiSekaliBtn}
          style={{
            backgroundColor: "pink",
            // width: "100%",
            paddingHorizontal: 10,
            maxWidth: 200,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontFamily: "Poppins-SemiBold", color: "white" }}>
            Sikat Gigi Sekali
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isDisable.duakali}
          onPress={sikatGigiDuaKaliBtn}
          style={{
            backgroundColor: "#9BACF1",
            // width: "100%",
            paddingHorizontal: 10,
            maxWidth: 200,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              color: "white",
            }}
          >
            Sikat Gigi Dua Kali
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
