import React from 'react';

export default function ScholarshipCard({ title, subtitle, matchPercentage, hasBookmark, imageUrl }) {
  return (
    <div className="bg-white rounded-3xl p-6 mb-5 shadow-sm border border-gray-100 flex gap-6 relative group cursor-pointer hover:shadow-md transition-shadow h-[180px]">
      {/* Thumbnail Image */}
      <div className="w-28 h-28 bg-gray-100 rounded-2xl flex-shrink-0 overflow-hidden flex items-center justify-center p-2">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-xl"></div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col justify-between flex-1 py-0.5 overflow-hidden">
        <div>
          <h3 className="font-extrabold text-[#1a2e5a] text-lg leading-tight tracking-tight line-clamp-2 pr-10">
            {title}
          </h3>
          <p className="text-gray-500 text-sm mt-1.5 font-medium truncate pr-10">
            {subtitle}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Matching chuchu</span>
            <span className="text-[10px] text-blue-600 font-black">{matchPercentage}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-green-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${matchPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Bookmark Icon (Absolute) */}
      {hasBookmark && (
        <button className="absolute top-6 right-6 text-gray-800 hover:text-blue-900 transition-transform active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />
          </svg>
        </button>
      )}
    </div>




  );
}
