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
import { useLocationStore } from "@/lib/store";
import GoogleTextInput from "@/components/gtextinput";
import Map from "@/components/map";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermission, setHasPermission] = useState<boolean>(true);

  const handleDestinationPress = () => {};

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      // console.log(location);
      // console.log(address);
      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    }
    async function fetchUser() {
      try {
        if (!user) throw new Error("User not found");
        const reqObject = {
          email: user.emailAddresses[0].emailAddress,
          clerkId: user.id,
        };
        const secret = process.env.EXPO_PUBLIC_SECRET_KEY;
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
      {/* <View className="flex flex-row items-center justify-between my-5 px-5 py-1">
        <Text className="text-2xl font-JakartaExtraBold">
          Welcome {userData?.fullName}👋
        </Text>
        <TouchableOpacity
          onPress=
          className="justify-center items-center w-10 h-10 rounded-full bg-white"
        >
          <Image source={icons.out} className="w-4 h-4" />
        </TouchableOpacity>
      </View> */}

      {/* <Text className="text-2xl font-JakartaBold text-black p-5">
        Recent Rides
      </Text> */}

      <FlatList
        data={userData?.rides.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item) => item.id}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          !loading ? (
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
          ) : (
            <ActivityIndicator size="small" color="#000" />
          )
        }
        ListHeaderComponent={
          <>
            <View className="flex flex-row items-center justify-between my-5">
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

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        }
      ></FlatList>
    </SafeAreaView>
  );
}
