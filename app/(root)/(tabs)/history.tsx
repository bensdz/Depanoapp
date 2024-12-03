import { StatusBar } from "expo-status-bar";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../../global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { images } from "@/constants";
import RideCard from "@/components/ridecard";

const History = () => {
  const [rides, setRides] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setRides(parsedData.rides || []);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text className="text-2xl font-JakartaBold text-black p-5">
        Rides History
      </Text>
      <FlatList
        data={rides}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item) => item.id}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
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
};
export default History;
