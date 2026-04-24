import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Users,
    Calendar,
    Search,
    MessageSquare,
    Video,
    Clock,
    ChevronRight,
    FileText,
    Plus,
    Loader2,
    CheckCircle2,
    Clipboard,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { Appointment, LabRequest } from '../lib/mockData';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [doctorProfile, setDoctorProfile] = useState<any>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [labRequests, setLabRequests] = useState<LabRequest[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [foundPatient, setFoundPatient] = useState<any>(null);
    const [patientVitals, setPatientVitals] = useState<any>(null);
    const [stats, setStats] = useState({
        todayConsultations: 0,
        pendingLabs: 0,
        unreadMessages: 4,
        telemedicineCount: 0
    });

    const [showLabModal, setShowLabModal] = useState(false);
    const [showRxModal, setShowRxModal] = useState(false);
    const [showVitalsModal, setShowVitalsModal] = useState(false);
    const [newLabRequest, setNewLabRequest] = useState({ testName: '', priority: 'Normal' });
    const [newRx, setNewRx] = useState({ name: '', dosage: '', frequency: '' });

    useEffect(() => {
        const fetchDoctorData = async () => {
            setIsLoading(true);
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) throw new Error("Not authenticated");

                // Fetch Doctor Profile
                const { data: profile } = await supabase
                    .from('doctors')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                
                // If no profile found, use demo data
                const finalProfile = profile || {
                    id: user.id,
                    name: 'Dr. Michael Chen',
                    specialty: 'Neurology',
                    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
                };
                setDoctorProfile(finalProfile);
                
                // Fetch Appointments for this doctor
                const { data: appts, error: apptError } = await supabase
                    .from('appointments')
                    .select('*, patients(name, image)')
                    .eq('doctor_id', user.id)
                    .order('date', { ascending: true });
                
                if (apptError) throw apptError;
                
                const mappedAppts = (appts || []).map(a => ({
                    ...a,
                    patient_name: a.patients?.name || 'Unknown Patient',
                    patient_image: a.patients?.image || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
                }));
                setAppointments(mappedAppts);

                // Fetch Lab Requests for this doctor
                const { data: labs, error: labError } = await supabase
                    .from('lab_requests')
                    .select('*')
                    .eq('doctor_id', user.id)
                    .order('request_date', { ascending: false });
                
                if (labError) throw labError;
                setLabRequests(labs || []);

                // Calculate Stats
                setStats({
                    todayConsultations: (appts || []).length,
                    pendingLabs: (labs || []).filter((l: any) => l.status === 'Pending').length,
                    unreadMessages: 4,
                    telemedicineCount: (appts || []).filter((a: any) => a.type === 'Telemedicine').length
                });

            } catch (error) {
                console.error("Error fetching doctor dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDoctorData();
    }, []);

    const searchPatient = async () => {
        if (!searchQuery) return;
        try {
            const { data: patient, error } = await supabase
                .from('patients')
                .select('*')
                .or(`name.ilike.%${searchQuery}%,id.eq.${searchQuery}`)
                .single();
            
            if (error) throw error;
            setFoundPatient(patient);

            // Fetch Vitals
            const { data: vitals } = await supabase
                .from('vitals')
                .select('*')
                .eq('patient_id', patient.id)
                .order('recorded_at', { ascending: false })
                .limit(1)
                .single();
            
            setPatientVitals(vitals);
            setShowVitalsModal(true);
        } catch (error) {
            console.error("Error searching patient:", error);
            alert("Patient not found.");
        }
    };

    const handleLabSubmit = async () => {
        try {
            const { error } = await supabase.from('lab_requests').insert([{
                patient_id: nextPatient?.patient_id || 'PAT-1001',
                doctor_id: 'DOC-1',
                test_name: newLabRequest.testName,
                priority: newLabRequest.priority,
                status: 'Pending'
            }]);
            if (error) throw error;
            setShowLabModal(false);
            setNewLabRequest({ testName: '', priority: 'Normal' });
            // Refresh lab requests
            const { data } = await supabase.from('lab_requests').select('*').order('request_date', { ascending: false });
            setLabRequests(data || []);
        } catch (error) {
            console.error("Error submitting lab request:", error);
        }
    };

    const handleRxSubmit = async () => {
        try {
            const { error } = await supabase.from('prescriptions').insert([{
                patient_id: nextPatient?.patient_id || 'PAT-1001',
                name: newRx.name,
                dosage: newRx.dosage,
                frequency: newRx.frequency,
                status: 'Active',
                days_left: 30
            }]);
            if (error) throw error;
            setShowRxModal(false);
            setNewRx({ name: '', dosage: '', frequency: '' });
        } catch (error) {
            console.error("Error submitting prescription:", error);
        }
    };

    const nextPatient = appointments.find(a => a.status === 'Scheduled') as any;

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto text-left py-2">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2 italic">Clinical Hub</h1>
                        <p className="text-slate-500 font-medium">Manage your consultations, patients, and clinical workflows.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative hidden sm:block">
                            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Patient Search (Vitals/History)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchPatient()}
                                className="bg-white border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-2.5 text-sm font-medium w-64 focus:border-indigo-500 transition-all shadow-sm"
                            />
                        </div>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2" onClick={() => navigate('/appointments')}>
                            <Calendar className="w-4 h-4" /> Manage Schedule
                        </Button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold">Synchronizing clinical data...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Stats Row */}
                        <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard 
                                icon={Users} 
                                label="Today's Appointments" 
                                value={stats.todayConsultations.toString()} 
                                color="bg-indigo-600" 
                            />
                            <StatCard 
                                icon={Video} 
                                label="Telemedicine" 
                                value={stats.telemedicineCount.toString()} 
                                color="bg-sky-500" 
                            />
                            <StatCard 
                                icon={Clipboard} 
                                label="Pending Labs" 
                                value={stats.pendingLabs.toString()} 
                                color="bg-rose-500" 
                            />
                            <StatCard 
                                icon={MessageSquare} 
                                label="Unread Messages" 
                                value={stats.unreadMessages.toString()} 
                                color="bg-emerald-500" 
                            />
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Next Patient Focus */}
                            <Card className="p-0 overflow-hidden border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30">
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Consultation</h3>
                                        <div className="flex gap-2">
                                            <select 
                                                className="bg-indigo-100 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest px-3 py-1 outline-none cursor-pointer"
                                                onChange={(e) => {
                                                    const appt = appointments.find(a => a.id === e.target.value);
                                                    if (appt) setFoundPatient(appt);
                                                }}
                                            >
                                                <option value="">Select from Queue</option>
                                                {appointments.filter(a => a.status === 'Scheduled').map(a => (
                                                    <option key={a.id} value={a.id}>{a.patient_name} ({a.time})</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {nextPatient ? (
                                        <div className="flex flex-col md:flex-row items-center gap-10">
                                            <div className="relative">
                                                <div className="w-32 h-32 rounded-[40px] overflow-hidden border-4 border-white shadow-2xl">
                                                    <img src={nextPatient.patient_image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 border-4 border-white rounded-2xl flex items-center justify-center text-white">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </div>
                                            </div>
                                            <div className="flex-1 text-center md:text-left">
                                                <h2 className="text-3xl font-black text-slate-900 mb-2">{nextPatient?.patient_name || 'Patient Name'}</h2>
                                                <p className="text-slate-500 font-bold mb-6 flex items-center justify-center md:justify-start gap-2">
                                                    <Clock className="w-4 h-4 text-indigo-600" /> {nextPatient.time} • {nextPatient.type}
                                                </p>
                                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                                    <Button className="bg-slate-900 text-white gap-2" onClick={() => {
                                                        setFoundPatient({ id: nextPatient.patient_id, name: nextPatient.patient_name, image: nextPatient.patient_image });
                                                        searchPatient(); // To load vitals
                                                    }}>Start Exam</Button>
                                                    <Button variant="outline" className="gap-2" onClick={() => navigate(`/patients?id=${nextPatient.patient_id}`)}>View History</Button>
                                                    <Button variant="outline" className="gap-2 text-indigo-600 border-indigo-100" onClick={() => setShowRxModal(true)}>Add Prescription</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-10 text-center text-slate-400 font-bold">No active consultations at the moment.</div>
                                    )}
                                </div>
                                <div className="px-8 py-4 bg-white/50 border-t border-indigo-50 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            {appointments.slice(0, 3).map((a, i) => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                                    <img src={a.patient_image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs font-bold text-slate-500">{appointments.length > 0 ? `${appointments.length} more patients in queue` : 'Queue empty'}</p>
                                    </div>
                                    <Button variant="ghost" className="text-indigo-600 font-black text-xs uppercase tracking-widest gap-2" onClick={() => navigate('/queue')}>
                                        View All Queue <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>

                            {/* Lab Requests List */}
                            <Card className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Lab Requests</h3>
                                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowLabModal(true)}>
                                        <Plus className="w-4 h-4" /> Request New Test
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {labRequests.length === 0 ? (
                                        <p className="text-center py-10 text-slate-400 font-bold">No pending lab requests.</p>
                                    ) : (
                                        labRequests.map(req => (
                                            <div key={req.id} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-indigo-50/50 transition-colors">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-indigo-600 transition-colors">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 tracking-tight">{req.test_name}</p>
                                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">{req.patient_name} • {req.request_date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className={cn(
                                                        "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                                                        req.priority === 'Urgent' ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"
                                                    )}>
                                                        {req.priority}
                                                    </span>
                                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600">{req.status}</span>
                                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Doctor Profile Card */}
                            <Card className="p-8 bg-white border-indigo-100 shadow-xl shadow-indigo-50/50">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 rounded-[28px] overflow-hidden border-4 border-indigo-50 shadow-lg">
                                        <img src={doctorProfile?.image} className="w-full h-full object-cover" alt={doctorProfile?.name} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Signed In As</p>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{doctorProfile?.name}</h3>
                                        <p className="text-sm font-bold text-slate-400">{doctorProfile?.specialty}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-2xl">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Status</p>
                                        <p className="text-sm font-black text-emerald-600">{doctorProfile?.status || 'Active'}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">ID</p>
                                        <p className="text-sm font-black text-slate-900">#{(doctorProfile?.id || '001').slice(0, 6)}</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Schedule Overview */}
                            <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl shadow-indigo-200">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-black tracking-tight">Today's Schedule</h3>
                                    <Calendar className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div className="space-y-6">
                                    <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Morning Shift</p>
                                        <p className="text-lg font-black">09:00 AM - 01:00 PM</p>
                                        <p className="text-xs text-white/50 mt-1">General Clinic Visits</p>
                                    </div>
                                    <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                                        <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-1">Afternoon Shift</p>
                                        <p className="text-lg font-black">02:00 PM - 06:00 PM</p>
                                        <p className="text-xs text-white/50 mt-1">Telemedicine Focus</p>
                                    </div>
                                </div>
                                <Button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 text-white border-none gap-2" onClick={() => navigate('/settings')}>
                                    Edit Availability
                                </Button>
                            </Card>
                        </div>
                    </div>
                )}
            </div>

            {/* Vitals Modal (Search Result) */}
            {showVitalsModal && foundPatient && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <Card className="w-full max-w-2xl p-10 animate-in fade-in zoom-in-95 duration-300 relative">
                        <Button variant="ghost" className="absolute top-6 right-6" onClick={() => setShowVitalsModal(false)}><X className="w-6 h-6" /></Button>
                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-lg border-4 border-indigo-50">
                                <img src={foundPatient.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{foundPatient.name}</h3>
                                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Patient ID: {foundPatient.id} • {foundPatient.dob}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <VitalsCard label="Blood Pressure" value={patientVitals?.blood_pressure || '120/80'} unit="mmHg" />
                            <VitalsCard label="Heart Rate" value={patientVitals?.heart_rate?.toString() || '72'} unit="bpm" />
                            <VitalsCard label="Temp" value={patientVitals?.temperature?.toString() || '36.6'} unit="°C" />
                            <VitalsCard label="Weight" value={patientVitals?.weight?.toString() || '70'} unit="kg" />
                        </div>

                        <div className="space-y-6 text-left">
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Recent Diagnosis</h4>
                                <p className="text-slate-900 font-bold leading-relaxed">{foundPatient.notes || "No critical diagnosis recorded."}</p>
                            </div>
                            <div className="flex gap-4">
                                <Button className="flex-1 bg-indigo-600 text-white" onClick={() => { setShowVitalsModal(false); navigate(`/patients`); }}>Open Full History</Button>
                                <Button variant="outline" className="flex-1" onClick={() => setShowVitalsModal(false)}>Close</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Lab Modal */}
            {showLabModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <Card className="w-full max-w-lg p-10 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic">Request Lab Test</h3>
                            <Button variant="ghost" size="sm" onClick={() => setShowLabModal(false)}><X className="w-6 h-6" /></Button>
                        </div>
                        <div className="space-y-6 text-left">
                            <div>
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Test Name</label>
                                <input 
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-indigo-50 outline-none"
                                    placeholder="e.g. MRI Brain Scan, Full Blood Count"
                                    value={newLabRequest.testName}
                                    onChange={(e) => setNewLabRequest({...newLabRequest, testName: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Priority</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Normal', 'Urgent'].map(p => (
                                        <button 
                                            key={p}
                                            onClick={() => setNewLabRequest({...newLabRequest, priority: p})}
                                            className={cn(
                                                "py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                                                newLabRequest.priority === p ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                            )}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-4 flex gap-4">
                                <Button variant="ghost" className="flex-1" onClick={() => setShowLabModal(false)}>Cancel</Button>
                                <Button className="flex-1 bg-indigo-600 text-white" onClick={handleLabSubmit}>Submit Request</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Prescription Modal */}
            {showRxModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <Card className="w-full max-w-lg p-10 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic">Add Prescription</h3>
                            <Button variant="ghost" size="sm" onClick={() => setShowRxModal(false)}><X className="w-6 h-6" /></Button>
                        </div>
                        <div className="space-y-6 text-left">
                            <div>
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Medication Name</label>
                                <input 
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-indigo-50 outline-none"
                                    placeholder="e.g. Amoxicillin"
                                    value={newRx.name}
                                    onChange={(e) => setNewRx({...newRx, name: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Dosage</label>
                                    <input 
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-indigo-50 outline-none"
                                        placeholder="500mg"
                                        value={newRx.dosage}
                                        onChange={(e) => setNewRx({...newRx, dosage: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Frequency</label>
                                    <input 
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-indigo-50 outline-none"
                                        placeholder="Twice daily"
                                        value={newRx.frequency}
                                        onChange={(e) => setNewRx({...newRx, frequency: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex gap-4">
                                <Button variant="ghost" className="flex-1" onClick={() => setShowRxModal(false)}>Cancel</Button>
                                <Button className="flex-1 bg-emerald-500 text-white" onClick={handleRxSubmit}>Confirm Prescription</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </Layout>
    );
};

const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <Card className="p-6">
        <div className="flex items-start justify-between">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                <h4 className="text-2xl font-black text-slate-900 tracking-tighter">{value}</h4>
            </div>
        </div>
    </Card>
);

const VitalsCard = ({ label, value, unit }: any) => (
    <div className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
        <div className="flex items-baseline justify-center gap-1">
            <span className="text-xl font-black text-slate-900">{value}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{unit}</span>
        </div>
    </div>
);

export default DoctorDashboard;
