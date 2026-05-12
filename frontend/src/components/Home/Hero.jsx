export default function Hero({ onOpen }) {
  return (
    <section
        className="h-screen w-full bg-cover bg-center relative"
        style={{ backgroundImage: "url('/bg pic.png')" }}
        id="hero"
        >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 top-[-150px]">
            <img
            src="/logo.png"
            alt="Scholaria"
            className="w-[500px] max-w-full"
            />

            <p className="text-lg font-black  text-[#1a2e5a]  uppercase">
            Smart Matches. Brighter Futures
            </p>

            <button 
              onClick={onOpen}
              className="mt-8 bg-[#1a2e5a] text-white px-5 py-3 rounded-full font-bold text-l shadow-[0_10px_30px_-10px_rgba(26,46,90,0.5)] hover:bg-[#1e3a78] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 group border border-white/10"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
        </div>

        <div className="absolute bottom-30 w-full flex justify-center z-10">
            <div className="bg-gray-800/80 backdrop-blur-md text-white rounded-xl p-8 flex gap-12 shadow-lg">
            <div className="text-center">
                <h2 className="text-2xl font-bold">5000+</h2>
                <p className="text-sm">Users</p>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold">50+</h2>
                <p className="text-sm">Scholarships</p>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold">98%</h2>
                <p className="text-sm">Match Accuracy</p>
            </div>
            </div>
        </div>
    </section>
  );
}