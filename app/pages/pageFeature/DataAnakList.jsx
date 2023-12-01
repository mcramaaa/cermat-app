import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useCallback, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SQLite from "expo-sqlite";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const DataAnakList = () => {
  const Navigation = useNavigation();
  const db = SQLite.openDatabase("cermat.db");
  const [payload, setPayload] = useState({
    name: "",
    birthDay: "",
  });
  /**
   *
   */

  /**
   *
   */
  console.log(payload);
  const [isCrud, setIsCrud] = useState(1);

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [anaks, setAnaks] = useState([]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const isoDate = new Date(currentDate);

    const year = isoDate.getUTCFullYear();
    const month = isoDate.getMonth() + 1;
    const day = isoDate.getUTCDate();
    const hours = isoDate.getHours();
    const minutes = isoDate.getMinutes();
    const seconds = isoDate.getSeconds();
    const milliseconds = "000000";

    const newDateString = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

    setShowDate(false);
    setDate(currentDate);
    setPayload({ ...payload, birthDay: newDateString });
  };

  function updateAnak(id) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE childs set is_active = 0`,
          [],
          (_, { insertId, rowsAffected }) => {
            if (rowsAffected > 0) {
              setIsCrud((oldValue) => oldValue + 1);
            }
            resolve({ insertId: insertId, rowsAffected: rowsAffected });
          },
          (error) => {
            reject(error);
          }
        );
        tx.executeSql(
          `UPDATE childs set is_active = 1 WHERE id = ?`,
          [id],
          (_, { insertId, rowsAffected }) => {
            if (rowsAffected > 0) {
              setIsCrud((oldValue) => oldValue + 1);
            }
            resolve({ insertId: insertId, rowsAffected: rowsAffected });
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }

  function createAnak() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO childs (name, birthday) values (?, ?)`,
          [payload.name, payload.birthDay],
          (_, { insertId, rowsAffected }) => {
            resolve({ insertId: insertId, rowsAffected: rowsAffected });
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }

  function getAnak() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM childs",
          [],
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

  const [show, setShow] = useState(false);

  const addAnak = () => {
    setShow(true);
  };

  const cancelAdd = () => {
    setShow(false);
  };

  function submitAnak() {
    Keyboard.dismiss();
    createAnak()
      .then((res) => {
        if (res.rowsAffected > 0) {
          setShow(false);
          setIsCrud((oldValue) => oldValue + 1);
        }
      })
      .catch((err) => console.log(err));
  }

  function openDatePicker() {
    setShowDate(true);
  }
  useFocusEffect(
    useCallback(() => {
      if (payload.birthDay == "") {
        const isoDate = new Date();
        const year = isoDate.getUTCFullYear();
        const month = isoDate.getMonth() + 1;
        const day = isoDate.getUTCDate();
        const hours = isoDate.getHours();
        const minutes = isoDate.getMinutes();
        const seconds = isoDate.getSeconds();
        const milliseconds = "000000";

        const newDateString = `${year}-${month < 10 ? "0" : ""}${month}-${
          day < 10 ? "0" : ""
        }${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
        setPayload({ ...payload, birthDay: newDateString });
      }
      getAnak()
        .then((anakRows) => {
          if (anakRows.length > 0) {
            setAnaks(anakRows);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, [isCrud])
  );

  const choose = () => {
    Navigation.navigate("PgKalenderGigi");
  };
  return (
    <LinearGradient
      colors={["#9BACF1", "#ffffff"]}
      style={{
        height: "100%",
        width: "100%",
        padding: 20,
        position: "relative",
      }}
    >
      <View style={{ alignItems: "center" }}>
        {/* LIST NAMA ANAK */}

        <View
          style={{
            height: "100%",
            width: 350,
            backgroundColor: "white",
            borderRadius: 15,
            overflow: "hidden",
            position: "relative",
            display: show === true ? "none" : "",
          }}
        >
          <ScrollView
            style={{
              height: "100%",
              flexDirection: "column",
              padding: 20,
            }}
          >
            {anaks.map((data, index) => (
              <TouchableOpacity
                onPress={() =>
                  updateAnak(data.id) & Navigation.navigate("PgKalenderGigi")
                }
                key={index}
                style={{
                  height: 50,
                  backgroundColor: `${data.is_active ? "#9BACF1" : "#e1e4f0"}`,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 20, fontFamily: "Poppins-Medium" }}>
                  {data.name}
                </Text>
                <Text>{data.birthday.slice(0, -15)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={addAnak}
            style={{
              backgroundColor: "pink",
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              position: "absolute",
              bottom: 0,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 20,
              }}
            >
              Tambahkan Data Anak
            </Text>
          </TouchableOpacity>
        </View>

        {/* INPUT DATA ANAK  */}

        <View
          style={{
            padding: 20,
            position: "absolute",
            display: show === true ? "" : "none",
          }}
        >
          <View
            style={{
              padding: 20,
              minWidth: 320,
              maxWidth: 400,
              height: 300,
              backgroundColor: "white",
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 17,
                textAlign: "left",
              }}
            >
              Masukkan Nama Anak:
            </Text>
            <TextInput
              placeholder="Masukkan Nama Anak"
              style={{
                padding: 10,
                minWidth: 320,
                maxWidth: 500,
                borderRadius: 10,
                borderColor: "#9BACF1",
                borderWidth: 2,
                paddingHorizontal: 15,
                fontSize: 17,
              }}
              onChangeText={(value) => setPayload({ ...payload, name: value })}
              defaultValue=""
            />

            <Text
              style={{
                marginTop: 30,
                fontFamily: "Poppins-SemiBold",
                fontSize: 17,
                textAlign: "left",
              }}
            >
              Tanggal Lahir Anak:
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"date"}
                  // is24Hour={true}
                  onChange={onChange}
                  display="calendar"
                  onTouchCancel={() => setShowDate(false)}
                />
              )}
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 20,
                  textAlign: "left",
                }}
              >
                {`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
              </Text>
              <TouchableOpacity
                onPress={openDatePicker}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#9BACF1",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="calendar" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* TOMBOL SUBMIT */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 5,
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                onPress={cancelAdd}
                true
                style={{
                  backgroundColor: "pink",
                  minWidth: 100,
                  maxWidth: 200,
                  paddingHorizontal: 5,
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
                    fontSize: 17,
                  }}
                >
                  Batal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={submitAnak}
                style={{
                  backgroundColor: "#9BACF1",
                  minWidth: 100,
                  maxWidth: 200,
                  paddingHorizontal: 5,

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
                    fontSize: 17,
                  }}
                >
                  Simpan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default DataAnakList;
