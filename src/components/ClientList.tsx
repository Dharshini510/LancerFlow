import React, { useState } from 'react';
import { Plus, Search, Trash2, Edit2, Mail, User } from 'lucide-react';
import { Client } from '../types';

interface ClientListProps {
  clients: Client[];
  onAdd: () => void;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#F8FAFC]">Clients</h2>
          <p className="text-[#94A3B8] mt-1">Manage your professional relationships.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#22D3EE] text-[#020617] font-semibold rounded-lg hover:bg-[#22D3EE]/90 transition-colors shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </header>

      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden">
        <div className="p-4 border-bottom border-[#1E293B] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#94A3B8]" />
          <input 
            type="text" 
            placeholder="Search clients..." 
            className="bg-transparent border-none outline-none text-[#F8FAFC] w-full placeholder:text-[#94A3B8]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredClients.map((client) => (
            <div key={client.id} className="bg-[#1E293B]/30 border border-[#1E293B] p-6 rounded-xl hover:border-[#22D3EE]/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-[#22D3EE]/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-[#22D3EE]" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(client)} className="p-2 hover:bg-[#1E293B] rounded-lg text-[#94A3B8] hover:text-[#22D3EE]">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(client.id)} className="p-2 hover:bg-[#1E293B] rounded-lg text-[#94A3B8] hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[#F8FAFC]">{client.name}</h3>
              <div className="flex items-center gap-2 text-[#94A3B8] mt-2 text-sm">
                <Mail className="w-4 h-4" />
                {client.email}
              </div>
              <div className="mt-6 pt-6 border-t border-[#1E293B] flex justify-between items-center">
                <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Active Projects: 2</span>
                <button className="text-[#22D3EE] text-sm font-medium hover:underline">View Details</button>
              </div>
            </div>
          ))}
          {filteredClients.length === 0 && (
            <div className="col-span-full py-12 text-center text-[#94A3B8]">
              No clients found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientList;
