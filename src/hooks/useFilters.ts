/**
 * Custom hook for managing hotel filters
 */

'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import type { PriceRange } from '@/types/hotel';

export function useFilters() {
  const [cities, setCities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFilters() {
      try {
        setLoading(true);
        setError(null);

        // Fetch cities and price range in parallel
        const [citiesData, priceRangeData] = await Promise.all([
          apiClient.getCities(),
          apiClient.getPriceRange(),
        ]);

        setCities(citiesData);
        setPriceRange(priceRangeData);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching filters:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFilters();
  }, []);

  return { cities, priceRange, loading, error };
}
