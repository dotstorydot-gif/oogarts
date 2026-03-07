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
    TrendingUp
} from 'lucide-react';

const Specialties = () => {
    const navigate = useNavigate();

    const specialties = [
        {
            name: 'Cardiology',
            icon: Heart,
            desc: 'Heart and cardiovascular system',
            doctors: 3,
            queue: 8,
            waitTime: '45 min',
            color: 'text-rose-500 bg-rose-50'
        },
        {
            name: 'Neurology',
            icon: Brain,
            desc: 'Brain and nervous system',
            doctors: 2,
            queue: 5,
            waitTime: '60 min',
            color: 'text-indigo-500 bg-indigo-50'
        },
        {
            name: 'Ophthalmology',
            icon: Eye,
            desc: 'Eye and vision care',
            doctors: 4,
            queue: 12,
            waitTime: '30 min',
            color: 'text-sky-500 bg-sky-50'
        },
        {
            name: 'Orthopedics',
            icon: Bone,
            desc: 'Bones, joints, and muscles',
            doctors: 3,
            queue: 6,
            waitTime: '50 min',
            color: 'text-amber-500 bg-amber-50'
        },
        {
            name: 'Pediatrics',
            icon: Baby,
            desc: 'Children and adolescent care',
            doctors: 5,
            queue: 15,
            waitTime: '25 min',
            color: 'text-emerald-500 bg-emerald-50'
        },
        {
            name: 'General Medicine',
            icon: Stethoscope,
            desc: 'Primary care and general health',
            doctors: 6,
            queue: 22,
            waitTime: '20 min',
            color: 'text-indigo-600 bg-slate-50'
        },
    ];

    const stats = [
        { label: 'Total Specialties', value: '6', icon: Stethoscope },
        { label: 'Doctors Available', value: '23', icon: UserCircle2 },
        { label: 'Patients in Queue', value: '68', icon: Users },
        { label: 'Avg Wait Time', value: '38 min', icon: Clock },
    ];

    const handleRoutePatient = (specialty: string) => {
        // Navigate to doctors with specialty as search term
        navigate(`/doctors?filter=${specialty}`);
    };

    return (
        <Layout>
            <div className="max-w-[1600px] text-left">
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Stethoscope className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Clinical Units</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 font-sans">Medical Specialties</h1>
                        <p className="text-slate-500 font-medium">Route patients to the appropriate medical department</p>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-4 gap-6 mb-12">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="p-8 bg-white border-slate-100 group hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                            </div>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-900 leading-none">{stat.value}</h3>
                        </Card>
                    ))}
                </div>

                {/* Specialties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specialties.map((spec) => (
                        <Card key={spec.name} className="flex flex-col group hover:shadow-3xl hover:shadow-indigo-100/30 transition-all duration-700 overflow-hidden relative border-slate-100 p-10">
                            <div className="flex items-center gap-6 mb-10">
                                <div className={cn("w-24 h-24 rounded-[32px] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl", spec.color)}>
                                    <spec.icon className="w-12 h-12" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight leading-tight">{spec.name}</h3>
                                    <p className="text-xs font-bold text-slate-400 mt-1.5">{spec.desc}</p>
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
            </div>
        </Layout>
    );
};

export default Specialties;
