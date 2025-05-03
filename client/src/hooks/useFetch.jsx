 import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the URL is valid or different before fetching
    if (!url) return;  // Exit early if there's no URL

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Only re-run when `url` changes

  return [data, loading, error];
};

export default useFetch;
