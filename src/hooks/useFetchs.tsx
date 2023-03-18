import { useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

type FetchResult<T> = {
  [K in keyof T]: FetchState<T[K]>;
};

export function useFetchs<T extends Record<string, any>>(urls: string[]): FetchResult<T> {
  const [dataFetch, setDataFetch] = useState<FetchResult<T>>(
    urls.reduce((acc, url) => {
      acc[url as keyof T] = { data: null, error: null, isLoading: true };
      return acc;
    }, {} as FetchResult<T>)
  );
  
  useEffect(() => {
    const fetchData = async () => {
      const requests = urls.map(async (url) => {
        try {
          const response = await fetch(url);
          const responseData = await response.json();
          setDataFetch((prevData) => ({
            ...prevData,
            [url]: { data: responseData, error: null, isLoading: false },
          }));
        } catch (error) {
          setDataFetch((prevData) => ({
            ...prevData,
            [url]: { data: null, error, isLoading: false },
          }));
        }
      });
      await Promise.all(requests);
    };

    fetchData();
  }, [urls[0]]);

  return dataFetch;
}
