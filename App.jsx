import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AppTabs from "./app/pages/AppTabs";
import Profile from "./app/pages/Profile";
import SetFirstName from "./app/components/SetFirstName";
import PgEdukasi from "./app/pages/pageFeature/PgEdukasi";
import PgReminder from "./app/pages/pageFeature/PgReminder";
import PgKalenderGigi from "./app/pages/pageFeature/PgKalenderGigi";
import PgMonitoring from "./app/pages/pageFeature/PgMonitoring";
import { Ionicons } from "@expo/vector-icons";
import Keluhan from "./app/components/Keluhan";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { useUser } from "./app/hook/useUser.zustand";
import DataAnakList from "./app/pages/pageFeature/DataAnakList";
import PgCarousel from "./app/pages/pageFeature/PgCarousel";

const Stack = createStackNavigator();

export default function App() {
  const { user, setUser } = useUser();
  // const [isUserSet, setIsUserSet] = useState(false);
  const [isAlarmTable, setIsAlarmTable] = useState(false);
  const db = SQLite.openDatabase("cermat.db");

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  function initDatabase() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL);",
        [],
        () => console.log("Users Table created successfully"),
        (error) => {
          if (error) {
            console.error("Error creating table: ", error);
          }
        }
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS childs (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, birthday datetime(6) NOT NULL, is_active BOOLEAN default false);",
        [],
        () => console.log("Childs Table created successfully"),
        (error) => {
          if (error) {
            console.error("Error creating table: ", error);
          }
        }
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS alarms (id INTEGER PRIMARY KEY AUTOINCREMENT, tag VARCHAR(255) NOT NULL, hours VARCHAR(255) NOT NULL, minute VARCHAR(255) NOT NULL);",
        [],
        () => setIsAlarmTable(true),
        (error) => {
          if (error) {
            console.error("Error creating table: ", error);
          }
        }
      );

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS reports (id INTEGER PRIMARY KEY AUTOINCREMENT, created_at VARCHAR(255) NOT NULL);",
        [],
        () => console.log("Reports Table created successfully"),
        (error) => {
          if (error) {
            console.error("Error creating table: ", error);
          }
        }
      );
    });
  }

  function getDefaultAlarm() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM alarms",
          [],
          (_, { rows }) => {
            const alarmRows = rows._array;
            resolve(alarmRows);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }

  function createDefaultAlarm() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO alarms (tag, hours, minute) values (?, ?, ?)`,
          ["Sikat Gigi Pagi", "23", "46"],
          (_, { insertId, rowsAffected }) => {
            resolve({ insertId: insertId, rowsAffected: rowsAffected });
          },
          (error) => {
            reject(error);
          }
        );
        tx.executeSql(
          `INSERT INTO alarms (tag, hours, minute) values (?, ?, ?)`,
          ["Sikat Gigi Malam", "23", "45"],
          (_, { insertId, rowsAffected }) => {
            resolve({ insertId: insertId, rowsAffected: rowsAffected });
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }

  function getUserData() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM users",
          [],
          (_, { rows }) => {
            const userRows = rows._array;
            resolve(userRows);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }

  const emptyTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM alarms",
        [],
        (_, result) => {
          console.log("Table emptied successfully");
        },
        (error) => {
          console.error("Error while emptying the table:", error);
        }
      );
      tx.executeSql(
        "DELETE FROM users",
        [],
        (_, result) => {
          console.log("Table emptied successfully");
        },
        (error) => {
          console.error("Error while emptying the table:", error);
        }
      );
      tx.executeSql(
        "DELETE FROM reports",
        [],
        (_, result) => {
          console.log("Table emptied successfully");
        },
        (error) => {
          console.error("Error while emptying the table:", error);
        }
      );
    });
  };

  const dropTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE childs",
        [],
        (_, result) => {
          console.log("Table emptied successfully");
        },
        (error) => {
          console.error("Error while emptying the table:", error);
        }
      );
    });
  };

  async function initAlarmDefault() {
    const defaultAlarm = await getDefaultAlarm();
    if (defaultAlarm.length == 0) {
      createDefaultAlarm();
    }
  }

  useEffect(() => {
    // emptyTable();
    getUserData()
      .then((userRows) => {
        if (userRows.length > 0) {
          console.log(userRows);
          setUser({ id: userRows[0].id, name: userRows[0].name });
          // setIsUserSet(true);
        }
        // setIsUserSet(true);
      })
      .catch((error) => {
        console.error(error);
      });

    initDatabase();
  }, []);

  if (isAlarmTable) {
    initAlarmDefault();
  }
  if (!fontsLoaded) return null;
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={`${user.name != "" ? "App" : "firstName"}`}
        >
          <Stack.Screen
            name="App"
            component={AppTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="firstName"
            component={SetFirstName}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen
            name="PgEdukasi"
            component={PgEdukasi}
            options={{
              headerTitleStyle: { display: "none" },
              headerTransparent: true,
              headerBackImage: () => (
                <Ionicons name="arrow-back-outline" size={35} color="white" />
              ),
            }}
          />
          <Stack.Screen
            name="PgCarousel"
            component={PgCarousel}
            options={{
              headerTitleStyle: { display: "none" },
              headerTransparent: true,
              headerBackImage: () => (
                <Ionicons name="arrow-back-outline" size={35} color="white" />
              ),
            }}
          />
          <Stack.Screen
            name="PgReminder"
            component={PgReminder}
            options={{
              headerTitleStyle: { display: "none" },
              headerTransparent: true,
              headerBackImage: () => (
                <Ionicons name="arrow-back-outline" size={35} color="white" />
              ),
            }}
          />

          <Stack.Screen
            name="PgKalenderGigi"
            component={PgKalenderGigi}
            options={{
              headerTitleStyle: { display: "none" },
              headerTransparent: true,
              headerBackImage: () => (
                <Ionicons name="arrow-back-outline" size={35} color="white" />
              ),
            }}
          />
          <Stack.Screen
            name="DataAnak"
            component={DataAnakList}
            options={{
              title: "Data Anak",
            }}
          />
          <Stack.Screen
            name="PgMonitoring"
            component={PgMonitoring}
            options={{
              headerTitleStyle: { display: "none" },
              headerTransparent: true,
              headerBackImage: () => (
                <Ionicons name="arrow-back-outline" size={35} color="white" />
              ),
            }}
          />
          <Stack.Screen
            name="Keluhan"
            component={Keluhan}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
