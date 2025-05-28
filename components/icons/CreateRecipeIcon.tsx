import React from "react";
import Svg, { Path } from "react-native-svg";

interface CreateRecipeIconProps {
  width?: number;
  height?: number;
  color?: string;
  filled?: boolean;
  strokeWidth?: number;
}

export const CreateRecipeIcon = ({
  width,
  height,
  color,
  filled,
  strokeWidth = 2,
}: CreateRecipeIconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
    </Svg>
  );
};
