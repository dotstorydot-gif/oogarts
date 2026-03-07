import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    User,
    Users,
    Stethoscope,
    FileText,
    Shield,
    CheckCircle2,
    Trash2,
    Upload,
    ChevronRight,
    ChevronLeft,
    Heart,
    Activity,
    Info
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
        { id: 1, label: 'Personal Information', icon: User, desc: 'Contact & ID' },
        { id: 2, label: 'Medical History', icon: Stethoscope, desc: 'Past & Present' },
        { id: 3, label: 'Insurance Details', icon: Shield, desc: 'Coverage Info' },
        { id: 4, label: 'Visit Information', icon: FileText, desc: 'Triage Details' },
        { id: 5, label: 'Review & Submit', icon: CheckCircle2, desc: 'Final Check' },
    ];

    return (
        <Layout>
            <div className="max-w-[1600px] text-left">
                {/* Header Section */}
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Patient Records</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Onboarding Registry</h1>
                        <p className="text-slate-500 font-medium">Digital intake and clinical registry for new patient enrollment.</p>
                    </div>
                    <div className="text-right pb-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Onboarding Progress</p>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-black text-indigo-600 tracking-tighter">{Math.round((step / 5) * 100)}%</span>
                            <div className="w-32 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-600 transition-all duration-700 ease-out"
                                    style={{ width: `${(step / 5) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-10">
                    {/* Sidebar Steps Navigation */}
                    <div className="col-span-3 space-y-4">
                        {steps.map((s) => (
                            <div
                                key={s.id}
                                className={cn(
                                    "p-5 rounded-[24px] border transition-all duration-300 relative overflow-hidden group",
                                    s.id === step
                                        ? "bg-white border-indigo-100 shadow-xl shadow-indigo-50"
                                        : s.id < step
                                            ? "bg-slate-50/50 border-transparent opacity-60"
                                            : "bg-white/40 border-slate-100 cursor-not-allowed"
                                )}
                            >
                                {s.id === step && (
                                    <div className="absolute left-0 top-0 w-1 h-full bg-indigo-600" />
                                )}
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                        s.id === step ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-400"
                                    )}>
                                        <s.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className={cn(
                                            "text-[10px] font-black uppercase tracking-[0.1em]",
                                            s.id === step ? "text-indigo-600" : "text-slate-400"
                                        )}>Step {s.id}</p>
                                        <p className={cn(
                                            "text-xs font-bold truncate",
                                            s.id === step ? "text-slate-900" : "text-slate-400"
                                        )}>{s.label}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="p-6 bg-indigo-900 rounded-[32px] text-white mt-12 relative overflow-hidden">
                            <Activity className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
                            <Info className="w-5 h-5 text-indigo-300 mb-4" />
                            <p className="text-xs font-bold leading-relaxed mb-4">Complete all required fields marked with an asterisk (*)</p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                AUTOSAVING
                            </div>
                        </div>
                    </div>

                    {/* Main Form Content */}
                    <div className="col-span-9 flex flex-col gap-8">
                        <Card className="p-10 md:p-14 bg-white/70 backdrop-blur-xl border-white shadow-2xl shadow-indigo-100/20 min-h-[600px] flex flex-col">
                            {step === 1 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                                    <div className="mb-10">
                                        <h2 className="text-2xl font-black text-slate-900 mb-2">Personal Information</h2>
                                        <p className="text-slate-500 text-sm font-medium">Please provide accurate identification details.</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                                        {[
                                            { label: 'First Name *', key: 'firstName', placeholder: 'Enter first name' },
                                            { label: 'Last Name *', key: 'lastName', placeholder: 'Enter last name' },
                                            { label: 'Date of Birth *', key: 'dob', type: 'date' },
                                            { label: 'Gender *', key: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
                                            { label: 'Phone Number *', key: 'phone', placeholder: '(555) 000-0000' },
                                            { label: 'Email Address', key: 'email', placeholder: 'patient@email.com' },
                                        ].map((field) => (
                                            <div key={field.key} className="col-span-1">
                                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{field.label}</label>
                                                {field.type === 'select' ? (
                                                    <select
                                                        className="w-full bg-slate-50/50 border-2 border-transparent rounded-[20px] px-6 py-4 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-slate-900 appearance-none outline-none"
                                                        value={formData[field.key as keyof typeof formData] as string}
                                                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                                    >
                                                        <option value="">Select {field.key}</option>
                                                        {field.options?.map(opt => <option key={opt} value={opt.toLowerCase()}>{opt}</option>)}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type={field.type || 'text'}
                                                        placeholder={field.placeholder}
                                                        className="w-full bg-slate-50/50 border-2 border-transparent rounded-[20px] px-6 py-4 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-slate-900 outline-none"
                                                        value={formData[field.key as keyof typeof formData] as string}
                                                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        <div className="col-span-2">
                                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Residential Address *</label>
                                            <textarea
                                                placeholder="Enter full address"
                                                className="w-full bg-slate-50/50 border-2 border-transparent rounded-[24px] px-6 py-5 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-slate-900 outline-none h-28 resize-none"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Emergency Contact *</label>
                                            <input
                                                type="text"
                                                placeholder="Contact person name"
                                                className="w-full bg-slate-50/50 border-2 border-transparent rounded-[20px] px-6 py-4 focus:bg-white focus:border-indigo-100 transition-all font-bold text-slate-900 outline-none"
                                                value={formData.emergencyName}
                                                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Emergency Phone *</label>
                                            <input
                                                type="tel"
                                                placeholder="(555) 000-0000"
                                                className="w-full bg-slate-50/50 border-2 border-transparent rounded-[20px] px-6 py-4 focus:bg-white focus:border-indigo-100 transition-all font-bold text-slate-900 outline-none"
                                                value={formData.emergencyPhone}
                                                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                                    <div className="mb-10">
                                        <h2 className="text-2xl font-black text-slate-900 mb-2">Medical History</h2>
                                        <p className="text-slate-500 text-sm font-medium">Important clinical background for better care.</p>
                                    </div>
                                    <div className="space-y-10">
                                        {[
                                            { key: 'allergies', label: 'Allergies', color: 'bg-rose-50 text-rose-600', icon: Heart },
                                            { key: 'medications', label: 'Current Medications', color: 'bg-sky-50 text-sky-600', icon: Activity },
                                            { key: 'conditions', label: 'Chronic Conditions', color: 'bg-amber-50 text-amber-600', icon: Info },
                                        ].map((item) => (
                                            <div key={item.key} className="p-8 rounded-[32px] bg-slate-50/50 border border-slate-100">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center", item.color)}>
                                                            <item.icon className="w-4 h-4" />
                                                        </div>
                                                        <label className="text-sm font-black text-slate-900">{item.label}</label>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 mb-6">
                                                    <input
                                                        type="text"
                                                        placeholder={`Add ${item.key.slice(0, -1)}...`}
                                                        className="flex-1 bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:border-indigo-100 transition-all font-bold text-sm outline-none"
                                                        value={tempItem.type === item.key ? tempItem.value : ''}
                                                        onChange={(e) => setTempItem({ type: item.key, value: e.target.value })}
                                                        onKeyPress={(e) => e.key === 'Enter' && addItem(item.key as any)}
                                                    />
                                                    <Button
                                                        onClick={() => addItem(item.key as any)}
                                                        className="rounded-2xl px-6 bg-slate-900 hover:bg-black"
                                                    >Add</Button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {(formData[item.key as keyof typeof formData] as string[]).map((val, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl text-xs font-black shadow-sm border border-slate-100 group animate-in zoom-in-50">
                                                            <span className="text-slate-700">{val}</span>
                                                            <button
                                                                onClick={() => removeItem(item.key as any, idx)}
                                                                className="text-slate-300 hover:text-rose-600 transition-colors"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                                    <div className="mb-10">
                                        <h2 className="text-2xl font-black text-slate-900 mb-2">Insurance Details</h2>
                                        <p className="text-slate-500 text-sm font-medium">Verified coverage for seamless billing.</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="col-span-2">
                                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Select Provider *</label>
                                            <div className="grid grid-cols-3 gap-4">
                                                {['MetLife', 'Bupa', 'AXA', 'BCBS', 'Aetna', 'Cigna'].map(prov => (
                                                    <button
                                                        key={prov}
                                                        onClick={() => setFormData({ ...formData, provider: prov.toLowerCase() })}
                                                        className={cn(
                                                            "p-4 rounded-2xl border-2 transition-all font-black text-sm",
                                                            formData.provider === prov.toLowerCase()
                                                                ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-lg shadow-indigo-50"
                                                                : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
                                                        )}
                                                    >
                                                        {prov}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Policy Number</label>
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900"
                                                placeholder="Enter policy ID"
                                                value={formData.policyNumber}
                                                onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Group Number</label>
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900"
                                                placeholder="Enter group ID"
                                                value={formData.groupNumber}
                                                onChange={(e) => setFormData({ ...formData, groupNumber: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-span-2 pt-6">
                                            <div className="border-2 border-dashed border-indigo-100 rounded-[40px] p-16 text-center hover:bg-indigo-50/30 transition-all group">
                                                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                                    <Upload className="w-8 h-8 text-indigo-600" />
                                                </div>
                                                <h3 className="text-xl font-black text-slate-900 mb-2">Drop Insurance Card</h3>
                                                <p className="text-slate-400 text-sm font-medium mb-8">PDF, PNG or JPG (Max 5MB)</p>
                                                <Button variant="outline" className="rounded-2xl px-10 border-slate-200 hover:bg-white shadow-xl shadow-indigo-100/10 font-bold">
                                                    Browse Gallery
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                                    <div className="mb-10 text-center">
                                        <h2 className="text-2xl font-black text-slate-900 mb-2">Visit Information</h2>
                                        <p className="text-slate-500 text-sm font-medium">Set your medical preferences for today.</p>
                                    </div>
                                    <div className="space-y-8 max-w-[600px] mx-auto">
                                        <div>
                                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 text-center">Primary Reason *</label>
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50/80 border-none rounded-[32px] px-8 py-5 text-lg font-bold text-slate-900 text-center shadow-inner"
                                                placeholder="Why are you visiting today?"
                                                value={formData.reason}
                                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            {['Routine', 'Urgent', 'Emergency'].map(level => (
                                                <button
                                                    key={level}
                                                    onClick={() => setFormData({ ...formData, urgency: level.toLowerCase() })}
                                                    className={cn(
                                                        "p-4 rounded-3xl border-2 transition-all font-black text-xs uppercase tracking-widest",
                                                        formData.urgency === level.toLowerCase()
                                                            ? level === 'Emergency' ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-indigo-50 border-indigo-200 text-indigo-700"
                                                            : "bg-slate-50 border-transparent text-slate-400"
                                                    )}
                                                >
                                                    {level}
                                                </button>
                                            ))}
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Specialty Channel</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { label: 'Cardiology', icon: Heart },
                                                    { label: 'Neurology', icon: Activity },
                                                    { label: 'Pediatrics', icon: User },
                                                    { label: 'General Medicine', icon: Stethoscope },
                                                ].map(spec => (
                                                    <button
                                                        key={spec.label}
                                                        onClick={() => setFormData({ ...formData, specialty: spec.label.toLowerCase() })}
                                                        className={cn(
                                                            "p-5 rounded-3xl border-2 transition-all flex items-center gap-4",
                                                            formData.specialty === spec.label.toLowerCase()
                                                                ? "bg-white border-indigo-600 text-indigo-600 shadow-xl shadow-indigo-100"
                                                                : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
                                                        )}
                                                    >
                                                        <spec.icon className="w-5 h-5 shrink-0" />
                                                        <span className="text-sm font-black truncate">{spec.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 5 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                                    <div className="mb-10 text-center">
                                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 mb-2">Review & Submit</h2>
                                        <p className="text-slate-500 text-sm font-medium">Final confirmation of your registration data.</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mb-10">
                                        <div className="p-8 rounded-[40px] bg-slate-900 text-white space-y-6">
                                            <div className="flex items-center gap-3">
                                                <User className="w-5 h-5 text-indigo-400" />
                                                <h4 className="font-black uppercase text-xs tracking-[0.2em]">Patient Basics</h4>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-400">FullName</span>
                                                    <span className="font-bold">{formData.firstName} {formData.lastName}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-400">Born</span>
                                                    <span className="font-bold">{formData.dob}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-400">Gender</span>
                                                    <span className="font-bold capitalize">{formData.gender || '-'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-[40px] bg-indigo-50 border border-indigo-100 space-y-6">
                                            <div className="flex items-center gap-3">
                                                <Shield className="w-5 h-5 text-indigo-600" />
                                                <h4 className="font-black uppercase text-xs tracking-[0.2em] text-indigo-900">Medical Summary</h4>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-indigo-400">Allergies</span>
                                                    <span className="font-black text-indigo-900">{formData.allergies.length} Items</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-indigo-400">Insurance</span>
                                                    <span className="font-black text-indigo-900 uppercase">{formData.provider || '-'}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-indigo-400">Priority</span>
                                                    <span className="font-black text-indigo-600 uppercase italic">{formData.urgency}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                                <Info className="w-6 h-6 text-slate-300" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900">Legal Agreement</p>
                                                <p className="text-xs text-slate-500 font-medium">By clicking submit, I agree to the privacy policy.</p>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full border-4 border-slate-200" />
                                    </div>
                                </div>
                            )}

                            {/* Sticky Footer Navigation inside Card */}
                            <div className="mt-auto pt-10 flex items-center justify-between border-t border-slate-100">
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    className={cn("gap-2 rounded-2xl px-6", step === 1 && "invisible")}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span className="font-bold">Previous</span>
                                </Button>

                                <div className="flex items-center gap-4">
                                    {step < 5 ? (
                                        <Button onClick={nextStep} className="gap-2 px-10 py-6 rounded-3xl bg-slate-900 font-black shadow-2xl shadow-slate-200">
                                            <span>Next Step</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <Button className="px-14 py-6 rounded-3xl bg-indigo-600 font-black shadow-2xl shadow-indigo-100 active:scale-95 transition-transform">
                                            Submit Registration
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>

                        <div className="flex justify-center">
                            <button
                                onClick={() => window.location.href = '/dashboard'}
                                className="text-slate-300 hover:text-slate-900 font-black text-xs uppercase tracking-[0.4em] transition-all"
                            >
                                Cancel & return
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Patients;
