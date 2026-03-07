import { Layout } from '../components/layout/Layout';
import { Card } from '../components/layout/BaseUI';
import { CreditCard, ArrowUpRight, ArrowDownLeft, DollarSign } from 'lucide-react';

const Payments = () => {
    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Payments & Billing</h1>
                    <p className="text-slate-500">Manage invoices, claims, and revenue tracking.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <Card className="bg-emerald-50 border-emerald-100">
                        <div className="flex items-center gap-4 text-emerald-600 mb-4">
                            <DollarSign className="w-5 h-5" />
                            <span className="font-bold uppercase text-[11px] tracking-widest">Total Revenue</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900">$12,840.00</h2>
                        <div className="flex items-center gap-1 mt-2 text-emerald-600 font-bold text-xs">
                            <ArrowUpRight className="w-3 h-3" />
                            <span>+12.5% this week</span>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4 text-slate-400 mb-4">
                            <CreditCard className="w-5 h-5" />
                            <span className="font-bold uppercase text-[11px] tracking-widest">Pending Claims</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900">42</h2>
                        <p className="text-slate-500 text-xs mt-2">Awaiting insurance approval</p>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4 text-rose-500 mb-4">
                            <ArrowDownLeft className="w-5 h-5" />
                            <span className="font-bold uppercase text-[11px] tracking-widest">Outstanding</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900">$2,450.00</h2>
                        <p className="text-rose-500 text-xs font-bold mt-2">Due this month</p>
                    </Card>
                </div>

                <Card className="p-12 text-center text-slate-400">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <CreditCard className="w-8 h-8 text-slate-200" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No Recent Transactions</h3>
                    <p className="max-w-xs mx-auto text-sm">Once billing is processed for patients, you'll see the transaction history here.</p>
                </Card>
            </div>
        </Layout>
    );
};

export default Payments;
