import React, { useState } from "react";
import Navbar from "../Scholarships/NavBar";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";

// Component to handle map resizing when sidebar toggles
function MapResizer({ selectedSchool }) {
  const map = useMap();
  React.useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300); // Match sidebar transition duration
  }, [selectedSchool, map]);
  return null;
}
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ScholarshipCard from "../components/ScholarshipCard";
import ScholarshipDetailOverlay from "../components/ScholarshipDetailOverlay";

// Fix default marker icon broken by Vite's asset handling
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DUMMY_SCHOOLS = [
  {
    id: 1,
    name: "University Of Cebu - Lapu-Lapu and Mandaue",
    position: [10.3251, 123.9531],
  },
  {
    id: 2,
    name: "Cebu Institute of Technology - University",
    position: [10.3015, 123.8825],
  }
];

const DUMMY_SCHOLARSHIPS = [
  {
    id: 1,
    schoolId: 1,
    type: "government",
    title: "CHED Merit Scholarship Program (CMSP)",
    subtitle: "For academically qualified Filipino students",
    imageUrl: "/ched-logo.png",
    description: "The CHED Merit Scholarship Program (CMSP) is a government scholarship offered by the Commission on Higher Education (CHED) to support academically qualified Filipino students who demonstrate high academic performance and meet specific financial or special group eligibility criteria. The program aims to provide financial assistance to deserving students pursuing higher education.",
    match: 100,
    requirements: [
      "Filipino Citizen",
      "GWA of at least 93%",
      "Annual income < PHP 400,000",
      "Special groups (PWD, Solo Parent, IP, etc.)"
    ],
    eligibility_requirements: [
      "Filipino Citizen",
      "Graduating high school student or high school graduate with General Weighted Average (GWA) of at least 93% or its equivalent",
      "Combined annual gross income of parents/guardian not exceeding PHP 400,000. If income exceeds PHP 400,000, applicant must submit certification or medical findings of illness of a family member, or school certification of two or more dependents enrolled in college",
      "Belonging to special groups such as Underprivileged and Homeless Citizens (RA 7279), Persons with Disability (RA 7277), Solo Parents (RA 8972), Senior Citizens (RA 9994), or Indigenous Peoples (RA 8371), with required certifications or IDs"
    ],
    documentary_requirements: {
      "Citizenship": ["Certified true copy of Birth Certificate"],
      "Academic": [
        "High School Report Card for incoming freshmen eligible for college",
        "Certified true copy of grades for Grade 11 and 1st semester of Grade 12 (for graduating students)"
      ],
      "Financial": [
        "Latest Income Tax Return (ITR) of parent(s) or guardian",
        "Certificate of Tax Exemption from BIR",
        "Certificate of Indigence from Barangay or DSWD",
        "Case Study Report from DSWD",
        "Latest proof of income (for OFW and seafarer dependents)"
      ]
    },
    applyUrl: "www.ched.gov.ph"
  },

  {
    id: 2,
    schoolId: 1,
    type: "school",
    title: "UC Academic Scholarship",
    subtitle: "For honor graduates",
    match: 80,
    requirements: ["Valedictorian/Salutatorian", "Entrance exam"],
    applyUrl: "www.uc.edu.ph"
  },
  {
    id: 3,
    schoolId: 2,
    type: "school",
    title: "CIT Technologian Grant",
    subtitle: "Engineering focus",
    match: 95,
    requirements: ["Engineering major", "90+ GPA"],
    applyUrl: "www.cit.edu"
  },
  {
    id: 4,
    schoolId: 2,
    type: "government",
    title: "DOST-SEI Scholarship",
    subtitle: "Science and Tech",
    match: 75,
    requirements: ["STEM background", "DOST exam"],
    applyUrl: "www.dost.gov.ph"
  }
];

export default function Scholarships() {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all"); // "all", "government", "school"
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("map"); // "map" or "saved"
  const [savedIds, setSavedIds] = useState([1]); // Dummy saved CHED

  const filteredSchools = DUMMY_SCHOOLS.filter(school => 
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredScholarships = DUMMY_SCHOLARSHIPS.filter(s => {
    if (viewMode === "saved") {
      return savedIds.includes(s.id);
    }
    const schoolMatch = selectedSchool ? s.schoolId === selectedSchool.id : true;
    const categoryMatch = categoryFilter === "all" ? true : s.type === categoryFilter;
    return schoolMatch && categoryMatch;
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Navbar onSearch={setSearchQuery} viewMode={viewMode} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Persistent View Toggle Controls */}
        <div className="absolute top-6 left-6 z-[2000] flex gap-3">
          <button 
            onClick={() => setViewMode("saved")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl shadow-lg border transition-all hover:-translate-y-0.5 active:translate-y-0 font-bold ${
              viewMode === "saved" 
                ? "bg-[#1a2e5a] text-white border-[#1a2e5a]" 
                : "bg-white text-[#1a2e5a] border-gray-100 hover:bg-gray-50"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Saved
          </button>
          <button 
            onClick={() => {
              setViewMode("map");
              setSelectedSchool(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 font-bold ${
              viewMode === "map" 
                ? "bg-[#5d6d7e] text-white" 
                : "bg-white text-[#5d6d7e] border border-gray-100 hover:bg-gray-50"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Schools
          </button>
        </div>

        {viewMode === "map" ? (
          <>
            {/* Sidebar - Only show when a school is selected */}
            {selectedSchool && (
              <div className="w-[450px] flex flex-col border-r border-gray-100 overflow-y-auto bg-[#fafbfc] px-6 py-6 transition-all duration-500 animate-in slide-in-from-left duration-300 relative z-[3000]">
                {/* ... (sidebar content remains same) */}
                <div className="flex justify-between items-center mb-6 px-2 relative">
                  <div className="flex flex-col">
                    <h2 className="text-lg font-extrabold text-[#1a2e5a]">
                      {filteredScholarships.length} scholarships at {selectedSchool.name.split(' - ')[0]}
                    </h2>
                    <button 
                      onClick={() => {
                        setSelectedSchool(null);
                        setCategoryFilter("all");
                        setSelectedScholarship(null);
                      }}
                      className="text-blue-600 text-xs font-semibold mt-1 hover:underline text-left flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to full map
                    </button>
                  </div>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className={`p-2 rounded-lg transition-all ${isFilterOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                    </button>

                    {/* Filter Dropdown */}
                    {isFilterOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-[2000] py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Filter by Category</div>
                        <button 
                          onClick={() => { setCategoryFilter("all"); setIsFilterOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${categoryFilter === "all" ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                          All Categories
                          {categoryFilter === "all" && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
                        </button>
                        <button 
                          onClick={() => { setCategoryFilter("government"); setIsFilterOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${categoryFilter === "government" ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                          Government-based
                          {categoryFilter === "government" && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
                        </button>
                        <button 
                          onClick={() => { setCategoryFilter("school"); setIsFilterOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${categoryFilter === "school" ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                          School-based
                          {categoryFilter === "school" && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {filteredScholarships.map((s) => (
                    <div 
                      key={s.id} 
                      onClick={() => setSelectedScholarship(s)}
                      className={`transition-all duration-200 ${selectedScholarship?.id === s.id ? 'ring-2 ring-blue-500 rounded-3xl ring-offset-2' : ''}`}
                    >
                      <ScholarshipCard 
                        title={s.title}
                        subtitle={s.subtitle}
                        matchPercentage={s.match}
                        hasBookmark={true}
                        imageUrl={s.imageUrl}
                      />
                    </div>
                  ))}
                  {filteredScholarships.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-gray-800 font-bold">No results found</h3>
                      <p className="text-gray-500 text-sm mt-1">Try adjusting your filters.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Map Container */}
            <div className="flex-1 relative">
              <ScholarshipDetailOverlay 
                scholarship={selectedScholarship} 
                onClose={() => setSelectedScholarship(null)} 
              />

              <MapContainer
                center={[10.3157, 123.9029]}
                zoom={13}
                className="w-full h-full"
                zoomControl={false}
              >
                <MapResizer selectedSchool={selectedSchool} />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {filteredSchools.map((school) => (
                  <Marker 
                    key={school.id} 
                    position={school.position}
                    eventHandlers={{
                      click: () => {
                        setSelectedSchool(school);
                        setSelectedScholarship(null); // Clear detail when switching schools
                      },
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                      <span className="font-bold text-[#1a2e5a]">{school.name}</span>
                    </Tooltip>
                    <Popup autoPan={true} autoPanPadding={[50, 50]}>
                      <div className="p-2 min-w-[150px]">
                        <p className="font-black text-[#1a2e5a] text-sm leading-tight mb-1">{school.name}</p>
                        <div className="flex items-center gap-1.5 text-blue-600 font-bold text-[10px] uppercase tracking-tighter">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Viewing Scholarships
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </>
        ) : (
          <div className="flex-1 bg-[#fcfdfe] overflow-y-auto px-10 pt-28 pb-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="max-w-6xl mx-auto">
              {/* Modern Header Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      My Collection
                    </span>
                  </div>
                  <h1 className="text-5xl font-black text-[#1a2e5a] tracking-tight leading-none">
                    Saved Scholarships
                  </h1>
                  <p className="text-gray-500 font-medium text-lg pt-1">
                    Manage and track your bookmarked opportunities
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-white border border-gray-100 px-6 py-3 rounded-[2rem] shadow-sm">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Total Saved</span>
                    <span className="text-2xl font-black text-[#1a2e5a]">{savedIds.length}</span>
                  </div>
                  <div className="bg-white border border-gray-100 px-6 py-3 rounded-[2rem] shadow-sm">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Best Match</span>
                    <span className="text-2xl font-black text-green-600">100%</span>
                  </div>
                </div>
              </div>

              {/* Search and Filters for Saved */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative flex-1 max-w-md">
                  <input 
                    type="text" 
                    placeholder="Search in saved..." 
                    className="w-full bg-white border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Card Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredScholarships.map((s) => (
                  <div 
                    key={s.id} 
                    onClick={() => setSelectedScholarship(s)}
                    className="hover:scale-[1.01] transition-transform duration-300"
                  >
                    <ScholarshipCard 
                      title={s.title}
                      subtitle={s.subtitle}
                      matchPercentage={s.match}
                      hasBookmark={true}
                      imageUrl={s.imageUrl}
                    />
                  </div>
                ))}
              </div>

              {filteredScholarships.length === 0 && (
                <div className="flex flex-col items-center justify-center py-40 text-center bg-white border border-gray-100 rounded-[3rem] shadow-sm">
                  <div className="bg-blue-50 p-6 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a2e5a]">No saved scholarships yet</h3>
                  <p className="text-gray-500 mt-2 max-w-xs">Start browsing the map and bookmark scholarships you're interested in!</p>
                  <button 
                    onClick={() => setViewMode("map")}
                    className="mt-8 text-blue-600 font-extrabold hover:underline flex items-center gap-2 mx-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Go to map discovery
                  </button>
                </div>
              )}
            </div>

            <ScholarshipDetailOverlay 
              scholarship={selectedScholarship} 
              onClose={() => setSelectedScholarship(null)} 
            />
          </div>
        )}
      </div>

    </div>
  );
}

