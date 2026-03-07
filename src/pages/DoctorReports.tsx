import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Users,
    ClipboardList,
    Stethoscope,
    Activity,
    Heart,
    Thermometer,
    Droplet,
    Save,
    Printer,
    Send,
    CircleDot,
    FileText,
    Pill,
    Plus,
    Search
} from 'lucide-react';

const DoctorReports = () => {
    const [activeTab, setActiveTab] = useState('Examination');

    const tabs = ['Examination', 'Diagnosis', 'Treatment', 'Orders'];

    return (
        <Layout>
            <div className="max-w-[1600px] text-left">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Doctor Interface</h1>
                        <p className="text-slate-500 font-medium">Patient consultation and medical reporting system</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 rounded-xl">
                            <Save className="w-4 h-4" />
                            <span>Save Draft</span>
                        </Button>
                        <Button className="gap-2 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-100">
                            <Send className="w-4 h-4" />
                            <span>Submit Report</span>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Left Column: Patient Profile & Vitals */}
                    <div className="col-span-4 space-y-8">
                        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-0 text-white shadow-2xl shadow-slate-200">
                            <div className="flex items-center gap-5 mb-10">
                                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                                    <Users className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1.5">Queue Status: Priority</p>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-2xl font-black tracking-tight">John Smith</h2>
                                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-500/20">Active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <span className="text-slate-400 text-xs font-bold">Age / Gender</span>
                                    <span className="font-black text-sm text-indigo-300">41 yrs, Male</span>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Chief Complaint</p>
                                    <p className="text-sm font-bold leading-relaxed text-indigo-100">Patient reports sudden onset chest pain and severe shortness of breath during exertion.</p>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h3 className="font-black text-slate-900 tracking-tight">Vital Signs</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Temp', value: '98.6°F', icon: Thermometer, color: 'indigo' },
                                    { label: 'BP', value: '140/90', icon: Heart, color: 'rose' },
                                    { label: 'Pulse', value: '85', icon: Activity, color: 'emerald' },
                                    { label: 'O2 Sat', value: '98%', icon: Droplet, color: 'sky' },
                                ].map((v) => (
                                    <div key={v.label} className="p-5 rounded-[24px] bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group overflow-hidden relative">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                                            v.color === 'indigo' && "bg-indigo-50 text-indigo-600",
                                            v.color === 'rose' && "bg-rose-50 text-rose-600",
                                            v.color === 'emerald' && "bg-emerald-50 text-emerald-600",
                                            v.color === 'sky' && "bg-sky-50 text-sky-600"
                                        )}>
                                            <v.icon className="w-5 h-5" />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{v.label}</p>
                                        <p className="text-xl font-black text-slate-900 tracking-tighter">{v.value}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <ClipboardList className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h3 className="font-black text-slate-900 tracking-tight">Background</h3>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Medical History</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-black border border-slate-200/50">Hypertension</span>
                                        <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-black border border-slate-200/50">Type 2 Diabetes</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-4">Known Allergies</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-black border border-rose-100">Penicillin</span>
                                        <span className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-black border border-rose-100">Shellfish</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Medical Report Modules */}
                    <div className="col-span-8 space-y-6">
                        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit mb-4">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                                        activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <Card className="min-h-[600px] shadow-2xl shadow-indigo-50/20">
                            {activeTab === 'Examination' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                            <Stethoscope className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Examination</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Physical assessment & findings</p>
                                        </div>
                                    </div>
                                    <textarea
                                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-[32px] p-10 min-h-[400px] text-lg font-medium text-slate-700 focus:bg-white transition-all outline-none shadow-inner"
                                        placeholder="Begin typing clinical observations..."
                                    />
                                </div>
                            )}

                            {activeTab === 'Diagnosis' && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div>
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                                <FileText className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Diagnosis & ICD-10</h3>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clinical coding & impression</p>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[24px] border border-slate-100 focus-within:border-indigo-200 transition-colors">
                                                <Search className="w-5 h-5 text-slate-400" />
                                                <input
                                                    type="text"
                                                    className="flex-1 bg-transparent border-none p-0 font-bold text-lg text-slate-900 focus:ring-0 outline-none placeholder:text-slate-400"
                                                    placeholder="Search ICD-10 code (e.g. I10 for Hypertension)..."
                                                />
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-indigo-100">
                                                    I10 - Essential Hypertension
                                                    <CircleDot className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-8 border-t border-slate-100/50">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Doctor's Impression</h4>
                                        <textarea
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-[28px] p-8 min-h-[150px] font-medium text-slate-700 focus:bg-white transition-all outline-none shadow-inner"
                                            placeholder="Enter overall clinical impression..."
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Treatment' && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div>
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                                <Pill className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Treatment Plan</h3>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prescriptions & advice</p>
                                            </div>
                                        </div>
                                        <div className="p-12 rounded-[32px] bg-slate-50/50 border-2 border-slate-100 border-dashed flex flex-col items-center justify-center group hover:border-indigo-200 transition-all cursor-pointer">
                                            <div className="p-5 bg-white rounded-2xl shadow-xl shadow-slate-200 mb-6 group-hover:scale-110 transition-transform">
                                                <Plus className="w-8 h-8 text-indigo-600" />
                                            </div>
                                            <p className="text-slate-900 font-black text-lg mb-2">Issue New Prescription</p>
                                            <p className="text-slate-400 text-sm font-medium">Click to search medication inventory</p>
                                        </div>
                                    </div>
                                    <div className="pt-8 border-t border-slate-100/50">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Patient Instructions</h4>
                                        <textarea
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-[28px] p-8 min-h-[150px] font-medium text-slate-700 focus:bg-white transition-all outline-none shadow-inner"
                                            placeholder="Advice provided to the patient..."
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Orders' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                            <CircleDot className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Lab & Imaging</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Diagnostic requests</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            'Complete Blood Count',
                                            'Lipid Profile',
                                            'Chest X-Ray',
                                            'ECG/EKG'
                                        ].map((test) => (
                                            <div key={test} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:border-indigo-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer group">
                                                <span className="text-base font-black text-slate-700 tracking-tight">{test}</span>
                                                <Button variant="ghost" size="sm" className="hidden group-hover:flex">Add Order</Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>

                        <div className="flex justify-end gap-3 mt-8">
                            <Button variant="outline" className="gap-2 rounded-2xl px-10 border-slate-200">
                                <Printer className="w-5 h-5" />
                                <span>Print Report</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DoctorReports;
