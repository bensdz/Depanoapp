import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../../global.css";

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className={"justify-center items-center flex-1"}>
        <Text className={"text-red-500 font-bold"}>Profile</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};
export default Profile;
