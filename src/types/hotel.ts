/**
 * Hotel type definitions
 */

export interface Hotel {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado?: string;
  pais?: string;
  preco_diaria: number;
  classificacao?: number;
  descricao?: string;
}

export interface HotelsResponse {
  total: number;
  results: Hotel[];
}

export interface SearchParams {
  search?: string;
  cidade?: string;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  limit?: number;
  offset?: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Stats {
  total_hotels: number;
  total_cities: number;
  avg_price: number;
  min_price: number;
  max_price: number;
  avg_rating: number;
}
