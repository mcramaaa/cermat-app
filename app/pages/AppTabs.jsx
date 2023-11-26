import React from "react";
import Home from "./Home";
import Panduan from "./Panduan";
import Cermat from "./Cermat";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

class AppTabs extends React.Component {
  render() {
    const Tab = createBottomTabNavigator();
    const Tabs = [
      {
        id: "Panduan",
        component: Panduan,
        icon: (
          <MaterialCommunityIcons
            name="tooth-outline"
            size={30}
            color="black"
          />
        ),
      },
      {
        id: "Home",
        component: Home,
        icon: <AntDesign name="home" size={30} color="black" />,
      },
      {
        id: "Cermat",
        component: Cermat,
        icon: <AntDesign name="calendar" size={30} color="black" />,
      },
    ];

    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            elevation: 2,
            backgroundColor: "#C2CAEB",
            borderRadius: 10,
            height: 60,
          },
        }}
      >
        {Tabs.map((data, index) => (
          <Tab.Screen
            key={index}
            name={data.id}
            component={data.component}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <View
                      style={
                        focused
                          ? {
                              backgroundColor: "#9BACF1",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 60,
                              height: 60,
                              borderRadius: 100,
                              borderWidth: 4,
                              elevation: 2,
                              borderColor: "white",
                              shadowRadius: 3.84,
                              shadowOpacity: 0.3,
                              marginBottom: 2,
                            }
                          : {}
                      }
                    >
                      {data.icon}
                    </View>
                    <Text
                      style={
                        focused
                          ? { paddingBottom: 31, fontFamily: "Poppins-Medium" }
                          : { display: "none" }
                      }
                    >
                      {data.id}
                    </Text>
                  </View>
                );
              },
            }}
          />
        ))}
      </Tab.Navigator>
    );
  }
}

export default AppTabs;
