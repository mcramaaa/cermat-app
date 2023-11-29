import { View, StatusBar, Text } from "react-native";
// import React, { useCallback, useRef, useState } from "react";
import AlarmBox from "../../components/AlarmBox";
import AppCalendar from "../../components/AppCalendar";
// import * as Notifications from "expo-notifications";
import useAlarm from "../../hook/useAlarm";
// import * as SQLite from "expo-sqlite";
// import { useFocusEffect } from "@react-navigation/native";
import { ltrimFirstZero } from "../../helpers/ltrimZero";
// import Constants from "expo-constants";
// import * as Device from "expo-device";
// import storage from "@react-native-async-storage/async-storage";

import React, { useRef, useState, useCallback } from "react";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import storage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function PgReminder() {
  const statusBarHeight = StatusBar.currentHeight || 0;

  const cermat = () => {
    Navigation.navigate("App");
    console.log("first");
  };

  const db = SQLite.openDatabase("cermat.db");
  const { alarmData } = useAlarm();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  function getAlarmData() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM alarms",
          [],
          (_, { rows }) => {
            const alarmRows = rows._array;
            console.log(alarmRows);
            resolve(alarmRows);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }

  const initNotification = async (data) => {
    await Notifications.scheduleNotificationAsync({
      identifier: `${data.identifier}`,
      content: {
        title: `${data.title}`,
        body: `${data.body}`,
        data: { screen: "default" },
      },
      trigger: {
        hour: data.hour,
        minute: data.minute,
        repeats: true,
      },
    });
  };

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "5e97bb4e-8f78-4f79-9601-d88e3c691ab3",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  // const getPermission = async () => {
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Enable push notifications to use the app!");
  //       await storage.setItem("expopushtoken", "");
  //       return;
  //     }
  //     const token = (await Notifications.getExpoPushTokenAsync()).data;
  //     await storage.setItem("expopushtoken", token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.HIGH,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //       sound: "default",
  //     });
  //   }
  // };

  useFocusEffect(
    useCallback(() => {
      registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          // const JSONResponse = JSON.parse(response);
          // console.log("here", JSONResponse.request);
          // console.log("here2", JSONResponse);
          // if (JSONResponse.request.content.data.screen == "default") {
          //   navigation.navigate("PanduanFromNotif");
          // }
        });

      const subscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("data", response.notification.request.content);
          if (response.notification.request.content.data.screen === "default") {
            // navigation.navigate("");
            console.log("Astagfirullah");
          }
        });
      getAlarmData()
        .then((res) => {
          res.forEach((element) => {
            // Notifications.cancelScheduledNotificationAsync(`${element.tag}`);
            initNotification({
              title: `${element.tag}`,
              body: `Alarm ${element.tag}`,
              hour: Number(ltrimFirstZero(`${element.hours}`)),
              minute: Number(ltrimFirstZero(`${element.minute}`)),
              identifier: `${element.tag}`,
            });
          });
        })
        .catch((err) => console.log(err));
      // getPermission();

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
        subscription.remove();
      };
    }, [])
  );

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
          Reminder {"\n"}Sikat Gigi
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
        <View style={{ gap: 10, paddingBottom: 170 }}>
          {/* <AlarmBox /> */}
          {alarmData.map((data, key) => (
            <AlarmBox
              tittle={data.tag}
              key={key}
              alarmData={data}
              initNotification={initNotification}
              notifications={Notifications}
            />
          ))}
          <AppCalendar />
        </View>
      </ScrollView>
    </View>
  );
}
