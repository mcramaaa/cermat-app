import { View, ScrollView, StatusBar, Text } from "react-native";
import React from "react";
import AppButton from "../../components/AppButton";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PgMonitoring() {
  const statusBarHeight = StatusBar.currentHeight || 0;
  const cermat = () => {
    Navigation.navigate("App");
    console.log("first");
  };

  return (
    <View
      style={{
        backgroundColor: "#9BACF1",
        height: "100%",
        paddingTop: statusBarHeight,
      }}
    >
      <View
        style={{ position: "relative", height: 100, justifyContent: "center" }}
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
          Monitoring Pertumbuhan Gigi
        </Text>
      </View>
      <ScrollView
        style={{
          backgroundColor: "white",
          width: "100%",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingTop: 27,
          paddingHorizontal: 25,
          overflow: "hidden",
        }}
      >
        <View style={{ gap: 1, paddingBottom: 170 }}>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Apakah Estimasi Pertumbuhan Gigi Sudah Sesuai ??
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              // onPress={sikatGigiDuaKaliBtn}
              style={{
                backgroundColor: "#9BACF1",
                minWidth: 150,
                maxWidth: 250,
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
                Sesuai
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={sikatGigiSekaliBtn}
              style={{
                backgroundColor: "pink",
                minWidth: 150,
                maxWidth: 250,
                paddingHorizontal: 10,
                maxWidth: 200,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ fontFamily: "Poppins-SemiBold", color: "white" }}>
                Tidak Sesuai
              </Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </View>
      </ScrollView>
    </View>
  );
}
