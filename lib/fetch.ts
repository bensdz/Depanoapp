import { useState, useEffect, useCallback } from "react";

import axios, { AxiosRequestConfig } from "axios";

export const fetchAPI = async (url: string, options?: AxiosRequestConfig) => {
  try {
    const response = await axios(url, options);
    //console.log("Response Data:", response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Fetch error:", error.response?.data || error.message);
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    } else {
      console.error("Fetch error:", error);
      throw error;
    }
  }
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const url2 = `${serverExternal}${url}`;
    const axiosOptions: AxiosRequestConfig = {
      method: options?.method,
      headers: options?.headers as any,
      data: (options as any)?.body,
    };
    try {
      const result = await fetchAPI(url2, axiosOptions);
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [options, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const serverExternal = "http://192.168.31.211:3000";
