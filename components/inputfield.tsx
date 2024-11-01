import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";

type InputFieldProps = {
  labelStyle?: string;
  label: string;
  placeHolder: string;
  icon?: any;
  value: string;
  onChange: (value: string) => void;
  secureText?: boolean;
  iconStyle?: string;
  className?: string;
  inputStyle?: string;
  containerStyle?: string;
  [key: string]: any;
};

export default function InputField({
  labelStyle,
  label,
  placeHolder,
  icon,
  iconStyle,
  className,
  inputStyle,
  containerStyle,
  value,
  onChange,
  secureText = false,
  ...props
}: InputFieldProps) {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={`my-2 w-full ${className}`}>
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`rounded-full flex flex-row justify-start items-center relative bg-neutral-100 border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}

            <TextInput
              className={` p-4 font-JakartaSemiBoldflex-1 text-[15px] ${inputStyle}`}
              placeholder={placeHolder}
              value={value}
              onChangeText={onChange}
              secureTextEntry={secureText}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
