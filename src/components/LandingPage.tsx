import React from 'react';
import { Briefcase, ArrowRight, Shield, Zap, BarChart3 } from 'lucide-react';
import { View } from '../types';

interface LandingPageProps {
  onNavigate: (view: View) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Briefcase className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">LancerFlow</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('login')}
            className="text-[#94A3B8] hover:text-[#F8FAFC] font-medium transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => onNavigate('signup')}
            className="px-5 py-2.5 bg-[#22D3EE] text-[#020617] font-bold rounded-xl hover:bg-[#22D3EE]/90 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#1E293B] text-cyan-400 text-xs font-bold uppercase tracking-widest animate-bounce">
            <Zap className="w-3 h-3" />
            The Future of Freelancing
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9]">Smarter</span>, <br />
            Not Harder.
          </h1>
          <p className="text-xl text-[#94A3B8] leading-relaxed">
            LancerFlow is the all-in-one dashboard designed for modern freelancers. 
            Manage projects, track tasks, and handle invoices with surgical precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => onNavigate('signup')}
              className="w-full sm:w-auto px-8 py-4 bg-[#22D3EE] text-[#020617] font-bold rounded-2xl hover:bg-[#22D3EE]/90 transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 group"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="w-full sm:w-auto px-8 py-4 bg-[#1E293B] text-[#F8FAFC] font-bold rounded-2xl hover:bg-[#1E293B]/80 transition-all border border-[#1E293B]"
            >
              View Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track your revenue and project progress with intuitive visual charts.' },
            { icon: Shield, title: 'Secure Management', desc: 'Your client data and invoices are managed with industry-standard security.' },
            { icon: Zap, title: 'Lightning Fast', desc: 'A optimized interface designed for speed and productivity.' }
          ].map((feature, i) => (
            <div key={i} className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-3xl hover:border-[#22D3EE]/30 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#22D3EE]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-[#22D3EE]" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-[#94A3B8] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-[#1E293B] text-center text-[#94A3B8] text-sm relative z-10">
        © 2026 LancerFlow. Built for the modern workforce.
      </footer>
    </div>
  );
};

export default LandingPage;
