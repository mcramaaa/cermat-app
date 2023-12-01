import { View, ScrollView, StatusBar, Text, Dimensions } from "react-native";
import { Video } from "expo-av";
import React, { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import StepPlayer from "../../components/StepPlayer";

export default function PgCarousel() {
  const statusBarHeight = StatusBar.currentHeight || 0;

  const dataCarousel = [
    {
      src: require("../../../assets/videos/carousel/1.mp4"),
      note: "Tuangkan Pasta gigi pada sikat gigi sebesar biji jagung",
    },
    {
      src: require("../../../assets/videos/carousel/2.mp4"),
      note: "Gerakan sikat gigi dengan gerakan memutar",
    },
    {
      src: require("../../../assets/videos/carousel/3.mp4"),
      note: "Sikat bagian dalam gigi kalian",
    },
    {
      src: require("../../../assets/videos/carousel/4.mp4"),
      note: "Sikat gigi dengan gerakan maju mundur",
    },
    {
      src: require("../../../assets/videos/carousel/5.mp4"),
      note: "Bersihkan bagian dalam gigi dan lidah kalian",
    },
    {
      src: require("../../../assets/videos/carousel/6.mp4"),
      note: "Kumur-kumur dan Bilas mulut dengan air bersih",
    },
    {
      src: require("../../../assets/videos/carousel/7.mp4"),
      note: "Kumur-kumur dan Bilas mulut dengan air bersih",
    },
  ];

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
          Persistensi Gigi
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
        <View style={{ gap: 25, paddingBottom: 170 }}>
          {dataCarousel.map((data, idx) => (
            <View
              key={idx}
              style={{
                // width: "100%",
                backgroundColor: "white",
                elevation: 3,
                overflow: "hidden",
                borderRadius: 15,
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: "#9BACF1",
                  color: "white",
                  fontSize: 17,
                  textAlign: "center",
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                {data.name}
              </Text>
              <StepPlayer
                source={data.src}
                style={{ width: "auto", height: 300 }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
