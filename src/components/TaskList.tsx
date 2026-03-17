import React, { useState } from 'react';
import { Plus, Search, CheckCircle2, Circle, Clock, Trash2, Edit2 } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onAdd: () => void;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onAdd, onToggle, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#F8FAFC]">Tasks</h2>
          <p className="text-[#94A3B8] mt-1">Keep track of your daily to-dos.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#22D3EE] text-[#020617] font-semibold rounded-lg hover:bg-[#22D3EE]/90 transition-colors shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </header>

      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden">
        <div className="p-4 border-bottom border-[#1E293B] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#94A3B8]" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="bg-transparent border-none outline-none text-[#F8FAFC] w-full placeholder:text-[#94A3B8]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="divide-y divide-[#1E293B]">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4 flex items-center justify-between hover:bg-[#1E293B]/50 transition-colors group">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onToggle(task.id)}
                  className="transition-transform active:scale-90"
                >
                  {task.status === 'Done' ? (
                    <CheckCircle2 className="w-6 h-6 text-[#22D3EE]" />
                  ) : (
                    <Circle className="w-6 h-6 text-[#94A3B8] hover:text-[#22D3EE]" />
                  )}
                </button>
                <div>
                  <h4 className={`font-medium transition-all ${task.status === 'Done' ? 'text-[#94A3B8] line-through' : 'text-[#F8FAFC]'}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#94A3B8] mt-1">
                    <Clock className="w-3 h-3" />
                    Due: {task.dueDate}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onEdit(task)}
                  className="p-2 text-[#94A3B8] hover:text-[#22D3EE] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDelete(task.id)}
                  className="p-2 text-[#94A3B8] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {filteredTasks.length === 0 && (
            <div className="py-12 text-center text-[#94A3B8]">
              No tasks found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
