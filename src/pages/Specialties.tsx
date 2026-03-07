import { Layout } from '../components/layout/Layout';
import { Card } from '../components/layout/BaseUI';
import { Stethoscope, Heart, Brain, Bone, Eye } from 'lucide-react';

const Specialties = () => {
    const specialties = [
        { name: 'Cardiology', icon: Heart, patients: 12, color: 'text-rose-500 bg-rose-50' },
        { name: 'Neurology', icon: Brain, patients: 8, color: 'text-indigo-500 bg-indigo-50' },
        { name: 'Orthopedics', icon: Bone, patients: 15, color: 'text-amber-500 bg-amber-50' },
        { name: 'Ophthalmology', icon: Eye, patients: 5, color: 'text-emerald-500 bg-emerald-50' },
        { name: 'General Medicine', icon: Stethoscope, patients: 24, color: 'text-sky-500 bg-sky-50' },
    ];

    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Medical Specialties</h1>
                    <p className="text-slate-500">Route patients to appropriate specialized departments.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specialties.map((spec) => (
                        <Card key={spec.name} className="hover:scale-[1.02] transition-transform cursor-pointer group">
                            <div className="flex items-center gap-5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${spec.color}`}>
                                    <spec.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{spec.name}</h3>
                                    <p className="text-sm text-slate-500 font-medium">{spec.patients} Patients today</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Specialties;
