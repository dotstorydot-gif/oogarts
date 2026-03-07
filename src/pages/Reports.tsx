import { Layout } from '../components/layout/Layout';
import { Card } from '../components/layout/BaseUI';
import { FileText, Download, TrendingUp, Users, Activity } from 'lucide-react';

const Reports = () => {
    const reportCategories = [
        { title: 'Patient Inflow', icon: Users, desc: 'Weekly analytics on patient registration and visits.' },
        { title: 'Financial Report', icon: TrendingUp, desc: 'Detailed breakdown of income and expenses.' },
        { title: 'System Performance', icon: Activity, desc: 'Infrastructure and database health metrics.' },
    ];

    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">System Reports</h1>
                        <p className="text-slate-500">Generate and download comprehensive health data analytics.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {reportCategories.map((cat) => (
                        <Card key={cat.title} className="p-8">
                            <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6">
                                <cat.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-black text-slate-900 text-xl mb-2">{cat.title}</h3>
                            <p className="text-sm text-slate-500 mb-6 leading-relaxed font-medium">{cat.desc}</p>
                            <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all">
                                <span>Generate Report</span>
                                <Download className="w-4 h-4" />
                            </button>
                        </Card>
                    ))}
                </div>

                <h3 className="font-black text-lg text-slate-900 mb-6">Recent Reports</h3>
                <Card className="p-0 overflow-hidden">
                    <div className="divide-y divide-slate-50">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">Monthly_Analytics_Report_v{i}.pdf</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Generated March {i}, 2026</p>
                                    </div>
                                </div>
                                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all shadow-sm">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default Reports;
