import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Activity,
    Pill,
    ChevronRight,
    AlertCircle,
    Loader2,
    X,
    Calendar as CalendarIcon,
    Upload,
    Mail,
    Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { Patient, Appointment, LabResult } from '../lib/mockData';

const PatientDashboard = () => {
    const navigate = useNavigate();
    const [patientData, setPatientData] = useState<Patient | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedLab, setSelectedLab] = useState<LabResult | null>(null);
    const [selectedRx, setSelectedRx] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
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
                
                const { data: appts } = await supabase
                    .from('appointments')
                    .select('*')
                    .eq('patient_id', patientId)
                    .order('date', { ascending: true });

                setAppointments(appts || []);
                setPatientData({
                    ...patient,
                    bloodType: patient.blood_type,
                    lastVisit: patient.last_visit,
                    prescriptions: (prescriptions || []).map((rx: any) => ({ ...rx, daysLeft: rx.days_left })),
                    labs: labs || [],
                    history: [],
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

    const nextAppointment = appointments.find(a => a.status === 'Scheduled');

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
                            <Button variant="ghost" className="text-indigo-600 font-bold hover:bg-indigo-50" onClick={() => navigate('/patient-calendar')}>View Calendar</Button>
                        </div>

                        <Card className="p-0 overflow-hidden border-indigo-100 group hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                                        <CalendarIcon className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900">{nextAppointment?.date || 'No upcoming appointments'}</h3>
                                        <p className="text-slate-500 font-medium">{nextAppointment ? `${nextAppointment.time} • ${nextAppointment.type}` : 'Schedule a follow-up today'}</p>
                                    </div>
                                </div>
                                {nextAppointment && (
                                    <div className="bg-white rounded-2xl p-4 mb-6 border border-slate-100">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">With Doctor</p>
                                        <p className="text-slate-900 font-bold">{nextAppointment.doctor_name} ({nextAppointment.specialty})</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex items-center justify-between bg-white">
                                <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                    {nextAppointment ? "Ready for your consultation?" : "No pending consultations"}
                                </p>
                                {nextAppointment && (
                                    <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md " onClick={() => navigate('/telemedicine')}>
                                        Join Call
                                    </Button>
                                )}
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
                                <div key={lab.id} className="p-4 flex items-center justify-between hover:bg-slate-50 group transition-colors cursor-pointer" onClick={() => setSelectedLab(lab)}>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm mb-0.5">{lab.name}</p>
                                        <p className="text-[10px] font-medium text-slate-400">{lab.date}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={cn("px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest", lab.status === 'Normal' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600')}>
                                            {lab.status}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </Card>

                        <div className="flex items-center justify-between pt-4">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">Quick Actions</h2>
                        </div>
                        <div className="space-y-4">
                            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white gap-2 py-6 rounded-2xl shadow-xl shadow-slate-100" onClick={() => navigate('/patient-records')}>
                                <Upload className="w-5 h-5" /> Upload Medical Document
                            </Button>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="flex flex-col h-auto py-8 gap-3 border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-all rounded-2xl" onClick={() => alert("Refill request sent to your doctor.")}>
                                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold text-slate-700">Request Refill</span>
                                </Button>
                                <Button variant="outline" className="flex flex-col h-auto py-8 gap-3 border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-all rounded-2xl" onClick={() => alert("Secure messaging initialized with your physician.")}>
                                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold text-slate-700">Message Doctor</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lab Result Modal */}
                {selectedLab && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <Card className="w-full max-w-2xl p-0 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                                        <Activity className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900">{selectedLab.name}</h2>
                                        <p className="text-sm font-medium text-slate-500">Recorded on {selectedLab.date}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedLab(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>
                            <div className="p-8">
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Clinical Findings</span>
                                        <span className={cn("px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest", selectedLab.status === 'Normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                                            Status: {selectedLab.status}
                                        </span>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                        <p className="text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                                            {selectedLab.result_details || "Full result details are currently being processed by the lab. Please check back later or contact your physician for a detailed breakdown."}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Button className="flex-1 bg-indigo-600 text-white" onClick={() => window.print()}>Download PDF Report</Button>
                                    <Button variant="outline" className="gap-2 border-slate-200" onClick={() => navigate('/patient-calendar')}>
                                        <CalendarIcon className="w-4 h-4" />
                                        View Calendar
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Prescription Detail Modal */}
                {selectedRx && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <Card className="w-full max-w-xl p-0 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">
                                        <Pill className="w-6 h-6 text-sky-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900">{selectedRx.name}</h2>
                                        <p className="text-sm font-medium text-slate-500">{selectedRx.dosage}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedRx(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>
                            <div className="p-8">
                                <div className="space-y-6 mb-8">
                                    <div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Instructions</p>
                                        <p className="text-slate-900 font-bold text-lg">{selectedRx.frequency}</p>
                                    </div>
                                    <div className="flex justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                            <span className={cn("px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest", selectedRx.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')}>{selectedRx.status}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Supply Remaining</p>
                                            <p className="text-slate-900 font-black">{selectedRx.daysLeft} Days</p>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Pharmacist Notes</p>
                                        <p className="text-slate-600 text-sm italic">"Take with food to avoid stomach upset. Do not skip doses."</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Button className="flex-1 bg-indigo-600 text-white" onClick={() => alert("Refill request sent.")}>Request Refill</Button>
                                    <Button variant="outline" className="flex-1" onClick={() => setSelectedRx(null)}>Close</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default PatientDashboard;
