import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    DollarSign,
    FileText,
    Plus,
    ShieldCheck,
    MoreVertical,
    Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Payments = () => {
    const [activeTab, setActiveTab] = useState('Revenue');
    const [isLoading, setIsLoading] = useState(true);
    const [bills, setBills] = useState<any[]>([]);
    const [claims, setClaims] = useState<any[]>([]);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        pendingClaims: 0,
        overduePayments: 0
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data: billsData } = await supabase.from('bills').select('*, patients(name)').order('created_at', { ascending: false });
            const { data: claimsData } = await supabase.from('claims').select('*, patients(name)').order('submission_date', { ascending: false });
            
            setBills(billsData || []);
            setClaims(claimsData || []);

            // Calculate Stats
            const revenue = (billsData || []).reduce((acc: number, b: any) => b.status === 'Paid' ? acc + Number(b.amount) : acc, 0);
            const pending = (claimsData || []).filter((c: any) => c.status === 'Pending').length;
            const overdue = (billsData || []).filter((b: any) => b.status === 'Overdue').length;

            setStats({
                totalRevenue: revenue,
                pendingClaims: pending,
                overduePayments: overdue
            });
        } catch (error) {
            console.error("Error fetching payment data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            <div className="max-w-[1600px] text-left">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Financial Management</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Billing & Claims</h1>
                        <p className="text-slate-500 font-medium">Real-time revenue tracking, insurance claim processing, and patient billing.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="gap-2" onClick={fetchData}>
                            <Loader2 size={16} className={isLoading ? 'animate-spin' : ''} />
                            Refresh
                        </Button>
                        <Button variant="dark" className="gap-2 px-8 active:scale-95">
                            <Plus className="w-5 h-5" />
                            New Invoice
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <Card className="p-8 bg-slate-900 text-white relative overflow-hidden">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Total Revenue (MTD)</p>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-4xl font-black">${stats.totalRevenue.toLocaleString()}</h2>
                            <span className="text-emerald-400 text-sm font-bold">+12.5%</span>
                        </div>
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    </Card>
                    <Card className="p-8 border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Pending Claims</p>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-4xl font-black text-slate-900">{stats.pendingClaims}</h2>
                            <span className="text-slate-400 text-sm font-bold italic">Requests</span>
                        </div>
                    </Card>
                    <Card className="p-8 border-rose-100 bg-rose-50/20">
                        <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-4">Overdue Payments</p>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-4xl font-black text-rose-600">{stats.overduePayments}</h2>
                            <span className="text-rose-400 text-sm font-bold italic">Actions Required</span>
                        </div>
                    </Card>
                </div>

                <div className="flex items-center gap-8 mb-8 border-b border-slate-100">
                    {['Revenue', 'Insurance Claims', 'Refunds', 'Audit Logs'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "pb-4 text-xs font-black uppercase tracking-widest transition-all relative",
                                activeTab === tab ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full" />}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold italic">Processing financial records...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activeTab === 'Revenue' ? (
                            bills.map((bill) => (
                                <Card key={bill.id} className="p-6 hover:shadow-xl transition-all duration-300 group border-slate-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                <FileText size={24} />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-black text-slate-900 text-lg">{bill.patients?.name || 'Unknown Patient'}</h3>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className="text-xs font-bold text-slate-400 italic">Invoice #{bill.id}</span>
                                                    <span className="text-xs font-bold text-slate-400">• {new Date(bill.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <p className="text-lg font-black text-slate-900">${Number(bill.amount).toLocaleString()}</p>
                                                <div className={cn(
                                                    "text-[10px] font-black uppercase tracking-widest text-right mt-1",
                                                    bill.status === 'Paid' ? "text-emerald-500" : 
                                                    bill.status === 'Overdue' ? "text-rose-500" : "text-amber-500"
                                                )}>
                                                    {bill.status}
                                                </div>
                                            </div>
                                            <Button variant="ghost" className="p-2 rounded-xl text-slate-300">
                                                <MoreVertical size={20} />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            claims.map((claim) => (
                                <Card key={claim.id} className="p-6 hover:shadow-xl transition-all duration-300 group border-slate-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                <ShieldCheck size={24} />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-black text-slate-900 text-lg">{claim.patients?.name || 'Unknown Patient'}</h3>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className="text-xs font-bold text-indigo-600 font-mono tracking-tighter uppercase">{claim.insurance_provider}</span>
                                                    <span className="text-xs font-bold text-slate-400 italic">• {claim.submission_date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <p className="text-lg font-black text-slate-900">${Number(claim.amount).toLocaleString()}</p>
                                                <div className={cn(
                                                    "text-[10px] font-black uppercase tracking-widest text-right mt-1",
                                                    claim.status === 'Approved' ? "text-emerald-500" : 
                                                    claim.status === 'Rejected' ? "text-rose-500" : "text-indigo-500"
                                                )}>
                                                    {claim.status}
                                                </div>
                                            </div>
                                            <Button variant="ghost" className="p-2 rounded-xl text-slate-300">
                                                <MoreVertical size={20} />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Payments;
