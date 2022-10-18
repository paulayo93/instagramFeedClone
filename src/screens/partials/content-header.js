import React from "react";
import { StyleSheet, View } from "react-native";

import Option from "../../assets/icons/option";
import Avatar from './avatar';

export default ContentHeader = () => {
  return (
    <View style={styles.container}>
      <Avatar />
      <Option />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginBottom: 3,
  },
});
