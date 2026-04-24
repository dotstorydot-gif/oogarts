import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Activity,
    FileText,
    Pill,
    Clock,
    ChevronRight,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { Patient } from '../lib/mockData';

const PatientDashboard = () => {
    const navigate = useNavigate();
    const [patientData, setPatientData] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                // Fetch the specific patient (Sophia Martinez for demo)
                const patientId = 'PAT-1001';
                const { data: patient, error: pError } = await supabase
                    .from('patients')
                    .select('*')
                    .eq('id', patientId)
                    .single();

                if (pError) throw pError;

                const { data: prescriptions } = await supabase
                    .from('prescriptions')
                    .select('*')
                    .eq('patient_id', patientId);

                const { data: labs } = await supabase
                    .from('lab_results')
                    .select('*')
                    .eq('patient_id', patientId);

                setPatientData({
                    ...patient,
                    bloodType: patient.blood_type,
                    lastVisit: patient.last_visit,
                    prescriptions: (prescriptions || []).map((rx: any) => ({ ...rx, daysLeft: rx.days_left })),
                    labs: labs || [],
                    history: [], // We fetch history on the records page
                    allergies: patient.allergies || []
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                    <p className="text-slate-500 font-bold">Connecting to your health records...</p>
                </div>
            </Layout>
        );
    }

    if (!patientData) return null;

    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Welcome Back, Sophia</h1>
                    <p className="text-slate-500 font-medium">Here is your health overview for today.</p>
                </div>

                {/* Banner */}
                <Card className="bg-indigo-600 text-white p-8 mb-10 border-0 shadow-2xl shadow-indigo-200/50 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <AlertCircle className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1">Time for your annual checkup</h3>
                            <p className="text-indigo-100 font-medium text-sm">It's been 11 months since your last general consultation.</p>
                        </div>
                    </div>
                    <Button variant="outline" className="relative z-10 bg-white text-indigo-600 hover:bg-white/90 border-0 shadow-lg px-8 py-4 " onClick={() => navigate('/patient-booking')}>
                        Schedule Now
                    </Button>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
                    {/* Left Column - Appointments & Prescriptions */}
                    <div className="md:col-span-7 space-y-8">
                        {/* Upcoming Appointment */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">Next Appointment</h2>
                            <Button variant="ghost" className="text-indigo-600 font-bold hover:bg-indigo-50" onClick={() => navigate('/patient-booking')}>View Calendar</Button>
                        </div>

                        <Card className="p-0 overflow-hidden border-indigo-100 group hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-100/50 rounded-xl flex items-center justify-center">
                                        <Activity className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-0.5">Telemedicine</p>
                                        <p className="font-bold text-slate-900">Dr. Michael Chen</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-slate-900 text-lg">Thursday</p>
                                    <p className="text-sm font-bold text-slate-500">10:30 AM</p>
                                </div>
                            </div>
                            <div className="p-6 flex items-center justify-between bg-white">
                                <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                    <Activity className="w-4 h-4" /> Comprehensive Neurology Follow-up
                                </p>
                                <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md " onClick={() => navigate('/telemedicine')}>
                                    Join Call
                                </Button>
                            </div>
                        </Card>

                        {/* Current Prescriptions */}
                        <div className="flex items-center justify-between pt-4">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Prescriptions</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {patientData.prescriptions.map(rx => (
                                <Card key={rx.id} className={cn("p-6 border-slate-100 transition-colors", rx.status === 'Active' ? 'hover:border-sky-200' : 'hover:border-amber-200')}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={cn("w-10 h-10 flex items-center justify-center rounded-xl", rx.status === 'Active' ? 'bg-sky-50 text-sky-600' : 'bg-amber-50 text-amber-600')}>
                                            <Pill className="w-5 h-5" />
                                        </div>
                                        <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", rx.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')}>{rx.status}</span>
                                    </div>
                                    <h4 className="font-black text-slate-900 text-lg mb-1">{rx.name}</h4>
                                    <p className="text-slate-500 font-medium text-sm mb-4">{rx.dosage} • {rx.frequency}</p>
                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                        <div className={cn("h-full", rx.status === 'Active' ? 'bg-sky-500 w-[60%]' : 'bg-rose-500 w-[10%]')} />
                                    </div>
                                    <p className={cn("text-xs font-black mt-2 text-right", rx.status === 'Active' ? 'text-slate-400' : 'text-rose-500')}>{rx.daysLeft} days left</p>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Lab Results & Quick Stats */}
                    <div className="md:col-span-5 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Lab Results</h2>
                        </div>

                        <Card className="p-0 border-slate-100 overflow-hidden divide-y divide-slate-50">
                            {patientData.labs.map((lab) => (
                                <div key={lab.id} className="p-5 flex items-center justify-between hover:bg-slate-50 group transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm mb-0.5">{lab.name}</p>
                                            <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                                                <Clock className="w-3 h-3" /> {lab.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={cn("px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest", lab.status === 'Normal' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600')}>
                                            {lab.status}
                                        </span>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
                                    </div>
                                </div>
                            ))}
                        </Card>

                        <div className="flex items-center justify-between pt-4">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">Quick Actions</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-6 text-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all border-slate-100" onClick={() => navigate('/patient-records')}>
                                <div className="w-12 h-12 mx-auto bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-4">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm">Medical Records</h4>
                            </Card>
                            <Card className="p-6 text-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all border-slate-100" onClick={() => navigate('/patient-billing')}>
                                <div className="w-12 h-12 mx-auto bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-4">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm">Billing & Claims</h4>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PatientDashboard;
