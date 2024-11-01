import React from "react";
import { ButtonProps, Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  bgvariant?:
    | "primary"
    | "secondary"
    | "neutral"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "outline";

  textVariant?: "default" | "primary" | "secondary" | "danger" | "success";
  IconLeft?: React.FC;
  IconRight?: React.FC;
  title: string;
  className?: string;
  onPress?: () => void;
} & ButtonProps;

const getBgVariantStyle = (variant: CustomButtonProps["bgvariant"]) => {
  switch (variant) {
    case "primary":
      return "bg-primary-500";
    case "secondary":
      return "bg-secondary-500";
    case "neutral":
      return "bg-neutral-500";
    case "success":
      return "bg-success-500";
    case "warning":
      return "bg-warning-500";
    case "danger":
      return "bg-danger-500";
    case "info":
      return "bg-info-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[1px]";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (variant: CustomButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";

    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgvariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...children
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full p-3 rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70  ${getBgVariantStyle(bgvariant)} ${className} `}
      {...children}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`text-lg font-Jakarta-Bold ${getTextVariantStyle(
          textVariant
        )}`}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};
export default CustomButton;
