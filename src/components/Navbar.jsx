import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#0B0A1A]/80 backdrop-blur-md text-white px-5 md:px-8 py-4 sticky top-0 z-50 border-b border-white/10 shadow-lg relative">
      {/* Dot Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex items-center relative z-10">
        {/* Premium Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center shadow-inner group-hover:bg-[#8b5cf6]/20 transition-all">
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-[#a78bfa]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight text-white drop-shadow-sm">
            Webtobro<span className="text-[#a78bfa]">.</span>
          </span>
        </Link>
      </div>
    </nav>
  );
}
