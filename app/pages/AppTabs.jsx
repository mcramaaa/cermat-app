import React from "react";
import Home from "./Home";
import Panduan from "./Panduan";
import Cermat from "./Cermat";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";

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
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            elevation: 3,
            backgroundColor: "whites",
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
                              backgroundColor: "#1AA7EC",
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
                              marginBottom: 5,
                            }
                          : {}
                      }
                    >
                      {data.icon}
                    </View>
                    <Text
                      style={
                        focused ? { paddingBottom: 40 } : { display: "none" }
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
