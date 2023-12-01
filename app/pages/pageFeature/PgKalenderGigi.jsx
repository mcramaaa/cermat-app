import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import GigiSusu from "../../components/GigiSusu";
import GigiPerm from "../../components/GigiPerm";
import AppButton from "../../components/AppButton";
import * as SQLite from "expo-sqlite";
import { LinearGradient } from "expo-linear-gradient";

export default function PgKalenderGigi() {
  const db = SQLite.openDatabase("cermat.db");
  const windoHeight = Dimensions.get("window").height;
  const statusBarHeight = StatusBar.currentHeight || 0;
  const screenHeight = windoHeight - statusBarHeight;

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
    <LinearGradient
      colors={["#9BACF1", "#ffffff", "#e1e4f0"]}
      style={{ height: "100%" }}
    >
      <View
        style={{
          position: "relative",
          height: "15%",
          justifyContent: "center",
          backgroundColor: "#9BACF1",
          marginTop: statusBarHeight,
        }}
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
          Kalender {"\n"}Pertumbuhan Gigi
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          // height: "100%",
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
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            paddingHorizontal: 20,
            alignItems: "center",
            position: "absolute",
            height: 50,
            width: "100%",
            top: 0,
            backgroundColor: "#e1e4f0",
            zIndex: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="child-care" size={35} color="black" />
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>
              {namaAnak}
              {/* jika tidak ada maka ditulis Data Anak belum ada */}
            </Text>
          </View>
          <TouchableOpacity onPress={InputAnak}>
            <FontAwesome name="list-ul" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            position: "absolute",
            top: 60,
            zIndex: 20,
            gap: 20,
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
        </View>

        <View
        // style={{
        //   // position: "absolute",
        //   height: screenHeight * 0.85 - 20,
        //   width: "100%",
        //   bottom: 0,
        //   // backgroundColor: "yellow",
        // }}
        >
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
    </LinearGradient>
  );
}
