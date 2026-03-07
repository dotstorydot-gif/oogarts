import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Users,
    Calendar,
    Stethoscope,
    Activity,
    FileText,
    Plus,
    ChevronRight,
    MoreHorizontal,
    Thermometer,
    X,
    Maximize2,
    Play,
    CheckCircle2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useNavigate } from 'react-router-dom';

const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 700 },
    { name: 'Aug', value: 1000 },
];

const StatCard = ({ icon: Icon, label, value, trend, trendUp, color }: any) => (
    <Card variant="default" className="p-8">
        <div className="flex items-start justify-between mb-8">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-100 rotate-3", color)}>
                <Icon className="w-7 h-7 text-white" />
            </div>
            {trend && (
                <div className={cn("px-4 py-2 rounded-xl text-xs font-black tracking-tight", trendUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600")}>
                    {trend}
                </div>
            )}
        </div>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
    </Card>
);

const HealthMetric = ({ icon: Icon, label, value, unit, color }: any) => (
    <div className="bg-white/50 border border-white/50 p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-xl", color)}>
                <Icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-600">{label}</span>
        </div>
        <div className="text-right">
            <span className="text-base font-bold text-slate-900">{value}</span>
            <span className="text-[10px] font-semibold text-slate-400 ml-1">{unit}</span>
        </div>
    </div>
);

const DepartmentProgress = ({ label, value, color }: any) => (
    <div className="space-y-2">
        <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
            <span className="text-sm font-black text-slate-900">{value}%</span>
        </div>
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full transition-all duration-1000", color)} style={{ width: `${value}%` }} />
        </div>
    </div>
);

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto text-left">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Activity className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Operational Overview</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Health Systems Command Center</h1>
                        <p className="text-slate-500 font-medium">Real-time monitoring of clinical operations, patient flow, and specialty performance.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="gap-2" onClick={() => navigate('/reports')}>
                            <FileText className="w-4 h-4" />
                            Daily Report
                        </Button>
                        <Button variant="primary" className="gap-2 px-8" onClick={() => navigate('/patients')}>
                            <Plus className="w-5 h-5" />
                            New Record
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
                    <StatCard
                        icon={Users}
                        label="Total Patients"
                        value="2,845"
                        trend="+12%"
                        trendUp
                        color="bg-indigo-600 shadow-indigo-200"
                    />
                    <StatCard
                        icon={Calendar}
                        label="Appointments"
                        value="48"
                        trend="+4%"
                        trendUp
                        color="bg-sky-500 shadow-sky-100"
                    />
                    <StatCard
                        icon={Stethoscope}
                        label="Surgery Queue"
                        value="12"
                        trend="-2"
                        trendUp={false}
                        color="bg-rose-500 shadow-rose-100"
                    />
                    <StatCard
                        icon={Activity}
                        label="Capacity"
                        value="94%"
                        trend="+3%"
                        trendUp
                        color="bg-emerald-500 shadow-emerald-100"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <Card className="col-span-1 lg:col-span-5 p-0 overflow-hidden bg-gradient-to-br from-indigo-50/50 to-sky-50/50 relative min-h-[500px]">
                        <div className="p-6 lg:p-8 relative z-10 flex flex-col h-full text-left">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Patient Health</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">From Patient</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="w-10 h-10 p-0 rounded-full bg-white border-0 shadow-sm">
                                        <Play className="w-5 h-5 text-indigo-600 fill-indigo-600/20" />
                                    </Button>
                                    <Button variant="outline" className="w-10 h-10 p-0 rounded-full bg-white border-0 shadow-sm">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                                    </Button>
                                    <Button variant="outline" className="w-10 h-10 p-0 rounded-full bg-white border-0 shadow-sm">
                                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                                    </Button>
                                </div>
                            </div>

                            <div className="relative flex-1 flex items-center justify-center mb-8">
                                <img
                                    src="/health_viz.png"
                                    alt="Medical Analysis"
                                    className="w-full h-auto max-h-[320px] object-contain drop-shadow-[0_35px_35px_rgba(79,70,229,0.1)]"
                                />

                                {/* Floating Heart Rate Card */}
                                <div className="absolute top-[20%] right-[5%] sm:right-[15%] glass-card p-4 rounded-[24px] flex items-center gap-4 animate-float shadow-xl shadow-indigo-100/50 border border-white">
                                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                                        <Activity className="text-indigo-600 w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-slate-900">108 <span className="text-[10px] text-slate-400 uppercase">bpm</span></p>
                                    </div>
                                </div>

                                {/* Patient Mini Badge */}
                                <Card className="absolute bottom-[0%] right-[0%] p-6 rounded-[32px] w-[220px] shadow-2xl shadow-indigo-200/40 border-white/50 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100">
                                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900 truncate w-24">Jeffrey Hessel</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <X className="w-3.5 h-3.5 text-slate-300" />
                                        </div>
                                    </div>
                                    <div className="space-y-4 relative">
                                        <div className="absolute right-0 top-0">
                                            <Maximize2 className="w-4 h-4 text-slate-300 rotate-45" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Temperature</p>
                                            <p className="text-lg font-black text-slate-900">45.06° C</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Heart rate</p>
                                            <p className="text-lg font-black text-slate-900">108 bpm</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Blood</p>
                                            <p className="text-lg font-black text-slate-900">96%</p>
                                        </div>
                                    </div>
                                </Card>

                                {/* Doctor Mini Badge */}
                                <Card className="absolute bottom-[5%] left-[0%] p-5 rounded-[28px] shadow-xl border-white animate-in fade-in slide-in-from-left-4 duration-700">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900">Dr. Ishita Datta</p>
                                            <p className="text-[10px] font-bold text-slate-300">Pulmonary</p>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <p className="text-xl font-black text-slate-900">Today</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1">01:15 PM - 02:00 PM</p>
                                    </div>
                                </Card>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <HealthMetric
                                    icon={Thermometer}
                                    label="Temperature"
                                    value="36.6"
                                    unit="°C"
                                    color="bg-amber-500"
                                />
                                <HealthMetric
                                    icon={Activity}
                                    label="Blood Pressure"
                                    value="120/80"
                                    unit="mmHg"
                                    color="bg-indigo-600"
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="col-span-1 lg:col-span-7 flex flex-col min-h-[500px] text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 p-6 lg:p-8">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Revenue Analytics</h3>
                                <p className="text-sm text-slate-500">Income vs Expenses Overview</p>
                            </div>
                            <div className="flex bg-slate-50 p-1 rounded-xl">
                                <button className="px-5 py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold shadow-sm">Monthly</button>
                                <button className="px-5 py-2 text-slate-400 rounded-lg text-xs font-bold">Yearly</button>
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-[300px] px-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#4f46e5"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-6 p-6 lg:p-8 border-t border-slate-50 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                            <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Income</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-black text-slate-900">$ 7,112,324</span>
                                    <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Expenses</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-black text-slate-900">$ 4,965,476</span>
                                    <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">+4%</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 text-left mb-10">
                    <Card className="col-span-1 p-6 lg:p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-black text-slate-900 tracking-tight">Doctor Highlight</h3>
                            <MoreHorizontal className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="relative rounded-[32px] overflow-hidden mb-8 group aspect-[4/3] shadow-2xl shadow-slate-200">
                            <img src="/dr_kamal.png" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                            <div className="absolute top-5 right-5 bg-emerald-500 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-emerald-200/50">Available</div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                <h4 className="text-white font-black text-2xl tracking-tight mb-1">Dr. Kamal Sah</h4>
                                <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">Dermatology</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full justify-between px-2 hover:bg-slate-50 group py-4"
                            onClick={() => navigate('/doctors?filter=Kamal')}
                        >
                            <span className="text-sm font-black text-slate-700 group-hover:text-indigo-600 transition-colors">View Full Schedule</span>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </Button>
                    </Card>

                    <Card className="col-span-1 lg:col-span-2 p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Patient Flow Today</h3>
                                <p className="text-sm text-slate-400 font-medium">Department distribution</p>
                            </div>
                            <div className="flex bg-slate-50 p-1 rounded-xl self-start sm:self-auto">
                                <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-900">Weekly</button>
                                <button className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Monthly</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div className="h-[220px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data}>
                                        <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={4} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-6">
                                <DepartmentProgress label="Emergency Medicine" value={65} color="bg-indigo-600" />
                                <DepartmentProgress label="General Medicine" value={25} color="bg-sky-500" />
                                <DepartmentProgress label="Internal Medicine" value={10} color="bg-amber-500" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
