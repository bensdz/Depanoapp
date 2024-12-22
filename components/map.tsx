import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { icons } from "@/constants";
import { fetchAPI, serverExternal, useFetch } from "@/lib/fetch";
import { calculateRegion } from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/lib/store";
import { useUser } from "@clerk/clerk-expo";
import { generateSignature } from "@/lib/auth";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const { selectedDriver, setDrivers } = useDriverStore();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avDrivers, setAvDrivers] = useState<any[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const reqObject = {
          email: user?.emailAddresses[0].emailAddress,
          clerkId: user?.id,
        };
        const secret = process.env.EXPO_PUBLIC_SECRET_KEY;
        if (!secret) throw new Error("Application Error: Secno");
        const token = await generateSignature(reqObject, secret);

        const { data } = await fetchAPI(`${serverExternal}/drivers`, {
          method: "POST",
          data: {
            ...reqObject,
            token,
          },
        });
        setAvDrivers(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [user?.emailAddresses, user?.id, userLatitude, userLongitude]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  if (loading || (!userLatitude && !userLongitude))
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );

  if (error)
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ flex: 1, width: "100%", height: "100%" }}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      initialRegion={region}
      userInterfaceStyle="light"
    >
      <Marker
        key={user?.id}
        coordinate={{
          latitude: userLatitude!,
          longitude: userLongitude!,
        }}
        title={`Your Current Location`}
      />
      {/* {avDrivers.map((driver, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: driver?.currLat,
            longitude: driver?.currLong,
          }}
          title={`${driver?.fullName} - ${driver?.car.carModel}`}
          image={
            selectedDriver === +driver.id ? icons.selectedMarker : icons.marker
          }
        />
      ))} */}

      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
          <MapViewDirections
            origin={{
              latitude: userLatitude!,
              longitude: userLongitude!,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={directionsAPI!}
            strokeColor="#0286FF"
            strokeWidth={2}
          />
        </>
      )}
      <Text>Map</Text>
    </MapView>
  );
};

export default Map;
