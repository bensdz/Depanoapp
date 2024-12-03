import { router } from "expo-router";
import { Text, View, TouchableOpacity, ButtonProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboardingSwiperData } from "@/constants";
import { Image } from "react-native";
import CustomButton from "@/components/custombtn";

type CustomButtonProps = {
  bgvariant:
    | "primary"
    | "secondary"
    | "neutral"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "outline";
} & ButtonProps;

export default function Welcome() {
  const swiperRef = useRef<Swiper>(null);
  const [index, setIndex] = useState(0);

  return (
    <SafeAreaView className="flex h-full justify-between bg-white">
      <View className="flex-1">
        <View className="flex-row justify-between p-5 py-4">
          <TouchableOpacity
            className="flex justify-end items-end"
            onPress={() => router.push("/login")}
          >
            <Text className="text-black text-end font-JakartaBold">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex justify-end items-start"
            onPress={() => router.push("/register")}
          >
            <Text className="text-black font-JakartaBold">Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1">
          <Swiper
            className="h-full"
            ref={swiperRef}
            loop={false}
            dot={
              <View className="w-[32px] h-[4px] m-1 bg-[#0286FF] rounded-full " />
            }
            onIndexChanged={(i) => setIndex(i)}
          >
            {onboardingSwiperData.map((item) => (
              <View
                key={item.id}
                className="flex-1 justify-center items-center p-5 w-full"
              >
                <Image source={item.image} className="w-[350px] h-[350px]" />
                <Text className="font-JakartaBold text-2xl text-center text-black mx-10">
                  {item.title}
                </Text>
                <Text className="font-JakartaRegular p-5 text-center">
                  {item.description}
                </Text>
              </View>
            ))}
          </Swiper>
        </View>

        <CustomButton
          title={
            index === onboardingSwiperData.length - 1 ? "Get Started" : "Next"
          }
          className={"w-10/12 mt-10 mb-10 mx-auto"}
          onPress={() => {
            if (index === onboardingSwiperData.length - 1) {
              router.push("/get-started");
            } else {
              if (swiperRef.current) {
                swiperRef.current.scrollBy(1);
              }
            }
          }}
          bgvariant="primary"
        />
      </View>
    </SafeAreaView>
  );
}
