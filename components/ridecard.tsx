import { Image, Text, View } from "react-native";

import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import Constants from "expo-constants";

const RideCard = ({ ride }: { ride: any }) => {
  const key = Constants.expoConfig?.extra?.geoApify;
  //console.log(ride);
  const statusMatchText = {
    CanceledBeforeAcceptance: "Canceled",
    CanceledMidRide: "Canceled",
    Successful: "Successful",
    Pending: "Pending",
  };
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-start justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.longDest},${ride.latDest}&zoom=14&apiKey=${key}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {ride.adrOrigin}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {ride.adrDest}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Date & Time
            </Text>
            <Text className="text-md font-JakartaBold" numberOfLines={1}>
              {formatDate(ride.requestDate)}, {formatTime(ride.dateClosed)}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Driver
            </Text>
            <Text className="text-md font-JakartaBold">
              {ride.driver?.fullName || "Not Assigned"}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Car Seats
            </Text>
            <Text className="text-md font-JakartaBold">
              {ride.driver?.car?.nbSeats || "N/A"}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Status
            </Text>
            <Text
              className={`text-md capitalize font-JakartaBold ${
                ride.status === "Successful" ? "text-green-500" : "text-red-500"
              }`}
            >
              {statusMatchText[ride.status]}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
