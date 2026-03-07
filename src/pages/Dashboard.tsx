import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Users,
    Calendar,
    Bed,
    TrendingUp,
    TrendingDown,
    ChevronRight,
    MoreHorizontal,
    ExternalLink,
    Thermometer,
    Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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

const StatCard = ({ label, value, subtext, trend, color, icon: Icon }: any) => (
    <Card className="flex flex-col gap-4 relative overflow-hidden group">
        <div className={cn(
            "absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 -mr-16 -mt-16 rounded-full transition-all group-hover:opacity-30",
            color === 'indigo' ? 'bg-indigo-600' :
                color === 'sky' ? 'bg-sky-500' :
                    color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
        )} />
        <div className="flex items-center justify-between relative z-10">
            <div className={cn(
                "p-3 rounded-2xl",
                color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                    color === 'sky' ? 'bg-sky-50 text-sky-600' :
                        color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
            )}>
                <Icon className="w-5 h-5" />
            </div>
            <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-5 h-5" />
            </button>
        </div>
        <div className="relative z-10">
            <p className="text-sm font-semibold text-slate-500 mb-1">{label}</p>
            <div className="flex items-end gap-3">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
                <span className={cn(
                    "text-xs font-bold flex items-center gap-1 pb-1",
                    trend > 0 ? "text-emerald-500" : "text-rose-500"
                )}>
                    {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(trend)}%
                </span>
            </div>
            <p className="text-[12px] text-slate-400 mt-2 font-medium">{subtext}</p>
        </div>
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

const Dashboard = () => {
    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Hospital Analytics</h1>
                        <p className="text-slate-500">Overview of your clinic's performance today.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="bg-white">
                            <Calendar className="w-4 h-4 mr-2" />
                            Jan 01, 2026 - Mar 07, 2026
                        </Button>
                        <Button size="sm">Download Report</Button>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-8 text-left">
                    <StatCard
                        label="Total Patients"
                        value="24,512"
                        subtext="150 more than Yesterday"
                        trend={2.1}
                        color="indigo"
                        icon={Users}
                    />
                    <StatCard
                        label="Appointments"
                        value="1,240"
                        subtext="15 less than Yesterday"
                        trend={-1.5}
                        color="sky"
                        icon={Calendar}
                    />
                    <StatCard
                        label="Bed Occupancy"
                        value="85%"
                        subtext="260 beds occupied total"
                        trend={4.2}
                        color="amber"
                        icon={Bed}
                    />
                    <StatCard
                        label="Income"
                        value="$1.2M"
                        subtext="Target $1.5M for this month"
                        trend={5.8}
                        color="rose"
                        icon={TrendingUp}
                    />
                </div>

                <div className="grid grid-cols-12 gap-8">
                    <Card className="col-span-5 p-0 overflow-hidden bg-gradient-to-br from-indigo-50/50 to-sky-50/50 relative min-h-[500px]">
                        <div className="p-8 relative z-10 flex flex-col h-full text-left">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Patient Health</h3>
                                    <p className="text-sm text-slate-500">From Primary Diagnosis</p>
                                </div>
                                <Button variant="outline" className="w-10 h-10 p-0 rounded-full bg-white border-0 shadow-sm">
                                    <ExternalLink className="w-5 h-5 text-indigo-600" />
                                </Button>
                            </div>

                            <div className="relative flex-1 mb-8">
                                <img
                                    src="/src/assets/lungs.png"
                                    alt="Lungs Analysis"
                                    className="w-full h-[280px] object-contain drop-shadow-2xl"
                                />

                                <div className="absolute top-10 right-0 glass-card p-3 rounded-2xl flex items-center gap-3 animate-bounce-slow">
                                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                                        <Activity className="text-white w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Heart Rate</p>
                                        <p className="text-sm font-bold text-slate-900">108 bpm</p>
                                    </div>
                                </div>

                                <div className="absolute bottom-10 left-0 glass-card p-4 rounded-3xl w-[220px]">
                                    <div className="flex items-center gap-3 mb-4">
                                        <img
                                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100"
                                            className="w-10 h-10 rounded-xl object-cover"
                                        />
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 leading-none">Dr. Ishita Datta</p>
                                            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">Pulmonary</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 tracking-tight">Today</p>
                                    <p className="text-[10px] text-slate-500 font-medium">01:15 PM - 02:00 PM</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <HealthMetric
                                    icon={Thermometer}
                                    label="Temperature"
                                    value="45.06"
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

                    <Card className="col-span-7 flex flex-col min-h-[500px] text-left">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Revenue Analytics</h3>
                                <p className="text-sm text-slate-500">Income vs Expenses Overview</p>
                            </div>
                            <div className="flex bg-slate-50 p-1 rounded-xl">
                                <button className="px-5 py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold shadow-sm">Monthly</button>
                                <button className="px-5 py-2 text-slate-400 rounded-lg text-xs font-bold">Yearly</button>
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-[300px]">
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

                        <div className="mt-6 pt-6 border-t border-slate-50 grid grid-cols-2 gap-10">
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

                <div className="grid grid-cols-3 gap-8 mt-8 text-left mb-10">
                    <Card className="col-span-1 border-0 bg-transparent p-0 shadow-none">
                        <div className="bg-white p-6 rounded-[32px] shadow-sm h-full">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-slate-900">Doctor Highlight</h3>
                                <MoreHorizontal className="w-5 h-5 text-slate-400" />
                            </div>
                            <div className="relative rounded-2xl overflow-hidden mb-4 group aspect-[4/3]">
                                <img src="/src/assets/doctor.png" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                                <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-100">Available</div>
                                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                    <h4 className="text-white font-bold text-lg">Dr. Kamal Sah</h4>
                                    <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Dermatology</p>
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full justify-between px-2 hover:bg-slate-50 group">
                                <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600">View Full Schedule</span>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </Card>

                    <Card className="col-span-2">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Patient Flow Today</h3>
                                <p className="text-sm text-slate-400 font-medium">Department distribution</p>
                            </div>
                            <div className="flex bg-slate-50 p-1 rounded-xl">
                                <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-900">Weekly</button>
                                <button className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Monthly</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-12 items-center">
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

export default Dashboard;
