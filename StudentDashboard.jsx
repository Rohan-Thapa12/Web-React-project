import React, { useState } from 'react';
import { useLMS } from './LMSContext';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const { courses, user, requestEnrollment } = useLMS();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Content change: Cutting-edge Tech Catalog
  const catalog = [
    { title: "Quantum Computing Basics", level: "Advanced", tag: "Physics" },
    { title: "Blockchain Development", level: "Intermediate", tag: "Web3" },
    { title: "Neural Network Design", level: "Expert", tag: "AI" },
    { title: "Ethical Hacking v12", level: "Beginner", tag: "Security" }
  ];

  const filteredCatalog = catalog.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#2D333B] text-white flex font-sans">
      {/* Sidebar - Matches Teacher Sidebar */}
      <aside className="w-64 bg-[#1C2128] border-r border-gray-700 flex flex-col p-6">
        <div className="text-orange-600 text-4xl font-black mb-10 italic">Ω</div>
        <nav className="flex-1 space-y-2">
          {['Dashboard', 'Catalog', 'Transcripts', 'Settings'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                activeTab === item ? 'bg-orange-600 text-white' : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </nav>
        <button 
          onClick={() => navigate('/')}
          className="bg-[#373E47] border border-red-500/30 text-red-500 py-2 px-4 rounded-lg font-bold text-sm mt-auto hover:bg-red-500 hover:text-white transition-all"
        >
          LOGOUT
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">{activeTab} Overview</h1>
            <p className="text-orange-500 font-bold text-xs tracking-widest mt-1">LEARNER_ID: {user.name.split(' ')[0].toUpperCase()}_2024</p>
          </div>
          <div className="flex gap-4">
             <input 
                type="text" 
                placeholder="Search modules..."
                className="bg-[#1C2128] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:border-orange-500 outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
             />
             <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center font-bold shadow-lg">
                {user.name[0]}
             </div>
          </div>
        </header>

        {activeTab === 'Dashboard' && (
          <>
            {/* Stats Cards - Matching the 4-color layout */}
            <div className="grid grid-cols-4 gap-6 mb-12">
              <div className="bg-[#00A8E8] p-6 rounded-2xl shadow-xl flex flex-col justify-center">
                <p className="text-xs font-bold uppercase opacity-80">Enrolled</p>
                <h2 className="text-4xl font-black">{courses.length}</h2>
              </div>
              <div className="bg-[#00D600] p-6 rounded-2xl shadow-xl flex flex-col justify-center">
                <p className="text-xs font-bold uppercase opacity-80">Completed</p>
                <h2 className="text-4xl font-black">2</h2>
              </div>
              <div className="bg-[#8A2BE2] p-6 rounded-2xl shadow-xl flex flex-col justify-center">
                <p className="text-xs font-bold uppercase opacity-80">Assignments</p>
                <h2 className="text-4xl font-black">5</h2>
              </div>
              <div className="bg-[#FF4500] p-6 rounded-2xl shadow-xl flex flex-col justify-center">
                <p className="text-xs font-bold uppercase opacity-80">GPA</p>
                <h2 className="text-4xl font-black">3.9</h2>
              </div>
            </div>

            {/* Current Learning Path */}
            <section>
              <h3 className="text-xs font-black tracking-[0.2em] text-gray-400 uppercase mb-4">In Progress</h3>
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="bg-[#373E47] border border-orange-500/20 p-6 rounded-2xl flex justify-between items-center hover:border-orange-500 transition-all">
                    <div>
                      <h4 className="text-xl font-black mb-1">{course.title}</h4>
                      <p className="text-gray-400 text-xs uppercase font-bold tracking-tighter">Instructor: {course.tutor}</p>
                    </div>
                    <div className="flex items-center gap-8">
                       <div className="text-right">
                          <p className="text-xs font-black text-orange-500">82% COMPLETE</p>
                          <div className="w-32 h-1.5 bg-gray-700 rounded-full mt-1">
                             <div className="bg-orange-500 h-full rounded-full" style={{width: '82%'}}></div>
                          </div>
                       </div>
                       <button 
                        onClick={() => navigate(`/course-player/${course.id}`)}
                        className="bg-orange-600 text-white px-8 py-2 rounded-xl font-black text-xs uppercase"
                       >
                         Continue
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'Catalog' && (
          <div className="grid grid-cols-2 gap-6">
            {filteredCatalog.map(item => (
              <div key={item.title} className="bg-[#1C2128] border border-gray-700 p-8 rounded-3xl hover:border-orange-500 transition-all">
                <span className="bg-orange-600/20 text-orange-500 text-[10px] font-black px-3 py-1 rounded-full uppercase mb-4 inline-block">
                  {item.tag}
                </span>
                <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-6 font-medium">Level: {item.level}</p>
                <button 
                  onClick={() => { requestEnrollment(user.name, item.title); alert("Access Requested"); }}
                  className="w-full py-3 bg-transparent border-2 border-orange-600 text-orange-500 rounded-xl font-black text-xs uppercase hover:bg-orange-600 hover:text-white transition-all"
                >
                  Request Access
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}