"use client";
import { useState } from "react";

export default function SearchForm({
  onSearch,
}: {
  onSearch?: (q: any) => void;
}) {
  const [location, setLocation] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { location, checkin, checkout };
    if (onSearch) onSearch(payload);
    // For now show a simple feedback during dev
    alert(`Procurando hotéis em ${location || "qualquer lugar"}`);
  }

  return (
    <form
      onSubmit={submit}
      className="w-full bg-white rounded-xl shadow-md p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Local
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Cidade ou hotel"
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#007A4D] focus:border-transparent transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Entrada
            </label>
            <input
              type="date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#007A4D] focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Saída
            </label>
            <input
              type="date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#007A4D] focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="sm:w-48">
          <button
            type="submit"
            className="w-full bg-[#007A4D] hover:bg-[#006845] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}
