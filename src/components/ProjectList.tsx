import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Trash2, Edit2, ExternalLink } from 'lucide-react';
import { Project, Client } from '../types';

interface ProjectListProps {
  projects: Project[];
  clients: Client[];
  onAdd: () => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, clients, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClientName = (id: string) => {
    return clients.find(c => c.id === id)?.name || 'Unknown Client';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#F8FAFC]">Projects</h2>
          <p className="text-[#94A3B8] mt-1">Manage and track your ongoing work.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#22D3EE] text-[#020617] font-semibold rounded-lg hover:bg-[#22D3EE]/90 transition-colors shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </header>

      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden">
        <div className="p-4 border-bottom border-[#1E293B] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#94A3B8]" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="bg-transparent border-none outline-none text-[#F8FAFC] w-full placeholder:text-[#94A3B8]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-y border-[#1E293B] bg-[#1E293B]/30">
                <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-[#1E293B]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#F8FAFC]">{project.name}</div>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8]">{getClientName(project.clientId)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      project.status === 'Active' 
                        ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20' 
                        : 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8]">{project.deadline}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onEdit(project)} className="p-2 hover:bg-[#1E293B] rounded-lg text-[#94A3B8] hover:text-[#22D3EE]">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(project.id)} className="p-2 hover:bg-[#1E293B] rounded-lg text-[#94A3B8] hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#94A3B8]">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
