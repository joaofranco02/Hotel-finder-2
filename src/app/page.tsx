"use client";
import { useState } from "react";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import HotelCard from "../components/HotelCard";
import { useHotels } from "@/hooks/useHotels";
import type { SearchParams } from "@/types/hotel";

export default function Home() {
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const { hotels, total, loading, error } = useHotels(searchParams);

  const scrollToSearch = () => {
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById("hotels-section");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-[1100px] mx-auto px-4 py-10">
        {/* Hero Section */}
        <section className="mb-12 text-center py-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Encontre hotéis pelo Brasil
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Busque por cidade, data e compare preços em um design limpo e
            rápido. Sua próxima aventura começa aqui.
          </p>
          <button
            onClick={scrollToSearch}
            className="bg-[#007A4D] hover:bg-[#006845] text-white font-semibold py-4 px-8 rounded-lg text-lg transition duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            Pesquisar Hotéis
          </button>
        </section>

        {/* Search Section */}
        <section id="search-section" className="mb-8 scroll-mt-20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Comece sua busca
          </h3>
          <SearchForm onSearch={handleSearch} />
        </section>

        {/* Hotels Section */}
        <section id="hotels-section">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              {searchParams.search || searchParams.cidade
                ? "Resultados da busca"
                : "Hotéis disponíveis"}
            </h3>
            {total > 0 && (
              <span className="text-sm text-gray-600">
                {total}{" "}
                {total === 1 ? "hotel encontrado" : "hotéis encontrados"}
              </span>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#007A4D]"></div>
              <p className="mt-4 text-gray-600">Carregando hotéis...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 font-semibold mb-2">
                Erro ao carregar hotéis
              </p>
              <p className="text-red-500 text-sm">{error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && hotels.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Nenhum hotel encontrado
              </h3>
              <p className="mt-2 text-gray-600">
                Tente ajustar os filtros de busca
              </p>
            </div>
          )}

          {/* Hotels List */}
          {!loading && !error && hotels.length > 0 && (
            <div className="grid gap-4">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
