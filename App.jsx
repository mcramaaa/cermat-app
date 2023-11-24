import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AppTabs from "./app/pages/AppTabs";
import { useState } from "react";
import AppLoading from "./app/components/AppLoading";
import Profile from "./app/pages/Profile";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  const [fontLoaded, setFontLoaded] = useState(false);

  // Load fonts using Font.loadAsync
  const loadFonts = async () => {
    await Font.loadAsync({
      "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
      "Poppins-Regular": require("./assets/fonts/Poppins-SemiBold.ttf"),
      "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    });
    setFontLoaded(true);
  };
  // if (!fontLoaded) {
  //   return (
  //     <AppLoading startAsync={loadFonts} onFinish={() => setFontLoaded(true)} />
  //   );
  // }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="App"
            component={AppTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
