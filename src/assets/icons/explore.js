import * as React from "react";
import Svg, { Line, Rect } from "react-native-svg";

export default function Explore(props) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="24" height="24" fill="white" />
      <Rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="black"
        stroke-width="1.8"
      />
      <Line
        x1="12.1"
        y1="6.9"
        x2="12.1"
        y2="17.1"
        stroke="black"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <Line
        x1="6.9"
        y1="11.8"
        x2="17.1"
        y2="11.8"
        stroke="black"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </Svg>
  );
}
