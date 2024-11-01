import CustomButton from "@/components/custombtn";
import InputField from "@/components/inputfield";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, Image } from "react-native";
import { ScrollView } from "react-native";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = () => {
    console.log("Sign Up Pressed");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute mb-5 bottom-5 left-5">
            Welcome Back!
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label={"Email"}
            placeHolder="Your Email"
            icon={icons.email}
            value={form.email}
            onChange={(email: string) => setForm({ ...form, email })}
          />
          <InputField
            label={"Password"}
            placeHolder="Your Password"
            icon={icons.lock}
            value={form.password}
            onChange={(password: string) => setForm({ ...form, password })}
            secureText
          />
          <CustomButton
            title="Sign In"
            bgvariant="primary"
            onPress={onSignInPress}
            className="mt-5"
          />

          <OAuth />

          <View className="flex-row justify-center items-center mt-10">
            <Text className="text-gray-900 mr-1">
              Don't have an account?{" "}
              <Link to="/register">
                <Text className="text-black font-JakartaBold">Register</Text>
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
