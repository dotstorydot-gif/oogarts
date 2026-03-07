import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Search,
    ShieldCheck,
    ShieldAlert,
    FileText,
    History,
    DollarSign,
    CheckCircle2,
    Clock,
    UserCircle2
} from 'lucide-react';

const Payments = () => {
    const [view, setView] = useState('billing'); // 'billing' or 'search'

    const claims = [
        { name: 'Metformin 500mg', type: 'prescription', status: 'approved', total: 45, covered: 36, patient: 34, date: '2024-01-15' },
        { name: 'Lisinopril 10mg', type: 'prescription', status: 'approved', total: 32, covered: 25.6, patient: 31.4, date: '2024-01-15' },
        { name: 'Comprehensive Metabolic Panel', type: 'lab-test', status: 'processing', total: 85, covered: 68, patient: 42, date: '2024-01-20' },
        { name: 'HbA1c', type: 'lab-test', status: 'pending', total: 65, covered: 52, patient: 38, date: '2024-01-20' },
    ];

    return (
        <Layout>
            <div className="max-w-[1240px] mx-auto text-left">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Insurance & Billing</h1>
                        <p className="text-slate-500 font-medium">Claims processing and insurance verification</p>
                    </div>
                </div>

                {/* Patient Search */}
                <Card className="mb-10 bg-indigo-50 border-indigo-100/50">
                    <div className="flex items-center gap-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
                            <input
                                type="text"
                                placeholder="Search Patient by name, phone or ID..."
                                className="w-full bg-white border-none rounded-[32px] pl-16 pr-8 py-5 text-lg font-medium focus:ring-4 focus:ring-indigo-200/50 transition-all outline-none shadow-xl shadow-indigo-100/20"
                            />
                        </div>
                        <div className="flex items-center gap-3 px-8 border-l border-indigo-200">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                                <UserCircle2 className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900">John Smith</p>
                                <p className="text-[11px] font-bold text-indigo-600">+1-555-0123</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-12 gap-10">
                    {/* Left: Verification & Details */}
                    <div className="col-span-4 space-y-8">
                        <Card>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-black text-slate-900 text-lg">Insurance Info</h3>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    Verified
                                </span>
                            </div>

                            <div className="space-y-6">
                                <div className="p-5 rounded-[24px] bg-slate-50 space-y-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Provider</p>
                                        <p className="text-sm font-bold text-slate-900">Blue Cross Blue Shield</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Policy Number</p>
                                            <p className="text-xs font-black text-slate-900 truncate">BCBS123456789</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Group Number</p>
                                            <p className="text-xs font-black text-slate-900">GRP001</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                                        <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Coverage</p>
                                        <p className="text-xl font-black text-indigo-600">80%</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Copay</p>
                                        <p className="text-xl font-black text-slate-900">$25</p>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full mt-10 p-4 rounded-2xl bg-slate-900 font-bold text-sm tracking-tight hover:bg-slate-800 transition-colors">
                                Re-verify Insurance
                            </Button>
                        </Card>

                        <Card className="bg-indigo-600 text-white border-0">
                            <h3 className="font-black text-lg mb-6 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-indigo-200" />
                                Financial Summary
                            </h3>
                            <div className="space-y-4 font-medium opacity-90">
                                {[
                                    { label: 'Total Submitted', value: '$227.00', bold: true },
                                    { label: 'Insurance Covered', value: '$181.60' },
                                    { label: 'Patient Responsibility', value: '$145.40' },
                                    { label: 'Outstanding Balance', value: '$65.40', accent: true },
                                ].map((item) => (
                                    <div key={item.label} className={cn(
                                        "flex justify-between items-center text-sm",
                                        item.accent && "pt-4 border-t border-white/20 mt-4 text-emerald-400 font-black text-lg opacity-100"
                                    )}>
                                        <span className="text-indigo-100">{item.label}</span>
                                        <span>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right: Claims History */}
                    <div className="col-span-8 flex flex-col gap-6">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="font-black text-slate-900 text-xl tracking-tight">Claims History</h3>
                            <button className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest px-4 py-2 hover:bg-indigo-50 rounded-xl transition-all">
                                <History className="w-4 h-4" />
                                View All
                            </button>
                        </div>

                        <div className="space-y-4">
                            {claims.map((claim, idx) => (
                                <Card key={idx} className="hover:scale-[1.01] transition-transform cursor-pointer overflow-hidden relative">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                                            claim.type === 'prescription' ? "bg-indigo-50 text-indigo-600" : "bg-sky-50 text-sky-600"
                                        )}>
                                            {claim.type === 'prescription' ? <ShieldCheck className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <h4 className="font-bold text-slate-900 truncate pr-4">{claim.name}</h4>
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                    claim.status === 'approved' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                                        claim.status === 'processing' ? "bg-sky-50 text-sky-600 border border-sky-100" :
                                                            "bg-amber-50 text-amber-600 border border-amber-100"
                                                )}>
                                                    {claim.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                <span>{claim.type}</span>
                                                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {claim.date}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right border-l border-slate-100 pl-8 ml-4">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Patient Owes</p>
                                            <p className="text-lg font-black text-slate-900">${claim.patient}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Payments;
