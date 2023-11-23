import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
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
      { id: "Panduan", component: Panduan },
      {
        id: "Home",
        component: Home,
        icon: <AntDesign name="home" size={24} color="black" />,
      },
      { id: "Cermat", component: Cermat },
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
