import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-solid border-gray-100 bg-transparent">
      <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-[#007A4D] flex items-center justify-center text-white font-bold">
            HF
          </div>
          <h1 className="text-lg font-semibold text-black">Hotel Finder</h1>
        </Link>
        <nav className="flex items-center gap-3 text-sm text-gray-600">
          <a className="hover:text-[#007A4D] transition" href="#">
            Sobre
          </a>
          <a className="hover:text-[#007A4D] transition" href="#">
            Contato
          </a>
          <Link
            href="/auth"
            className="bg-[#007A4D] hover:bg-[#006845] text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
