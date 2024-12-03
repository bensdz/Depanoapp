import { SignedIn, useAuth, useUser } from "@clerk/clerk-expo";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "@/components/ridecard";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import Constants from "expo-constants";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { fetchAPI, serverExternal } from "@/lib/fetch";
import { generateSignature } from "@/lib/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {
  const key = Constants.expoConfig?.extra?.geoApify;
  const { user } = useUser();
  const { signOut } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    async function fetchUser() {
      try {
        setLoading(true);
        if (!user) throw new Error("User not found");
        const reqObject = {
          email: user.emailAddresses[0].emailAddress,
          clerkId: user.id,
        };
        const secret = Constants.expoConfig?.extra?.jwtSecret;
        if (!secret) throw new Error("Secret not defined");
        const token = await generateSignature(reqObject, secret);
        const res = await fetchAPI(`${serverExternal}/clientdetails`, {
          method: "POST",
          data: {
            ...reqObject,
            token,
          },
        });
        await AsyncStorage.setItem("userData", JSON.stringify(res.data));
        setUserData(res.data);
        setLoading(false);
      } catch (e: any) {
        Alert.alert("Error", e.message);
        setLoading(false);
      }
    }
    fetchUser();
    getCurrentLocation();
  }, []);

  return (
    <SafeAreaView className="bg-general-500">
      <View className="flex flex-row items-center justify-between my-5 px-5 py-1">
        <Text className="text-2xl font-JakartaExtraBold">
          Welcome {userData?.fullName}👋
        </Text>
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

      {location ? (
        <View className="flex flex-row items-center justify-center">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${location.coords.longitude},${location.coords.latitude}&zoom=1&apiKey=${key}`,
            }}
            className="w-[95%] h-[200px] rounded-lg items-center justify-center"
          />
        </View>
      ) : errorMsg ? (
        <Text className="text-red-500">{errorMsg}</Text>
      ) : (
        <Text className="text-gray-500">Loading...</Text>
      )}

      <Text className="text-2xl font-JakartaBold text-black p-5">
        Recent Rides
      </Text>

      <FlatList
        data={userData?.rides.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item) => item.id}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 400,
        }}
        ListEmptyComponent={
          <View className="flex flex-col items-center justify-center">
            <>
              <Image
                source={images.noResult}
                className="w-40 h-40"
                alt="No recent rides found"
                resizeMode="contain"
              />
              <Text className="text-sm">No recent rides found</Text>
            </>
          </View>
        }
      ></FlatList>
    </SafeAreaView>
  );
}
