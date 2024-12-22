import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../../global.css";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputField from "@/components/inputfield";
import { icons } from "@/constants";

const Profile = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      try {
        if (!user) throw new Error("User not found");
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
        } else {
          throw new Error("No user data found in storage");
        }
      } catch (e: any) {
        Alert.alert("Error", e.message);
      }
    }

    getUser();
  }, [user]);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex flex-row items-center justify-between my-5 px-5 py-1">
          <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

          <TouchableOpacity
            onPress={() => {
              signOut();
              router.replace("/(auth)/welcome");
            }}
            className="justify-center items-center w-10 h-10 rounded-full bg-white"
          >
            <Image source={icons.out} className="w-4 h-4" />
          </TouchableOpacity>
        </View>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: userData?.pfpLink,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="Name"
              value={userData?.fullName}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={true}
              placeHolder={""}
              onChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
            />

            <InputField
              label="Email"
              value={userData?.email}
              placeHolder={""}
              onChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            {/* <InputField
              label="Email Status"
              placeholder={userData?.emailStatus || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
              placeHolder={""}
              value={""}
              onChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
            /> */}

            <InputField
              label="Phone"
              placeholder={userData?.phoneNumber || "N/A"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
              placeHolder={""}
              value={""}
              onChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
