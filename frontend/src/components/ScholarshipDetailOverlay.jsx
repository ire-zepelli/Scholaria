import React from 'react';

export default function ScholarshipDetailOverlay({ scholarship, onClose, isSaved, onToggleSave, variant = "modal" }) {
  if (!scholarship) return null;

  // SIDE PANEL OVERLAY (Used in Map View)
  if (variant === "overlay") {
    return (
      <div className="absolute top-10 right-10 z-[1000] w-[500px] h-[calc(100vh-80px)] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
        {/* Fixed Header Image */}
        <div className="w-full h-40 bg-[#f8f9fa] relative flex-shrink-0 flex items-center justify-center p-8">
          {/* Status Badge */}
          <div className="absolute top-4 left-4 bg-[#eefcf3] border border-[#dcfce7] px-3 py-1 rounded-full flex items-center gap-1.5 z-10 shadow-sm">
            <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-[#059669] uppercase tracking-tighter">Active</span>
          </div>
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
            <div className="flex flex-col pr-6">
              <h2 className="text-2xl font-black text-[#1a2e5a] leading-[1.15] mb-2">
                {scholarship.title}
              </h2>
              <div className="flex flex-col">
                <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider mb-0.5">Application Link</span>
                <a 
                  href={scholarship.applyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 text-sm hover:underline font-black flex items-center gap-1 group"
                >
                  {scholarship.applyUrl?.replace('https://', '').replace('http://', '')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            <button 
              onClick={onToggleSave}
              className={`transition-all active:scale-90 flex-shrink-0 mt-1 ${isSaved ? "text-[#1a2e5a]" : "text-gray-300 hover:text-gray-500"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />
              </svg>
            </button>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed font-medium">
            {scholarship.description}
          </p>

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

          <div className="mt-10 pt-8 border-t border-gray-100 bg-white sticky bottom-0 pb-6">
            <div className="flex justify-between items-start mb-8">
              {/* Left Side: Breakdown */}
              {scholarship.breakdown && (
                <div className="flex-1 pr-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Transparency Breakdown</h4>
                  <div className="space-y-3.5">
                    {scholarship.breakdown.map((item, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-full shadow-sm ${item.met ? 'bg-[#10b981]' : 'bg-[#f87171]'}`}></div>
                          <span className="text-[12px] font-bold text-[#1a2e5a]/80 group-hover:text-[#1a2e5a] transition-colors leading-none">{item.label}</span>
                        </div>
                        <span className={`text-[12px] font-black tracking-tight ${item.met ? 'text-[#3d6e8d]' : 'text-gray-300'}`}>
                          {item.met ? `+${item.score}%` : '0%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Right Side: Gauge */}
              <div className="flex flex-col items-center flex-shrink-0 pt-1">
                <span className="text-[#1a2e5a] font-black text-[10px] uppercase tracking-widest mb-3">My Match</span>
                <div className="relative flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-blue-50" />
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 * (1 - (scholarship.match || 100) / 100)} className="text-blue-500 transition-all duration-1000" strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-sm font-black text-[#1a2e5a]">{scholarship.match || 100}%</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // CENTERED MODAL (Used in Saved View - Redesigned)
  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#1a2e5a]/40 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-5xl h-full max-h-[750px] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <div className="flex justify-center mb-10">
            <div className="w-40 h-40 bg-white rounded-full shadow-sm border border-gray-50 flex items-center justify-center p-4">
              {scholarship.imageUrl ? (
                <img src={scholarship.imageUrl} alt={scholarship.title} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4 flex-wrap flex-1 pr-6">
              <h2 className="text-4xl font-extrabold text-[#1a2e5a] leading-tight">{scholarship.title}</h2>
              <div className="bg-[#eefcf3] border border-[#dcfce7] px-4 py-2 rounded-full flex items-center gap-2 self-start mt-2">
                <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></div>
                <span className="text-xs font-black text-[#059669] uppercase tracking-wider">Active</span>
              </div>
            </div>
            <button 
              onClick={onToggleSave}
              className={`transition-all active:scale-90 flex-shrink-0 ${isSaved ? "text-[#1a2e5a]" : "text-gray-300 hover:text-gray-500"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />
              </svg>
            </button>
          </div>
          <p className="text-gray-500 text-lg leading-relaxed font-medium mb-8">{scholarship.description}</p>
          
          <div className="mb-10 p-6 bg-blue-50/30 rounded-[2rem] border border-blue-50 flex flex-col gap-2">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Official Website</span>
            <a 
              href={scholarship.applyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#1a2e5a] text-xl font-black hover:text-blue-700 transition-colors flex items-center gap-2 break-all"
            >
              {scholarship.applyUrl}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-black text-[#1a2e5a] mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div> Eligibility
              </h3>
              <ul className="space-y-3">
                {(scholarship.eligibility_requirements || scholarship.requirements).map((req, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-600 text-sm font-medium">
                    <div className="w-2 h-2 bg-blue-100 border border-blue-400 rounded-full mt-1.5 flex-shrink-0"></div> {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-[360px] bg-[#f8fbff] p-8 flex flex-col gap-6 relative overflow-hidden border-l border-blue-50/50">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 bg-white hover:bg-gray-50 p-2.5 rounded-full shadow-lg transition-all active:scale-90 z-20 group border border-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 group-hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Match Card */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex flex-col items-center border border-gray-50">
            <h3 className="text-3xl font-medium text-gray-800 mb-8">Match</h3>
            <div className="relative flex items-center justify-center">
              <svg className="w-48 h-48 transform -rotate-90">
                <defs>
                  <linearGradient id="matchGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3d6e8d" />
                    <stop offset="100%" stopColor="#5fc8e9" />
                  </linearGradient>
                </defs>
                <circle
                  cx="96"
                  cy="96"
                  r="84"
                  stroke="currentColor"
                  strokeWidth="16"
                  fill="transparent"
                  className="text-[#e1f1ff]"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="84"
                  stroke="url(#matchGradient)"
                  strokeWidth="16"
                  fill="transparent"
                  strokeDasharray={527.8}
                  strokeDashoffset={527.8 * (1 - (scholarship.match || 100) / 100)}
                  className="transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-extrabold text-[#3d6e8d] tracking-tight">
                  {scholarship.match || 100}%
                </span>
              </div>
            </div>

            {/* Breakdown List */}
            {scholarship.breakdown && (
              <div className="mt-10 w-full border-t border-gray-100 pt-8">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-6 text-center">Transparency Breakdown</h4>
                <div className="space-y-4">
                  {scholarship.breakdown.map((item, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full shadow-sm ${item.met ? 'bg-[#10b981]' : 'bg-[#f87171]'}`}></div>
                        <span className="text-[12px] font-bold text-gray-600 group-hover:text-[#1a2e5a] transition-colors leading-none">{item.label}</span>
                      </div>
                      <span className={`text-[12px] font-black tracking-tight ${item.met ? 'text-[#3d6e8d]' : 'text-gray-300'}`}>
                        {item.met ? `+${item.score}%` : '0%'}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-dashed border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] font-black text-[#1a2e5a] uppercase tracking-widest">Total Match</span>
                    <span className="text-sm font-black text-[#3d6e8d]">{scholarship.match || 100}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="bg-white rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Availability</span>
              <div className="bg-[#eefcf3] border border-[#dcfce7] px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></div>
                <span className="text-[11px] font-black text-[#059669] uppercase tracking-wider">Active Now</span>
              </div>
            </div>
          </div>

          {/* Official Portal */}
          <div className="bg-[#1a2e5a] rounded-[2rem] p-7 shadow-xl group cursor-pointer hover:bg-[#253d7a] transition-all hover:-translate-y-1 active:translate-y-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.25em]">Official Portal</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <a 
              href={scholarship.applyUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white text-base font-black flex items-center justify-between group-hover:text-blue-50"
            >
              <span className="truncate pr-4">{scholarship.applyUrl.replace('https://', '')}</span>
              <div className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
