import React, { useState } from 'react';
import { User, Mail, Shield, Bell, Save } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-[#F8FAFC]">Settings</h2>
        <p className="text-[#94A3B8] mt-1">Manage your account and preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-[#F8FAFC] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#22D3EE]" />
              Profile Information
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#94A3B8]">Display Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1E293B] border border-[#1E293B] rounded-xl px-4 py-3 text-[#F8FAFC] focus:border-[#22D3EE] outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#94A3B8]">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1E293B] border border-[#1E293B] rounded-xl px-4 py-3 text-[#F8FAFC] focus:border-[#22D3EE] outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-[#22D3EE] text-[#020617] font-bold rounded-xl hover:bg-[#22D3EE]/90 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-[#F8FAFC] mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#22D3EE]" />
              Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#1E293B]/30 rounded-xl border border-[#1E293B]">
                <div>
                  <h4 className="text-sm font-medium text-[#F8FAFC]">Two-Factor Authentication</h4>
                  <p className="text-xs text-[#94A3B8]">Add an extra layer of security to your account.</p>
                </div>
                <button className="px-4 py-2 bg-[#1E293B] text-[#F8FAFC] text-sm font-medium rounded-lg border border-[#1E293B] hover:bg-[#1E293B]/80 transition-colors">
                  Enable
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#22D3EE]/20 to-[#0EA5E9]/20 border border-[#22D3EE]/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">Pro Plan</h3>
            <p className="text-sm text-[#94A3B8] mb-4">You are currently on the free plan. Upgrade to unlock advanced features.</p>
            <button className="w-full py-3 bg-[#22D3EE] text-[#020617] font-bold rounded-xl hover:bg-[#22D3EE]/90 transition-all">
              Upgrade Now
            </button>
          </div>

          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-[#F8FAFC] mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#22D3EE]" />
              Notifications
            </h3>
            <div className="space-y-3">
              {['Email Notifications', 'Project Updates', 'Invoice Alerts'].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-10 h-6 bg-[#1E293B] rounded-full relative transition-colors group-hover:bg-[#1E293B]/80">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-[#94A3B8] rounded-full transition-transform" />
                  </div>
                  <span className="text-sm text-[#94A3B8] group-hover:text-[#F8FAFC] transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
