import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

interface ButtonProps extends PressableProps {
  title: string;
  buttonStyle?: string;
  textStyle?: string;
}

export const Button = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  ...props
}: ButtonProps) => {
  return (
    <Pressable className={buttonStyle} onPress={onPress} {...props}>
      <Text className={textStyle}>{title}</Text>
    </Pressable>
  );
};
