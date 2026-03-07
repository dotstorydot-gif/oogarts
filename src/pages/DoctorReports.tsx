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
    CircleDot
} from 'lucide-react';

const DoctorReports = () => {
    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
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
                        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-0 text-white p-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-white/10 rounded-2xl"><Users className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Queue #: 42</p>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-black">John Smith</h2>
                                        <span className="px-2 py-0.5 bg-emerald-500 text-[10px] font-black uppercase rounded-full">In Progress</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400 font-medium">Age / Gender</span>
                                    <span className="font-bold">41 years, Male</span>
                                </div>
                                <div className="pt-4 border-t border-white/10">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Chief Complaint</p>
                                    <p className="text-sm font-medium leading-relaxed">Chest pain and shortness of breath</p>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-indigo-600" />
                                <span>Vital Signs</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Temp', value: '98.6°F', icon: Thermometer, color: 'text-rose-500 bg-rose-50' },
                                    { label: 'BP', value: '140/90', icon: Heart, color: 'text-indigo-500 bg-indigo-50' },
                                    { label: 'Pulse', value: '85', icon: Activity, color: 'text-emerald-500 bg-emerald-50' },
                                    { label: 'O2 Sat', value: '98%', icon: Droplet, color: 'text-sky-500 bg-sky-50' },
                                ].map((v) => (
                                    <div key={v.label} className="p-4 rounded-3xl bg-slate-50 border border-slate-100/50">
                                        <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center mb-3", v.color)}>
                                            <v.icon className="w-4 h-4" />
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{v.label}</p>
                                        <p className="text-lg font-black text-slate-900">{v.value}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                                <ClipboardList className="w-5 h-5 text-indigo-600" />
                                <span>Background</span>
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Medical History</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">Hypertension</span>
                                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">Type 2 Diabetes</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-2">Allergies</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold">Penicillin</span>
                                        <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold">Shellfish</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Medical Report Modules */}
                    <div className="col-span-8 space-y-6">
                        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit mb-4">
                            {['Examination', 'Diagnosis', 'Treatment', 'Orders'].map((tab) => (
                                <button key={tab} className={cn(
                                    "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                                    tab === 'Examination' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                )}>
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <Card className="p-10 space-y-10">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <Stethoscope className="w-6 h-6 text-indigo-600" />
                                    <span>Clinical Examination</span>
                                </h3>
                                <textarea
                                    className="w-full bg-slate-50 border-none rounded-[32px] p-8 min-h-[200px] text-lg font-medium text-slate-900 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                                    placeholder="Enter physical examination details..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-slate-100">
                                <div>
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Diagnosis</h4>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-900"
                                        placeholder="Add ICD-10 code or description"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Lab Orders</h4>
                                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <CircleDot className="w-4 h-4 text-indigo-600" />
                                            <span className="text-sm font-bold text-indigo-900">Comprehensive Metabolic Panel</span>
                                        </div>
                                        <Button variant="ghost" className="h-8 p-1 text-slate-400">Add</Button>
                                    </div>
                                </div>
                            </div>
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
