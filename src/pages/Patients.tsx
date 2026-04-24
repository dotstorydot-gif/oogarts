import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import { Search, Plus, FileText, Activity, Clock, ChevronRight, Pill, Calendar, Mail, Phone, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Patient } from '../lib/mockData';

const Patients = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPatients = async () => {
            setIsLoading(true);
            try {
                // Fetch patients
                const { data: patientsData, error: pError } = await supabase.from('patients').select('*');
                if (pError) throw pError;

                // For a real app we'd fetch relations on demand, but for syncing with our old UI:
                const { data: rxData } = await supabase.from('prescriptions').select('*');
                const { data: histData } = await supabase.from('medical_history').select('*');
                const { data: labData } = await supabase.from('lab_results').select('*');

                const mappedPatients: Patient[] = (patientsData || []).map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    email: p.email,
                    phone: p.phone,
                    dob: p.dob,
                    gender: p.gender,
                    bloodType: p.blood_type,
                    image: p.image,
                    lastVisit: p.last_visit,
                    status: p.status,
                    allergies: p.allergies || [],
                    history: (histData || []).filter((h: any) => h.patient_id === p.id),
                    prescriptions: (rxData || []).filter((rx: any) => rx.patient_id === p.id).map((rx: any) => ({...rx, daysLeft: rx.days_left})),
                    labs: (labData || []).filter((l: any) => l.patient_id === p.id)
                }));

                setPatients(mappedPatients);
            } catch (error) {
                console.error("Error fetching patients:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatients();
    }, []);

    const filteredPatients = patients.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto text-left">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Patient Directory</h1>
                        <p className="text-slate-500 font-medium">Search and manage patient health records.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-full sm:w-80">
                            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search patients by name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border-2 border-slate-100 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                            />
                        </div>
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white shrink-0">
                            <Plus className="w-4 h-4 mr-2" /> New Patient
                        </Button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-medium">Loading patients securely...</p>
                    </div>
                ) : selectedPatient ? (
                    /* Detail View */
                    <div className="animate-in slide-in-from-right-4 duration-300">
                        <div className="mb-6 flex items-center justify-between">
                            <Button variant="ghost" onClick={() => setSelectedPatient(null)} className="text-slate-500 hover:text-slate-900">
                                ← Back to Directory
                            </Button>
                            <span className={cn("px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest", selectedPatient.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600')}>
                                {selectedPatient.status} Status
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Left Column - Profile & Quick Stats */}
                            <div className="lg:col-span-4 space-y-6">
                                <Card className="p-6 border-slate-100 text-center shadow-sm">
                                    <img src={selectedPatient.image} alt={selectedPatient.name} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg mb-4" />
                                    <h2 className="text-xl font-black text-slate-900">{selectedPatient.name}</h2>
                                    <p className="text-sm font-medium text-slate-500 mb-6">{selectedPatient.id}</p>
                                    
                                    <div className="space-y-3 text-left">
                                        <div className="flex items-center gap-3 text-sm font-medium text-slate-600 p-3 bg-slate-50 rounded-xl">
                                            <Phone className="w-4 h-4 text-indigo-500" /> {selectedPatient.phone}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-medium text-slate-600 p-3 bg-slate-50 rounded-xl">
                                            <Mail className="w-4 h-4 text-indigo-500" /> {selectedPatient.email}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-medium text-slate-600 p-3 bg-slate-50 rounded-xl">
                                            <Calendar className="w-4 h-4 text-indigo-500" /> {selectedPatient.dob} ({selectedPatient.gender})
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6 border-slate-100 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-indigo-500" /> Vitals & Alerts
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                            <span className="text-sm text-slate-500 font-medium">Blood Type</span>
                                            <span className="font-black text-rose-500">{selectedPatient.bloodType}</span>
                                        </div>
                                        <div>
                                            <span className="text-sm text-slate-500 font-medium block mb-2">Allergies</span>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPatient.allergies.length > 0 ? selectedPatient.allergies.map((allergy, idx) => (
                                                    <span key={idx} className="px-2.5 py-1 bg-rose-50 text-rose-600 rounded-md text-[10px] font-black uppercase tracking-widest">{allergy}</span>
                                                )) : <span className="text-sm text-slate-400">No known allergies</span>}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Right Column - Medical History, Labs, Prescriptions */}
                            <div className="lg:col-span-8 space-y-6">
                                <Card className="p-6 border-slate-100 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-indigo-500" /> Clinical History
                                    </h3>
                                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                        {selectedPatient.history.map(item => (
                                            <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-600 text-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                                    <Activity className="w-4 h-4" />
                                                </div>
                                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-slate-100 bg-white shadow-sm">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                                                        <time className="text-xs font-medium text-slate-400">{item.date}</time>
                                                    </div>
                                                    <p className="text-sm text-slate-500">{item.doctor}</p>
                                                    {item.notes && (
                                                        <div className="mt-3 inline-flex items-center gap-2 bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-100">
                                                            <FileText className="w-3 h-3 text-indigo-500" /> {item.notes}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="p-6 border-slate-100 shadow-sm">
                                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <Pill className="w-5 h-5 text-indigo-500" /> Prescriptions
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedPatient.prescriptions.map(rx => (
                                                <div key={rx.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold text-sm text-slate-900">{rx.name}</p>
                                                        <p className="text-xs text-slate-500">{rx.dosage}</p>
                                                    </div>
                                                    <span className={cn("px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest", rx.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                                                        {rx.status}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>

                                    <Card className="p-6 border-slate-100 shadow-sm">
                                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-indigo-500" /> Lab Results
                                        </h3>
                                        <div className="space-y-3">
                                            {selectedPatient.labs.map(lab => (
                                                <div key={lab.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold text-sm text-slate-900">{lab.name}</p>
                                                        <p className="text-xs text-slate-500">{lab.date}</p>
                                                    </div>
                                                    <span className={cn("px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest", lab.status === 'Normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                                                        {lab.status}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* List View */
                    <Card className="p-0 border-slate-100 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest">Patient</th>
                                        <th className="py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest">Contact</th>
                                        <th className="py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest">Last Visit</th>
                                        <th className="py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="py-4 px-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredPatients.map((patient) => (
                                        <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedPatient(patient)}>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <img src={patient.image} alt={patient.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                                                    <div>
                                                        <p className="font-bold text-slate-900 text-sm">{patient.name}</p>
                                                        <p className="text-xs font-medium text-slate-500">{patient.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                                                    <Phone className="w-3 h-3 text-slate-400" /> {patient.phone}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                                    <Mail className="w-3 h-3 text-slate-400" /> {patient.email}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm font-medium text-slate-600">
                                                {patient.lastVisit}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={cn("px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest", patient.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600')}>
                                                    {patient.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ChevronRight className="w-5 h-5 text-indigo-600" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredPatients.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">
                                                No patients found matching "{searchQuery}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </Layout>
    );
};

export default Patients;
