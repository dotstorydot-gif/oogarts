import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Activity,
    Microscope,
    TestTube,
    FlaskConical,
    ClipboardCheck,
    Plus,
    Download,
    ArrowUpRight,
    ShieldAlert,
    X,
    ChevronRight,
    User,
    Syringe
} from 'lucide-react';

const Laboratory = () => {
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [activeTests] = useState([
        { name: 'Full Blood Count', id: 'LAB-0842', status: 'In Analysis', priority: 'High', tech: 'Dr. Sarah K.' },
        { name: 'Lipid Profile', id: 'LAB-0911', status: 'Pending Review', priority: 'Routine', tech: 'Dr. Mike R.' },
        { name: 'Blood Glucose', id: 'LAB-1022', status: 'Completed', priority: 'Critical', tech: 'Dr. Anna L.' },
        { name: 'Thyroid Panel', id: 'LAB-1045', status: 'In Analysis', priority: 'Routine', tech: 'Dr. Sarah K.' },
    ]);

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto text-left">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Microscope className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Clinical Diagnostics</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 font-sans">Laboratory OS</h1>
                        <p className="text-slate-500 font-medium">Real-time specimen tracking, automated pathology results, and equipment monitoring.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Log
                        </Button>
                        <Button variant="dark" className="gap-2 px-8 active:scale-95" onClick={() => setShowOrderForm(true)}>
                            <Plus className="w-5 h-5" />
                            New Test Order
                        </Button>
                    </div>
                </div>

                {showOrderForm && (
                    <Card className="mb-12 p-10 animate-in fade-in slide-in-from-top-4 duration-500 bg-white/80 backdrop-blur-xl border-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6">
                            <button onClick={() => setShowOrderForm(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mb-10 text-left">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Technical Request</h2>
                            <p className="text-slate-500 font-medium">Initialize diagnostic specimen analysis protocol.</p>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Test Order Placed!'); setShowOrderForm(false); }} className="grid grid-cols-2 gap-8 text-left">
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Patient Identity</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                    <input type="text" placeholder="Search patient..." className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-2xl font-bold outline-none transition-all" required />
                                </div>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Analysis Type</label>
                                <div className="relative">
                                    <Syringe className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                    <select className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-2xl font-bold outline-none transition-all appearance-none">
                                        <option>Full Blood Count</option>
                                        <option>Lipid Profile</option>
                                        <option>Blood Glucose</option>
                                        <option>Thyroid Panel</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <Button type="submit" className="w-full h-16 rounded-[24px] bg-indigo-600 hover:bg-indigo-700 text-white font-black flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 group">
                                    <span>Execute Laboratory Protocol</span>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Active Tests', value: '42', icon: TestTube, color: 'bg-indigo-600' },
                        { label: 'Pending Review', value: '18', icon: ClipboardCheck, color: 'bg-emerald-500' },
                        { label: 'Critical Results', value: '03', icon: ShieldAlert, color: 'bg-rose-500' },
                        { label: 'Avail. Equipment', value: '94%', icon: FlaskConical, color: 'bg-sky-500' },
                    ].map((stat) => (
                        <Card key={stat.label} variant="flat" className="p-6 lg:p-8 group hover:translate-y-[-4px] transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200", stat.color)}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    <div className="col-span-1 lg:col-span-8">
                        <Card className="p-0 overflow-hidden border-slate-100">
                            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                                <h3 className="font-black text-slate-900 text-lg tracking-tight">Active Specimens</h3>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-black uppercase text-indigo-600">All Labs</span>
                                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase text-slate-400">Genetics</span>
                                </div>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {activeTests.map((test) => (
                                    <div key={test.id} className="p-8 hover:bg-slate-50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between group gap-6 lg:gap-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                                            <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shadow-sm">
                                                <FlaskConical className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 text-[15px] tracking-tight">{test.name}</h4>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ID: {test.id} • Assigned: {test.tech}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-12">
                                            <div className="text-left sm:text-right">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                                <p className={cn(
                                                    "text-xs font-black uppercase",
                                                    test.status === 'Completed' ? 'text-emerald-500' : 'text-indigo-600'
                                                )}>{test.status}</p>
                                            </div>
                                            <div className="w-24 text-left sm:text-right">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                    test.priority === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                                                )}>
                                                    {test.priority}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="col-span-1 lg:col-span-4">
                        <Card className="p-10 bg-indigo-50 border-indigo-100/50 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col items-center text-center py-10">
                                <div className="w-24 h-24 bg-white rounded-[40px] shadow-2xl shadow-indigo-200/50 flex items-center justify-center mb-10 group cursor-pointer hover:scale-105 transition-transform duration-500">
                                    <Activity className="w-10 h-10 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Machine Intelligence</h3>
                                <p className="text-sm font-medium text-slate-500 max-w-[240px] leading-relaxed mb-10">Real-time automation active. Connecting to digital centrifuge and PCR arrays.</p>
                                <div className="flex gap-4 w-full">
                                    <div className="flex-1 p-5 bg-white rounded-3xl border border-indigo-100/50 text-center shadow-sm">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Sync</p>
                                        <p className="text-lg font-black text-indigo-600">99.8%</p>
                                    </div>
                                    <div className="flex-1 p-5 bg-white rounded-3xl border border-indigo-100/50 text-center shadow-sm">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Error</p>
                                        <p className="text-lg font-black text-rose-500">0.01%</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Laboratory;
