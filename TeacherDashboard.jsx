import React, { useState } from 'react';
import { useLMS } from './LMSContext';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const { courses, requests, addCourse, approveStudent, approveAll } = useLMS();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const navigate = useNavigate();

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if(newCourseTitle) {
      addCourse(newCourseTitle);
      setNewCourseTitle('');
      setActiveTab('Dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#2D333B] text-white flex font-sans">
      {/* Sidebar - Same as Photo */}
      <aside className="w-64 bg-[#1C2128] border-r border-gray-700 flex flex-col p-6">
        <div className="text-orange-600 text-4xl font-black mb-10 italic">Σ</div>
        <nav className="flex-1 space-y-2">
          {['Dashboard', 'Create Course', 'Approvals', 'Analytics'].map((item) => (
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
        <button onClick={() => navigate('/')} className="bg-orange-600 py-2 rounded-lg font-bold text-sm mt-auto">LOGOUT</button>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-start mb-10">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            {activeTab === 'Dashboard' ? 'Analytics Overview' : activeTab}
          </h1>
          <div className="text-right">
             <p className="text-orange-500 font-bold text-[10px] tracking-widest">INSTRUCTOR: ROHAN_01</p>
          </div>
        </header>

        {activeTab === 'Dashboard' && (
          <>
            {/* Stat Cards from Photo */}
            <div className="grid grid-cols-4 gap-6 mb-12">
              <div className="bg-[#00A8E8] p-6 rounded-2xl shadow-lg">
                <p className="text-[10px] font-black uppercase opacity-70">Total Students</p>
                <h2 className="text-4xl font-black">{courses.reduce((acc, c) => acc + c.students, 0)}</h2>
              </div>
              <div className="bg-[#00D600] p-6 rounded-2xl shadow-lg">
                <p className="text-[10px] font-black uppercase opacity-70">Active Courses</p>
                <h2 className="text-4xl font-black">{courses.length}</h2>
              </div>
              <div className="bg-[#8A2BE2] p-6 rounded-2xl shadow-lg">
                <p className="text-[10px] font-black uppercase opacity-70">Pending Approvals</p>
                <h2 className="text-4xl font-black">{requests.length}</h2>
              </div>
              <div className="bg-[#FF4500] p-6 rounded-2xl shadow-lg">
                <p className="text-[10px] font-black uppercase opacity-70">Updates</p>
                <h2 className="text-4xl font-black">4</h2>
              </div>
            </div>

            {/* Quick Actions - These now work! */}
            <div className="flex gap-4 mb-12">
              <button onClick={approveAll} className="border-2 border-orange-600 text-orange-500 px-6 py-2 rounded-xl font-bold text-xs hover:bg-orange-600 hover:text-white transition-all">APPROVE ALL</button>
              <button onClick={() => setActiveTab('Create Course')} className="border-2 border-orange-600 text-orange-500 px-6 py-2 rounded-xl font-bold text-xs hover:bg-orange-600 hover:text-white transition-all">NEW COURSE</button>
            </div>

            {/* Recent Activity List */}
            <h3 className="text-[10px] font-black text-gray-500 tracking-[0.2em] mb-4 uppercase">Enrollment Requests</h3>
            <div className="space-y-3">
              {requests.length > 0 ? requests.map(req => (
                <div key={req.id} className="bg-[#373E47] border border-orange-500/20 p-5 rounded-2xl flex justify-between items-center">
                  <p className="text-sm">Student <span className="text-orange-400">"{req.studentName}"</span> requested <span className="italic">{req.courseTitle}</span></p>
                  <button onClick={() => approveStudent(req.id)} className="bg-orange-600 px-6 py-2 rounded-xl font-black text-[10px] uppercase">Approve</button>
                </div>
              )) : <p className="text-gray-500 italic">No pending requests.</p>}
            </div>
          </>
        )}

        {activeTab === 'Create Course' && (
          <div className="bg-[#1C2128] p-10 rounded-3xl border border-gray-700 max-w-lg">
            <h2 className="text-2xl font-black mb-6 uppercase italic text-orange-500">Deploy New Module</h2>
            <input 
              type="text" 
              placeholder="Course Title (e.g. Advanced AI)" 
              className="w-full bg-[#2D333B] border border-gray-700 rounded-xl p-4 mb-4 outline-none focus:border-orange-600"
              value={newCourseTitle}
              onChange={(e) => setNewCourseTitle(e.target.value)}
            />
            <button onClick={handleCreateCourse} className="w-full bg-orange-600 py-4 rounded-xl font-black uppercase tracking-widest">Launch Course</button>
          </div>
        )}
      </main>
    </div>
  );
}