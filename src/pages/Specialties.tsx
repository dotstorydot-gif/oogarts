import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Heart,
    Brain,
    Bone,
    Eye,
    Stethoscope,
    Baby,
    Users,
    Clock,
    UserCircle2,
    ChevronRight,
    TrendingUp,
    Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Specialties = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [specialties, setSpecialties] = useState<any[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        doctors: 0,
        queue: 0,
        avgWait: '38 min'
    });

    const iconMap: any = {
        'Cardiology': Heart,
        'Neurology': Brain,
        'Orthopedics': Bone,
        'Ophthalmology': Eye,
        'Pediatrics': Baby,
        'General Medicine': Stethoscope
    };

    const colorMap: any = {
        'Cardiology': 'text-rose-500 bg-rose-50',
        'Neurology': 'text-indigo-500 bg-indigo-50',
        'Orthopedics': 'text-amber-500 bg-amber-50',
        'Ophthalmology': 'text-sky-500 bg-sky-50',
        'Pediatrics': 'text-emerald-500 bg-emerald-50',
        'General Medicine': 'text-indigo-600 bg-slate-50'
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data: specs } = await supabase.from('specialties').select('*').order('name');
            const { count: docs } = await supabase.from('doctors').select('*', { count: 'exact', head: true });
            const { count: appts } = await supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('status', 'Scheduled');
            
            // Map specialties with real doctor counts from doctors table if available
            const { data: docSpecialties } = await supabase.from('doctors').select('specialty');
            const { data: apptSpecialties } = await supabase.from('appointments').select('specialty').eq('status', 'Scheduled');

            const mappedSpecs = (specs || []).map(s => {
                const docCount = (docSpecialties || []).filter(d => d.specialty === s.name).length;
                const queueCount = (apptSpecialties || []).filter(a => a.specialty === s.name).length;
                return {
                    ...s,
                    doctors: docCount || s.doctor_count || 0,
                    queue: queueCount || 0,
                    waitTime: `${Math.max(15, queueCount * 10)} min`,
                    icon: iconMap[s.name] || Stethoscope,
                    color: colorMap[s.name] || 'text-slate-600 bg-slate-50'
                };
            });

            setSpecialties(mappedSpecs);
            setStats({
                total: specs?.length || 0,
                doctors: docs || 0,
                queue: appts || 0,
                avgWait: '38 min'
            });
        } catch (error) {
            console.error("Error fetching specialties:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRoutePatient = (specialty: string) => {
        navigate(`/doctors?filter=${specialty}`);
    };

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto text-left">
                <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Stethoscope className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Clinical Units</span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-2 italic">Medical Specialties</h1>
                        <p className="text-slate-500 font-medium">Route patients to the appropriate medical department</p>
                    </div>
                    <Button variant="outline" className="gap-2" onClick={fetchData}>
                        <Loader2 size={16} className={isLoading ? 'animate-spin' : ''} />
                        Sync Data
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Specialties', value: stats.total, icon: Stethoscope },
                        { label: 'Doctors Available', value: stats.doctors, icon: UserCircle2 },
                        { label: 'Patients in Queue', value: stats.queue, icon: Users },
                        { label: 'Avg Wait Time', value: stats.avgWait, icon: Clock },
                    ].map((stat) => (
                        <Card key={stat.label} className="p-8 bg-white border-slate-100 group hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                            </div>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-900 leading-none italic">{stat.value}</h3>
                        </Card>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold italic">Synchronizing clinical units...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {specialties.map((spec) => (
                            <Card key={spec.name} className="flex flex-col group hover:shadow-3xl hover:shadow-indigo-100/30 transition-all duration-700 overflow-hidden relative border-slate-100 p-6 lg:p-10">
                                <div className="flex items-center gap-6 mb-10">
                                    <div className={cn("w-24 h-24 rounded-[32px] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl", spec.color)}>
                                        <spec.icon className="w-12 h-12" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight leading-tight italic">{spec.name}</h3>
                                        <p className="text-xs font-bold text-slate-400 mt-1.5">{spec.description || 'Medical department unit'}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center justify-between p-5 rounded-[24px] bg-slate-50/50 border border-slate-100/50 hover:bg-white transition-all">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Active Doctors</span>
                                        <span className="text-base font-black text-slate-900">{spec.doctors}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-5 rounded-[24px] bg-slate-50/50 border border-slate-100/50 hover:bg-white transition-all">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Queue</span>
                                        <span className="text-base font-black text-slate-900">{spec.queue}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-5 rounded-[24px] bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-white transition-all">
                                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Est. Wait Time</span>
                                        <span className="text-base font-black">{spec.waitTime}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="dark"
                                    className="w-full h-14 gap-2 group/btn"
                                    onClick={() => handleRoutePatient(spec.name)}
                                >
                                    <span className="text-[15px] font-black">Route Patient</span>
                                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Specialties;
