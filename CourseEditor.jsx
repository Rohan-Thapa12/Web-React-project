import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseEditor = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-10 lg:p-20">
      <header className="flex justify-between items-center mb-16">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase underline decoration-orange-500 decoration-8 underline-offset-8">Course_Architect</h1>
        <button onClick={() => navigate(-1)} className="text-slate-500 font-bold hover:text-white">EXIT_BUILDER</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Deployment Name</label>
            <input type="text" placeholder="Designation..." className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-2xl font-black outline-none focus:border-orange-500 transition" />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Instruction Set</label>
            <textarea placeholder="Specify requirements for the module..." className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl h-48 outline-none focus:border-orange-500 transition font-medium" />
          </div>
        </div>

        <div className="bg-orange-600 rounded-[4rem] p-12 text-black flex flex-col justify-between">
           <div>
              <h2 className="text-3xl font-black italic mb-4 leading-none">DEPLOY_SYSTEM</h2>
              <p className="font-bold opacity-80 leading-relaxed">Once you initiate deployment, this content node will be broadcasted to all linked student neural-cores.</p>
           </div>
           <button onClick={() => navigate('/teacher-dashboard')} className="w-full py-6 bg-black text-white rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-2xl">PUBLISH_CONTENT</button>
        </div>
      </div>
    </div>
  );
};

export default CourseEditor;