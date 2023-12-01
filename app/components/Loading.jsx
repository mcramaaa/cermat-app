import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loading = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#9BACF1" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default Loading;
