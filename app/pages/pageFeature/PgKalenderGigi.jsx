import { View, ScrollView, StatusBar, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import jaw from "../../../assets/gigi/Jaw.svg";
import sixMonth from "../../../assets/gigi/sixMonth.svg";
import eightMonth from "../../../assets/gigi/eightMonth.svg";
import tenMonth from "../../../assets/gigi/tenMonth.svg";
import twelveMonth from "../../../assets/gigi/twelveMonth.svg";
import sixTeenMonth from "../../../assets/gigi/sixTeenMonth.svg";
import eightTeenMonth from "../../../assets/gigi/eightTeenMonth.svg";
import twentyFourMonth from "../../../assets/gigi/twentyFourMonth.svg";
import Slider from "@react-native-community/slider";
// import { FontAwesome5 } from "@expo/vector-icons";

export default function PgKalenderGigi() {
  const screenHeight = Dimensions.get("window").height;
  const statusBarHeight = StatusBar.currentHeight || 0;
  const cermat = () => {
    Navigation.navigate("App");
    console.log("first");
  };

  const [sliderValue, setSliderValue] = useState(0);
  const handleSliderValue = (value) => {
    const roundedValue = Math.round(value);
    setSliderValue(roundedValue);
    console.log(sliderValue);
  };

  const gigiImage = [
    {
      id: 6,
      src: sixMonth,
      opacity: 0,
    },
    {
      id: 8,
      src: eightMonth,
      opacity: 0,
    },
    {
      id: 10,
      src: tenMonth,
      opacity: 0,
    },
    {
      id: 12,
      src: twelveMonth,
      opacity: 0,
    },
    {
      id: 16,
      src: sixTeenMonth,
      opacity: 0,
    },
    {
      id: 18,
      src: eightTeenMonth,
      opacity: 0,
    },
    {
      id: 24,
      src: twentyFourMonth,
      opacity: 0,
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
          Kalender {"\n"}Pertumbuhan Gigi
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          height: screenHeight - 150,
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
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Image source={jaw} style={{ width: 400, height: 400 }} />
          {gigiImage.map((data, index) => (
            <Image
              key={index}
              source={data.src}
              style={{
                width: 360,
                height: 360,
                position: "absolute",
                opacity: data.opacity,
              }}
            />
          ))}
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: 60,
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e1e4f0",
          elevation: 1,
          position: "absolute",
          bottom: 0,
          zIndex: 20,
        }}
      >
        <Text style={{ color: "black" }}>Umur</Text>
        <Slider
          style={{ minWidth: 280, maxWidth: 450, height: 10 }}
          minimumValue={0} //jika anak sudah 10 bln maka minimu value berubah jadi 10
          maximumValue={30}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={sliderValue}
          onValueChange={handleSliderValue}
          tapToSeek={true}
          // thumbImage={<FontAwesome5 name="tooth" size={24} color="black" />}
        />
        <Text style={{ color: "black" }}>{sliderValue} bulan</Text>
      </View>
    </View>
  );
}
