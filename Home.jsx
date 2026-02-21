import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 pt-32 pb-20 relative">
        {/* Background Decoration */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-50 rounded-full blur-[120px] -z-10 opacity-60"></div>

        <div className="text-center">
          <span className="inline-block px-4 py-1.5 mb-8 text-[10px] font-black tracking-[0.2em] text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Version 4.0 is here
          </span>
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            The Future of <br />
            <span className="text-indigo-600 italic">Learning.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-slate-500 font-medium mb-12">
            A specialized platform for 5th-semester students to collaborate, manage grades, and master web technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/signup" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl hover:bg-slate-800 transition transform hover:-translate-y-1">
              Start Learning — It's Free
            </Link>
            <Link to="/login" className="px-10 py-5 bg-white border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition">
              Instructor Login
            </Link>
          </div>
        </div>

        {/* Floating Abstract Cards Preview */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-40 grayscale">
            {[1,2,3,4].map(i => (
                <div key={i} className="h-32 bg-slate-100 rounded-3xl border border-slate-200 shadow-sm"></div>
            ))}
        </div>
      </div>
    </div>
  );
}