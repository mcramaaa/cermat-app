import { useFocusEffect } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";

const useAlarm = (navigation) => {
  const db = SQLite.openDatabase("cermat.db");

  /**
   * State
   */
  const [alarmData, setAlarmData] = useState([]);
  const [alarmTag, setAlarmTag] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  /** */

  /**
   * DB QUERY
   */
  function getAlarms() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM alarms",
          [],
          (_, { rows }) => {
            const alarmRows = rows._array;
            console.log(alarmRows);
            if (alarmRows.length > 0) {
              setAlarmData(alarmRows);
              resolve(alarmRows);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }

  function createAlarm(tagParm, timeParam) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO alarms (tag, hours, minute) VALUES (?, ?,?)",
          [tagParm, timeParam.split(":")[0], timeParam.split(":")[1]],
          (_, { insertId, rowsAffected }) => {
            if (rowsAffected > 0) {
              console.log(rowsAffected);
              getAlarms();
              navigation.navigate("Alarm");
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
  /** */

  /**
   * Handle CLient
   */
  function handleSelectedTime(time) {
    setAlarmTime(time);
  }

  function handleInputTag(tag) {
    setAlarmTag(tag);
  }

  function handleButtonSubmitAlarm() {
    createAlarm(alarmTag, alarmTime);
  }

  useFocusEffect(
    useCallback(() => {
      if (navigation == undefined) {
        getAlarms();
      }
    }, [])
  );
  return {
    alarmData,
    handleSelectedTime,
    handleInputTag,
    handleButtonSubmitAlarm,
  };
};

export default useAlarm;
