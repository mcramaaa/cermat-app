import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
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

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });
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
          <Stack.Screen
            name="firstName"
            component={SetFirstName}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PgEdukasi"
            component={PgEdukasi}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PgReminder"
            component={PgReminder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PgKalenderGigi"
            component={PgKalenderGigi}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PgMonitoring"
            component={PgMonitoring}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
