import { View, Text } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
import { ltrimFirstZero } from "../helpers/ltrimZero";

export default function AlarmBox({
  tittle,
  alarmData,
  notifications,
  initNotification,
}) {
  const db = SQLite.openDatabase("cermat.db");

  const [date, setDate] = useState(new Date(setDefaultAlarm()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const timeToStore = new Intl.DateTimeFormat("id-ID", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
      .format(currentDate)
      .split(".");

    editAlarm(
      Object.assign({
        id: alarmData.id,
        tag: alarmData.tag,
        hours: timeToStore[0],
        minute: timeToStore[1],
      })
    );

    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode("time");
  };

  function setDefaultAlarm() {
    const now = new Date();

    const dateWithTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      alarmData.hours,
      alarmData.minute
    );

    return dateWithTime;
  }

  function editAlarm(payload) {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE alarms SET tag = ?, hours = ?, minute = ? WHERE id = ?",
        [payload.tag, payload.hours, payload.minute, payload.id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            notifications.cancelScheduledNotificationAsync(`${alarmData.tag}`);
            initNotification({
              title: `${payload.tag}`,
              body: `Alarm ${payload.tag}`,
              hour: Number(ltrimFirstZero(`${payload.hours}`)),
              minute: Number(ltrimFirstZero(`${payload.minute}`)),
              identifier: `${payload.tag}`,
            });
            console.log("ok");
          } else {
            reject(new Error("User not found"));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  }

  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: "#e1e4f0",
        height: "auto",
        padding: 10,
        borderRadius: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"time"}
          is24Hour={true}
          onChange={onChange}
          display="spinner"
          onTouchCancel={() => setShow(false)}
        />
      )}
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>
          {tittle}
        </Text>
        <Text
          style={{
            fontSize: 40,
            fontFamily: "Poppins-Bold",
            color: "#9BACF1",
            marginBottom: -15,
            marginTop: -10,
          }}
        >
          {date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
        <View style={{ flexDirection: "row" }}></View>
      </View>
      <TouchableOpacity
        onPress={showTimepicker}
        style={{
          backgroundColor: "#9BACF1",
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 25,
            color: "white",
          }}
        >
          Edit Jam
        </Text>
      </TouchableOpacity>
    </View>
  );
}
