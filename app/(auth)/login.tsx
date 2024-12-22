import CustomButton from "@/components/custombtn";
import InputField from "@/components/inputfield";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View, Image } from "react-native";
import { ScrollView } from "react-native";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setLoading(true);
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        setError("");
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setError("Invalid email or password");
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.error(JSON.stringify(err, null, 2));
      setError("Invalid email or password");
    }
  }, [form, isLoaded, setActive, signIn, router]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaExtraBold absolute mb-5 bottom-5 left-5">
            Welcome Back!
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label={"Email"}
            placeHolder="Your Email"
            icon={icons.email}
            value={form.email}
            onChange={(email: string) => setForm({ ...form, email })}
          />
          <InputField
            label={"Password"}
            placeHolder="Your Password"
            icon={icons.lock}
            value={form.password}
            onChange={(password: string) => setForm({ ...form, password })}
            secureText
          />

          {error && <Text className="text-red-500 text-sm">{error}</Text>}

          <CustomButton
            title="Sign In"
            bgvariant="primary"
            onPress={onSignInPress}
            className="mt-5"
            disabled={loading}
          />

          <OAuth />

          <View className="flex-row justify-center items-center mt-10">
            <Text className="text-gray-900 mr-1">
              Don't have an account?{" "}
              <Link to="/register">
                <Text className="text-black font-JakartaBold">Register</Text>
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
