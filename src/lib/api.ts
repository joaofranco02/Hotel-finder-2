/**
 * API Client for Hotel Finder Backend
 */

import type { Hotel, HotelsResponse, SearchParams, PriceRange, Stats } from '@/types/hotel';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_V1 = process.env.NEXT_PUBLIC_API_V1 || '/api/v1';

export const API_ENDPOINTS = {
  hotels: `${API_BASE_URL}${API_V1}/hotels`,
  hotelById: (id: number) => `${API_BASE_URL}${API_V1}/hotels/${id}`,
  search: `${API_BASE_URL}${API_V1}/hotels/search/query`,
  cities: `${API_BASE_URL}${API_V1}/hotels/filters/cities`,
  priceRange: `${API_BASE_URL}${API_V1}/hotels/filters/price-range`,
  stats: `${API_BASE_URL}${API_V1}/hotels/stats/overview`,
  health: `${API_BASE_URL}/health`,
};

/**
 * API Client class for making requests to the backend
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic GET request
   */
  private async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * Get all hotels with optional filters
   */
  async getHotels(params?: SearchParams): Promise<HotelsResponse> {
    const searchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }

    const url = `${API_ENDPOINTS.hotels}${searchParams.toString() ? `?${searchParams}` : ''}`;
    return this.get<HotelsResponse>(url);
  }

  /**
   * Get a specific hotel by ID
   */
  async getHotelById(id: number): Promise<Hotel> {
    return this.get<Hotel>(API_ENDPOINTS.hotelById(id));
  }

  /**
   * Quick search across multiple fields
   */
  async searchHotels(query: string, limit: number = 10): Promise<HotelsResponse> {
    const url = `${API_ENDPOINTS.search}?q=${encodeURIComponent(query)}&limit=${limit}`;
    return this.get<HotelsResponse>(url);
  }

  /**
   * Get list of available cities
   */
  async getCities(): Promise<string[]> {
    return this.get<string[]>(API_ENDPOINTS.cities);
  }

  /**
   * Get price range (min and max)
   */
  async getPriceRange(): Promise<PriceRange> {
    return this.get<PriceRange>(API_ENDPOINTS.priceRange);
  }

  /**
   * Get statistics overview
   */
  async getStats(): Promise<Stats> {
    return this.get<Stats>(API_ENDPOINTS.stats);
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string; version: string }> {
    return this.get(API_ENDPOINTS.health);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export for custom instances
export { ApiClient };
