import React, { useState } from "react";
import loginImg from "/login-img.png";
import registerImg from "/register-img.png";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export default function AuthCard({ onClose }) {
  const navigate = useNavigate();
  const [view, setView] = useState("login");

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  // Academic Info
  const [educationLevel, setEducationLevel] = useState("");
  const [program, setProgram] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [school, setSchool] = useState("");
  const [gpa, setGpa] = useState("");
  const [familyIncome, setFamilyIncome] = useState("");
  const [city, setCity] = useState("");
  const [nationality, setNationality] = useState("");
  const [phone, setPhone] = useState("");

  const handleViewLogin = () => setView("login");
  const handleViewRegister = () => setView("register");
  const handleViewAcademicInfo = () => {
    if (registerPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setView("academicInfo");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        email: registerEmail,
        password: registerPassword,
        firstName,
        lastName,
        address,
        educationLevel,
        program,
        yearLevel,
        school,
        gpa,
        familyIncome,
        city,
        nationality,
        phone,
      });
      console.log("Registered!", response.data);
      handleClose();
      navigate("/scholarships");
    } catch (err) {
      console.error("Registration failed.", err.response?.data?.error);
      alert(err.response?.data?.error || "Registration failed.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });
      console.log("Logged in!", response.data);
      handleClose();
      navigate("/scholarships");
    } catch (err) {
      console.error("Login failed.", err.response?.data?.error);
      alert(err.response?.data?.error || "Login failed.");
    }
  };

  const handleClose = () => {
    setView("login");
    onClose();
  };

  return (
    <>
      {/* Login View */}
      {view === "login" && (
        <div
          className="fixed inset-0 bg-[#1a2e5a]/40 backdrop-blur-sm z-[5000] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-[950px] h-[600px] bg-white rounded-[2.5rem] shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Form */}
            <div className="w-1/2 h-full flex flex-col justify-center p-16">
              <h1 className="text-[#1a2e5a] font-black text-5xl mb-12">LOG IN</h1>

              <form className="space-y-6 w-full" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#1a2e5a] px-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full border-2 border-gray-100 bg-gray-50/30 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all placeholder:text-gray-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#1a2e5a] px-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full border-2 border-gray-100 bg-gray-50/30 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all placeholder:text-gray-300"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1a2e5a] text-white py-4.5 rounded-2xl font-black text-base hover:bg-[#243d78] transition-all active:scale-[0.98] shadow-lg shadow-blue-900/10 mt-4"
                >
                  Log in
                </button>
              </form>

              <p className="text-center text-sm text-gray-400 mt-10">
                Don't have an account?{" "}
                <button
                  className="text-[#1a2e5a] font-black hover:underline"
                  onClick={handleViewRegister}
                >
                  Sign up
                </button>
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="w-1/2 h-full relative bg-[#1a2e5a]">
              <img
                src={loginImg}
                alt="login-img"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
              />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <h2 className="text-white font-black text-6xl leading-tight text-center tracking-tighter">WELCOME<br/>BACK</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: User Information */}
      {view === "register" && (
        <div
          className="fixed inset-0 bg-[#1a2e5a]/40 backdrop-blur-sm z-[5000] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-[1000px] h-[600px] bg-white rounded-[2.5rem] shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Branding */}
            <div className="w-[42%] h-full relative bg-[#1a2e5a]">
              <img
                src={registerImg}
                alt="register-img"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 p-12 flex flex-col justify-start">
                <h2 className="text-white font-black text-6xl leading-[0.9] tracking-tighter uppercase">
                  REGISTER<br/>NOW
                </h2>
              </div>
            </div>

            {/* Right Side: Step 1 Form */}
            <div className="flex-1 h-full flex flex-col px-12 py-8 overflow-y-auto custom-scrollbar">
              <div className="text-center mb-2">
                <h1 className="text-[#1a2e5a] font-black text-3xl mb-3">Create your profile</h1>
                
                {/* Step Indicator */}
                <div className="relative flex items-center justify-center max-w-sm mx-auto px-4 mb-4">
                  <div className="absolute h-1 bg-blue-100 left-0 right-0 top-1/2 -translate-y-1/2 z-0 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1a2e5a] transition-all duration-500 w-[50%]"></div>
                  </div>
                  <div className="relative z-10 flex justify-between w-full">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 bg-[#1a2e5a] text-white rounded-full flex items-center justify-center font-black text-base shadow-lg shadow-blue-900/20">1</div>
                      <span className="text-[9px] font-black text-[#1a2e5a] uppercase tracking-widest mt-1.5">Basic</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 bg-white border-4 border-blue-100 text-blue-200 rounded-full flex items-center justify-center font-black text-base">2</div>
                      <span className="text-[9px] font-black text-blue-200 uppercase tracking-widest mt-1.5">Student Info</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-1.5">
                  <h3 className="text-[#1a2e5a] font-black text-lg uppercase tracking-tight">USER INFORMATION</h3>
                  <p className="text-[10px] text-gray-400 font-medium leading-none">Kindy fill out your basic profile information</p>
                </div>

                <form className="space-y-3.5" onSubmit={(e) => { e.preventDefault(); handleViewAcademicInfo(); }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">First Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">Last Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">Home Address <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">Password <span className="text-red-500">*</span></label>
                    <input
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">Confirm Password <span className="text-red-500">*</span></label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                      required
                    />
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <p className="text-sm text-gray-400 font-medium">
                      Already have an account?{" "}
                      <button type="button" className="text-[#1a2e5a] font-black hover:underline" onClick={handleViewLogin}>Log in</button>
                    </p>
                    <button
                      type="submit"
                      className="bg-[#0b2447] text-white py-2.5 px-8 rounded-xl font-black text-sm hover:bg-[#1a2e5a] transition-all flex items-center gap-2 group shadow-lg shadow-blue-900/10 active:scale-[0.98]"
                    >
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Student Information */}
      {view === "academicInfo" && (
        <div
          className="fixed inset-0 bg-[#1a2e5a]/40 backdrop-blur-sm z-[5000] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-[1000px] h-[600px] bg-white rounded-[2.5rem] shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Branding */}
            <div className="w-[42%] h-full relative bg-[#1a2e5a]">
              <img
                src={registerImg}
                alt="register-img"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 p-12 flex flex-col justify-start">
                <h2 className="text-white font-black text-6xl leading-[0.9] tracking-tighter uppercase">
                  REGISTER<br/>NOW
                </h2>
              </div>
            </div>

            {/* Right Side: Step 2 Form */}
            <div className="flex-1 h-full flex flex-col px-12 py-8 overflow-y-auto custom-scrollbar">
              <div className="text-center mb-2">
                <h1 className="text-[#1a2e5a] font-black text-3xl mb-3">Create your profile</h1>
                
                {/* Step Indicator */}
                <div className="relative flex items-center justify-center max-w-sm mx-auto px-4 mb-4">
                  <div className="absolute h-1 bg-blue-100 left-0 right-0 top-1/2 -translate-y-1/2 z-0 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1a2e5a] transition-all duration-500 w-full"></div>
                  </div>
                  <div className="relative z-10 flex justify-between w-full">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 bg-[#1a2e5a] text-white rounded-full flex items-center justify-center font-black text-base">1</div>
                      <span className="text-[9px] font-black text-[#1a2e5a] uppercase tracking-widest mt-1.5">Basic</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 bg-[#1a2e5a] text-white rounded-full flex items-center justify-center font-black text-base shadow-lg shadow-blue-900/20">2</div>
                      <span className="text-[9px] font-black text-[#1a2e5a] uppercase tracking-widest mt-1.5">Student Info</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-1.5">
                  <h3 className="text-[#1a2e5a] font-black text-lg uppercase tracking-tight">STUDENT INFORMATION</h3>
                  <p className="text-[10px] text-gray-400 font-medium leading-none">Kindy fill out your student profile information</p>
                </div>

                <form className="space-y-3.5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">Education Level <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select
                          value={educationLevel}
                          onChange={(e) => setEducationLevel(e.target.value)}
                          className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all appearance-none bg-white"
                          required
                        >
                          <option value="">Select</option>
                          <option>Senior High School</option>
                          <option>Undergraduate</option>
                          <option>Graduate</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">Program <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1 col-span-2">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">School <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">Year Level <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={yearLevel}
                        onChange={(e) => setYearLevel(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">GPA <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1 col-span-2">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">Family Income <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={familyIncome}
                        onChange={(e) => setFamilyIncome(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">City <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all appearance-none bg-white"
                          required
                        >
                          <option value="">Select</option>
                          <option>Cebu City</option>
                          <option>Mandaue City</option>
                          <option>Lapu-Lapu City</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">Nationality <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#1a2e5a] px-1">Phone # <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#1a2e5a] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => setView("register")}
                      className="text-[#1a2e5a] font-black text-sm hover:underline flex items-center gap-2 group transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="bg-[#0b2447] text-white py-2.5 px-10 rounded-xl font-black text-sm hover:bg-[#1a2e5a] transition-all shadow-lg shadow-blue-900/10 active:scale-[0.98]"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
