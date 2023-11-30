import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import jaw from "../../assets/gigiPerm/jaw.svg";
import sixYear from "../../assets/gigiPerm/sixYear.svg";
import sevenYear from "../../assets/gigiPerm/sevenYear.svg";
import eightYear from "../../assets/gigiPerm/eightYear.svg";
import nineYear from "../../assets/gigiPerm/nineYear.svg";
import tenYear from "../../assets/gigiPerm/tenYear.svg";
import elevenYear from "../../assets/gigiPerm/elevenYear.svg";
import twelveYear from "../../assets/gigiPerm/twelveYear.svg";
import sevenTeenYear from "../../assets/gigiPerm/sevenTeenYear.svg";
import Slider from "@react-native-community/slider";

export default function GigiPerm({ display }) {
  const dataGigi = [
    {
      id: 6,
      src: sixYear,
    },
    {
      id: 7,
      src: sevenYear,
    },
    {
      id: 8,
      src: eightYear,
    },
    {
      id: 9,
      src: nineYear,
    },
    {
      id: 10,
      src: tenYear,
    },
    {
      id: 11,
      src: elevenYear,
    },
    {
      id: 12,
      src: twelveYear,
    },
    {
      id: 17,
      src: sevenTeenYear,
    },
  ];

  const screenHeight = Dimensions.get("window").height;
  const [imageSource, setImageSource] = useState({});

  const [sliderValue, setSliderValue] = useState(0);
  const handleSliderValue = (value) => {
    const roundedValue = Math.round(value);
    setSliderValue(roundedValue);
    dataGigi.map((data, i) => {
      if (sliderValue >= data.id) {
        setImageSource((oldValue) => ({
          ...oldValue,
          [data.src]: {
            src: data.src,
            opacity: 1,
          },
        }));
      } else if (sliderValue < data.id) {
        setImageSource((oldValue) => ({
          ...oldValue,
          [data.src]: {
            src: data.src,
            opacity: 0,
          },
        }));
      }
    });
  };
  return (
    <View
      style={{
        height: screenHeight - 200,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: display,
        position: "relative",
      }}
    >
      <View>
        <Image source={jaw} style={{ width: 400, height: 400 }} />
        {Object.entries(imageSource).map(([key, data], i) => (
          <Image
            key={i}
            source={data.src}
            style={{
              width: 400,
              height: 400,
              position: "absolute",
              opacity: data.opacity,
            }}
          />
        ))}
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
          minimumValue={6} //jika anak sudah 10 bln maka minimu value berubah jadi 10
          maximumValue={17}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={sliderValue}
          onValueChange={handleSliderValue}
          tapToSeek={true}
        />
        <Text style={{ color: "black" }}>{sliderValue} Tahun</Text>
      </View>
    </View>
  );
}
