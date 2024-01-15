/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useApi } from "./useApi";

export function useFetch(url: string){
  const api = useApi();
  const [fetch, setFetch] = useState<any>();
  const [busy, setBusy] = useState<boolean>(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const result = await api.get(url);
        setFetch(result.data.data);
      } catch (error) {
        setError(true);
      } finally {
        setBusy(false);
      }
    };
    fetchData();
  }, [url, api]);

  return {fetch, busy, error}
}
