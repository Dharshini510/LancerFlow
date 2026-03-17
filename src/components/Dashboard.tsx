import React from 'react';
import { 
  Briefcase, 
  Users, 
  CheckSquare, 
  FileText,
  TrendingUp,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Project, Client, Task, Invoice } from '../types';

interface DashboardProps {
  projects: Project[];
  clients: Client[];
  tasks: Task[];
  invoices: Invoice[];
  onAction: (type: 'project' | 'client' | 'task' | 'invoice') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, clients, tasks, invoices, onAction }) => {
  const stats = [
    { label: 'Total Projects', value: projects.length, icon: Briefcase, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { label: 'Total Clients', value: clients.length, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { label: 'Total Tasks', value: tasks.length, icon: CheckSquare, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Total Invoices', value: invoices.length, icon: FileText, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  const chartData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 },
    { name: 'Jun', amount: 2390 },
  ];

  const recentProjects = projects.slice(-3).reverse();
  const recentInvoices = invoices.slice(-3).reverse();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#F8FAFC]">Dashboard Overview</h2>
          <p className="text-[#94A3B8] mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onAction('project')}
            className="flex items-center gap-2 px-4 py-2 bg-[#22D3EE] text-[#020617] font-semibold rounded-lg hover:bg-[#22D3EE]/90 transition-colors shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0F172A] border border-[#1E293B] p-6 rounded-2xl hover:border-[#22D3EE]/30 transition-colors group">
            <div className="flex justify-between items-start">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="mt-4">
              <h3 className="text-[#94A3B8] text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold text-[#F8FAFC] mt-1">{stat.value}</p>
              {stat.label === 'Total Tasks' && tasks.length > 0 && (
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-[#94A3B8]">Progress</span>
                    <span className="text-[#22D3EE]">
                      {Math.round((tasks.filter(t => t.status === 'Done').length / tasks.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-1 w-full bg-[#1E293B] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#22D3EE] transition-all duration-1000" 
                      style={{ width: `${(tasks.filter(t => t.status === 'Done').length / tasks.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-[#0F172A] border border-[#1E293B] p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-[#F8FAFC]">Revenue Overview</h3>
            <select className="bg-[#1E293B] text-[#F8FAFC] text-sm rounded-lg px-3 py-1 border-none outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#94A3B8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#94A3B8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '8px' }}
                  itemStyle={{ color: '#22D3EE' }}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#22D3EE' : '#1E293B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#0F172A] border border-[#1E293B] p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-[#F8FAFC] mb-6">Recent Projects</h3>
          <div className="space-y-4">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1E293B] transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-[#22D3EE]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#F8FAFC]">{project.name}</h4>
                      <p className="text-xs text-[#94A3B8]">{project.status}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#22D3EE] transition-colors" />
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-[#94A3B8]">No projects yet.</p>
                <button 
                  onClick={() => onAction('project')}
                  className="mt-2 text-xs font-bold text-[#22D3EE] hover:underline"
                >
                  Create your first project
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#F8FAFC] mb-6">Recent Invoices</h3>
            <div className="space-y-4">
              {recentInvoices.length > 0 ? (
                recentInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1E293B] transition-colors">
                    <div>
                      <h4 className="text-sm font-medium text-[#F8FAFC]">{invoice.title}</h4>
                      <p className="text-xs text-[#94A3B8]">{invoice.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#F8FAFC]">${invoice.amount}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${invoice.status === 'Paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {invoice.status}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm text-[#94A3B8]">No invoices yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
