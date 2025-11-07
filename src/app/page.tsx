"use client";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import HotelCard from "../components/HotelCard";

type SampleHotel = {
  id: number;
  name: string;
  city: string;
  price: string;
};

const SAMPLE_HOTELS: SampleHotel[] = [
  { id: 1, name: "Pousada das Águas", city: "Manaus", price: "R$ 220" },
  { id: 2, name: "Resort Verde", city: "Belém", price: "R$ 480" },
  { id: 3, name: "Hotel Central", city: "Santarem", price: "R$ 180" },
];

export default function Home() {
  const scrollToSearch = () => {
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
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
          <SearchForm />
        </section>

        {/* Hotels Section */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Hotéis em destaque
          </h3>
          <div className="grid gap-4">
            {SAMPLE_HOTELS.map((h) => (
              <HotelCard
                key={h.id}
                hotel={{ id: h.id, name: h.name, city: h.city, price: h.price }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
