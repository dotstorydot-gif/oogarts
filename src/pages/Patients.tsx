import {
    Building2,
    Search,
    History,
    FileText,
    Upload,
    Calendar,
    Phone,
    Mail,
    MapPin,
    Stethoscope,
    CheckCircle2,
    Users
} from 'lucide-react';
import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';

const Patients = () => {
    const [step, setStep] = useState(1);

    return (
        <Layout>
            <div className="max-w-[1000px] mx-auto text-left">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Patient Onboarding</h1>
                        <p className="text-slate-500">Register new patients and collect medical history.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                            <History className="w-4 h-4 mr-2" /> Recent Boards
                        </Button>
                    </div>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center gap-0 mb-12">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-1 items-center last:flex-none">
                            <div
                                onClick={() => setStep(s)}
                                className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg cursor-pointer transition-all",
                                    step === s ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-110" :
                                        step > s ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"
                                )}
                            >
                                {s}
                            </div>
                            {s < 3 && <div className={cn("flex-1 h-1 mx-4 rounded-full", step > s ? "bg-indigo-600" : "bg-slate-100")} />}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-8">
                        <Card className="p-10">
                            {step === 1 && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input type="text" className="w-full px-6 py-4 bg-slate-50 border-0 rounded-2xl placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="e.g. John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Date of Birth</label>
                                            <input type="date" className="w-full px-6 py-4 bg-slate-50 border-0 rounded-2xl placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                                            <select className="w-full px-6 py-4 bg-slate-50 border-0 rounded-2xl placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium appearance-none">
                                                <option>Select Gender</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Blood Group</label>
                                            <select className="w-full px-6 py-4 bg-slate-50 border-0 rounded-2xl placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium appearance-none">
                                                <option>Select Group</option>
                                                <option>A+</option>
                                                <option>B+</option>
                                                <option>O+</option>
                                                <option>AB+</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Contact Details</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input type="tel" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-0 rounded-2xl placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="Phone Number" />
                                            </div>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input type="email" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-0 rounded-2xl placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="Email Address" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Building2 className="w-4 h-4" />
                                            <span className="text-xs font-medium">Auto-saving...</span>
                                        </div>
                                        <Button size="md" onClick={() => setStep(2)}>Next Step</Button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-indigo-600" />
                                            Current Symptoms & Reason for Visit
                                        </h4>
                                        <textarea className="w-full px-6 py-4 bg-slate-50 border-0 rounded-3xl min-h-[120px] focus:ring-2 focus:ring-indigo-100" placeholder="Describe current condition..." />
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-sky-500" />
                                            Known Allergies
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Penicillin', 'Peanuts', 'Latex', 'Dust'].map(a => (
                                                <button key={a} className="px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold border border-rose-100 hover:bg-rose-100 transition-colors uppercase tracking-wider">{a}</button>
                                            ))}
                                            <button className="px-5 py-2.5 border-2 border-dashed border-slate-200 text-slate-400 rounded-xl text-xs font-bold hover:border-indigo-300 hover:text-indigo-400 transition-all">+ Add New</button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Medical Documents</label>
                                            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-300 hover:bg-indigo-50/10 cursor-pointer transition-all group">
                                                <Upload className="w-8 h-8 text-slate-300 mb-2 group-hover:text-indigo-500 transition-colors" />
                                                <p className="text-xs font-bold text-slate-500">Upload Lab Results</p>
                                                <p className="text-[10px] text-slate-400 mt-1">PDF, JPG (Max 10MB)</p>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-indigo-500" />
                                                Vital Signs
                                            </h4>
                                            <div className="space-y-3">
                                                <input type="text" className="w-full px-5 py-3 bg-slate-50 border-0 rounded-xl text-sm" placeholder="Height (cm)" />
                                                <input type="text" className="w-full px-5 py-3 bg-slate-50 border-0 rounded-xl text-sm" placeholder="Weight (kg)" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-50 flex justify-between">
                                        <Button variant="ghost" size="md" onClick={() => setStep(1)}>Back</Button>
                                        <Button size="md" onClick={() => setStep(3)}>Next Step</Button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8">
                                    <div className="text-center py-10">
                                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Registration Complete</h3>
                                        <p className="text-slate-500 max-w-[400px] mx-auto text-sm">Review details and assign the patient to a department for immediate attention.</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Card glass={false} className="border-2 border-slate-100 hover:border-indigo-600 cursor-pointer transition-all p-6 group">
                                            <Stethoscope className="w-8 h-8 text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
                                            <h4 className="font-bold text-slate-900 border-none p-0 text-base">General Medicine</h4>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">Queue: 12 Patients Today</p>
                                        </Card>
                                        <Card glass={false} className="border-2 border-slate-100 hover:border-indigo-600 cursor-pointer transition-all p-6 group">
                                            <Users className="w-8 h-8 text-sky-500 mb-3 group-hover:scale-110 transition-transform" />
                                            <h4 className="font-bold text-slate-900 border-none p-0 text-base">Cardiology</h4>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">Queue: 04 Patients Today</p>
                                        </Card>
                                    </div>

                                    <Button className="w-full py-5 text-lg font-bold">Finalize & Assign Token</Button>
                                </div>
                            )}
                        </Card>
                    </div>

                    <div className="col-span-4 space-y-8">
                        <Card>
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Search className="w-4 h-4 text-indigo-600" />
                                Onboarding Guide
                            </h3>
                            <p className="text-sm text-slate-500 mb-6">Critical steps for registration:</p>
                            <ul className="space-y-5">
                                {[
                                    { l: 'Collect Identity Proof', d: 'ID card or Passport' },
                                    { l: 'Verify Insurance', d: 'Check validity' },
                                    { l: 'Allergy Mapping', d: 'Critical safety check' },
                                    { l: 'Specialty Routing', d: 'Department assignment' }
                                ].map(i => (
                                    <li key={i.l} className="flex gap-4">
                                        <div className="w-6 h-6 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5"><div className="w-2 h-2 bg-indigo-600 rounded-full" /></div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 leading-tight">{i.l}</p>
                                            <p className="text-[11px] text-slate-400 mt-1 font-medium">{i.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <Card className="bg-sky-500 text-white border-0 shadow-xl shadow-sky-100">
                            <h3 className="font-bold text-white mb-2">Need Help?</h3>
                            <p className="text-white/80 text-[11px] leading-relaxed mb-6 font-medium">Contact the medical support center for emergency registrations or technical issues.</p>
                            <Button variant="outline" size="sm" className="w-full text-white border-white/20 hover:bg-white/10">Medical Support</Button>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Patients;
