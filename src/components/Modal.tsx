import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0F172A] border border-[#1E293B] w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[#1E293B]">
          <h3 className="text-xl font-bold text-[#F8FAFC]">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#1E293B] rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
