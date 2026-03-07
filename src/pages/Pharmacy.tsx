import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Package,
    Search,
    Filter,
    Plus,
    Download,
    TrendingUp,
    AlertCircle,
    Activity,
    Clock,
    ChevronRight
} from 'lucide-react';

const Pharmacy = () => {
    const categories = [
        { name: 'Antibiotics', items: 124, status: 'Stable', color: 'bg-indigo-50 text-indigo-600' },
        { name: 'Pain Relief', items: 85, status: 'Low Stock', color: 'bg-rose-50 text-rose-600' },
        { name: 'Cardiology', items: 42, status: 'Stable', color: 'bg-emerald-50 text-emerald-600' },
        { name: 'Vaccines', items: 156, status: 'Restocking', color: 'bg-sky-50 text-sky-600' },
    ];

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto text-left">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Package className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Medical Supplies</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Pharmacy Command</h1>
                        <p className="text-slate-500 font-medium">Global medication dispensing, inventory tracking, and warehouse management.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Report
                        </Button>
                        <Button variant="dark" className="gap-2 px-8">
                            <Plus className="w-5 h-5" />
                            New Entry
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {categories.map((cat) => (
                        <Card key={cat.name} className="p-6 lg:p-8 group hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 border-slate-100">
                            <div className="flex items-center justify-between mb-6">
                                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", cat.color)}>
                                    <Package className="w-6 h-6" />
                                </div>
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{cat.name}</p>
                            <div className="flex items-end justify-between">
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{cat.items}</h3>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">{cat.status}</span>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    <div className="col-span-1 lg:col-span-8 space-y-8">
                        <Card className="p-6 bg-indigo-50 border-indigo-100/50">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="relative flex-1 group w-full">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 w-5 h-5 transition-colors" />
                                    <input
                                        placeholder="Search by NDC, brand name, generic or batch code..."
                                        className="w-full h-14 pl-16 bg-white border-2 border-transparent focus:border-indigo-100 rounded-2xl font-bold text-sm outline-none transition-all shadow-sm"
                                    />
                                </div>
                                <Button variant="outline" className="h-14 w-full sm:w-auto px-8 rounded-2xl gap-2 border-slate-200">
                                    <Filter className="w-5 h-5" />
                                    Filter
                                </Button>
                            </div>
                        </Card>

                        <Card className="min-h-[400px] lg:min-h-[500px] flex flex-col items-center justify-center text-center p-8 lg:p-20 bg-white/40 border-slate-100/50">
                            <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mb-8 animate-pulse">
                                <Activity className="w-10 h-10 text-slate-200" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3">Initializing Pharma Core</h3>
                            <p className="text-slate-500 font-medium max-w-sm mb-10">Synchronizing global medication database. Please ensure secure credentials are active.</p>
                            <Button variant="ghost" className="gap-2 font-black text-indigo-600">
                                <Clock className="w-4 h-4" />
                                View Recent Dispensing
                            </Button>
                        </Card>
                    </div>

                    <div className="col-span-1 lg:col-span-4 space-y-8">
                        <Card className="p-6 lg:p-10 bg-slate-900 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                <AlertCircle className="w-6 h-6 text-indigo-400" />
                                Critical Alerts
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { item: 'Amoxicillin 500mg', issue: 'Expiring in 3 days', priority: 'High' },
                                    { item: 'Insulin Glargine', issue: 'Cold chain warning', priority: 'Critical' },
                                    { item: 'Paracetamol Syrup', issue: 'Stock < 10 units', priority: 'Medium' },
                                ].map((alert, i) => (
                                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                        <div className={cn(
                                            "w-1.5 h-1.5 rounded-full mt-2 shrink-0",
                                            alert.priority === 'Critical' ? 'bg-rose-500 animate-pulse' : 'bg-amber-400'
                                        )} />
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{alert.item}</p>
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">{alert.issue}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6 lg:p-10 border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-8">External Connections</h3>
                            <div className="space-y-4">
                                <Button variant="outline" className="w-full justify-between h-14 px-6 border-slate-100 hover:bg-slate-50">
                                    <span className="text-sm font-bold text-slate-600">WHO Database</span>
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                </Button>
                                <Button variant="outline" className="w-full justify-between h-14 px-6 border-slate-100 hover:bg-slate-50">
                                    <span className="text-sm font-bold text-slate-600">Local Suppliers</span>
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                </Button>
                                <Button variant="outline" className="w-full justify-between h-14 px-6 border-slate-100 hover:bg-slate-50">
                                    <span className="text-sm font-bold text-slate-600">Regulatory Filings</span>
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Pharmacy;
