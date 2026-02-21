import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLMS } from './LMSContext';

export default function CourseView() {
  const { id } = useParams();
  const { courses } = useLMS();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const course = courses.find(c => c.id === parseInt(id)) || courses[0];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col lg:flex-row">
      {/* CONTENT PLAYER AREA */}
      <main className="flex-1 p-8 lg:p-16 overflow-y-auto">
        <button onClick={() => navigate('/student')} className="mb-8 text-orange-500 font-black flex items-center gap-2 hover:underline">
          ← BACK_TO_HUB
        </button>

        <div className="aspect-video bg-black/50 border border-white/10 rounded-[3rem] shadow-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden">
          <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-black text-3xl shadow-[0_0_50px_rgba(249,115,22,0.4)] group-hover:scale-110 transition">▶</div>
          <div className="absolute bottom-10 left-10 right-10">
            <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">Lecture Streaming: Unit_01</p>
            <div className="h-1 bg-white/10 rounded-full w-full overflow-hidden">
              <div className="h-full bg-orange-500 w-1/3"></div>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter">{course.title}</h1>
          <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] space-y-4">
            <h3 className="text-orange-500 font-black text-sm uppercase tracking-widest">Instructor Instructions</h3>
            <p className="text-slate-400 leading-relaxed font-medium">{course.desc}</p>
          </div>
        </div>
      </main>

      {/* SYLLABUS & SUBMISSION SIDEBAR */}
      <aside className="w-full lg:w-[450px] bg-white/5 backdrop-blur-3xl border-l border-white/10 p-10 flex flex-col">
        <h2 className="text-xl font-black italic mb-8 border-b border-white/10 pb-4">COURSE_SYLLABUS</h2>
        <div className="space-y-3 flex-1">
          {['Module Intro', 'Logic Synthesis', 'Lab Assignment'].map((m, i) => (
            <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex justify-between items-center group hover:border-orange-500 transition cursor-pointer">
              <span className="text-sm font-bold opacity-60">0{i+1} — {m}</span>
              <span className="text-orange-500">→</span>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-orange-600 rounded-[3rem] text-black shadow-2xl">
          <h4 className="text-2xl font-black italic mb-2 uppercase">Assignment_Uplink</h4>
          <p className="text-xs font-bold opacity-70 mb-8 uppercase tracking-tighter italic">Upload your .SYN file for review</p>
          <button 
            onClick={() => setSubmitted(true)}
            className="w-full py-5 bg-black text-white rounded-2xl font-black hover:scale-105 transition active:scale-95"
          >
            {submitted ? '✓ UPLOAD_COMPLETE' : 'INITIATE_SUBMISSION'}
          </button>
        </div>
      </aside>
    </div>
  );
}