import React from "react";
import { View, Image } from "react-native";
import story from "./../../assets/images/stories.png";

export default Header = ({ image, title, status }) => {
  return (
    <View>
      <Image source={story} style={{ width: 375, height: 105 }} />
    </View>
  );
};
