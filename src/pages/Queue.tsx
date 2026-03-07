import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Users,
    Clock,
    Play,
    CheckCircle2,
    AlertCircle,
    MoreVertical
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
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Queue Management</h1>
                        <p className="text-slate-500">Real-time patient flow and ticket status.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm">Print All Tickets</Button>
                        <Button size="sm">Generate New Ticket</Button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Main Queue List */}
                    <div className="col-span-8 space-y-6">
                        <div className="flex items-center gap-4 bg-slate-100 p-1.5 rounded-2xl w-fit mb-6">
                            <button
                                onClick={() => setActiveTab('active')}
                                className={cn(
                                    "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                                    activeTab === 'active' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
                                )}
                            >
                                Active Queue (12)
                            </button>
                            <button
                                onClick={() => setActiveTab('completed')}
                                className={cn(
                                    "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                                    activeTab === 'completed' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
                                )}
                            >
                                Completed (45)
                            </button>
                        </div>

                        <Card className="p-0 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left font-sans">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Token ID</th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Patient Name</th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Time</th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {patients.map((p) => (
                                            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <span className="font-bold text-slate-900">{p.id}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                                            {p.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                                                            <p className="text-[10px] text-slate-500 font-medium">{p.dept}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-medium text-slate-600">{p.time}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={cn(
                                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                                                        p.status === 'In Consultation' ? "bg-indigo-50 text-indigo-600" :
                                                            p.status === 'Waiting' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                                    )}>
                                                        {p.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="ghost" className="w-8 h-8 p-0 min-h-0"><Play className="w-4 h-4" /></Button>
                                                        <Button variant="ghost" className="w-8 h-8 p-0 min-h-0"><CheckCircle2 className="w-4 h-4" /></Button>
                                                        <Button variant="ghost" className="w-8 h-8 p-0 min-h-0"><MoreVertical className="w-4 h-4" /></Button>
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
                        <Card className="bg-indigo-600 border-0 relative overflow-hidden text-white">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                            <div className="relative z-10">
                                <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2">Currently Serving</p>
                                <h2 className="text-4xl font-black mb-1">Q-001</h2>
                                <p className="text-lg font-bold">Sarah Ahmed</p>
                                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        <span className="text-sm font-medium">Room 302</span>
                                    </div>
                                    <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">Next Patient</Button>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h3 className="font-bold text-slate-900 mb-6">Queue Insights</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-50 rounded-xl text-slate-400"><Clock className="w-5 h-5" /></div>
                                        <span className="text-sm font-medium text-slate-600">Avg. Wait Time</span>
                                    </div>
                                    <span className="font-bold text-slate-900">12 min</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-50 rounded-xl text-slate-400"><Users className="w-5 h-5" /></div>
                                        <span className="text-sm font-medium text-slate-600">Patients Waiting</span>
                                    </div>
                                    <span className="font-bold text-slate-900">08</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-50 rounded-xl text-slate-400"><AlertCircle className="w-5 h-5" /></div>
                                        <span className="text-sm font-medium text-slate-600">Emergency Case</span>
                                    </div>
                                    <span className="font-bold text-rose-500">01</span>
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
