import React from 'react';
import { FileText, Download, Filter, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { Invoice } from '../types';

interface InvoiceListProps {
  invoices: Invoice[];
  onAdd: () => void;
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, onAdd, onEdit, onDelete }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#F8FAFC]">Invoices</h2>
          <p className="text-[#94A3B8] mt-1">Track your earnings and payments.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] text-[#F8FAFC] font-semibold rounded-lg hover:bg-[#1E293B]/80 transition-colors border border-[#1E293B]">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#22D3EE] text-[#020617] font-semibold rounded-lg hover:bg-[#22D3EE]/90 transition-colors shadow-lg shadow-cyan-500/20"
          >
            <FileText className="w-4 h-4" />
            Create Invoice
          </button>
        </div>
      </header>

      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#1E293B]/30">
                <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-[#94A3B8] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-[#1E293B]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#1E293B] flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#22D3EE]" />
                      </div>
                      <div className="font-medium text-[#F8FAFC]">{invoice.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8]">{invoice.date}</td>
                  <td className="px-6 py-4 font-bold text-[#F8FAFC]">${invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      invoice.status === 'Paid' 
                        ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' 
                        : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-[#1E293B] rounded-lg text-[#94A3B8] hover:text-[#22D3EE] transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onEdit(invoice)}
                        className="p-2 hover:bg-[#1E293B] rounded-lg text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(invoice.id)}
                        className="p-2 hover:bg-[#1E293B] rounded-lg text-[#94A3B8] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
