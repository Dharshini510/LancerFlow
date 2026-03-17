export type ProjectStatus = 'Active' | 'Completed';
export type TaskStatus = 'To Do' | 'Done';
export type InvoiceStatus = 'Paid' | 'Unpaid';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  deadline: string;
  clientId: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate: string;
  projectId?: string;
}

export interface Invoice {
  id: string;
  title: string;
  amount: number;
  status: InvoiceStatus;
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
}

export type View = 'home' | 'login' | 'signup' | 'dashboard' | 'projects' | 'clients' | 'tasks' | 'invoices' | 'settings';
