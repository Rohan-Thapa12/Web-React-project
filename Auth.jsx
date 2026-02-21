import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLMS } from './LMSContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { setUser } = useLMS();
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userObj = { name: data.get('name') || 'User', role: data.get('role') };
    setUser(userObj);
    navigate(userObj.role === 'teacher' ? '/teacher' : '/student');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4 text-white">
      <form onSubmit={handleAuth} className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl space-y-6">
        <h2 className="text-3xl font-black italic text-center uppercase tracking-widest text-orange-500">
          {isLogin ? 'LMS Login' : 'Create_ID'}
        </h2>
        {!isLogin && <input name="name" placeholder="Full Name" className="w-full bg-black/50 p-4 rounded-2xl border border-white/10" required />}
        <input name="email" type="email" placeholder="Email" className="w-full bg-black/50 p-4 rounded-2xl border border-white/10" required />
        <select name="role" className="w-full bg-black/50 p-4 rounded-2xl border border-white/10 font-bold text-orange-500">
          <option value="student">STUDENT_PORTAL</option>
          <option value="teacher">INSTRUCTOR_HUB</option>
        </select>
        <button className="w-full py-4 bg-orange-600 text-black font-black rounded-2xl hover:scale-105 transition">Login</button>
        <p onClick={() => setIsLogin(!isLogin)} className="text-center text-xs text-slate-500 cursor-pointer hover:text-white">
          {isLogin ? "New here? Create Neural ID" : "Already have ID? Login"}
        </p>
      </form>
    </div>
  );
}