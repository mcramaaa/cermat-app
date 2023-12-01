import { View, Text, TextInput, Keyboard, Image } from "react-native";
import React, { useState } from "react";
// import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "./AppButton";
import { useUser } from "../hook/useUser.zustand";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";

export default function SetFirstName() {
  const { user, setUser } = useUser();
  const [userName, setUserName] = useState("");
  const db = SQLite.openDatabase("cermat.db");

  const navigation = useNavigation();

  function createUser() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO users (name) values (?)`,
          [userName],
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

  const handleSubmitName = () => {
    Keyboard.dismiss();
    createUser()
      .then((res) => {
        if (res.rowsAffected === 1) {
          setUser({ id: res.insertId, name: userName });
          navigation.navigate("App");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleOnChange(value) {
    setUserName(value);
  }

  return (
    <LinearGradient
      colors={["#9BACF1", "#ffffff"]}
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: "70%" }}
          resizeMode="contain"
        />
      </View> */}
      <View
        style={{
          width: 350,
          height: 175,
          backgroundColor: "white",
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          elevation: 4,
        }}
      >
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17 }}>
          Masukkan Nama:
        </Text>
        <TextInput
          placeholder="Masukkan Nama Kamu"
          style={{
            borderColor: "#9BACF1",
            borderWidth: 1,
            width: 250,
            height: 45,
            borderRadius: 10,
            marginTop: 5,
            paddingHorizontal: 10,
          }}
          onChangeText={handleOnChange}
        />
        <AppButton
          height={40}
          width={150}
          onPress={handleSubmitName}
          tittle="Simpan"
          marginTop={20}
        />
      </View>
    </LinearGradient>
  );
}
