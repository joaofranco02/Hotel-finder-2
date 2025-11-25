import type { Hotel } from "@/types/hotel";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={
              i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
            }
          >
            ★
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <article className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-center hover:shadow-lg transition">
      <div className="h-24 w-36 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center text-sm text-gray-600">
        Imagem
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{hotel.nome}</h3>
        <p className="text-sm text-gray-600">{hotel.cidade}</p>
        <p className="text-xs text-gray-500 mt-1">{hotel.endereco}</p>
        {hotel.classificacao && (
          <div className="mt-2">{renderStars(hotel.classificacao)}</div>
        )}
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="text-right">
          <div className="text-xs text-gray-500">Diária</div>
          <span className="text-lg font-semibold text-gray-900">
            {formatPrice(hotel.preco_diaria)}
          </span>
        </div>
        <button className="bg-[#007A4D] hover:bg-[#006845] text-white font-semibold py-2 px-6 rounded-lg text-sm transition">
          Ver Detalhes
        </button>
      </div>
    </article>
  );
}
