import React from "react";
import {
  Pressable,
  PressableProps,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps extends PressableProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  ...props
}: ButtonProps) => {
  return (
    <Pressable style={buttonStyle} onPress={onPress} {...props}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};
