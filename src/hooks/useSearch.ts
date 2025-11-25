/**
 * Custom hook for search functionality with debounce
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { apiClient } from '@/lib/api';
import type { Hotel } from '@/types/hotel';

export function useSearch(debounceMs: number = 300) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const searchHotels = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.searchHotels(searchQuery);
      setResults(response.results);
    } catch (err) {
      setError(err as Error);
      setResults([]);
      console.error('Error searching hotels:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounce
    if (query) {
      setLoading(true);
      timeoutRef.current = setTimeout(() => {
        searchHotels(query);
      }, debounceMs);
    } else {
      setResults([]);
      setLoading(false);
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, debounceMs, searchHotels]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setError(null);
  };

  return { query, setQuery, results, loading, error, clearSearch };
}
