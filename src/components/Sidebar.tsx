import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  CheckSquare, 
  FileText, 
  Settings,
  LogOut
} from 'lucide-react';
import { UserProfile, View } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onLogout: () => void;
  profile: UserProfile;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, onLogout, profile }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-[#1E293B] flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Briefcase className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-[#F8FAFC] tracking-tight">LancerFlow</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              currentView === item.id 
                ? "bg-[#22D3EE]/10 text-[#22D3EE]" 
                : "text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors",
              currentView === item.id ? "text-[#22D3EE]" : "text-[#94A3B8] group-hover:text-[#F8FAFC]"
            )} />
            <span className="font-medium">{item.label}</span>
            {currentView === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#1E293B] space-y-2">
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1E293B] border border-[#22D3EE]/30 flex items-center justify-center text-[10px] font-bold text-[#22D3EE]">
            {profile.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-[#F8FAFC] truncate">{profile.name || 'User'}</p>
            <p className="text-[10px] text-[#94A3B8] truncate">{profile.email}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
