import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLMS } from './context/LMSContext';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const { setUser } = useLMS();
  const navigate = useNavigate();

  const handleAuth = (role) => {
    if(!email) return alert("Enter Email");
    setUser({ email, role });
    navigate(role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
        <div className="text-5xl font-black italic text-orange-500 mb-6 text-center">Ω</div>
        <h1 className="text-2xl font-black mb-2 text-center uppercase tracking-widest">
          {isSignup ? 'Create Neural ID' : 'System Access'}
        </h1>
        <p className="text-slate-500 text-xs text-center mb-8 italic">Kathmandu Hub • Sector 3000</p>
        
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Identity Email" 
            className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-orange-500 transition"
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => handleAuth('student')} className="py-4 bg-orange-600 text-black font-black rounded-2xl hover:bg-orange-500 transition shadow-lg shadow-orange-600/20">LEARNER</button>
            <button onClick={() => handleAuth('teacher')} className="py-4 bg-white/10 text-white font-black rounded-2xl hover:bg-white/20 transition">INSTRUCTOR</button>
          </div>
          
          <button onClick={() => setIsSignup(!isSignup)} className="w-full text-xs text-slate-500 hover:text-orange-500 transition">
            {isSignup ? "Already have an ID? Login" : "No Neural ID? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;