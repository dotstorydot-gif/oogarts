import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card, Button, Input, cn } from '../components/layout/BaseUI';
import {
    Users,
    ClipboardList,
    Stethoscope,
    Activity,
    Heart,
    Thermometer,
    Droplet,
    Save,
    Printer,
    Send,
    CircleDot,
    FileText,
    Pill,
    Plus,
    Search,
    X,
    Check,
    Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Prescription {
    id: string;
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
}

const DoctorReports = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const patientId = searchParams.get('id');
    const [activeTab, setActiveTab] = useState('Examination');
    const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [patient, setPatient] = useState<any>(null);
    const [vitals, setVitals] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reportData, setReportData] = useState({
        examination: '',
        diagnosis: '',
        icdCode: 'I10',
        instructions: ''
    });
    const [patientsList, setPatientsList] = useState<any[]>([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const { data } = await supabase.from('patients').select('id, name').order('name');
            setPatientsList(data || []);
        };
        fetchPatients();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!patientId) {
                setPatient(null);
                setVitals(null);
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            try {
                const { data: pt } = await supabase.from('patients').select('*').eq('id', patientId).single();
                setPatient(pt);

                const { data: vt } = await supabase.from('vitals').select('*').eq('patient_id', patientId).order('recorded_at', { ascending: false }).limit(1).maybeSingle();
                setVitals(vt);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [patientId]);

    const medications = [
        'Amoxicillin 500mg',
        'Lisinopril 10mg',
        'Atorvastatin 20mg',
        'Metformin 850mg',
        'Amlodipine 5mg',
        'Metoprolol 25mg',
        'Omeprazole 20mg',
        'Simvastatin 40mg'
    ];

    const filteredMeds = medications.filter(m => m.toLowerCase().includes(searchQuery.toLowerCase()));

    const addPrescription = (med: string) => {
        const newPres: Prescription = {
            id: Math.random().toString(36).substr(2, 9),
            medication: med,
            dosage: '1 tablet',
            frequency: 'Twice daily',
            duration: '7 days'
        };
        setPrescriptions([...prescriptions, newPres]);
        setIsPrescriptionModalOpen(false);
        setSearchQuery('');
    };

    const handleSubmit = async () => {
        if (!patientId) return;
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            // Save medical history
            const { error: histError } = await supabase.from('medical_history').insert([{
                patient_id: patientId,
                doctor_id: user.id,
                date: new Date().toISOString().split('T')[0],
                title: 'Clinical Consultation',
                notes: reportData.diagnosis,
                findings: reportData.examination,
                advice: reportData.instructions
            }]);
            if (histError) throw histError;

            // Save prescriptions
            if (prescriptions.length > 0) {
                const { error: rxError } = await supabase.from('prescriptions').insert(
                    prescriptions.map(p => ({
                        patient_id: patientId,
                        doctor_id: user.id,
                        name: p.medication,
                        dosage: p.dosage,
                        frequency: p.frequency,
                        status: 'Active'
                    }))
                );
                if (rxError) throw rxError;
            }

            // Update patient last visit
            await supabase.from('patients').update({ last_visit: new Date().toISOString().split('T')[0] }).eq('id', patientId);

            alert('Medical report submitted successfully!');
            navigate('/doctor-dashboard');
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Failed to submit report.");
        }
    };

    const tabs = ['Examination', 'Diagnosis', 'Treatment', 'Orders'];

    return (
        <Layout>
            <div className="max-w-[1600px] text-left">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Doctor Interface</h1>
                        <div className="flex items-center gap-3">
                            <p className="text-slate-500 font-medium">Patient consultation system |</p>
                            <select 
                                className="bg-slate-100 border-none rounded-lg px-3 py-1 text-sm font-bold text-indigo-600 outline-none cursor-pointer"
                                value={patientId || ''}
                                onChange={(e) => navigate(`/doctor-reports?id=${e.target.value}`)}
                            >
                                <option value="">Switch Patient</option>
                                {patientsList.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 rounded-xl">
                            <Save className="w-4 h-4" />
                            <span>Save Draft</span>
                        </Button>
                                <Button className="gap-2 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-100" onClick={handleSubmit}>
                            <Send className="w-4 h-4" />
                            <span>Submit Report</span>
                        </Button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold">Synchronizing medical records...</p>
                    </div>
                ) : (
                <div className="grid grid-cols-12 gap-8">
                    {/* Left Column: Patient Profile & Vitals */}
                    <div className="col-span-4 space-y-8">
                        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-0 text-white shadow-2xl shadow-slate-200">
                            <div className="flex items-center gap-5 mb-10">
                                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                                    <Users className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1.5">Patient ID: {patient?.id || '---'}</p>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-2xl font-black tracking-tight">{patient?.name || 'Unknown Patient'}</h2>
                                        <span className={cn("px-3 py-1 text-[10px] font-black uppercase rounded-full border", patient?.status === 'Active' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-500/10 text-slate-400 border-slate-500/20")}>
                                            {patient?.status || 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <span className="text-slate-400 text-xs font-bold">Age / Gender</span>
                                    <span className="font-black text-sm text-indigo-300">{patient?.dob ? `${new Date().getFullYear() - new Date(patient.dob).getFullYear()} yrs` : '--'}, {patient?.gender || '--'}</span>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Patient Profile Notes</p>
                                    <p className="text-sm font-bold leading-relaxed text-indigo-100">{patient?.allergies?.join(', ') || 'No allergies reported.'}</p>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h3 className="font-black text-slate-900 tracking-tight">Vital Signs</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Temp', value: vitals?.temp ? `${vitals.temp}°C` : '--', icon: Thermometer, color: 'indigo' },
                                    { label: 'BP', value: vitals?.bp || '--', icon: Heart, color: 'rose' },
                                    { label: 'Pulse', value: vitals?.heart_rate || '--', icon: Activity, color: 'emerald' },
                                    { label: 'Weight', value: vitals?.weight ? `${vitals.weight}kg` : '--', icon: Droplet, color: 'sky' },
                                ].map((v) => (
                                    <div key={v.label} className="p-5 rounded-[24px] bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group overflow-hidden relative">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                                            v.color === 'indigo' && "bg-indigo-50 text-indigo-600",
                                            v.color === 'rose' && "bg-rose-50 text-rose-600",
                                            v.color === 'emerald' && "bg-emerald-50 text-emerald-600",
                                            v.color === 'sky' && "bg-sky-50 text-sky-600"
                                        )}>
                                            <v.icon className="w-5 h-5" />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{v.label}</p>
                                        <p className="text-xl font-black text-slate-900 tracking-tighter">{v.value}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <ClipboardList className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h3 className="font-black text-slate-900 tracking-tight">Background</h3>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Medical History</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-black border border-slate-200/50">Hypertension</span>
                                        <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-black border border-slate-200/50">Type 2 Diabetes</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-4">Known Allergies</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-black border border-rose-100">Penicillin</span>
                                        <span className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-black border border-rose-100">Shellfish</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Medical Report Modules */}
                    <div className="col-span-8 space-y-6">
                        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit mb-4">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                                        activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <Card className="min-h-[600px] shadow-2xl shadow-indigo-50/20">
                            {activeTab === 'Examination' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                            <Stethoscope className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Examination</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Physical assessment & findings</p>
                                        </div>
                                    </div>
                                    <textarea
                                        className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-[32px] p-10 min-h-[400px] text-lg font-medium text-slate-700 focus:bg-white transition-all outline-none shadow-inner"
                                        placeholder="Begin typing clinical observations..."
                                        value={reportData.examination}
                                        onChange={(e) => setReportData({ ...reportData, examination: e.target.value })}
                                    />
                                </div>
                            )}

                            {activeTab === 'Diagnosis' && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div>
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                                <FileText className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Diagnosis & ICD-10</h3>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clinical coding & impression</p>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[24px] border border-slate-100 focus-within:border-indigo-200 transition-colors">
                                                <Search className="w-5 h-5 text-slate-400" />
                                                <input
                                                    type="text"
                                                    className="flex-1 bg-transparent border-none p-0 font-bold text-lg text-slate-900 focus:ring-0 outline-none placeholder:text-slate-400"
                                                    placeholder="Search ICD-10 code (e.g. I10 for Hypertension)..."
                                                    value={reportData.icdCode}
                                                    onChange={(e) => setReportData({ ...reportData, icdCode: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-8 border-t border-slate-100/50">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Doctor's Impression</h4>
                                        <textarea
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-[28px] p-8 min-h-[150px] font-medium text-slate-700 focus:bg-white transition-all outline-none shadow-inner"
                                            placeholder="Enter overall clinical impression..."
                                            value={reportData.diagnosis}
                                            onChange={(e) => setReportData({ ...reportData, diagnosis: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Treatment' && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div>
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                                <Pill className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Treatment Plan</h3>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prescriptions & advice</p>
                                            </div>
                                        </div>

                                        {prescriptions.length > 0 && (
                                            <div className="space-y-4 mb-8">
                                                {prescriptions.map((p) => (
                                                    <div key={p.id} className="flex items-center justify-between p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 group animate-in slide-in-from-left-4 duration-300">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                                                                <Check className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-slate-900">{p.medication}</p>
                                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                                    {p.dosage} • {p.frequency} • {p.duration}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="w-10 h-10 p-0 rounded-xl text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                                                            onClick={() => setPrescriptions(prescriptions.filter(pr => pr.id !== p.id))}
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div
                                            className="p-12 rounded-[32px] bg-slate-50/50 border-2 border-slate-100 border-dashed flex flex-col items-center justify-center group hover:border-indigo-200 transition-all cursor-pointer"
                                            onClick={() => setIsPrescriptionModalOpen(true)}
                                        >
                                            <div className="p-5 bg-white rounded-2xl shadow-xl shadow-slate-200 mb-6 group-hover:scale-110 transition-transform">
                                                <Plus className="w-8 h-8 text-indigo-600" />
                                            </div>
                                            <p className="text-slate-900 font-black text-lg mb-2">Issue New Prescription</p>
                                            <p className="text-slate-400 text-sm font-medium">Click to search medication inventory</p>
                                        </div>
                                    </div>
                                    <div className="pt-8 border-t border-slate-100/50">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Patient Instructions</h4>
                                        <textarea
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-[28px] p-8 min-h-[150px] font-medium text-slate-700 focus:bg-white transition-all outline-none shadow-inner"
                                            placeholder="Advice provided to the patient..."
                                            value={reportData.instructions}
                                            onChange={(e) => setReportData({ ...reportData, instructions: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Orders' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                            <CircleDot className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Lab & Imaging</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Diagnostic requests</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            'Complete Blood Count',
                                            'Lipid Profile',
                                            'Chest X-Ray',
                                            'ECG/EKG'
                                        ].map((test) => (
                                            <div key={test} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:border-indigo-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer group">
                                                <span className="text-base font-black text-slate-700 tracking-tight">{test}</span>
                                                <Button variant="ghost" size="sm" className="hidden group-hover:flex">Add Order</Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>

                        <div className="flex justify-end gap-3 mt-8">
                            <Button variant="outline" className="gap-2 rounded-2xl px-10 border-slate-200">
                                <Printer className="w-5 h-5" />
                                <span>Print Report</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>

            {/* Prescription Selection Modal */}
            {isPrescriptionModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6">
                    <Card className="w-full max-w-lg bg-white shadow-3xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Select Medication</h2>
                            <Button variant="ghost" className="rounded-full w-10 h-10 p-0" onClick={() => setIsPrescriptionModalOpen(false)}>
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                                placeholder="Search inventory..."
                                className="pl-12"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {filteredMeds.map((med) => (
                                <button
                                    key={med}
                                    className="w-full p-4 rounded-2xl text-left font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-between group"
                                    onClick={() => addPrescription(med)}
                                >
                                    <span>{med}</span>
                                    <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                                </button>
                            ))}
                            {filteredMeds.length === 0 && (
                                <div className="p-8 text-center text-slate-400 font-bold">No results found</div>
                            )}
                        </div>
                    </Card>
                </div>
            )}
        </Layout>
    );
};

export default DoctorReports;
