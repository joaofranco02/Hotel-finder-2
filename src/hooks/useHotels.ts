/**
 * Custom hook for fetching hotels
 */

'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import type { Hotel, SearchParams } from '@/types/hotel';

export function useHotels(params?: SearchParams) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHotels() {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.getHotels(params);
        setHotels(response.results);
        setTotal(response.total);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching hotels:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, [JSON.stringify(params)]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getHotels(params);
      setHotels(response.results);
      setTotal(response.total);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { hotels, total, loading, error, refetch };
}
