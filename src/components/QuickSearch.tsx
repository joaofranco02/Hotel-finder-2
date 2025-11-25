"use client";

import { useSearch } from "@/hooks/useSearch";
import Link from "next/link";

export default function QuickSearch() {
  const { query, setQuery, results, loading, clearSearch } = useSearch();

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar hotéis..."
          className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007A4D] focus:border-transparent"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#007A4D]"></div>
          </div>
        )}
        {!loading && query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {query && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {results.map((hotel) => (
            <Link
              key={hotel.id}
              href={`/hotels/${hotel.id}`}
              className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition"
              onClick={clearSearch}
            >
              <div className="font-semibold text-gray-900">{hotel.nome}</div>
              <div className="text-sm text-gray-600">{hotel.cidade}</div>
              <div className="text-sm font-semibold text-[#007A4D] mt-1">
                R$ {hotel.preco_diaria.toFixed(2)}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {query && !loading && results.length === 0 && query.length >= 2 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 text-center">
            Nenhum hotel encontrado
          </p>
        </div>
      )}
    </div>
  );
}
