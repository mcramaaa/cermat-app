import { View, ScrollView, StatusBar, Text, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import goodJobAnim from "../../components/lotties/goodJob2.json";
import run from "../../components/lotties/run.json";

export default function PgMonitoring() {
  const statusBarHeight = StatusBar.currentHeight || 0;
  const Navigation = useNavigation();
  const [sesuai, setSesuai] = useState(0);
  function answerSesuai() {
    setSesuai(1);
  }
  function answerTidakSesuai() {
    setSesuai(2);
  }
  const directWhatsapp = () => {
    Navigation.navigate("Keluhan");
  };

  const daftarPeriksa = () => {
    Linking.openURL("https://ehealth.surabaya.go.id/pendaftaranv2/");
  };

  useEffect(() => {
    setSesuai(0);
  }, []);

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
          Teledentistry
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
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontFamily: "Poppins-SemiBold",
            }}
          >
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
              display: sesuai === 1 ? "" : "none",
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: "#9BACF1",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <LottieView
                source={goodJobAnim}
                autoPlay={true}
                loop={true}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <View>
              <Text style={{ marginBottom: 10 }}>
                1. Sikat gigi 2x sehari {"("}Pagi setelah Makan dan Malam
                sebelum Tidur{")"}
              </Text>
              <Text style={{ marginBottom: 10 }}>
                2. Kurangi Makanan Manis dan Melekat
              </Text>
              <Text style={{ marginBottom: 10 }}>
                3. Konsumsi makanan bergizi
              </Text>
              <Text>
                4. Konsultasi ke dokter gigi secara berkala minimal 6 bulan
                sekali
              </Text>
            </View>
          </View>

          <View
            style={{
              display: sesuai === 2 ? "" : "none",
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: "#9BACF1",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <LottieView
                source={run}
                autoPlay={true}
                loop={true}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <View style={{ gap: 5 }}>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                Yuk periksakan gigi anak anda ke fasilitas kesehatan terdekat
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 15,
                  paddingTop: 5,
                }}
              >
                PUSKESMAS TANAH KALI KEDINDING
              </Text>
              <Text style={{ fontFamily: "Poppins-Medium" }}>
                Alamat: {"\n"}Jl. Kedung Cowek No.226, Tanah Kali Kedinding,
                Kec. Kenjeran, Surabaya, Jawa Timur 60129
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={daftarPeriksa}
                  style={{
                    backgroundColor: "#9BACF1",
                    minWidth: 250,
                    maxWidth: 350,
                    paddingHorizontal: 10,

                    height: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ fontFamily: "Poppins-SemiBold", color: "white" }}
                  >
                    Pendaftaran Periksa Gigi
                  </Text>
                </TouchableOpacity>
                <Text>atau</Text>
                <TouchableOpacity
                  onPress={directWhatsapp}
                  style={{
                    backgroundColor: "#9BACF1",
                    minWidth: 250,
                    maxWidth: 350,
                    paddingHorizontal: 10,

                    height: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ fontFamily: "Poppins-SemiBold", color: "white" }}
                  >
                    Konsultasi Via WhatsApp
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 10,
                  color: "red",
                }}
              >
                Note: {"\n"}
                <Text style={{ color: "black" }}>
                  Jika, fasilitas kesehatan tersebut terlalu jauh dari tempat
                  anda, silahkan kunjungi Puskesmas atau Klinik Gigi Terdekat.
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
