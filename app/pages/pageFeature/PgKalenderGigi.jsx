import {
  View,
  ScrollView,
  StatusBar,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function PgKalenderGigi() {
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
  const statusBarHeight = StatusBar.currentHeight || 0;

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

  const Navigation = useNavigation();
  const InputAnak = () => {
    Navigation.navigate("DataAnak");
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

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
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
        />
        <Text style={{ color: "black" }}>{sliderValue} bulan</Text>
      </View>
    </View>
  );
}
