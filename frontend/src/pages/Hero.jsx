export default function Hero() {
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

            <p className="text-lg font-semibold mt-2 text-gray-700">
            SMART MATCHES. BRIGHTER FUTURES
            </p>

            <div className="mt-6 flex items-center bg-white rounded-full px-4 py-2 w-96 shadow">
            <input
                type="text"
                placeholder="Search scholarship..."
                className="flex-1 outline-none"
            />
            <span>🔍</span>
            </div>
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