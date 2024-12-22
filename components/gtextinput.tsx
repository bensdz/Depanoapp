import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { icons } from "@/constants";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: any) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${googlePlacesApiKey}&language=en`
      );
      const data = await response.json();
      if (data && "predictions" in data) {
        setSuggestions(data.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaceDetails = async (placeId: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${googlePlacesApiKey}`
      );
      const data = await response.json();
      if (data && "result" in data) {
        const details = data.result;
        handlePress({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          address: details.formatted_address,
        });
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  const handleSelectSuggestion = (suggestion: any) => {
    setInput(suggestion.description);
    setSuggestions([]);
    fetchPlaceDetails(suggestion.place_id);
  };

  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <View className="flex flex-row items-center justify-center relative z-50 rounded-xl">
        <Image
          source={icon ? icon : icons.search}
          className="w-6 h-6"
          resizeMode="contain"
        />
        <TextInput
          className="flex-1 p-3 rounded-full"
          style={{ backgroundColor: textInputBackgroundColor || "white" }}
          placeholder={initialLocation ?? "Where do you want to go?"}
          placeholderTextColor="gray"
          value={input}
          onChangeText={(text) => {
            setInput(text);
            fetchSuggestions(text);
          }}
        />
      </View>
      {loading && <Text>Loading...</Text>}
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
            <Text className="p-2 border-b border-gray-300">
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
        className="absolute top-16 w-full bg-white rounded-lg shadow-lg z-50"
      />
    </View>
  );
};

export default GoogleTextInput;
