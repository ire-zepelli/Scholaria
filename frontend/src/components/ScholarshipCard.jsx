import React from 'react';

export default function ScholarshipCard({ title, subtitle, description, matchPercentage, isSaved, onToggleSave, imageUrl, applyUrl }) {
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
          <h3 className="font-extrabold text-[#1a2e5a] text-lg leading-tight tracking-tight line-clamp-1 truncate max-w-[75%] mb-0.5">
            {title}
          </h3>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1 truncate pr-14">
            {subtitle}
          </p>
          <p className="text-gray-500 text-xs font-medium line-clamp-2 leading-relaxed pr-14">
            {description}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-end mb-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Application Link</span>
              <a 
                href={applyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-blue-600 text-[11px] font-black hover:underline truncate max-w-[150px]"
              >
                {applyUrl?.replace('https://', '')}
              </a>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5 text-right">Match</span>
              <span className="text-[11px] text-[#3d6e8d] font-black">{matchPercentage}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-green-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${matchPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Top Right Actions */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
        <div className="bg-[#eefcf3] border border-[#dcfce7] px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
          <div className="w-1 h-1 bg-[#10b981] rounded-full"></div>
          <span className="text-[7px] font-black text-[#059669] uppercase tracking-tighter">Active</span>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave?.();
          }}
          className={`transition-all active:scale-90 p-1 rounded-xl ${
            isSaved ? "text-[#1a2e5a]" : "text-gray-300 hover:text-gray-500"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
