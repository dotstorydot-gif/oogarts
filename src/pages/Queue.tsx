import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Clock,
    Play,
    CheckCircle2,
    AlertCircle,
    MoreVertical,
    Plus,
    Loader2,
    X
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Queue = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [showTicketForm, setShowTicketForm] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [patients, setPatients] = useState<any[]>([]);
    const [allPatients, setAllPatients] = useState<any[]>([]);
    const [doctors, setDoctors] = useState<any[]>([]);
    const [newTicket, setNewTicket] = useState({ 
        patient_id: '', 
        doctor_id: '', 
        type: 'Clinic Visit',
        specialty: 'General Medicine'
    });

    const [newPatientData, setNewPatientData] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        gender: 'Male'
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // 1. Check and Auto-seed Specialties & Doctors lookup tables if empty
            let { data: specs } = await supabase.from('specialties').select('id');
            let { data: docs } = await supabase.from('doctors').select('*');
            
            if ((!specs || specs.length === 0) || (!docs || docs.length === 0)) {
                console.log("Queue detection: DB lookup data empty, seeding lookup data...");
                if (!specs || specs.length === 0) {
                    await supabase.from('specialties').insert([
                        { name: 'General Medicine', description: 'Primary care and general health checkups', icon: 'Stethoscope', doctor_count: 1 },
                        { name: 'Cardiology', description: 'Heart and cardiovascular system', icon: 'Heart', doctor_count: 1 },
                        { name: 'Neurology', description: 'Brain, spinal cord, and nervous system', icon: 'Brain', doctor_count: 1 },
                        { name: 'Pediatrics', description: 'Medical care for infants and children', icon: 'Baby', doctor_count: 1 },
                        { name: 'Orthopedics', description: 'Bones, joints, ligaments, tendons', icon: 'Bone', doctor_count: 1 },
                        { name: 'Ophthalmology', description: 'Eye and vision care', icon: 'Eye', doctor_count: 1 }
                    ]);
                }
                if (!docs || docs.length === 0) {
                    const defaultDocs = [
                        { id: 'DOC-1', name: 'Dr. Sarah Jenkins', specialty: 'General Medicine', email: 'sarah.j@example.com', phone: '+1 (555) 987-6543', status: 'Active', image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200' },
                        { id: 'DOC-2', name: 'Dr. Michael Chen', specialty: 'Neurology', email: 'michael.c@example.com', phone: '+1 (555) 019-2834', status: 'Active', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' },
                        { id: 'DOC-3', name: 'Dr. Emily Parker', specialty: 'Pediatrics', email: 'emily.p@example.com', phone: '+1 (555) 456-7890', status: 'Active', image: 'https://images.unsplash.com/photo-1594824432257-f67b5cbeb730?auto=format&fit=crop&q=80&w=200' },
                        { id: 'DOC-4', name: 'Dr. James Wilson', specialty: 'Orthopedics', email: 'james.w@example.com', phone: '+1 (555) 321-0987', status: 'Active', image: 'https://images.unsplash.com/photo-1537368910025-7028a609b13c?auto=format&fit=crop&q=80&w=200' },
                        { id: 'DOC-5', name: 'Dr. Lisa Torres', specialty: 'Cardiology', email: 'lisa.t@example.com', phone: '+1 (555) 123-9876', status: 'Active', image: 'https://images.unsplash.com/photo-1622253692010-333f2da60318?auto=format&fit=crop&q=80&w=200' },
                        { id: 'DOC-6', name: 'Dr. Robert Kim', specialty: 'Ophthalmology', email: 'robert.k@example.com', phone: '+1 (555) 789-0123', status: 'Active', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' }
                    ];
                    for (const doc of defaultDocs) {
                        await supabase.from('doctors').upsert(doc);
                    }
                    const { data: updatedDocs } = await supabase.from('doctors').select('*');
                    docs = updatedDocs;
                }
            }

            // 2. Check and seed default Patient (Sophia Martinez) if table empty
            let { data: pts } = await supabase.from('patients').select('id, name');
            if (!pts || pts.length === 0) {
                const demoPatientId = 'PAT-1001';
                await supabase.from('patients').insert([{
                    id: demoPatientId,
                    name: 'Sophia Martinez',
                    email: 'sophia.m@example.com',
                    phone: '+1 (555) 123-4567',
                    dob: '1992-05-15',
                    gender: 'Female',
                    blood_type: 'A+',
                    status: 'Active',
                    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
                    last_visit: 'Oct 12, 2024'
                }]);

                await supabase.from('vitals').insert([{
                    patient_id: demoPatientId,
                    blood_pressure: '120/80',
                    heart_rate: 72,
                    temperature: 36.6,
                    weight: 70,
                    oxygen_sat: 98
                }]);

                // Insert demo appointments
                await supabase.from('appointments').insert([
                    {
                        id: `APP-101`,
                        patient_id: demoPatientId,
                        doctor_id: 'DOC-2',
                        doctor_name: 'Dr. Michael Chen',
                        specialty: 'Neurology',
                        date: new Date().toISOString().split('T')[0],
                        time: '10:00 AM',
                        type: 'Clinic Visit',
                        status: 'Scheduled'
                    },
                    {
                        id: `APP-102`,
                        patient_id: demoPatientId,
                        doctor_id: 'DOC-1',
                        doctor_name: 'Dr. Sarah Jenkins',
                        specialty: 'General Medicine',
                        date: new Date().toISOString().split('T')[0],
                        time: '11:30 AM',
                        type: 'Clinic Visit',
                        status: 'Scheduled'
                    }
                ]);

                const { data: updatedPts } = await supabase.from('patients').select('id, name');
                pts = updatedPts;
            }

            // Fetch Appointments (Queue)
            const { data: appts } = await supabase
                .from('appointments')
                .select('*, patients(name)')
                .order('date', { ascending: true })
                .order('time', { ascending: true });
            
            const mappedAppts = (appts || []).map(a => ({
                id: a.id,
                name: a.patients?.name || a.doctor_name || 'Unknown',
                time: a.time,
                status: a.status,
                dept: a.specialty,
                type: a.type
            }));
            setPatients(mappedAppts);

            // Set state variables
            setDoctors(docs || []);
            setAllPatients(pts || []);

        } catch (error) {
            console.error("Error fetching queue data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleGenerateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const selectedDoctor = doctors.find(d => d.id === newTicket.doctor_id);
            const { error } = await supabase.from('appointments').insert([{
                id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
                patient_id: newTicket.patient_id,
                doctor_id: newTicket.doctor_id,
                doctor_name: selectedDoctor?.name || 'Unknown',
                specialty: selectedDoctor?.specialty || newTicket.specialty,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                type: newTicket.type,
                status: 'Scheduled'
            }]);

            if (error) throw error;
            alert(`Ticket generated successfully!`);
            setShowTicketForm(false);
            fetchData();
        } catch (error) {
            console.error("Error generating ticket:", error);
            alert("Failed to generate ticket.");
        }
    };

    const handleNextPatient = async (patientId: string) => {
        if (!patientId) return;
        try {
            const targetPatient = patients.find(p => p.id === patientId);
            if (!targetPatient) return;

            let nextStatus = 'Completed';
            if (targetPatient.status === 'Scheduled') {
                nextStatus = 'In Consultation';
            }

            const { error } = await supabase
                .from('appointments')
                .update({ status: nextStatus })
                .eq('id', patientId);
            
            if (error) throw error;
            fetchData();
        } catch (error) {
            console.error("Error updating patient status:", error);
        }
    };

    const handleRegisterAndAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const patientId = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;
            const emailPlaceholder = `${newPatientData.name.toLowerCase().replace(/\s+/g, '') || 'patient'}@demo.io`;
            
            const { error: regError } = await supabase.from('patients').insert([{
                id: patientId,
                name: newPatientData.name,
                phone: newPatientData.phone,
                email: emailPlaceholder,
                dob: newPatientData.dob || null, // Omit empty string to prevent postgres parse errors
                gender: newPatientData.gender || 'Male',
                status: 'Active',
                image: `https://ui-avatars.com/api/?name=${encodeURIComponent(newPatientData.name)}&background=random`
            }]);

            if (regError) throw regError;

            // Automatically open ticket form for the new patient
            setNewTicket({ ...newTicket, patient_id: patientId });
            setShowRegistrationModal(false);
            setShowTicketForm(true);
            fetchData();
        } catch (error) {
            console.error("Error registering patient:", error);
            alert("Failed to register patient.");
        }
    };

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Queue Management</h1>
                        <p className="text-slate-500 font-bold text-sm">Real-time patient flow and automated ticket status tracking.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="gap-2" onClick={fetchData}>
                            <Loader2 size={16} className={isLoading ? 'animate-spin' : ''} />
                            <span className="text-sm">Refresh Queue</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="gap-2 border-slate-200 hover:border-slate-900 transition-colors active:scale-95"
                            onClick={() => setShowRegistrationModal(true)}
                        >
                            <Plus size={20} />
                            <span>Quick Register</span>
                        </Button>
                        <Button
                            variant="dark"
                            className="gap-2 shadow-2xl shadow-slate-200 active:scale-95"
                            onClick={() => setShowTicketForm(true)}
                        >
                            <Plus size={20} />
                            <span>Generate New Ticket</span>
                        </Button>
                    </div>
                </div>

                {showTicketForm && (
                    <Card className="mb-10 p-8 border-indigo-100 bg-indigo-50/30 animate-in slide-in-from-top-4 duration-500">
                        <form onSubmit={handleGenerateTicket} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                            <div className="text-left">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Patient</label>
                                <select
                                    className="w-full px-6 py-4 bg-white border-2 border-slate-100 focus:border-indigo-200 rounded-2xl font-bold outline-none appearance-none"
                                    value={newTicket.patient_id}
                                    onChange={(e) => setNewTicket({ ...newTicket, patient_id: e.target.value })}
                                    required
                                >
                                    <option value="">Select Patient</option>
                                    {allPatients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div className="text-left">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Doctor</label>
                                <select
                                    className="w-full px-6 py-4 bg-white border-2 border-slate-100 focus:border-indigo-200 rounded-2xl font-bold outline-none appearance-none"
                                    value={newTicket.doctor_id}
                                    onChange={(e) => setNewTicket({ ...newTicket, doctor_id: e.target.value })}
                                    required
                                >
                                    <option value="">Select Doctor</option>
                                    {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>)}
                                </select>
                            </div>
                            <div className="flex gap-3">
                                <Button type="submit" variant="dark" className="flex-1 h-[60px] rounded-2xl">
                                    Generate Ticket
                                </Button>
                                <Button type="button" variant="outline" className="h-[60px] rounded-2xl" onClick={() => setShowTicketForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}

                {showRegistrationModal && (
                    <Card className="mb-10 p-8 border-emerald-100 bg-emerald-50/30 animate-in slide-in-from-top-4 duration-500 relative">
                        <button onClick={() => setShowRegistrationModal(false)} className="absolute top-6 right-6 p-2 hover:bg-white rounded-full transition-colors text-slate-400">
                            <X size={20} />
                        </button>
                        <div className="mb-8 text-left">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Register New Patient</h2>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Quick registry for walk-ins</p>
                        </div>
                        <form onSubmit={handleRegisterAndAdd} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-2 text-left">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Full Name</label>
                                <input 
                                    type="text" 
                                    className="w-full px-6 py-4 bg-white border-2 border-slate-100 focus:border-emerald-200 rounded-2xl font-bold outline-none"
                                    value={newPatientData.name}
                                    onChange={(e) => setNewPatientData({...newPatientData, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="text-left">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Phone</label>
                                <input 
                                    type="tel" 
                                    className="w-full px-6 py-4 bg-white border-2 border-slate-100 focus:border-emerald-200 rounded-2xl font-bold outline-none"
                                    value={newPatientData.phone}
                                    onChange={(e) => setNewPatientData({...newPatientData, phone: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="flex items-end">
                                <Button type="submit" variant="secondary" className="w-full h-[60px] rounded-2xl">
                                    Register & Proceed
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 mb-8">
                            {['active', 'completed', 'delayed'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                        activeTab === tab ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                                <p className="text-slate-400 font-bold">Refreshing live queue...</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {patients.filter(p => {
                                    if (activeTab === 'active') return p.status === 'Scheduled' || p.status === 'In Consultation';
                                    if (activeTab === 'completed') return p.status === 'Completed';
                                    return p.status === 'Delayed';
                                }).map((patient) => (
                                    <Card key={patient.id} className="p-6 hover:shadow-xl hover:translate-x-2 transition-all duration-300 group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-400 text-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                    {patient.id.split('-')[1] || '00'}
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="font-black text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{patient.name}</h3>
                                                    <div className="flex items-center gap-4 mt-1">
                                                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                                            <Clock size={14} />
                                                            {patient.time}
                                                        </span>
                                                        <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md">
                                                            {patient.dept}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                                    patient.status === 'In Consultation' ? "bg-emerald-50 text-emerald-600" : 
                                                    patient.status === 'Scheduled' ? "bg-amber-50 text-amber-600" :
                                                    "bg-slate-50 text-slate-400"
                                                )}>
                                                    {patient.status}
                                                </div>
                                                {patient.status !== 'Completed' && (
                                                    <Button 
                                                        variant="ghost" 
                                                        className="w-10 h-10 p-0 rounded-full hover:bg-emerald-50 hover:text-emerald-600"
                                                        onClick={() => handleNextPatient(patient.id)}
                                                    >
                                                        <CheckCircle2 size={20} />
                                                    </Button>
                                                )}
                                                <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-300">
                                                    <MoreVertical size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-8">
                        <Card className="p-8 bg-slate-900 text-white relative overflow-hidden">
                            <div className="relative z-10 text-left">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Now Serving</p>
                                <h2 className="text-4xl font-black mb-2">{patients.find(p => p.status === 'In Consultation')?.name || 'None'}</h2>
                                <p className="text-slate-400 font-bold mb-8">Token: {patients.find(p => p.status === 'In Consultation')?.id || '---'}</p>
                                <Button 
                                    variant="dark" 
                                    className="w-full bg-white text-slate-900 hover:bg-indigo-50 font-black py-4 rounded-2xl gap-2" 
                                    onClick={() => handleNextPatient(patients.find(p => p.status === 'In Consultation')?.id)}
                                    disabled={!patients.find(p => p.status === 'In Consultation')}
                                >
                                    <Play size={18} fill="currentColor" />
                                    Call Next Patient
                                </Button>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
                        </Card>

                        <Card className="p-8 text-left">
                            <h3 className="font-black text-slate-900 text-xl mb-6">Queue Analytics</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-500 italic">Avg. Waiting Time</span>
                                    <span className="text-lg font-black text-indigo-600">14 min</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-500 italic">Patients Waiting</span>
                                    <span className="text-lg font-black text-amber-500">{patients.filter(p => p.status === 'Scheduled').length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-500 italic">Completed Today</span>
                                    <span className="text-lg font-black text-emerald-500">{patients.filter(p => p.status === 'Completed').length}</span>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-emerald-500 mb-2">
                                    <AlertCircle size={18} />
                                    <span className="text-xs font-black uppercase tracking-widest">System Optimal</span>
                                </div>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed">Flow rate is within normal parameters. Capacity utilization at 72%.</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Queue;
