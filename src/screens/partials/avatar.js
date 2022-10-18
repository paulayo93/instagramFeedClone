import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import dog from "./../../assets/images/dog.png";

export default Avatar = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image style={styles.image} source={dog} />
      <Text style={styles.title}>Ruffles</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    lineHeight: 22,
    fontWeight: "bold",
    color: "#000000",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 0,
    borderColor: "none",
    marginRight: 9,
  },
});
