import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    User,
    Stethoscope,
    FileText,
    Shield,
    CheckCircle2,
    Plus,
    Trash2,
    Upload,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';

const Patients = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Personal
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        emergencyName: '',
        emergencyPhone: '',
        // Step 2: Medical
        allergies: [] as string[],
        medications: [] as string[],
        conditions: [] as string[],
        surgeries: [] as string[],
        familyHistory: '',
        // Step 3: Insurance
        provider: '',
        policyNumber: '',
        groupNumber: '',
        // Step 4: Visit
        reason: '',
        symptoms: '',
        urgency: 'routine',
        specialty: ''
    });

    const [tempItem, setTempItem] = useState({ type: '', value: '' });

    const addItem = (type: 'allergies' | 'medications' | 'conditions' | 'surgeries') => {
        if (!tempItem.value) return;
        setFormData({ ...formData, [type]: [...formData[type], tempItem.value] });
        setTempItem({ type: '', value: '' });
    };

    const removeItem = (type: 'allergies' | 'medications' | 'conditions' | 'surgeries', index: number) => {
        const newList = [...formData[type]];
        newList.splice(index, 1);
        setFormData({ ...formData, [type]: newList });
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 5));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const steps = [
        { id: 1, label: 'Personal Information', icon: User },
        { id: 2, label: 'Medical History', icon: Stethoscope },
        { id: 3, label: 'Insurance Details', icon: Shield },
        { id: 4, label: 'Visit Information', icon: FileText },
        { id: 5, label: 'Review & Submit', icon: CheckCircle2 },
    ];

    return (
        <Layout>
            <div className="max-w-[900px] mx-auto text-left">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Patient Onboarding</h1>
                        <p className="text-slate-500 font-medium tracking-tight">Step {step} of 5 — {steps[step - 1].label}</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-4 mb-12">
                    {steps.map((s) => (
                        <div key={s.id} className="flex-1 flex flex-col gap-2">
                            <div className={cn(
                                "h-1.5 rounded-full transition-all duration-500",
                                s.id <= step ? "bg-indigo-600" : "bg-slate-100"
                            )} />
                            <div className="flex items-center gap-2">
                                <s.icon className={cn("w-3.5 h-3.5", s.id <= step ? "text-indigo-600" : "text-slate-300")} />
                                <span className={cn("text-[10px] font-bold uppercase tracking-wider", s.id <= step ? "text-indigo-600" : "text-slate-300")}>
                                    {s.label.split(' ')[0]}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <Card className="p-8 md:p-12 mb-8">
                    {step === 1 && (
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-1 border-b border-transparent">
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">First Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter first name"
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-slate-900"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Last Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter last name"
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-slate-900"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Date of Birth *</label>
                                <input
                                    type="date"
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-slate-900"
                                    value={formData.dob}
                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Gender *</label>
                                <select
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-slate-900 appearance-none"
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Phone Number *</label>
                                <input
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-slate-900"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="patient@email.com"
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-slate-900"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Address *</label>
                                <textarea
                                    placeholder="Enter complete address"
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-slate-900 h-24"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Emergency Contact Name *</label>
                                <input
                                    type="text"
                                    placeholder="Emergency contact name"
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-slate-900"
                                    value={formData.emergencyName}
                                    onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Emergency Contact Phone *</label>
                                <input
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-slate-900"
                                    value={formData.emergencyPhone}
                                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-10">
                            {[
                                { key: 'allergies', label: 'Allergies', placeholder: 'Add allergie' },
                                { key: 'medications', label: 'Medications', placeholder: 'Add medication' },
                                { key: 'conditions', label: 'Conditions', placeholder: 'Add condition' },
                                { key: 'surgeries', label: 'Surgeries', placeholder: 'Add surgerie' },
                            ].map((item: any) => (
                                <div key={item.key}>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3.5">{item.label}</label>
                                    <div className="flex gap-2.5 mb-4">
                                        <input
                                            type="text"
                                            placeholder={item.placeholder}
                                            className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-sm"
                                            value={tempItem.type === item.key ? tempItem.value : ''}
                                            onChange={(e) => setTempItem({ type: item.key, value: e.target.value })}
                                            onKeyPress={(e) => e.key === 'Enter' && addItem(item.key)}
                                        />
                                        <Button
                                            onClick={() => addItem(item.key)}
                                            className="rounded-xl px-6"
                                        >Add</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData[item.key as keyof typeof formData] instanceof Array && (formData[item.key as keyof typeof formData] as string[]).map((val, idx) => (
                                            <div key={idx} className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold ring-1 ring-indigo-100 group">
                                                <span>{val}</span>
                                                <button onClick={() => removeItem(item.key, idx)} className="hover:text-rose-600">
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3.5">Family Medical History</label>
                                <textarea
                                    placeholder="Describe any relevant family medical history"
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-slate-900 h-24"
                                    value={formData.familyHistory}
                                    onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Insurance Provider *</label>
                                    <select
                                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 font-medium appearance-none"
                                        value={formData.provider}
                                        onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                                    >
                                        <option value="">Select insurance provider</option>
                                        <option value="metlife">MetLife</option>
                                        <option value="bupa">Bupa</option>
                                        <option value="axa">AXA</option>
                                        <option value="bcbs">Blue Cross Blue Shield</option>
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Policy Number</label>
                                    <input
                                        type="text"
                                        placeholder="Enter policy number"
                                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 font-medium"
                                        value={formData.policyNumber}
                                        onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Group Number</label>
                                    <input
                                        type="text"
                                        placeholder="Enter group number"
                                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 font-medium"
                                        value={formData.groupNumber}
                                        onChange={(e) => setFormData({ ...formData, groupNumber: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Upload Insurance Card</label>
                                <div className="border-2 border-dashed border-slate-100 rounded-[32px] p-12 text-center hover:border-indigo-100 hover:bg-slate-50/50 transition-all cursor-pointer group">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="w-6 h-6 text-slate-300" />
                                    </div>
                                    <p className="font-bold text-slate-900 mb-1">Choose Files</p>
                                    <p className="text-xs text-slate-500 max-w-[200px] mx-auto font-medium">Please upload a clear photo of both sides of your insurance card</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-8">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Primary Reason for Visit *</label>
                                <input
                                    type="text"
                                    placeholder="Brief description of main concern"
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 font-medium"
                                    value={formData.reason}
                                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Symptoms & Details</label>
                                <textarea
                                    placeholder="Describe your symptoms in detail"
                                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 font-medium h-32"
                                    value={formData.symptoms}
                                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Urgency Level *</label>
                                    <select
                                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 font-medium appearance-none"
                                        value={formData.urgency}
                                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                                    >
                                        <option value="routine">Routine</option>
                                        <option value="urgent">Urgent</option>
                                        <option value="emergency">Emergency</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Preferred Specialty</label>
                                    <select
                                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-100 font-medium appearance-none"
                                        value={formData.specialty}
                                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                    >
                                        <option value="">Select specialty</option>
                                        <option value="cardiology">Cardiology</option>
                                        <option value="neurology">Neurology</option>
                                        <option value="pediatrics">Pediatrics</option>
                                        <option value="general">General Medicine</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Review Your Information</h3>
                                <p className="text-slate-500 font-medium text-sm">Please review all information before submitting</p>
                            </div>

                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Personal Information</h4>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-slate-500">Name: <span className="font-bold text-slate-900 ml-1">{formData.firstName} {formData.lastName}</span></p>
                                            <p className="text-sm font-medium text-slate-500">DOB: <span className="font-bold text-slate-900 ml-1">{formData.dob}</span></p>
                                            <p className="text-sm font-medium text-slate-500">Phone: <span className="font-bold text-slate-900 ml-1">{formData.phone}</span></p>
                                            <p className="text-sm font-medium text-slate-500">Email: <span className="font-bold text-slate-900 ml-1">{formData.email}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Visit Information</h4>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-slate-500">Primary Concern: <span className="font-bold text-slate-900 ml-1 uppercase">{formData.reason}</span></p>
                                            <p className="text-sm font-medium text-slate-500">Urgency: <span className="font-bold text-indigo-600 ml-1 uppercase">{formData.urgency}</span></p>
                                            <p className="text-sm font-medium text-slate-500">Specialty: <span className="font-bold text-slate-900 ml-1 uppercase">{formData.specialty}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-indigo-600 rounded-[32px] p-8 text-white relative overflow-hidden">
                                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                                <h3 className="text-lg font-bold mb-1">Ready to Submit</h3>
                                <p className="text-indigo-100 text-sm font-medium">Your information will be processed and you'll receive your queue number</p>
                            </div>
                        </div>
                    )}
                </Card>

                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={prevStep}
                        className={cn("gap-2", step === 1 && "invisible")}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                    </Button>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={() => window.location.href = '/dashboard'}
                            className="text-slate-400 font-bold"
                        >
                            Back to Dashboard
                        </Button>
                        {step < 5 ? (
                            <Button onClick={nextStep} className="gap-2 px-8">
                                <span>Next</span>
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        ) : (
                            <Button className="px-10 font-black shadow-xl shadow-indigo-100">
                                Submit Registration
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Patients;
