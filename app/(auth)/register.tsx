import CustomButton from "@/components/custombtn";
import InputField from "@/components/inputfield";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI, serverExternal } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { Link } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, Image, Alert } from "react-native";
import { ScrollView } from "react-native";
import ReactNativeModal from "react-native-modal";
import Constants from "expo-constants";
import { generateSignature } from "@/lib/auth";

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const [verification, setVerification] = useState({
    code: "",
    error: "",
    state: "default",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // const reqObject = {
      //   name: form.name,
      //   email: form.email,
      //   clerkId: signUp.id,
      //   emailStatus: false,
      //   clientPwd: form.password,
      // };
      // const secret = Constants.expoConfig?.extra?.jwtSecret;
      // if (!secret) throw new Error("Secret not defined");
      // const token = await generateSignature(reqObject, secret);
      // const res = await fetchAPI(`${serverExternal}/client`, {
      //   method: "POST",
      //   data: {
      //     ...reqObject,
      //     token,
      //   },
      // });

      // if (!res) throw new Error("No Internal Server Response");

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending", error: "" });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].message);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        // //i used to modify user that was set in the database
        // const reqObject = {
        //   email: form.email,
        //   clerkId: signUp.id,
        //   emailStatus: true,
        // };
        // const secret = Constants.expoConfig?.extra?.jwtSecret;
        // if (!secret) throw new Error("Secret not defined");
        // const token = await generateSignature(reqObject, secret);
        // console.log({ ...reqObject, token });
        // const res = await fetchAPI(`${serverExternal}/client`, {
        //   method: "PUT",
        //   data: {
        //     ...reqObject,
        //     token,
        //   },
        // });
        const reqObject = {
          name: form.name,
          email: form.email,
          clerkId: completeSignUp.createdUserId,
          emailStatus: false,
          clientPwd: form.password,
        };
        const secret = Constants.expoConfig?.extra?.jwtSecret;
        if (!secret) throw new Error("Secret not defined");
        const token = await generateSignature(reqObject, secret);
        const res = await fetchAPI(`${serverExternal}/client`, {
          method: "POST",
          data: {
            ...reqObject,
            token,
          },
        });

        if (!res) throw new Error("No Internal Server Response");
        setVerification({ ...verification, state: "success", error: "" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Invalid code",
        });
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setVerification({ ...verification, state: "failed", error: err.message });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaExtraBold absolute mb-5 bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label={"Name"}
            placeHolder="Your Name"
            icon={icons.person}
            value={form.name}
            onChange={(name: string) => setForm({ ...form, name })}
          />
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
          <CustomButton
            title="Sign Up"
            bgvariant="primary"
            onPress={onSignUpPress}
            className="mt-5"
          />

          <OAuth />

          <View className="flex-row justify-center items-center mt-10">
            <Text className="text-gray-900 mr-1">
              Already have an account?{" "}
              <Link to="/login">
                <Text className="text-black font-JakartaBold">Login</Text>
              </Link>
            </Text>
          </View>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccess(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2 text-center">
              Verify Your Email
            </Text>
            <Text className="font-JakartaRegular mb-5 text-center">
              We have sent a verification code to your email {form.email}
            </Text>
            <InputField
              label={"Code"}
              labelStyle="ml-3 text-[14px]"
              icon={icons.lock}
              placeHolder="123456"
              value={verification.code}
              keyboardType="number-pad"
              onChange={(code: string) =>
                setVerification({ ...verification, code })
              }
              className="mb-5"
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-5 text-center">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify"
              bgvariant="success"
              onPress={onPressVerify}
              className="top-1"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl text-black font-JakartaBold text-center">
              Successfully Verified!
            </Text>
            <Text className="text-base text-gray-400 font-JakartaRegular text-center mt-2">
              You have successfully verified your email
            </Text>
            <CustomButton
              title="Continue"
              bgvariant="primary"
              onPress={() => router.replace("/(root)/(tabs)/home")}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}

{
  /* // fi blaset oauth
   <View className="flex-row items-center my-5">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-2 text-black">OR</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          <CustomButton
            title="Sign Up with Google"
            bgvariant="outline"
            textVariant="primary"
            onPress={onGoogleSignUpPress}
            className="mt-2"
            IconLeft={() => (
              <Image source={icons.google} className="w-6 h-6 mr-3" />
            )}
          /> */
}
