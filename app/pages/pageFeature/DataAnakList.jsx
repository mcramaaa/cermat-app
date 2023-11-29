import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

const DataAnakList = () => {
  const dataAnak = [
    {
      id: 1,
      Nama: "Anak1",
      TanggalLahir: "27-12-2023",
    },
    {
      id: 2,
      Nama: "Anak2",
      TanggalLahir: "27-01-2023",
    },
  ];

  const lahirAnak = "27-10-2023";
  const [show, setShow] = useState(false);

  const addAnak = () => {
    setShow(true);
    console.log(show);
  };

  const cancelAdd = () => {
    setShow(false);
  };

  function submitAnak() {
    console.log("submit anak");
    Keyboard.dismiss();
    setShow(false);
  }

  function openDatePicker() {
    console.log("Buka Date Picker");
  }
  return (
    <LinearGradient
      colors={["#9BACF1", "#ffffff"]}
      style={{
        height: "100%",
        width: "100%",
        padding: 20,
        position: "relative",
      }}
    >
      <View style={{ alignItems: "center" }}>
        {/* LIST NAMA ANAK */}

        <View
          style={{
            height: "100%",
            width: 350,
            backgroundColor: "white",
            borderRadius: 15,
            overflow: "hidden",
            position: "relative",
            display: show === true ? "none" : "",
          }}
        >
          <ScrollView
            style={{
              height: "100%",
              flexDirection: "column",
              padding: 20,
            }}
          >
            {dataAnak.map((data, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  height: 50,
                  backgroundColor: "#e1e4f0",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 20, fontFamily: "Poppins-Medium" }}>
                  {data.Nama}
                </Text>
                <Text>{data.TanggalLahir}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={addAnak}
            style={{
              backgroundColor: "pink",
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              position: "absolute",
              bottom: 0,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 20,
              }}
            >
              Tambahkan Data Anak
            </Text>
          </TouchableOpacity>
        </View>

        {/* INPUT DATA ANAK  */}

        <View
          style={{
            padding: 20,
            position: "absolute",
            display: show === true ? "" : "none",
          }}
        >
          <View
            style={{
              padding: 20,
              minWidth: 320,
              maxWidth: 400,
              height: 300,
              backgroundColor: "white",
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 17,
                textAlign: "left",
              }}
            >
              Masukkan Nama Anak:
            </Text>
            <TextInput
              placeholder="Masukkan Nama Anak"
              style={{
                minWidth: 320,
                maxWidth: 500,
                borderRadius: 10,
                borderColor: "#9BACF1",
                borderWidth: 2,
                paddingHorizontal: 15,
                fontSize: 17,
              }}
              // onChangeText={setName}
              defaultValue=""
            />

            <Text
              style={{
                marginTop: 30,
                fontFamily: "Poppins-SemiBold",
                fontSize: 17,
                textAlign: "left",
              }}
            >
              Tanggal Lahir Anak:
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 20,
                  textAlign: "left",
                }}
              >
                {lahirAnak}
              </Text>
              <TouchableOpacity
                onPress={openDatePicker}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#9BACF1",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="calendar" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* TOMBOL SUBMIT */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 5,
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                onPress={cancelAdd}
                true
                style={{
                  backgroundColor: "pink",
                  minWidth: 100,
                  maxWidth: 200,
                  paddingHorizontal: 5,
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
                    fontSize: 17,
                  }}
                >
                  Batal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={submitAnak}
                style={{
                  backgroundColor: "#9BACF1",
                  minWidth: 100,
                  maxWidth: 200,
                  paddingHorizontal: 5,

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
                    fontSize: 17,
                  }}
                >
                  Simpan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default DataAnakList;
