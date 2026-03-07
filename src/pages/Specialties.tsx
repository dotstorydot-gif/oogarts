import { Layout } from '../components/layout/Layout';
import { Card, Button } from '../components/layout/BaseUI';
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
    ChevronRight
} from 'lucide-react';

const Specialties = () => {
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

    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-sans">Medical Specialties</h1>
                        <p className="text-slate-500 font-medium">Route patients to the appropriate medical department</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="p-6 bg-white/50 backdrop-blur-sm border-slate-100/50">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                                    <h3 className="text-xl font-black text-slate-900 leading-none">{stat.value}</h3>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Specialties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specialties.map((spec) => (
                        <Card key={spec.name} className="flex flex-col p-8 group hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-300">
                            <div className="flex items-center gap-5 mb-8">
                                <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center group-hover:scale-110 transition-transform", spec.color)}>
                                    <spec.icon className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{spec.name}</h3>
                                    <p className="text-xs text-slate-500 font-bold leading-relaxed">{spec.desc}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50">
                                    <span className="text-xs font-bold text-slate-500">Doctors Available:</span>
                                    <span className="text-xs font-black text-slate-900">{spec.doctors}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50">
                                    <span className="text-xs font-bold text-slate-500">Patients in Queue:</span>
                                    <span className="text-xs font-black text-slate-900">{spec.queue}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50/30">
                                    <span className="text-xs font-bold text-indigo-600">Est. Wait Time:</span>
                                    <span className="text-xs font-black text-indigo-600">{spec.waitTime}</span>
                                </div>
                            </div>

                            <Button className="w-full rounded-2xl py-4 font-black tracking-tight flex items-center justify-center gap-2 group/btn">
                                <span>Route Patient</span>
                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Specialties;
