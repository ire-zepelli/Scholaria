import React, { useState } from "react";
import loginImg from "/login-img.png";
import registerImg from "/register-img.png";

export default function AuthCard({ onClose }) {
  const [view, setView] = useState("login");

  const handleViewLogin = () => {
    setView("login");
  };

  const handleViewRegister = () => {
    setView("register");
  };

  const handleViewStudentInfo = () => {
    setView("academicInfo");
  };

  const handleSubmit = (e) => {
    console.log("submitted");
  };

  const handleClose = () => {
    setView("login");
    onClose();
  };

  return (
    <>
      {view == "academicInfo" && (
        <div
          className="fixed w-screen h-screen bg-black/50 z-100 flex items-center justify-center"
          onClick={handleClose}
        >
          <div
            className="w-[65rem] h-[35rem] rounded-xl bg-white flex flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left image panel */}
            <div className="w-1/2 min-h-100 bg-red-200 relative">
              <img
                src={registerImg}
                alt="register-img"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Right form panel */}
            <div className="w-1/2 min-h-100 bg-white flex justify-start flex-col items-center p-10">
              <h1 className="text-[#01395E] font-bold text-3xl">
                Create your profile
              </h1>

              <h3 className="text-[#01395E] text-lg self-start">
                ACADEMIC INFORMATION
              </h3>
              <p className="self-start text-xs text-gray-400">
                Kindly fill out your academic details
              </p>

              <hr className="w-full text-black my-4" />

              <form className="space-y-4 w-full">
                {/* Row 1 */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Education Level <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition">
                      <option value="">Select</option>
                      <option>Undergraduate</option>
                      <option>Graduate</option>
                      <option>Postgraduate</option>
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Program <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Year Level <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      School <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      GPA <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Family Income <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition">
                      <option value="">Select</option>
                      <option>Cebu City</option>
                      <option>Manila</option>
                      <option>Davao</option>
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nationality <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone # <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setView("register")}
                    className="w-full border border-[#1a2e5a] text-[#1a2e5a] py-2.5 rounded font-semibold text-sm hover:bg-gray-100 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-[#1a2e5a] text-white py-2.5 rounded font-semibold text-sm hover:bg-[#243d78] transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {view == "register" && (
        <div
          className="fixed w-screen h-screen bg-black/50 z-100 flex items-center justify-center"
          onClick={handleClose}
        >
          <div
            className="w-[65rem] h-[35rem] rounded-xl bg-white flex flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-1/2 min-h-100 bg-red-200 relative">
              <img
                src={registerImg}
                alt="register-img"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="w-1/2 min-h-100 bg-white flex justify-start flex-col items-center p-10">
              <h1 className="text-[#01395E] font-bold text-3xl">
                Create your profile
              </h1>

              <h3 className="text-[#01395E] text-lg self-start ">
                USER INFOMATION
              </h3>
              <p className="self-start text-xs text-gray-400">
                Kindy fill out your basic profile information
              </p>

              <hr className="w-full text-black my-4" />

              <form className="space-y-4 w-full">
                <div className="flex justify-between">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="fname"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="lname"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="confirm_pass"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                    required
                  />
                </div>
                <button
                  className="w-full bg-[#1a2e5a] text-white py-2.5 rounded font-semibold text-sm hover:bg-[#243d78] transition"
                  onClick={handleViewStudentInfo}
                >
                  Next
                </button>
              </form>

              <p className="text-center text-xs text-gray-500 mt-4">
                I already have an account.{" "}
                <button
                  className="text-[#1a2e5a] font-bold hover:underline"
                  onClick={handleViewLogin}
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
      {view == "login" && (
        <div
          className="fixed w-screen h-screen bg-black/50 z-100 flex items-center justify-center"
          onClick={handleClose}
        >
          <div
            className="w-[65rem] h-[35rem] rounded-xl bg-white flex flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-1/2 min-h-100 bg-white flex justify-start flex-col items-center p-10">
              <h1 className="text-[#01395E] font-bold text-4xl p-15">LOG IN</h1>

              <form className="space-y-4 w-full">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2e5a] focus:border-transparent transition"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1a2e5a] text-white py-2.5 rounded font-semibold text-sm hover:bg-[#243d78] transition"
                >
                  Log in
                </button>
              </form>

              <p className="text-center text-xs text-gray-500 mt-4">
                Don't have an account?{" "}
                <button
                  className="text-[#1a2e5a] font-bold hover:underline"
                  onClick={handleViewRegister}
                >
                  Sign up
                </button>
              </p>
            </div>

            <div className="w-1/2 min-h-100 bg-red-200 relative">
              <img
                src={loginImg}
                alt="login-img"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
