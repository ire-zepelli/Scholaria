import React from "react";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Scholarships from "../components/Home/Scholarships";
import Footer from "../components/Home/Footer";

export default function Home() {
  return (
    <>
        <Hero />
        <About />
        <Scholarships />
        <Footer />
    </>
  );
}