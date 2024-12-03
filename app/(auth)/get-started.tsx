import CustomButton from "@/components/custombtn";
import InputField from "@/components/inputfield";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View, Image } from "react-native";
import { ScrollView } from "react-native";

export default function Start() {
  const router = useRouter();
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[400px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[400px]" />
        </View>
        <View className="p-5">
          <Text className="font-JakartaBold text-2xl text-center text-black mx-10">
            Let's Get Started!
          </Text>
          <Text className="font-JakartaRegular p-5 text-center">
            Sign Up or Sign In To Get Access To Full Road Assistance
          </Text>
          <CustomButton
            title="Sign Up"
            bgvariant="primary"
            onPress={() => router.push("/register")}
            className="mt-5"
          />

          <OAuth />

          <View className="flex-row justify-center items-center mt-10">
            <Text className="text-gray-900 mr-1">
              Already have an account?{" "}
              <Link to="/login">
                <Text className="text-black font-JakartaBold">Login</Text>
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
