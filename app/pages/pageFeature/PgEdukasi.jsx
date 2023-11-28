import { View, ScrollView, StatusBar, Text, Dimensions } from "react-native";
import { Video } from "expo-av";
import React, { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export default function PgEdukasi() {
  const statusBarHeight = StatusBar.currentHeight || 0;

  const dataVideo = [
    {
      src: require("../../../assets/videos/FilmAnimasi.mp4"),
      name: "Film Animasi Pendek Gigi dan Kuman",
    },

    {
      src: require("../../../assets/videos/VideoEdukasi.mp4"),
      name: "Video Edukasi Karies Gigi",
    },
  ];

  const video = React.useRef(null);
  const secondVideo = React.useRef(null);
  const [status, setStatus] = React.useState({});

  function setOrientation() {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

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
          Video Edukasi
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
          {dataVideo.map((data, idx) => (
            <View
              key={idx}
              style={{
                width: "100%",
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
              <Video
                ref={video}
                style={{ height: 220, width: "100%" }}
                source={data.src}
                useNativeControls
                resizeMode="cover"
                isLooping
                onPlaybackStatusUpdate={setStatus}
                onFullscreenUpdate={setOrientation}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
