import React, { useState } from "react";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Scholarships from "../components/Home/Scholarships";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";
import AuthCard from "../components/AuthCard";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleAuthOpen = () => {
    setIsAuthOpen(true);
  };

  const handleAuthClose = () => {
    setIsAuthOpen(false);
  };

  return (
    <>
      {isAuthOpen && <AuthCard onClose={handleAuthClose} />}
      <Navbar onOpen={handleAuthOpen} />
      <Hero />
      <About />
      <Scholarships />
      <Footer />
    </>
  );
}
