import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Search,
    ShieldCheck,
    FileText,
    History,
    DollarSign,
    Clock,
    UserCircle2
} from 'lucide-react';

const Payments = () => {
    const claims = [
        { name: 'Metformin 500mg', type: 'prescription', status: 'approved', total: 45, covered: 36, patient: 34, date: '2024-01-15' },
        { name: 'Lisinopril 10mg', type: 'prescription', status: 'approved', total: 32, covered: 25.6, patient: 31.4, date: '2024-01-15' },
        { name: 'Comprehensive Metabolic Panel', type: 'lab-test', status: 'processing', total: 85, covered: 68, patient: 42, date: '2024-01-20' },
        { name: 'HbA1c', type: 'lab-test', status: 'pending', total: 65, covered: 52, patient: 38, date: '2024-01-20' },
    ];

    return (
        <Layout>
            <div className="max-w-[1600px] text-left">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Insurance & Billing</h1>
                        <p className="text-slate-500 font-medium">Claims processing and insurance verification</p>
                    </div>
                </div>

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
                    <div className="col-span-4 space-y-8">
                        <Card className="p-10">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="font-black text-slate-900 text-xl tracking-tight">Insurance Info</h3>
                                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    Verified
                                </span>
                            </div>

                            <div className="space-y-8">
                                <div className="p-8 rounded-[32px] bg-slate-50/80 border border-slate-100 space-y-6">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Provider</p>
                                        <p className="text-base font-black text-slate-900 tracking-tight">Blue Cross Blue Shield</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Policy No.</p>
                                            <p className="text-[13px] font-black text-slate-900 truncate tracking-tight">BCBS123456789</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Group ID</p>
                                            <p className="text-[13px] font-black text-slate-900 tracking-tight">GRP001</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 rounded-[24px] bg-indigo-50/50 border border-indigo-100/50">
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Coverage</p>
                                        <p className="text-2xl font-black text-indigo-600 tracking-tighter">80%</p>
                                    </div>
                                    <div className="p-6 rounded-[24px] bg-slate-50 border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Copay</p>
                                        <p className="text-2xl font-black text-slate-900 tracking-tighter">$25</p>
                                    </div>
                                </div>
                            </div>

                            <Button variant="dark" className="w-full mt-12 py-5 shadow-2xl shadow-slate-200">
                                Re-verify Insurance
                            </Button>
                        </Card>

                        <Card className="bg-indigo-600 text-white border-0 shadow-2xl shadow-indigo-100/50 relative overflow-hidden p-12">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl animate-pulse" />
                            <h3 className="font-black text-xl mb-10 flex items-center gap-3 relative z-10">
                                <DollarSign className="w-6 h-6 text-indigo-300" />
                                Financial Summary
                            </h3>
                            <div className="space-y-6 relative z-10">
                                {[
                                    { label: 'Total Submitted', value: '$227.00' },
                                    { label: 'Insurance Covered', value: '$181.60' },
                                    { label: 'Patient Responsibility', value: '$145.40' },
                                    { label: 'Outstanding Balance', value: '$65.40', accent: true },
                                ].map((item) => (
                                    <div key={item.label} className={cn(
                                        "flex justify-between items-center",
                                        item.accent ? "pt-8 border-t border-white/10 mt-6" : ""
                                    )}>
                                        <span className="text-[13px] font-black uppercase tracking-widest text-indigo-200/80">{item.label}</span>
                                        <span className={cn(
                                            "font-black tracking-tight",
                                            item.accent ? "text-3xl text-emerald-400" : "text-lg text-white"
                                        )}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="col-span-8 space-y-8">
                        <div className="flex items-center justify-between px-4 mb-2">
                            <div>
                                <h3 className="font-black text-slate-900 text-2xl tracking-tighter">Claims History</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Transaction logs & audit</p>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <History size={16} />
                                <span>Export Audit</span>
                            </Button>
                        </div>

                        <div className="space-y-6">
                            {claims.map((claim, idx) => (
                                <Card key={idx} className="p-0 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 border-slate-100 group">
                                    <div className="flex items-center gap-8 p-10">
                                        <div className={cn(
                                            "w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-500",
                                            claim.type === 'prescription' ? "bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100/50" : "bg-sky-50 text-sky-600 shadow-lg shadow-sky-100/50"
                                        )}>
                                            {claim.type === 'prescription' ? <ShieldCheck className="w-8 h-8" /> : <FileText className="w-8 h-8" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-black text-slate-900 text-lg tracking-tight truncate pr-4">{claim.name}</h4>
                                                <span className={cn(
                                                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                                    claim.status === 'approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                        claim.status === 'processing' ? "bg-sky-50 text-sky-600 border-sky-100" :
                                                            "bg-amber-50 text-amber-600 border-amber-100"
                                                )}>
                                                    {claim.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <span className="text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded-lg">{claim.type}</span>
                                                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                                <span className="flex items-center gap-1.5">
                                                    <Clock size={12} className="text-slate-300" />
                                                    {claim.date}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right border-l-2 border-slate-50 pl-12 ml-6">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Patient Owes</p>
                                            <p className="text-2xl font-black text-slate-900 tracking-tighter">${claim.patient}</p>
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
