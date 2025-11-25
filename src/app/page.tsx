"use client";
import { useState } from "react";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import HotelCard from "../components/HotelCard";
import { useHotels } from "@/hooks/useHotels";
import type { SearchParams } from "@/types/hotel";

export default function Home() {
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const { hotels, total, loading, useMock } = useHotels(searchParams);

  console.log('🏠 PAGE - Estado atual:', {
    searchParams,
    totalHotels: total,
    hotelsCount: hotels.length,
    loading,
    useMock,
    primeiroHotel: hotels[0]?.nome
  });

  const scrollToSearch = () => {
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSearch = (params: SearchParams) => {
    console.log('🔎 PAGE - Nova busca:', params);
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
          <h3 className="text-2xl font-semibold text-black mb-4">
            Comece sua busca
          </h3>
          <SearchForm onSearch={handleSearch} />
        </section>

        {/* Hotels Section */}
        <section id="hotels-section">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-black">
              {searchParams.search || searchParams.cidade
                ? "Resultados da busca"
                : "Hotéis disponíveis"}
            </h3>
            {total > 0 && (
              <span className="text-sm text-black">
                {total}{" "}
                {total === 1 ? "hotel encontrado" : "hotéis encontrados"}
              </span>
            )}
          </div>

          {/* Mock Data Warning */}
          {useMock && !loading && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-yellow-800">
                  <strong>API não conectada.</strong> Mostrando dados de exemplo. Para ver dados reais, inicie o backend em <code className="bg-yellow-100 px-1 rounded">http://localhost:8000</code>
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#007A4D]"></div>
              <p className="mt-4 text-gray-600">Carregando hotéis...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && hotels.length === 0 && (
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
          {!loading && hotels.length > 0 && (
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
