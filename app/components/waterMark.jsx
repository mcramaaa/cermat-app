import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WaterMark = () => {
  return (
    <View style={styles.watermarkContainer}>
      <Text style={styles.watermarkText}>TESTER APLICATION</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  watermarkContainer: {
    position: "absolute",
    top: 80,
    right: -70,
    width: 300,
    opacity: 0.3,
    zIndex: 999,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "45deg" }],
  },
  watermarkText: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    fontFamily: "Poppins-Bold",
  },
});

export default WaterMark;
