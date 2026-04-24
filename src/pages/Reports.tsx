import { Layout } from '../components/layout/Layout';
import { Card, Button } from '../components/layout/BaseUI';
import { 
    FileText, 
    Download, 
    TrendingUp, 
    Users, 
    Activity, 
    ChevronRight, 
    Database, 
    PieChart, 
    BarChart3,
    History,
    Plus
} from 'lucide-react';

const Reports = () => {
    const reportCategories = [
        { 
            title: 'Patient Inflow', 
            icon: Users, 
            desc: 'Weekly analytics on patient registration, demographics, and visit volume.',
            color: 'bg-indigo-50 text-indigo-600',
            stats: '↑ 12% Growth'
        },
        { 
            title: 'Financial Health', 
            icon: TrendingUp, 
            desc: 'Detailed breakdown of income, billing efficiency, and insurance claims.',
            color: 'bg-emerald-50 text-emerald-600',
            stats: '$42.5k Revenue'
        },
        { 
            title: 'System Performance', 
            icon: Activity, 
            desc: 'Infrastructure health, database latency, and administrative audit logs.',
            color: 'bg-rose-50 text-rose-600',
            stats: '99.9% Uptime'
        },
    ];

    const recentReports = [
        { name: 'Annual_Clinical_Summary_2025.pdf', date: 'March 24, 2026', size: '4.2 MB', type: 'PDF' },
        { name: 'Quarterly_Financial_Audit.xlsx', date: 'March 20, 2026', size: '1.8 MB', type: 'Excel' },
        { name: 'Patient_Demographics_Q1.pdf', date: 'March 15, 2026', size: '2.5 MB', type: 'PDF' },
        { name: 'Staff_Performance_Metrics.pdf', date: 'March 10, 2026', size: '3.1 MB', type: 'PDF' },
    ];

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto text-left">
                <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Database className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Business Intelligence</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 italic">Advanced Analytics Engine</h1>
                        <p className="text-slate-500 font-medium">Deep-level clinical and operational performance intelligence.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="gap-2">
                            <History className="w-4 h-4" /> Schedule Auto-Reports
                        </Button>
                        <Button className="bg-slate-900 text-white gap-2 px-8">
                            <Plus className="w-4 h-4" /> Create Custom View
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {reportCategories.map((cat) => (
                        <Card key={cat.title} className="p-8 group hover:shadow-2xl transition-all duration-500 border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10">
                                <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:shadow-lg transition-all`}>
                                    <cat.icon className="w-7 h-7" />
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-black text-slate-900 text-2xl tracking-tight italic">{cat.title}</h3>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{cat.stats}</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-10 leading-relaxed font-medium">{cat.desc}</p>
                                <button className="flex items-center justify-between w-full p-4 bg-slate-50 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all group/btn">
                                    <span className="font-black text-xs uppercase tracking-widest">Generate Analysis</span>
                                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-black text-xl text-slate-900 italic">Report Archive</h3>
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm" className="text-[10px] font-black uppercase tracking-widest">All Time</Button>
                                <Button variant="outline" size="sm" className="text-[10px] font-black uppercase tracking-widest">Type: PDF</Button>
                            </div>
                        </div>
                        <Card className="p-0 overflow-hidden border-slate-100">
                            <div className="divide-y divide-slate-50">
                                {recentReports.map((report, i) => (
                                    <div key={i} className="flex items-center justify-between p-8 hover:bg-slate-50/50 transition-colors group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-white border border-slate-100 text-slate-300 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-black text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{report.name}</p>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{report.date}</span>
                                                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">• {report.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Button variant="outline" className="p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                                                <Download className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <Card className="p-8 bg-slate-900 text-white relative overflow-hidden text-left">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                                    <PieChart className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-black text-xl mb-4 italic">Quick Aggregation</h3>
                                <p className="text-indigo-300/60 text-sm font-medium mb-8">Run a custom SQL-based report across all clinical and financial clusters.</p>
                                <Button className="w-full bg-white text-slate-900 hover:bg-indigo-50 font-black py-4 rounded-2xl">
                                    Open SQL Query Hub
                                </Button>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
                        </Card>

                        <Card className="p-8 border-slate-100 text-left">
                            <h3 className="font-black text-xl text-slate-900 mb-8 italic">Data Visualization</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                                            <BarChart3 className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Chart View</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                                            <PieChart className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Cluster Map</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Reports;
