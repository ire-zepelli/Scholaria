export default function Navbar({ onOpen, onSearch, viewMode }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="relative z-50 flex justify-between items-center px-10 py-3 bg-[#f0f4f8] text-blue-900">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src="/navbar-logo.png"
          alt="logo"
          className="w-10 h-10 object-contain"
        />
        <h1 className="font-bold text-lg text-[#1a2e5a]">Scholaria</h1>
      </div>

      {/* Search Bar - Only show when discovering on the map */}
      {viewMode === "map" && (
        <div className="flex items-center bg-white rounded-full px-4 py-2 gap-2 w-80 shadow-sm">
          <input
            type="text"
            placeholder="Search school"
            onChange={(e) => onSearch?.(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-600 outline-none placeholder-gray-400"
          />
          <button className="text-[#1a2e5a] hover:text-blue-700 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Profile Button */}
      <div className="flex items-center gap-8">
        <button
          className="bg-[#1a2e5a] text-white text-sm px-5 py-2 rounded-full hover:bg-[#243d78] transition-colors duration-300"
          onClick={onOpen}
        >
          Profile
        </button>
      </div>

    </nav>
  );
}
