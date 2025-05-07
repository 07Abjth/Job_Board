 import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the URL is valid or different before fetching
    if (!url) return;  // Exit early if there's no URL

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(url, { signal: controller.signal });
        setData(res.data);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    return () => controller.abort();

    
  }, [url]); // Only re-run when `url` changes

  return [data, loading, error];
};

export default useFetch;
