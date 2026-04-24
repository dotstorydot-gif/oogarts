import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button } from '../components/layout/BaseUI';
import { 
    Users, 
    Calendar, 
    DollarSign, 
    Activity, 
    ArrowDownRight, 
    Plus, 
    ChevronRight,
    Loader2,
    TrendingUp,
    ShieldCheck
} from 'lucide-react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const data = [
    { name: 'Mon', value: 40, disease: 12 },
    { name: 'Tue', value: 30, disease: 15 },
    { name: 'Wed', value: 60, disease: 10 },
    { name: 'Thu', value: 45, disease: 18 },
    { name: 'Fri', value: 70, disease: 25 },
    { name: 'Sat', value: 50, disease: 20 },
    { name: 'Sun', value: 30, disease: 8 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }: any) => (
    <Card className="p-8 group hover:shadow-2xl transition-all duration-500 cursor-pointer border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -mr-16 -mt-16 transition-all group-hover:scale-150 duration-700"></div>
        <div className="relative z-10 text-left">
            <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-100`}>
                <Icon className="text-white w-7 h-7" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{title}</p>
            <div className="flex items-end justify-between">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight italic">{value}</h2>
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {trend === 'up' ? <TrendingUp size={14} /> : <ArrowDownRight size={14} />}
                    {trendValue}
                </div>
            </div>
        </div>
    </Card>
);

const DepartmentProgress = ({ label, value, color }: any) => (
    <div className="space-y-3">
        <div className="flex justify-between text-xs font-black uppercase tracking-widest italic">
            <span className="text-slate-500">{label}</span>
            <span className="text-slate-900">{value}%</span>
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden p-[2px]">
            <div 
                className={`h-full ${color} rounded-full transition-all duration-1000 shadow-sm`} 
                style={{ width: `${value}%` }}
            />
        </div>
    </div>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        totalPatients: 0,
        todayConsultations: 0,
        monthlyRevenue: 0,
        activeDoctors: 0
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { count: pts } = await supabase.from('patients').select('*', { count: 'exact', head: true });
            const { count: appts } = await supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('date', new Date().toISOString().split('T')[0]);
            const { data: bills } = await supabase.from('bills').select('amount').eq('status', 'Paid');
            const { count: docs } = await supabase.from('doctors').select('*', { count: 'exact', head: true });

            const revenue = (bills || []).reduce((acc, b) => acc + Number(b.amount), 0);

            setStats({
                totalPatients: pts || 0,
                todayConsultations: appts || 0,
                monthlyRevenue: revenue,
                activeDoctors: docs || 0
            });
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Activity className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Operations Command</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 italic">Super Admin Dashboard</h1>
                        <p className="text-slate-500 font-medium">Global hospital intelligence and resource orchestration platform.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="gap-2" onClick={fetchData}>
                            <Loader2 size={16} className={isLoading ? 'animate-spin' : ''} />
                            Sync Live Data
                        </Button>
                        <Button variant="dark" className="gap-2 px-8 active:scale-95 shadow-xl shadow-slate-200" onClick={() => navigate('/appointments')}>
                            <Plus size={20} />
                            Schedule Service
                        </Button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
                        <h2 className="text-xl font-black text-slate-900 tracking-tight italic">Aggregating Global Metrics...</h2>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                            <StatCard title="Global Patients" value={stats.totalPatients} icon={Users} trend="up" trendValue="+12%" color="bg-indigo-600" />
                            <StatCard title="Daily Consults" value={stats.todayConsultations} icon={Calendar} trend="up" trendValue="+8%" color="bg-emerald-500" />
                            <StatCard title="Revenue (MTD)" value={`$${stats.monthlyRevenue.toLocaleString()}`} icon={DollarSign} trend="up" trendValue="+15%" color="bg-slate-900" />
                            <StatCard title="Staff Active" value={stats.activeDoctors} icon={Activity} trend="down" trendValue="-2%" color="bg-amber-500" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                            <Card className="col-span-1 lg:col-span-8 p-10 text-left border-slate-100">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-12">
                                    <div>
                                        <h3 className="font-black text-slate-900 text-2xl tracking-tight mb-2 italic">Patient Flow & Disease Rate</h3>
                                        <p className="text-sm text-slate-500 font-medium">Real-time epidemiological tracking and volume trends.</p>
                                    </div>
                                    <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                        <button className="px-6 py-2 bg-white shadow-xl shadow-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 transition-all">Weekly</button>
                                        <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">Monthly</button>
                                    </div>
                                </div>
                                <div className="h-[400px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data}>
                                            <defs>
                                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                                </linearGradient>
                                                <linearGradient id="colorDisease" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                                            <Tooltip 
                                                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '20px'}}
                                                itemStyle={{fontWeight: 900, textTransform: 'uppercase', fontSize: '10px'}}
                                            />
                                            <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" name="Patient Volume" />
                                            <Area type="monotone" dataKey="disease" stroke="#f43f5e" strokeWidth={4} fillOpacity={1} fill="url(#colorDisease)" name="Disease Rate" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            <div className="col-span-1 lg:col-span-4 space-y-8">
                                <Card className="p-8 border-slate-100 text-left relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="font-black text-slate-900 text-xl mb-8 italic">Department Load</h3>
                                        <div className="space-y-8">
                                            <DepartmentProgress label="Emergency Medicine" value={65} color="bg-indigo-600" />
                                            <DepartmentProgress label="Internal Medicine" value={25} color="bg-emerald-500" />
                                            <DepartmentProgress label="Radiology & Diagnostics" value={10} color="bg-amber-500" />
                                            <DepartmentProgress label="Surgical Services" value={45} color="bg-slate-900" />
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-8 bg-indigo-600 text-white text-left relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 cursor-pointer">
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 text-indigo-200 mb-6 font-black uppercase tracking-[0.2em] text-[10px]">
                                            <ShieldCheck size={18} />
                                            System Integrity
                                        </div>
                                        <h4 className="text-2xl font-black mb-4 leading-tight">All clinical nodes operational.</h4>
                                        <p className="text-indigo-100 text-sm font-medium mb-8 leading-relaxed opacity-80">Last cross-sync completed 4 minutes ago. Database health optimal.</p>
                                        <Button variant="dark" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20 font-black py-4 rounded-2xl group/btn">
                                            <span>Full System Audit</span>
                                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                                </Card>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
