import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(url);
      setData(res.data);
      setError(null);
    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    fetchData();

    return () => controller.abort();
  }, [url]);

  return [data, loading, error, fetchData];  
};

export default useFetch;
