import { View, Text, TextInput, Keyboard, Image } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "../components/AppButton";
import { useUser } from "../hook/useUser.zustand";

const Profile = () => {
  const [show, setShow] = useState(false);
  const { user, setUser } = useUser();
  const [name, setName] = useState(user.name);

  const editName = () => {
    setShow(true);
  };

  const submitName = () => {
    setUser({ ...user, name });
    setShow(false);
    Keyboard.dismiss();
  };

  return (
    <LinearGradient
      colors={["#9BACF1", "#ffffff"]}
      style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ justifyContent: "center" }}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 250, height: 250 }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          width: 350,
          height: 170,
          backgroundColor: "white",
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          display: !show ? "" : "none",
        }}
      >
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 20 }}>
          Nama:
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            fontSize: 25,
          }}
        >
          {user.name}
        </Text>
        <AppButton
          height={40}
          width={150}
          tittle="Ubah Nama"
          onPress={editName}
        />
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 350,
          height: 170,
          backgroundColor: "white",
          borderRadius: 15,
          display: show === true ? "" : "none",
        }}
      >
        <TextInput
          placeholder="Masukkan Nama Baru"
          style={{
            height: 50,
            width: 250,
            borderRadius: 10,
            borderColor: "#9BACF1",
            borderWidth: 2,
            paddingHorizontal: 15,
            fontSize: 20,
          }}
          onChangeText={setName}
          defaultValue=""
        />
        <AppButton
          marginTop={15}
          height={40}
          width={150}
          tittle="Simpan"
          onPress={submitName}
        />
      </View>
    </LinearGradient>
  );
};

export default Profile;
