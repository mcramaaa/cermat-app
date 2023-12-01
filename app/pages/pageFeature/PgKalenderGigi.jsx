import { View, StatusBar, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import GigiSusu from "../../components/GigiSusu";
import GigiPerm from "../../components/GigiPerm";
import AppButton from "../../components/AppButton";
import * as SQLite from "expo-sqlite";

export default function PgKalenderGigi() {
  const db = SQLite.openDatabase("cermat.db");
  const statusBarHeight = StatusBar.currentHeight || 0;

  const Navigation = useNavigation();
  const InputAnak = () => {
    Navigation.navigate("DataAnak");
    setIsLoadingMonthRange(true);
  };

  const [namaAnak, setNamaAnak] = useState("-");

  const [show, setShow] = useState(true);
  const [monthRange, setMonthRange] = useState(0);
  const [yearRange, setYearRange] = useState(1);
  const [isLoadingMonthRange, setIsLoadingMonthRange] = useState(true);

  function getAnak() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM childs WHERE is_active = ?",
          [true],
          (_, { rows }) => {
            const userRows = rows._array;
            resolve(userRows);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }

  function getDifferent(birthday) {
    const currentDate = new Date();
    const dateObject = new Date(birthday.replace(" ", "T"));

    const isoDateString = dateObject.toISOString();
    const targetDate = new Date(isoDateString);

    const dayDifference = Math.floor(
      (currentDate - targetDate) / (24 * 60 * 60 * 1000)
    );

    const monthRanges = Array.from(
      { length: Math.ceil(Math.abs(dayDifference) / 29) },
      (_, index) => {
        const startDate = new Date(targetDate);
        const endDate = new Date(targetDate);

        startDate.setDate(targetDate.getDate() + index * 30);
        endDate.setDate(startDate.getDate() + 29);

        if (endDate > currentDate) {
          endDate.setDate(currentDate.getDate());
        }

        return {
          start: startDate,
          end: endDate,
        };
      }
    );

    // dataGigi.map((data, i) => {
    //   if (monthRanges.length - 1 >= data.id) {
    //     setImageSource((oldValue) => ({
    //       ...oldValue,
    //       [data.src]: {
    //         src: data.src,
    //         opacity: 1,
    //       },
    //     }));
    //   } else if (monthRanges.length - 1 < data.id) {
    //     setImageSource((oldValue) => ({
    //       ...oldValue,
    //       [data.src]: {
    //         src: data.src,
    //         opacity: 0,
    //       },
    //     }));
    //   }
    // });

    // setSliderValue(monthRanges.length - 1);
    setMonthRange(monthRanges.length - 1);
    const year = Math.floor((monthRanges.length - 1) / 12);
    if (year >= 6) {
      setYearRange(year);
      setShow(false);
      setIsLoadingMonthRange(false);
    }
    if (year < 6) {
      setShow(true);
      setIsLoadingMonthRange(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getAnak()
        .then((anakRows) => {
          if (anakRows.length > 0) {
            setNamaAnak(anakRows[0].name);
            getDifferent(anakRows[0].birthday);
          }
          setIsLoadingMonthRange(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [])
  );

  return (
    <View
      style={{
        backgroundColor: "#9BACF1",
        height: "100%",
      }}
    >
      <View
        style={{
          position: "relative",
          height: 100,
          justifyContent: "center",
          marginTop: statusBarHeight,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Poppins-Bold",
            fontSize: 20,
            color: "white",
            elevation: 5,
          }}
        >
          Kalender {"\n"}Pertumbuhan Gigi
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          width: statusBarHeight - 100,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingTop: 27,
          overflow: "hidden",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            alignItems: "center",
            position: "absolute",
            height: 50,
            width: "100%",
            top: 0,
            backgroundColor: "#e1e4f0",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialIcons name="child-care" size={35} color="black" />
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>
              {namaAnak}
              {/* jika tidak ada maka ditulis Data Anak belum ada */}
            </Text>
          </View>
          <TouchableOpacity onPress={InputAnak}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            position: "absolute",
            top: 60,
          }}
        >
          <AppButton
            tittle="Gigi Susu"
            height={40}
            width={120}
            onPress={() => setShow(true)}
          />
          <AppButton
            tittle="Gigi Permanen"
            height={40}
            width={160}
            onPress={() => setShow(false)}
          />


        <View>
          {isLoadingMonthRange ? (
            <Text></Text>
          ) : (
            <GigiSusu
              display={show === true ? "" : "none"}
              monthRange={monthRange}
            />
          )}
          {isLoadingMonthRange ? (
            <Text></Text>
          ) : (
            <GigiPerm
              display={show === false ? "" : "none"}
              yearRange={yearRange}
            />
          )}

        </View>

       
      </View>
    </View>
  );
}
