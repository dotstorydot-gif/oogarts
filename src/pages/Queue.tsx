import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Users,
    Clock,
    Play,
    CheckCircle2,
    AlertCircle,
    MoreVertical,
    Plus
} from 'lucide-react';

const Queue = () => {
    const [activeTab, setActiveTab] = useState('active');

    const patients = [
        { id: 'Q-001', name: 'Sarah Ahmed', time: '09:00 AM', status: 'In Consultation', dept: 'General Medicine', type: 'Emergency' },
        { id: 'Q-002', name: 'James Wilson', time: '09:15 AM', status: 'Waiting', dept: 'Cardiology', type: 'Routine' },
        { id: 'Q-003', name: 'Maria Garcia', time: '09:30 AM', status: 'Waiting', dept: 'Pediatrics', type: 'Routine' },
        { id: 'Q-004', name: 'Robert Chen', time: '09:45 AM', status: 'Delayed', dept: 'Dermatology', type: 'Investigation' },
    ];

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Queue Management</h1>
                        <p className="text-slate-500 font-bold text-sm">Real-time patient flow and automated ticket status tracking.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="gap-2">
                            <span className="text-sm">Print All Tickets</span>
                        </Button>
                        <Button variant="dark" className="gap-2 shadow-2xl shadow-slate-200">
                            <Plus size={20} />
                            <span>Generate New Ticket</span>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-10">
                    {/* Main Queue List */}
                    <div className="col-span-8 space-y-8">
                        <div className="flex items-center gap-2 bg-slate-200/50 p-1.5 rounded-2xl w-fit">
                            {[
                                { id: 'active', label: 'Active Queue', count: 12 },
                                { id: 'completed', label: 'Completed', count: 45 }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300",
                                        activeTab === tab.id ? "bg-white text-indigo-600 shadow-xl shadow-slate-200" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    {tab.label} ({tab.count})
                                </button>
                            ))}
                        </div>

                        <Card className="p-0 overflow-hidden border-slate-100 shadow-2xl shadow-slate-100/50">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left font-sans border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Token ID</th>
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Name</th>
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Time</th>
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {patients.map((p) => (
                                            <tr key={p.id} className="hover:bg-indigo-50/30 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <span className="font-black text-slate-900 text-base tracking-tight">{p.id}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-sm group-hover:bg-white group-hover:shadow-md transition-all">
                                                            {p.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-slate-900 text-[15px] tracking-tight">{p.name}</p>
                                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{p.dept}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-sm font-bold text-slate-500">{p.time}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={cn(
                                                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                                        p.status === 'In Consultation' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                                                            p.status === 'Waiting' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                                                    )}>
                                                        {p.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                                        <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-xl"><Play size={18} /></Button>
                                                        <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-xl"><CheckCircle2 size={18} /></Button>
                                                        <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-xl"><MoreVertical size={18} /></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                    {/* Side Info */}
                    <div className="col-span-4 space-y-8">
                        <Card className="bg-indigo-600 border-0 relative overflow-hidden text-white shadow-2xl shadow-indigo-100/50 p-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
                            <div className="relative z-10">
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">Currently Serving</p>
                                <div className="space-y-2 mb-10">
                                    <h2 className="text-6xl font-black tracking-tighter">Q-001</h2>
                                    <p className="text-xl font-black text-indigo-100">{patients[0].name}</p>
                                </div>
                                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                        <span className="text-sm font-black uppercase tracking-widest text-white/90">Room 302</span>
                                    </div>
                                    <Button variant="glass" size="sm" className="font-black text-[10px] border-white/20">NEXT PATIENT</Button>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-slate-400" />
                                </div>
                                <h3 className="font-black text-slate-900 tracking-tight">Queue Insights</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"><Clock className="w-5 h-5" /></div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 tracking-tight">Avg. Wait Time</p>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Global average</p>
                                        </div>
                                    </div>
                                    <span className="text-lg font-black text-slate-900">12m</span>
                                </div>
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"><Users className="w-5 h-5" /></div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 tracking-tight">Patients Waiting</p>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">In registry</p>
                                        </div>
                                    </div>
                                    <span className="text-lg font-black text-slate-900">08</span>
                                </div>
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors"><AlertCircle className="w-5 h-5" /></div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 tracking-tight">Critical Case</p>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Immediate priority</p>
                                        </div>
                                    </div>
                                    <span className="text-lg font-black text-rose-500">01</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Queue;
