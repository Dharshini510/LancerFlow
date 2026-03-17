import React, { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { 
  collection, 
  onSnapshot, 
  query, 
  where, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocFromServer,
  getDoc
} from 'firebase/firestore';
import { auth, db } from './firebase';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import ClientList from './components/ClientList';
import TaskList from './components/TaskList';
import InvoiceList from './components/InvoiceList';
import Settings from './components/Settings';
import Modal from './components/Modal';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { 
  Project, 
  Client, 
  Task, 
  Invoice, 
  UserProfile, 
  View,
  ProjectStatus,
  TaskStatus
} from './types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: ''
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'client' | 'task' | 'invoice' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form States
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. ");
        }
      }
    }
    testConnection();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setProfile({
          name: user.displayName || 'User',
          email: user.email || ''
        });
        if (currentView === 'home' || currentView === 'login' || currentView === 'signup') {
          setCurrentView('dashboard');
        }
      } else {
        setIsAuthenticated(false);
        setProfile({ name: '', email: '' });
        if (currentView !== 'home' && currentView !== 'login' && currentView !== 'signup') {
          setCurrentView('home');
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [currentView]);

  // Firestore Listeners
  useEffect(() => {
    if (!isAuthenticated || !auth.currentUser) {
      setProjects([]);
      setClients([]);
      setTasks([]);
      setInvoices([]);
      return;
    }

    const uid = auth.currentUser.uid;

    const unsubProjects = onSnapshot(
      query(collection(db, 'projects'), where('uid', '==', uid)),
      (snapshot) => {
        setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
      },
      (error) => handleFirestoreError(error, OperationType.GET, 'projects')
    );

    const unsubClients = onSnapshot(
      query(collection(db, 'clients'), where('uid', '==', uid)),
      (snapshot) => {
        setClients(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client)));
      },
      (error) => handleFirestoreError(error, OperationType.GET, 'clients')
    );

    const unsubTasks = onSnapshot(
      query(collection(db, 'tasks'), where('uid', '==', uid)),
      (snapshot) => {
        setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task)));
      },
      (error) => handleFirestoreError(error, OperationType.GET, 'tasks')
    );

    const unsubInvoices = onSnapshot(
      query(collection(db, 'invoices'), where('uid', '==', uid)),
      (snapshot) => {
        setInvoices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invoice)));
      },
      (error) => handleFirestoreError(error, OperationType.GET, 'invoices')
    );

    return () => {
      unsubProjects();
      unsubClients();
      unsubTasks();
      unsubInvoices();
    };
  }, [isAuthenticated]);

  const handleLogin = async (email: string, password?: string) => {
    if (!password) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSignup = async (name: string, email: string, password?: string) => {
    if (!password) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      // Create user document
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        role: 'user'
      });
      
      setProfile({ name, email });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Ensure user document exists
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName || 'User',
        email: user.email || '',
        role: 'user'
      }, { merge: true });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleUpdateProfile = async (newProfile: UserProfile) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: newProfile.name });
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          name: newProfile.name
        });
        setProfile(newProfile);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleAddClick = (type: 'project' | 'client' | 'task' | 'invoice') => {
    setModalType(type);
    setEditingItem(null);
    
    // Set default values to satisfy security rules
    const defaults: any = {};
    if (type === 'project') defaults.status = 'Active';
    if (type === 'task') defaults.status = 'To Do';
    if (type === 'invoice') defaults.status = 'Unpaid';
    
    setFormData(defaults);
    setIsModalOpen(true);
  };

  const handleEditClick = (type: 'project' | 'client' | 'task' | 'invoice', item: any) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (type: 'project' | 'client' | 'task' | 'invoice', id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const path = `${type}s`;
      try {
        await deleteDoc(doc(db, path, id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `${path}/${id}`);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !modalType) return;
    
    const uid = auth.currentUser.uid;
    const path = `${modalType}s`;
    
    try {
      const data = { ...formData, uid };
      if (editingItem) {
        const { id, ...updateData } = data;
        await updateDoc(doc(db, path, editingItem.id), updateData);
      } else {
        await addDoc(collection(db, path), data);
      }
      setIsModalOpen(false);
    } catch (error) {
      handleFirestoreError(error, editingItem ? OperationType.UPDATE : OperationType.CREATE, path);
    }
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    try {
      await updateDoc(doc(db, 'tasks', id), {
        status: task.status === 'Done' ? 'To Do' : 'Done'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `tasks/${id}`);
    }
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-[#22D3EE] border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    // Protected Routes Check
    const dashboardViews: View[] = ['dashboard', 'projects', 'clients', 'tasks', 'invoices', 'settings'];
    if (dashboardViews.includes(currentView) && !isAuthenticated) {
      return <LandingPage onNavigate={setCurrentView} />;
    }

    switch (currentView) {
      case 'home':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentView} onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />;
      case 'signup':
        return <SignupPage onNavigate={setCurrentView} onSignup={handleSignup} onGoogleLogin={handleGoogleLogin} />;
      case 'dashboard':
        return <Dashboard projects={projects} clients={clients} tasks={tasks} invoices={invoices} onAction={handleAddClick} />;
      case 'projects':
        return <ProjectList projects={projects} clients={clients} onAdd={() => handleAddClick('project')} onEdit={(p) => handleEditClick('project', p)} onDelete={(id) => handleDelete('project', id)} />;
      case 'clients':
        return <ClientList clients={clients} onAdd={() => handleAddClick('client')} onEdit={(c) => handleEditClick('client', c)} onDelete={(id) => handleDelete('client', id)} />;
      case 'tasks':
        return <TaskList tasks={tasks} onAdd={() => handleAddClick('task')} onToggle={handleToggleTask} onEdit={(t) => handleEditClick('task', t)} onDelete={(id) => handleDelete('task', id)} />;
      case 'invoices':
        return <InvoiceList invoices={invoices} onAdd={() => handleAddClick('invoice')} onEdit={(i) => handleEditClick('invoice', i)} onDelete={(id) => handleDelete('invoice', id)} />;
      case 'settings':
        return <Settings profile={profile} onUpdate={handleUpdateProfile} />;
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-[#F8FAFC] font-sans selection:bg-[#22D3EE]/30">
      {isAuthenticated && (
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          onLogout={handleLogout}
          profile={profile}
        />
      )}
      
      <main className={`flex-1 overflow-y-auto w-full ${isAuthenticated ? 'p-8 max-w-7xl mx-auto' : ''}`}>
        {renderView()}
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? `Edit ${modalType}` : `Add New ${modalType}`}
      >
        <form onSubmit={handleSave} className="space-y-4">
          {modalType === 'project' && (
            <>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Project Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name || ''} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F8FAFC] focus:border-[#22D3EE] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Client</label>
                <select 
                  required
                  value={formData.clientId || ''} 
                  onChange={e => setFormData({...formData, clientId: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F8FAFC] focus:border-[#22D3EE] outline-none"
                >
                  <option value="" disabled>Select a client</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {clients.length === 0 && (
                  <p className="text-xs text-amber-400 mt-1">Please create a client first.</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Deadline</label>
                <input 
                  type="date" 
                  value={formData.deadline || ''} 
                  onChange={e => setFormData({...formData, deadline: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F8FAFC] focus:border-[#22D3EE] outline-none"
                />
              </div>
            </>
          )}

          {modalType === 'client' && (
            <>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Client Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name || ''} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F8FAFC] focus:border-[#22D3EE] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email || ''} 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F8FAFC] focus:border-[#22D3EE] outline-none"
                />
              </div>
            </>
          )}

          {modalType === 'task' && (
            <>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Task Title</label>
                <input 
                  required
                  type="text" 
                  value={formData.title || ''} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F8FAFC] focus:border-[#22D3EE] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Project (Optional)</label>
                <select 
                  value={formData.projectId || ''} 
                  onChange={e => setFormData({...formData, projectId: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F8FAFC] focus:border-[#22D3EE] outline-none"
                >
                  <option value="">None</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Due Date</label>
                <input 
                  type="date" 
                  value={formData.dueDate || ''} 
                  onChange={e => setFormData({...formData, dueDate: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F8FAFC] focus:border-[#22D3EE] outline-none"
                />
              </div>
            </>
          )}

          {modalType === 'invoice' && (
            <>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Invoice Title</label>
                <input 
                  required
                  type="text" 
                  value={formData.title || ''} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F8FAFC] focus:border-[#22D3EE] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Amount ($)</label>
                <input 
                  required
                  type="number" 
                  value={formData.amount || ''} 
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F8FAFC] focus:border-[#22D3EE] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Status</label>
                <select 
                  value={formData.status || 'Unpaid'} 
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F8FAFC] focus:border-[#22D3EE] outline-none"
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#94A3B8]">Date</label>
                <input 
                  type="date" 
                  value={formData.date || ''} 
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F8FAFC] focus:border-[#22D3EE] outline-none"
                />
              </div>
            </>
          )}

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-2 bg-[#1E293B] text-[#F8FAFC] font-semibold rounded-lg hover:bg-[#1E293B]/80 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-2 bg-[#22D3EE] text-[#020617] font-semibold rounded-lg hover:bg-[#22D3EE]/90 transition-colors"
            >
              {editingItem ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
