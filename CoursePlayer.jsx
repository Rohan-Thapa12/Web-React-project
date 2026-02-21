import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLMS } from './LMSContext';

export default function CoursePlayer() {
  const { id } = useParams();
  const { courses } = useLMS();
  const [activeMode, setActiveMode] = useState('video'); // video, notes, or resources
  const navigate = useNavigate();

  const course = courses.find(c => c.id === parseInt(id)) || courses[0];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col lg:flex-row">
      {/* LEFT SIDE: MAIN PLAYER/CONTENT */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto no-scrollbar">
        <button onClick={() => navigate('/student')} className="mb-6 text-orange-500 font-black hover:underline">← HUB_BACK</button>
        
        {/* TAB TOGGLE BAR */}
        <div className="flex gap-4 mb-8 bg-white/5 p-2 rounded-2xl border border-white/10 w-fit">
          {['video', 'notes', 'resources'].map((mode) => (
            <button 
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeMode === mode ? 'bg-orange-500 text-black' : 'text-slate-400 hover:text-white'}`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* DYNAMIC VIEWPORT */}
        <div className="space-y-6">
          {activeMode === 'video' && (
            <div className="aspect-video bg-black rounded-[3rem] border border-white/10 flex items-center justify-center relative overflow-hidden group shadow-2xl">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-black text-2xl group-hover:scale-110 transition cursor-pointer">▶</div>
              <div className="absolute bottom-6 left-8 text-[10px] font-mono text-orange-500/50">STREAMING_UNIT_04...</div>
            </div>
          )}

          {activeMode === 'notes' && (
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 animate-in fade-in">
              <h2 className="text-xl font-black text-orange-500 mb-6 italic underline underline-offset-8">INSTRUCTOR_NOTES</h2>
              <p className="text-slate-400 leading-relaxed font-medium">"{course.desc} Make sure to review the SYN documentation before the final lab. This module focuses on asynchronous state management in high-latency environments."</p>
            </div>
          )}

          {activeMode === 'resources' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
              {['Lab_Setup.exe', 'Architecture_Diagram.png', 'CheatSheet.pdf'].map(file => (
                <div key={file} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-orange-500 transition">
                  <span className="text-xs font-bold text-slate-300">{file}</span>
                  <button className="text-orange-500 font-black text-lg group-hover:scale-125 transition">↓</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* RIGHT SIDE: CURRICULUM LIST */}
      <aside className="w-full lg:w-96 bg-white/5 border-l border-white/10 p-10 flex flex-col">
        <h3 className="text-xs font-black uppercase text-slate-500 tracking-[0.4em] mb-8">Course_Syllabus</h3>
        <div className="space-y-4 flex-1">
          {['Intro', 'Deep Dive', 'Lab Session', 'Conclusion'].map((m, i) => (
            <div key={i} className="p-5 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between opacity-80 hover:opacity-100 cursor-pointer">
              <span className="text-xs font-bold">0{i+1}. {m}</span>
              <span className="text-orange-500">▶</span>
            </div>
          ))}
        </div>
        <div className="mt-10 p-6 bg-orange-600 rounded-[2.5rem] text-black">
          <p className="text-[10px] font-black uppercase mb-4">Unit Assignment</p>
          <button className="w-full py-4 bg-black text-white font-black rounded-xl hover:scale-105 transition">SUBMIT_WORK</button>
        </div>
      </aside>
    </div>
  );
}