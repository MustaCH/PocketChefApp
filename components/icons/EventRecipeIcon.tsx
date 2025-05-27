import React from "react";
import Svg, { Path } from "react-native-svg";

export const EventRecipeIcon = ({
  width = 33,
  height = 33,
  color,
  strokeWidth = 1.5,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      stroke={color}
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M4 5h2" />
      <Path d="M5 4v2" />
      <Path d="M11.5 4l-.5 2" />
      <Path d="M18 5h2" />
      <Path d="M19 4v2" />
      <Path d="M15 9l-1 1" />
      <Path d="M18 13l2 -.5" />
      <Path d="M18 19h2" />
      <Path d="M19 18v2" />
      <Path d="M14 16.518l-6.518 -6.518l-4.39 9.58a1 1 0 0 0 1.329 1.329l9.579 -4.39z" />
    </Svg>
  );
};
