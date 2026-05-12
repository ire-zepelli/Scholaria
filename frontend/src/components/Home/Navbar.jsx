export default function Navbar({ onOpen }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="relative z-50 flex justify-end items-center px-10 py-4 bg-white text-blue-900">
      {/* <div className="flex items-center gap-2">
        <img
          src="/navbar-logo.png"
          alt="logo"
          className="w-10 h-10 object-contain"
        />
        <h1 className="font-bold text-2xl">Scholaria</h1>
      </div> */}

      <div className="flex items-center gap-8">
        <ul className="flex gap-6 text-gray-700">
          {/* <li
            onClick={() => scrollToSection("home")}
            className="hover:text-gray-900 cursor-pointer"
          >
            Home
          </li> */}
          <li
            onClick={() => scrollToSection("about")}
            className="hover:text-gray-900 cursor-pointer"
          >
            About
          </li>
          {/* <li
            onClick={() => scrollToSection("scholarships")}
            className="hover:text-gray-900 cursor-pointer"
          >
            Scholarships
          </li> */}
        </ul>

        <button
          className="bg-[#1a2e5a] text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
          onClick={onOpen}
        >
          Log In
        </button>
      </div>
    </nav>
  );
}
