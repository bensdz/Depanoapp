import { View, Text, Image } from "react-native";
import CustomButton from "./custombtn";
import { icons } from "@/constants";

function OAuth() {
  const onGoogleSignUpPress = () => {
    console.log("Google Sign Up Pressed");
  };
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg"> OR </Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title="Sign Up with Google"
        bgvariant="outline"
        textVariant="primary"
        onPress={onGoogleSignUpPress}
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
      />
    </View>
  );
}

export default OAuth;
