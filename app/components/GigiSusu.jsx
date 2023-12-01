import { View, Text, Dimensions } from "react-native";
import React, { useCallback, useState } from "react";
import { Image } from "expo-image";
import jaw from "../../assets/gigiSusu/Jaw.svg";
import sixMonth from "../../assets/gigiSusu/sixMonth.svg";
import eightMonth from "../../assets/gigiSusu/eightMonth.svg";
import tenMonth from "../../assets/gigiSusu/tenMonth.svg";
import twelveMonth from "../../assets/gigiSusu/twelveMonth.svg";
import sixTeenMonth from "../../assets/gigiSusu/sixTeenMonth.svg";
import eightTeenMonth from "../../assets/gigiSusu/eightTeenMonth.svg";
import twentyFourMonth from "../../assets/gigiSusu/twentyFourMonth.svg";
import Slider from "@react-native-community/slider";
import { useFocusEffect } from "@react-navigation/native";

export default function GigiSusu({ display, monthRange }) {
  const dataGigi = [
    {
      id: 6,
      src: sixMonth,
    },
    {
      id: 8,
      src: eightMonth,
    },
    {
      id: 10,
      src: tenMonth,
    },
    {
      id: 12,
      src: twelveMonth,
    },
    {
      id: 16,
      src: sixTeenMonth,
    },
    {
      id: 18,
      src: eightTeenMonth,
    },
    {
      id: 24,
      src: twentyFourMonth,
    },
  ];

  const screenHeight = Dimensions.get("window").height;
  const [imageSource, setImageSource] = useState({});

  const [sliderValue, setSliderValue] = useState();

  const handleSliderValue = (value) => {
    const roundedValue = Math.round(value);
    setSliderValue(roundedValue);
    dataGigi.map((data, i) => {
      if (roundedValue >= data.id) {
        setImageSource((oldValue) => ({
          ...oldValue,
          [data.src]: {
            src: data.src,
            opacity: 1,
          },
        }));
      } else if (roundedValue < data.id) {
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

  useFocusEffect(
    useCallback(() => {
      dataGigi.map((data, i) => {
        if (monthRange >= data.id) {
          setImageSource((oldValue) => ({
            ...oldValue,
            [data.src]: {
              src: data.src,
              opacity: 1,
            },
          }));
        } else if (monthRange < data.id) {
          setImageSource((oldValue) => ({
            ...oldValue,
            [data.src]: {
              src: data.src,
              opacity: 0,
            },
          }));
        }
      });

      setSliderValue(monthRange);
    }, [])
  );

  return (
    <View
      style={{
        height: screenHeight - 200,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: display,
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
          minimumValue={0} //jika anak sudah 10 bln maka minimu value berubah jadi 10
          maximumValue={24}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={sliderValue}
          onValueChange={handleSliderValue}
          tapToSeek={true}
        />
        <Text style={{ color: "black" }}>{sliderValue} bulan</Text>
      </View>
    </View>
  );
}
