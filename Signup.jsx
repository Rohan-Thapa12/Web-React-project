import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || formData.password.length < 6) {
      setError("Please fill all fields correctly (Password 6+ chars)");
      return;
    }
    // After "creating" account, take them to their new dashboard
    if (formData.role === 'teacher') navigate('/teacher-dashboard');
    else navigate('/student-dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-slate-100">
        {/* Visual Side */}
        <div className="md:w-1/2 bg-indigo-600 p-12 text-white flex flex-col justify-between relative">
          <div className="z-10">
            <h2 className="text-4xl font-black tracking-tighter mb-4">Join the Future.</h2>
            <p className="text-indigo-100 font-medium">Get access to Sem-5 resources and collaboration tools instantly.</p>
          </div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <p className="z-10 text-xs font-bold opacity-50 uppercase tracking-widest">© 2026 EduPortal LMS</p>
        </div>

        {/* Form Side */}
        <div className="md:w-1/2 p-12">
          <h2 className="text-3xl font-black mb-8">Create Account</h2>
          {error && <p className="mb-4 text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl">⚠️ {error}</p>}
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="flex gap-4 mb-4">
              <button 
                type="button" 
                onClick={() => setFormData({...formData, role: 'student'})}
                className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition ${formData.role === 'student' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}
              >Student</button>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, role: 'teacher'})}
                className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition ${formData.role === 'teacher' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}
              >Teacher</button>
            </div>

            <input 
              type="text" placeholder="Full Name" 
              className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 transition"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" placeholder="University Email" 
              className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 transition"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="password" placeholder="Create Password" 
              className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 transition"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />

            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition mt-4">
              Register Now
            </button>
          </form>
          <p className="mt-8 text-center text-sm font-bold text-slate-400">
            Already have an account? <Link to="/login" className="text-indigo-600">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}