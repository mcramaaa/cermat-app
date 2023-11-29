import { View, Text, ScrollView, StatusBar } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import StepPlayer from "../components/StepPlayer";

export default function Panduan() {
  const statusBarHeight = StatusBar.currentHeight || 0;
  const dataStep = [
    {
      src: require("../../assets/videos/step/step1.mp4"),
      note: "Tuangkan Pasta gigi pada sikat gigi sebesar biji jagung",
    },
    {
      src: require("../../assets/videos/step/step2.mp4"),
      note: "Gerakan sikat gigi dengan gerakan memutar",
    },
    {
      src: require("../../assets/videos/step/step3.mp4"),
      note: "Sikat bagian dalam gigi kalian",
    },
    {
      src: require("../../assets/videos/step/step4.mp4"),
      note: "Sikat gigi dengan gerakan maju mundur",
    },
    {
      src: require("../../assets/videos/step/step5.mp4"),
      note: "Bersihkan bagian dalam gigi dan lidah kalian",
    },
    {
      src: require("../../assets/videos/step/step6.mp4"),
      note: "Kumur-kumur dan Bilas mulut dengan air bersih",
    },
  ];
  return (
    <LinearGradient colors={["#B9DFE2", "#ffffff"]} style={{ height: "100%" }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: statusBarHeight,
          }}
        >
          <Text
            style={{
              fontSize: 35,
              color: "white",
              fontFamily: "Poppins-Bold",
            }}
          >
            Panduan
            {"\n"}
            <Text style={{ fontSize: 30 }}>Sikat Gigi...</Text>
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            gap: 20,
            marginBottom: 50,
            paddingHorizontal: 50,
            paddingBottom: 150,
          }}
        >
          {dataStep.map((data, idx) => (
            <View
              key={idx}
              style={{
                width: "100%",
                backgroundColor: "white",
                elevation: 3,
                shadowOpacity: 0.2,
                shadowOffset: { height: 1 },
                borderRadius: 10,
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <StepPlayer
                source={data.src}
                style={{ width: "100%", height: 200 }}
              />
              <Text
                style={{
                  paddingHorizontal: 10,
                  textAlign: "center",
                  fontSize: 15,
                  fontFamily: "Poppins-SemiBold",
                  paddingBottom: 20,
                }}
              >
                {data.note}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
