import * as Crypto from "expo-crypto";
import base64 from "base-64";
import utf8 from "utf8";
import * as SecureStore from "expo-secure-store";

const base64UrlEncode = (data: string) => {
  const base64Str = base64.encode(utf8.encode(data));
  return base64Str.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};

/**
 * Generate a HMAC-SHA256 signature using expo-crypto
 */
export const generateSignature = async (message: object, secret: string) => {
  const messageString = JSON.stringify(message);
  const key = utf8.encode(secret);
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${key}${messageString}`
  );
  const base64UrlSignature = base64UrlEncode(hash);
  return base64UrlSignature;
};

export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
