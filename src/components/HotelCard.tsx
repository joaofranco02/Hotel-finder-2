type Hotel = {
  id: string | number;
  name: string;
  city: string;
  price: string;
  rating?: number;
};

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-center hover:shadow-lg transition">
      <div className="h-24 w-36 rounded-lg bg-gray-100 shrink-0 flex items-center justify-center text-sm text-gray-600">
        Imagem
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
        <p className="text-sm text-gray-600">{hotel.city}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-lg font-semibold text-gray-900">
          {hotel.price}
        </span>
        <button className="bg-[#007A4D] hover:bg-[#006845] text-white font-semibold py-2 px-6 rounded-lg text-sm transition">
          Ver
        </button>
      </div>
    </article>
  );
}
