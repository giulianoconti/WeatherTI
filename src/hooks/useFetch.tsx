import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  error: Error | null | string;
  isLoading: boolean;
};

export const useFetch = <T extends Record<string, any>>(url: string): FetchState<T> => {
  const [dataFetch, setDataFetch] = useState<FetchState<T>>({ data: null, error: null, isLoading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        setDataFetch({ data: responseData, error: null, isLoading: false });
      } catch (error) {
        setDataFetch({ data: null, error: "error", isLoading: false });
      }
    };

    fetchData();
  }, [url]);

  return dataFetch;
};
