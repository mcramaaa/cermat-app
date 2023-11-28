import { View, ScrollView, StatusBar, Text } from "react-native";
import React, { useState } from "react";
import AnimatedLottieView from "lottie-react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function PgMonitoring() {
  const statusBarHeight = StatusBar.currentHeight || 0;
  const Navigation = useNavigation();
  const [sesuai, setSesuai] = useState();
  function answerSesuai() {
    setSesuai(true);
  }
  const answerTidakSesuai = () => {
    Navigation.navigate("Keluhan");
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
            paddingHorizontal: 20,
          }}
        >
          Monitoring {"\n"}Pertumbuhan Gigi
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
          flexGrow: 1,
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
              onPress={answerSesuai}
              true
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
              onPress={answerTidakSesuai}
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
          <View
            style={{
              display: sesuai === true ? "" : "none",
              paddingHorizontal: 15,
            }}
          >
            <AnimatedLottieView
              source={require("../../components/lotties/goodJob.json")}
              autoPlay={true}
              style={{ position: "relative" }}
            />
            <View>
              <Text style={{ marginBottom: 10 }}>
                1. Sikat gigi 2x sehari {"("}Pagi setelah Makan dan Malam
                sebelum Tidur{")"}
              </Text>
              <Text style={{ marginBottom: 10 }}>
                2. Kurangi Makanan Manis dan Melekat Konsumsi makanan bergizi
              </Text>
              <Text>
                3. Konsultasi ke dokter gigi secara berkala minimal 6 bulan
                sekali
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
