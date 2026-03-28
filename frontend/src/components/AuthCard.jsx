import React from "react";
import loginImg from "/login-img.png";

export default function AuthCard({ onClose }) {
  return (
    <div
      className="fixed w-screen h-screen bg-black/50 z-100 flex items-center justify-center"
      onClick={onClose}
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
            <button className="text-[#1a2e5a] font-bold hover:underline">
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
  );
}
