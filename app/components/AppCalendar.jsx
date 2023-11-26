import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import {
  dayNames,
  dayNamesShort,
  monthNames,
  today,
} from "../constants/calendar-config";

LocaleConfig.locales["fr"] = {
  monthNames: monthNames,
  dayNames: dayNames,
  dayNamesShort: dayNamesShort,
  today: today,
};

LocaleConfig.defaultLocale = "fr";

export default function AppCalendar() {
  const DotStyle = {
    width: 30,
    height: 30,
    marginTop: -25,
    borderRadius: 15,
    zIndex: -10,
  };

  const sikatGigiSekaliBtn = () => {
    console.log("sikat gigi sekali");
  };

  const sikatGigiDuaKaliBtn = () => {
    console.log("sikat gigi 2x");
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        elevation: 4,
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
        markedDates={{
          "2023-11-01": { marked: true, dotColor: "pink" },
          "2023-11-02": { marked: true, dotColor: "#9BACF1" },
        }}
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
