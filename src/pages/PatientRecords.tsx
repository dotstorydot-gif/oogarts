import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import { FileText, Upload, Plus, Clock, Activity, Pill, Download, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { Patient } from '../lib/mockData';

const PatientRecords = () => {
    const [patientData, setPatientData] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const fetchRecordsData = async () => {
            setIsLoading(true);
            try {
                const patientId = 'PAT-1001';
                const { data: patient, error: pError } = await supabase
                    .from('patients')
                    .select('*')
                    .eq('id', patientId)
                    .single();

                if (pError) throw pError;

                const { data: history } = await supabase
                    .from('medical_history')
                    .select('*')
                    .eq('patient_id', patientId)
                    .order('date', { ascending: false });

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
                    history: history || [],
                    prescriptions: (prescriptions || []).map((rx: any) => ({ ...rx, daysLeft: rx.days_left })),
                    labs: labs || [],
                    allergies: patient.allergies || []
                });
            } catch (error) {
                console.error("Error fetching records data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecordsData();
    }, []);

    const [uploadedFiles, setUploadedFiles] = useState([
        { name: 'MRI_Scan_Results_2023.pdf', date: 'Oct 10, 2024', size: '2.4 MB' },
        { name: 'Previous_Blood_Work.pdf', date: 'Sep 15, 2024', size: '1.1 MB' }
    ]);

    const handleDrop = (e: React.DragEvent | any) => {
        if (e.preventDefault) e.preventDefault();
        setIsDragging(false);
        // Mock successful upload
        const newFile = {
            name: `New_Medical_Report_${Math.floor(Math.random() * 1000)}.pdf`,
            date: 'Today',
            size: '1.8 MB'
        };
        setUploadedFiles([newFile, ...uploadedFiles]);
    };

    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left py-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold">Retrieving medical archives...</p>
                    </div>
                ) : !patientData ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500">Patient records not found.</p>
                    </div>
                ) : (
                    <>
                        {/* Header Section */}
                        <div className="mb-10 lg:flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Medical Records</h1>
                                <p className="text-slate-500 font-medium">Manage your health history, prescriptions, and test results.</p>
                            </div>
                        </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
                    
                    {/* Main Column - Upload & History */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Upload Section */}
                        <Card className="border-slate-100 p-0 overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                    <Upload className="w-5 h-5 text-indigo-600" /> Upload Reports
                                </h2>
                            </div>
                            <div className="p-8">
                                <div 
                                    className={cn(
                                        "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer",
                                        isDragging ? "border-indigo-500 bg-indigo-50/50" : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                                    )}
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={handleDrop}
                                    onClick={handleDrop}
                                >
                                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                                        <Plus className="w-8 h-8 text-indigo-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Click or drag files here</h3>
                                    <p className="text-sm font-medium text-slate-500 mb-4">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                                </div>

                                {/* Uploaded Files List */}
                                <div className="mt-6 space-y-3">
                                    {uploadedFiles.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-100 bg-white group transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-slate-900">{file.name}</p>
                                                    <p className="text-xs font-medium text-slate-400">{file.date} • {file.size}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Download className="w-4 h-4 text-slate-600" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Medical History Timeline */}
                        <div className="pt-4">
                            <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Timeline & History</h2>
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                {patientData.history.map(item => (
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
                        </div>

                    </div>

                    {/* Right Column - Lab Results & Prescriptions */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">Active Prescriptions</h2>
                            <div className="space-y-4">
                                {patientData.prescriptions.map(rx => (
                                    <Card key={rx.id} className={cn("p-5 border-slate-100 shadow-sm transition-colors", rx.status === 'Active' ? 'hover:border-sky-200' : 'hover:border-amber-200')}>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("w-8 h-8 flex items-center justify-center rounded-lg", rx.status === 'Active' ? 'bg-sky-50 text-sky-600' : 'bg-amber-50 text-amber-600')}>
                                                    <Pill className="w-4 h-4" />
                                                </div>
                                                <h4 className="font-black text-slate-900">{rx.name}</h4>
                                            </div>
                                            <span className={cn("px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest", rx.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')}>{rx.status}</span>
                                        </div>
                                        <p className="text-slate-500 font-medium text-xs mb-3">{rx.dosage} • {rx.frequency}</p>
                                        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                            <div className={cn("h-full", rx.status === 'Active' ? 'bg-sky-500 w-[60%]' : 'bg-rose-500 w-[10%]')} />
                                        </div>
                                        <p className={cn("text-[10px] font-black mt-1.5 text-right", rx.status === 'Active' ? 'text-slate-400' : 'text-rose-500')}>{rx.daysLeft} days left</p>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">Recent Lab Results</h2>
                            <Card className="p-0 shadow-sm border-slate-100 overflow-hidden divide-y divide-slate-50">
                                {patientData.labs.map((lab) => (
                                    <div key={lab.id} className="p-4 flex items-center justify-between hover:bg-slate-50 group transition-colors cursor-pointer">
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm mb-0.5">{lab.name}</p>
                                            <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {lab.date}
                                            </p>
                                        </div>
                                        <span className={cn("px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest", lab.status === 'Normal' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600')}>
                                            {lab.status}
                                        </span>
                                    </div>
                                ))}
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default PatientRecords;
