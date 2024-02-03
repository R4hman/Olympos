import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const res = await response.json();
        setData(res);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  const refetch = async (url2) => {
    setIsLoading(true);
    try {
      const response = await fetch(url2);
      const res = await response.json();
      setData(res);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return { error, isLoading, data, refetch };
};

export default useFetch;
