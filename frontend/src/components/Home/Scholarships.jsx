export default function Scholarships() {
  const scholarships = [
    { id: 1, image: "/public/card1.png", title: "Be a CHED Scholar!" },
    { id: 2, image: "/public/card1.png", title: "DOST Scholarship" },
    { id: 3, image: "/public/card1.png", title: "Academic Scholarship" },
  ];

  return (
      <section id="scholarships" className="bg-blue-100 py-20 text-center px-4">
        <h2 className="text-5xl font-bold text-blue-900">
          Find Your Next Scholarship
        </h2>

        <p className="mt-4 text-gray-600 text-xl max-w-2xl mx-auto">
          Explore some of the <span className="text-cyan-500">latest</span> scholarships you can apply for through <span className="text-cyan-500">Scholaria</span>.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="relative w-72 h-72 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={scholarship.image}
                alt={scholarship.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30 hover:bg-blue-500/50 flex flex-col justify-end items-center text-white p-4">
                <h3 className="font-bold text-lg text-center">{scholarship.title}</h3>
                <span className="mt-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                  APPLY NOW ONLINE
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
  );
}