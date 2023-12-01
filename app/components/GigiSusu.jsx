import { View, Text, Dimensions, StatusBar } from "react-native";
import React, { useCallback, useState } from "react";
import { Image } from "expo-image";
import jaw from "../../assets/gigiSusu/Jaw.svg";
import sixMonth from "../../assets/gigiSusu/sixMonth.svg";
import eightMonth from "../../assets/gigiSusu/eightMonth.svg";
import nineMonth from "../../assets/gigiSusu/nineMonth.svg";
import tenMonth from "../../assets/gigiSusu/tenMonth.svg";
import thirTeenMonth from "../../assets/gigiSusu/thirTeenMonth.svg";
import fourTeenMonth from "../../assets/gigiSusu/fourTeenMonth.svg";
import sixTeenMonth from "../../assets/gigiSusu/sixTeenMonth.svg";
import sevenTeenMonth from "../../assets/gigiSusu/sevenTeenMonth.svg";
import twentyThreeMonth from "../../assets/gigiSusu/twentyThreeMonth.svg";
import twentyFiveMonth from "../../assets/gigiSusu/twentyFiveMonth.svg";
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
      id: 9,
      src: nineMonth,
    },
    {
      id: 10,
      src: tenMonth,
    },
    {
      id: 13,
      src: thirTeenMonth,
    },
    {
      id: 14,
      src: fourTeenMonth,
    },
    {
      id: 16,
      src: sixTeenMonth,
    },
    {
      id: 17,
      src: sevenTeenMonth,
    },
    {
      id: 23,
      src: twentyThreeMonth,
    },
    {
      id: 25,
      src: twentyFiveMonth,
    },
  ];

  const windoHeight = Dimensions.get("window").height;
  const statusBarHeight = StatusBar.currentHeight || 0;
  const screenHeight = windoHeight - statusBarHeight;

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
        height: screenHeight * 0.85,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: display,
        zIndex: 10,
        // position: "relative",
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
              zIndex: 50,
            }}
          />
        ))}
      </View>
      <View
        style={{
          height: 60,
          width: "100%",
          paddingHorizontal: 50,
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
          style={{ width: "100%", height: 10, display: display }}
          minimumValue={0} //jika anak sudah 10 bln maka minimu value berubah jadi 10
          maximumValue={25}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={sliderValue}
          onValueChange={handleSliderValue}
          tapToSeek={true}
          thumbStyle={{ width: 40, height: 40 }}
        />
        <Text style={{ color: "black" }}>{sliderValue} bulan</Text>
      </View>
    </View>
  );
}
