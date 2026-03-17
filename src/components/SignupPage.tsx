import React, { useState } from 'react';
import { Briefcase, Mail, Lock, ArrowRight, User, Check, X } from 'lucide-react';
import { View } from '../types';

interface SignupPageProps {
  onNavigate: (view: View) => void;
  onSignup: (name: string, email: string, password?: string) => void;
  onGoogleLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onNavigate, onSignup, onGoogleLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validations = {
    length: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*]/.test(password),
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = name.length > 0 && isEmailValid && Object.values(validations).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSignup(name, email, password);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#020617_70%)] opacity-50" />
      
      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div 
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-3 cursor-pointer group mb-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <Briefcase className="text-white w-7 h-7" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#F8FAFC]">LancerFlow</span>
          </div>
          <h2 className="text-3xl font-bold text-[#F8FAFC]">Create Account</h2>
          <p className="text-[#94A3B8] mt-2">Join thousands of freelancers worldwide.</p>
        </div>

        <div className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-3xl shadow-2xl">
          <button 
            onClick={onGoogleLogin}
            className="w-full py-3.5 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center gap-3 mb-6 active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1E293B]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0F172A] px-2 text-[#94A3B8]">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#94A3B8]">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-2xl pl-12 pr-4 py-4 text-[#F8FAFC] focus:border-[#22D3EE] outline-none transition-all placeholder:text-[#94A3B8]/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#94A3B8]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input 
                  required
                  type="email" 
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-[#1E293B] border rounded-2xl pl-12 pr-4 py-4 text-[#F8FAFC] outline-none transition-all placeholder:text-[#94A3B8]/50 ${email && !isEmailValid ? 'border-red-500/50 focus:border-red-500' : 'border-[#1E293B] focus:border-[#22D3EE]'}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#94A3B8]">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-2xl pl-12 pr-4 py-4 text-[#F8FAFC] focus:border-[#22D3EE] outline-none transition-all placeholder:text-[#94A3B8]/50"
                />
              </div>
              
              {/* Password Strength */}
              <div className="pt-2 space-y-2">
                {[
                  { label: 'At least 8 characters', met: validations.length },
                  { label: 'Contains a number', met: validations.hasNumber },
                  { label: 'Contains a special character', met: validations.hasSpecial },
                ].map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    {req.met ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-red-400" />}
                    <span className={req.met ? 'text-emerald-400' : 'text-[#94A3B8]'}>{req.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 group active:scale-[0.98] ${isFormValid ? 'bg-[#22D3EE] text-[#020617] shadow-cyan-500/25 hover:bg-[#22D3EE]/90' : 'bg-[#1E293B] text-[#94A3B8] cursor-not-allowed'}`}
            >
              Create Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#1E293B] text-center">
            <p className="text-[#94A3B8] text-sm">
              Already have an account?{' '}
              <button 
                onClick={() => onNavigate('login')}
                className="font-bold text-[#22D3EE] hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
