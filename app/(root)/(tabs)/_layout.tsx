import { Stack } from "expo-router";
import React from "react";
import { Tabs } from "expo-router";
import { View, Image } from "react-native";
import { icons } from "@/constants";

const TabIcon = ({
  name,
  focused,
}: {
  name: keyof typeof icons;
  focused?: boolean;
}) => {
  return (
    <View
      className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
    >
      <View
        className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""} `}
      >
        <Image
          source={icons[name]}
          className="w-7 h-7"
          tintColor={"white"}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const Layout: React.FC = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0,
          overflow: "hidden",
          marginBottom: 20,
          marginHorizontal: 20,
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="chat" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="list" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
    // <Stack>
    //   <Stack.Screen name="chat" options={{ headerShown: false }} />
    //   <Stack.Screen name="home" options={{ headerShown: false }} />
    //   <Stack.Screen name="profile" options={{ headerShown: false }} />
    //   <Stack.Screen name="history" options={{ headerShown: false }} />
    // </Stack>
  );
};

export default Layout;
