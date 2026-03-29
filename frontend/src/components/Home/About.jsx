function About() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="px-16 py-20 bg-white flex items-center gap-10">
      <div className="flex-1">
        <div>
            <h2 className="text-6xl font-bold text-blue-900">
                Discover Scholarships <span className="text-cyan-500">Smarter</span>
            </h2>
        </div>
        

        <p className="mt-1 text-gray-600 text-xl">
          AI-powered scholarship matching for students. Find opportunities
          faster and easier with personalized recommendations.
        </p>

        <p className="mt-7 text-gray-600 text-lg">
            Scholaria helps students find scholarships that fit their academic background and qualifications. 
            With personalized recommendations, eligibility checking, and complete application details, 
            finding the right opportunity becomes easier and faster.
        </p>
      </div>

      <div className="flex-1">
        <img src="/about-pic.png" alt="student" className="rounded-xl" />
      </div>
    </section>
  );
}

export default About;