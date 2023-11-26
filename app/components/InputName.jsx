import { View, Text, TextInput } from "react-native";
import React from "react";
import AppButton from "./AppButton";

export default function InputName(props) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        height: 170,
        backgroundColor: "white",
        borderRadius: 15,
      }}
    >
      <TextInput
        placeholder="Masukkan Nama"
        style={{
          height: 50,
          width: 250,
          borderRadius: 10,
          borderColor: "#9BACF1",
          borderWidth: 2,
          paddingHorizontal: 20,
          fontSize: 20,
        }}
        onChangeText={props.handleInputName}
        defaultValue={props.name}
      />
      <AppButton height={40} width={150} tittle="Simpan" />
    </View>
  );
}
