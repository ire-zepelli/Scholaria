import React from 'react';

export default function ScholarshipDetailOverlay({ scholarship, onClose }) {
  if (!scholarship) return null;

  return (
    <div className="absolute top-10 right-10 z-[1000] w-[500px] h-[calc(100vh-80px)] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Fixed Header Image */}
      <div className="w-full h-40 bg-[#f8f9fa] relative flex-shrink-0 flex items-center justify-center p-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-md transition-all active:scale-95 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {scholarship.imageUrl ? (
          <img 
            src={scholarship.imageUrl} 
            alt={scholarship.title} 
            className="w-full h-full object-contain drop-shadow-sm"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-black text-[#1a2e5a] leading-[1.15] pr-6">
            {scholarship.title}
          </h2>
          <button className="text-[#1a2e5a] hover:text-blue-700 transition-transform active:scale-90 flex-shrink-0 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />
            </svg>
          </button>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed font-medium">
          {scholarship.description}
        </p>

        {/* Eligibility Requirements Section */}
        <div className="mt-8">
          <h3 className="text-base font-black text-[#1a2e5a] flex items-center gap-2 mb-4">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
            Eligibility Requirements
          </h3>
          <ul className="space-y-3">
            {(scholarship.eligibility_requirements || scholarship.requirements).map((req, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600 text-[13px] leading-relaxed bg-gray-50/50 p-3 rounded-xl border border-gray-100/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Documentary Requirements Section */}
        {scholarship.documentary_requirements && (
          <div className="mt-8">
            <h3 className="text-base font-black text-[#1a2e5a] flex items-center gap-2 mb-4">
              <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
              Documentary Requirements
            </h3>
            <div className="space-y-6">
              {Object.entries(scholarship.documentary_requirements).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">{category}</h4>
                  <ul className="space-y-2">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600 text-xs font-medium pl-2">
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions Area */}
        <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between items-center bg-white sticky bottom-0 pb-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[#1a2e5a] font-bold text-sm">Availability:</span>
              <div className="bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-green-700 uppercase tracking-tighter">Active</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider mb-1">Application Link</span>
              <a href={scholarship.applyUrl} className="text-blue-600 text-sm hover:underline font-extrabold flex items-center gap-1 group">
                {scholarship.applyUrl}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center p-4">
            <span className="text-[#1a2e5a] font-black text-[10px] uppercase tracking-widest mb-2">My Match</span>
            <div className="relative flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="transparent"
                  className="text-blue-100"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="transparent"
                  strokeDasharray={150.8}
                  strokeDashoffset={150.8 * (1 - (scholarship.match || 100) / 100)}
                  className="text-blue-500 transition-all duration-1000"
                />
              </svg>
              <span className="absolute text-xs font-black text-[#1a2e5a]">
                {scholarship.match || 100}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

