import { View, Text, TextInput } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SetName(props) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextInput
        placeholder="Masukkan Nama"
        style={{
          height: 50,
          width: 250,
          borderRadius: 10,
          borderColor: "#00B4D8",
          borderWidth: 2,
          paddingHorizontal: 20,
          fontSize: 20,
        }}
        onChangeText={props.handleInputName}
        defaultValue={props.name}
      />
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            marginTop: 15,
            width: 120,
            height: 45,
            backgroundColor: "#00B4D8",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            elevation: 3,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
            {props.buttonName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
