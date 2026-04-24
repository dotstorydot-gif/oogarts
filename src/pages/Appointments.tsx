import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import { Calendar as CalendarIcon, Plus, User, Stethoscope, ChevronRight, X, Loader2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Appointments = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isRegistering, setIsRegistering] = useState(false);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [patients, setPatients] = useState<any[]>([]);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [isNewPatient, setIsNewPatient] = useState(false);
    const [formData, setFormData] = useState({
        patient_id: '',
        patient_name: '',
        doctor_id: '',
        doctor_name: '',
        date: '',
        time: '',
        type: 'Clinic Visit',
        specialty: 'General Medicine'
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            const role = localStorage.getItem('userRole') || 'admin';
            setUserProfile({ id: user.id, role });

            // Fetch Patients for selection
            const { data: pts } = await supabase.from('patients').select('id, name').order('name');
            setPatients(pts || []);

            // Fetch Appointments
            let query = supabase.from('appointments').select('*, patients(name)').order('date', { ascending: true });
            if (role === 'doctor') {
                query = query.eq('doctor_id', user.id);
            }
            const { data: appts, error } = await query;
            if (error) throw error;
            
            const mappedAppts = (appts || []).map(a => ({
                ...a,
                patient_name: a.patients?.name || 'Unknown Patient'
            }));
            setAppointments(mappedAppts || []);

            // Auto-fill doctor if role is doctor
            if (role === 'doctor') {
                const { data: doc } = await supabase.from('doctors').select('name, specialty').eq('id', user.id).single();
                setFormData(prev => ({ ...prev, doctor_id: user.id, doctor_name: doc?.name || 'Dr. Michael Chen', specialty: doc?.specialty || 'General Medicine' }));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsRegistering(true);
        try {
            let finalPatientId = formData.patient_id;

            // Handle New Patient Registration
            if (isNewPatient) {
                finalPatientId = 'PAT-' + Math.floor(Math.random() * 10000);
                const { error: ptError } = await supabase.from('patients').insert([{
                    id: finalPatientId,
                    name: formData.patient_name,
                    email: formData.patient_name.toLowerCase().replace(' ', '.') + '@demo.io',
                    status: 'Active'
                }]);
                if (ptError) throw ptError;
            }

            const { error } = await supabase.from('appointments').insert([{
                id: 'APP-' + Math.floor(Math.random() * 10000),
                patient_id: finalPatientId,
                doctor_id: formData.doctor_id || null,
                doctor_name: formData.doctor_name,
                date: formData.date,
                time: formData.time,
                type: formData.type,
                specialty: formData.specialty,
                status: 'Scheduled'
            }]);
            
            if (error) throw error;
            alert('Appointment Scheduled successfully!');
            setShowForm(false);
            fetchData();
        } catch (error) {
            console.error("Error scheduling appointment:", error);
            alert("Failed to schedule appointment.");
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-black italic tracking-tight">Appointments</h1>
                        <p className="text-slate-500 font-medium italic">Manage patient schedules and telemedicine sessions.</p>
                    </div>
                    {!showForm && (
                        <button
                            className="flex items-center gap-2.5 px-6 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-100 active:scale-95"
                            onClick={() => setShowForm(true)}
                        >
                            <Plus className="w-5 h-5" />
                            <span>Schedule Appointment</span>
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-8">
                        {showForm ? (
                            <Card className="p-8 sm:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white/80 backdrop-blur-xl border-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4">
                                    <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                        <X className="w-5 h-5 text-slate-400" />
                                    </button>
                                </div>
                                <div className="mb-10 text-left">
                                    <h2 className="text-2xl font-black text-slate-900 mb-2">Book Appointment</h2>
                                    <p className="text-slate-500 font-medium">Configure date and provider details.</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-8 text-left">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="sm:col-span-2">
                                            <div className="flex items-center justify-between mb-3">
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Information</label>
                                                <button 
                                                    type="button" 
                                                    onClick={() => setIsNewPatient(!isNewPatient)}
                                                    className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg transition-all", isNewPatient ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500")}
                                                >
                                                    {isNewPatient ? "Registering New" : "+ Register New"}
                                                </button>
                                            </div>
                                            
                                            <div className="relative">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                                {isNewPatient ? (
                                                    <input
                                                        type="text"
                                                        placeholder="Full Name of New Patient"
                                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[20px] font-bold outline-none transition-all"
                                                        value={formData.patient_name}
                                                        onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                                                        required
                                                    />
                                                ) : (
                                                    <select
                                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[20px] font-bold outline-none transition-all appearance-none"
                                                        value={formData.patient_id}
                                                        onChange={(e) => {
                                                            const p = patients.find(p => p.id === e.target.value);
                                                            setFormData({ ...formData, patient_id: e.target.value, patient_name: p?.name || '' });
                                                        }}
                                                        required
                                                    >
                                                        <option value="">Select Existing Patient</option>
                                                        {patients.map(p => (
                                                            <option key={p.id} value={p.id}>{p.name}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {userProfile?.role === 'admin' && (
                                            <div className="sm:col-span-2">
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Assign Doctor</label>
                                                <div className="relative">
                                                    <Stethoscope className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                                    <input
                                                        type="text"
                                                        placeholder="Doctor Name"
                                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[20px] font-bold outline-none transition-all"
                                                        value={formData.doctor_name}
                                                        onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Specialty</label>
                                            <div className="relative">
                                                <Stethoscope className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                                <select
                                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[20px] font-bold outline-none transition-all appearance-none"
                                                    value={formData.specialty}
                                                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                                >
                                                    <option>General Medicine</option>
                                                    <option>Cardiology</option>
                                                    <option>Pediatrics</option>
                                                    <option>Neurology</option>
                                                    <option>Dermatology</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Time Slot</label>
                                            <div className="relative">
                                                <Clock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                                <input
                                                    type="time"
                                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[20px] font-bold outline-none transition-all"
                                                    value={formData.time}
                                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[20px] font-bold outline-none transition-all"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Type</label>
                                            <select
                                                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[20px] font-bold outline-none transition-all"
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            >
                                                <option>Clinic Visit</option>
                                                <option>Telemedicine</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="pt-6">
                                        <Button type="submit" disabled={isRegistering} className="w-full py-5 rounded-3xl bg-slate-900 hover:bg-black font-black flex items-center justify-center gap-3 overflow-hidden group shadow-2xl shadow-indigo-100">
                                            {isRegistering ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Confirm Appointment</span>}
                                            {!isRegistering && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        ) : (
                            <Card className="min-h-[500px] flex flex-col items-center justify-center text-center p-14 bg-white/50 border-white/50 backdrop-blur-sm">
                                {isLoading ? (
                                    <div className="flex flex-col items-center">
                                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                                        <p className="text-slate-500 font-bold">Synchronizing schedules...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-24 h-24 bg-slate-50/50 rounded-[32px] flex items-center justify-center mb-8 border border-white">
                                            <CalendarIcon className="w-12 h-12 text-slate-300" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                                            {appointments.length > 0 ? `${appointments.length} Active Schedules` : "No Active Schedules"}
                                        </h3>
                                        <p className="text-slate-500 font-medium max-w-xs mx-auto italic mb-10">Digital health registry is currently synchronized and ready for new admissions.</p>
                                        <Button onClick={() => setShowForm(true)} className="rounded-2xl px-10 py-6 bg-slate-900 hover:bg-black font-black shadow-xl shadow-slate-200 active:scale-95 transition-all">
                                            Schedule New Appointment
                                        </Button>
                                    </>
                                )}
                            </Card>
                        )}
                    </div>
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <Card>
                            <h4 className="font-bold text-slate-900 mb-6">Upcoming Sessions</h4>
                            <div className="space-y-4">
                                {isLoading ? (
                                    <div className="flex justify-center py-8">
                                        <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                                    </div>
                                ) : appointments.length === 0 ? (
                                    <p className="text-slate-400 text-sm italic py-4">No sessions found</p>
                                ) : (
                                    appointments.slice(0, 5).map((appt) => (
                                        <div key={appt.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 group hover:bg-white hover:shadow-xl transition-all">
                                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">{new Date(appt.date).toLocaleString('default', { month: 'short' })}</span>
                                                <span className="text-sm font-black text-slate-900">{new Date(appt.date).getDate()}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-slate-900 truncate mb-1">{appt.patient_name}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{appt.type}</p>
                                                <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="outline" className="flex-1 py-1.5 px-2 text-[10px] text-slate-500 h-auto">Edit</Button>
                                                    <Button className="flex-1 py-1.5 px-2 text-[10px] bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 h-auto whitespace-nowrap" onClick={() => navigate('/telemedicine')}>
                                                        Open
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Appointments;
