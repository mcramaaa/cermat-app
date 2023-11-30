import { View, StatusBar, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import GigiSusu from "../../components/GigiSusu";
import GigiPerm from "../../components/GigiPerm";
import AppButton from "../../components/AppButton";

export default function PgKalenderGigi() {
  const statusBarHeight = StatusBar.currentHeight || 0;

  const Navigation = useNavigation();
  const InputAnak = () => {
    Navigation.navigate("DataAnak");
  };

  const [show, setShow] = useState(true);

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
          height: 150,
          justifyContent: "center",
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
        <View style={{ flexDirection: "row" }}>
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
      </View>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
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
              Nama Anak
              {/* jika tidak ada maka ditulis Data Anak belum ada */}
            </Text>
          </View>
          <TouchableOpacity onPress={InputAnak}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View>
          <GigiSusu display={show === true ? "" : "none"} />
          <GigiPerm display={show === false ? "" : "none"} />
        </View>
      </View>
    </View>
  );
}
