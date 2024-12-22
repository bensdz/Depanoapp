import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../../global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { icons, images } from "@/constants";
import RideCard from "@/components/ridecard";

const History = () => {
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setRides(parsedData.rides || []);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const sortRides = (rides: any[], order: "asc" | "desc") => {
    return rides.sort((a, b) => {
      const dateA = new Date(a.requestDate);
      const dateB = new Date(b.requestDate);
      return order === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  };

  const sortedRides = sortRides(rides, sortOrder);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={sortedRides}
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
            <Text className="text-2xl font-JakartaBold text-black pt-5">
              Rides History
            </Text>
            <View className="flex-row justify-between items-center w-full pt-4 mb-3">
              <Text className="text-lg font-JakartaBold">Sort by Date:</Text>
              <TouchableOpacity
                onPress={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                <View className="flex-row items-center">
                  <Text className=" text-blue-500 font-JakartaMedium">
                    {sortOrder === "asc" ? "Descending" : "Ascending"}
                  </Text>
                  <Image
                    source={
                      sortOrder === "asc" ? icons.arrowDown : icons.arrowUp
                    }
                    className="w-5 h-5 items-center"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </>
        }
      ></FlatList>
    </SafeAreaView>
  );
};
export default History;
