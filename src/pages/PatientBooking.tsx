import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Calendar as CalendarIcon,
    MapPin,
    Video,
    Stethoscope,
    Activity,
    Brain,
    Baby,
    Bone,
    Eye,
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SPECIALTIES = [
    { id: 'gen', name: 'General Medicine', icon: Activity, description: 'Primary care and general health checkups', available: 4 },
    { id: 'cardio', name: 'Cardiology', icon: Activity, description: 'Heart and cardiovascular system', available: 2 },
    { id: 'neuro', name: 'Neurology', icon: Brain, description: 'Brain, spinal cord, and nervous system', available: 1 },
    { id: 'peds', name: 'Pediatrics', icon: Baby, description: 'Medical care for infants and children', available: 3 },
    { id: 'ortho', name: 'Orthopedics', icon: Bone, description: 'Bones, joints, ligaments, tendons', available: 2 },
    { id: 'ophtha', name: 'Ophthalmology', icon: Eye, description: 'Eye and vision care', available: 1 },
];

const DOCTORS = [
    { id: 1, name: 'Dr. Sarah Jenkins', spec: 'gen', rating: 4.9, image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Dr. Michael Chen', spec: 'neuro', rating: 4.8, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' },
    { id: 3, name: 'Dr. Emily Parker', spec: 'peds', rating: 5.0, image: 'https://images.unsplash.com/photo-1594824432257-f67b5cbeb730?auto=format&fit=crop&q=80&w=200' },
    { id: 4, name: 'Dr. James Wilson', spec: 'ortho', rating: 4.7, image: 'https://images.unsplash.com/photo-1537368910025-7028a609b13c?auto=format&fit=crop&q=80&w=200' },
    { id: 5, name: 'Dr. Lisa Torres', spec: 'cardio', rating: 4.9, image: 'https://images.unsplash.com/photo-1622253692010-333f2da60318?auto=format&fit=crop&q=80&w=200' },
    { id: 6, name: 'Dr. Robert Kim', spec: 'ophtha', rating: 4.8, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' },
];

const TIME_SLOTS = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
];

const PatientBooking = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Booking State
    const [consultType, setConsultType] = useState<'in-person' | 'telemedicine' | null>(null);
    const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const patientId = user?.id || 'PAT-1001';
            const doctor = DOCTORS.find(d => d.id === selectedDoctor);
            const specialty = SPECIALTIES.find(s => s.id === selectedSpec);

            const { error } = await supabase
                .from('appointments')
                .insert({
                    id: `APP-${Math.floor(Math.random() * 10000)}`,
                    patient_id: patientId,
                    doctor_name: doctor?.name || 'Dr. Unknown',
                    specialty: specialty?.name || 'General',
                    date: selectedDate || 'Today',
                    time: selectedTime || '10:00 AM',
                    type: consultType === 'telemedicine' ? 'Telemedicine' : 'Clinic Visit',
                    status: 'Scheduled'
                });

            if (error) throw error;
            navigate('/patient-dashboard');
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Failed to book appointment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredDoctors = DOCTORS.filter(d => d.spec === selectedSpec);

    return (
        <Layout>
            <div className="max-w-[1000px] mx-auto text-left py-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Book an Appointment</h1>
                    <p className="text-slate-500 font-medium">Schedule your consultation with our specialists.</p>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-12 relative">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 rounded-full" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }} />

                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all duration-500 border-4 border-[#f1f5f9]",
                            step > i ? "bg-indigo-600 text-white" : step === i ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-white text-slate-400 border-slate-100"
                        )}>
                            {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
                        </div>
                    ))}
                </div>

                {/* Step 1: Consultation Type */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                        <h2 className="text-2xl font-black text-slate-900 mb-8">How would you like to consult?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card
                                className={cn(
                                    "p-8 cursor-pointer transition-all duration-300 border-2 hover:-translate-y-1",
                                    consultType === 'in-person' ? "border-indigo-600 shadow-xl shadow-indigo-100 bg-indigo-50/30" : "border-slate-100 hover:border-indigo-200 hover:shadow-lg"
                                )}
                                onClick={() => { setConsultType('in-person'); setTimeout(() => setStep(2), 300); }}
                            >
                                <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">In-Person Visit</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Visit our clinic for a comprehensive physical examination and direct face-to-face consultation with your doctor.</p>
                            </Card>

                            <Card
                                className={cn(
                                    "p-8 cursor-pointer transition-all duration-300 border-2 hover:-translate-y-1",
                                    consultType === 'telemedicine' ? "border-indigo-600 shadow-xl shadow-indigo-100 bg-indigo-50/30" : "border-slate-100 hover:border-indigo-200 hover:shadow-lg"
                                )}
                                onClick={() => { setConsultType('telemedicine'); setTimeout(() => setStep(2), 300); }}
                            >
                                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                                    <Video className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Telemedicine (Video Call)</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Consult with a specialist securely from the comfort of your home using our encrypted high-definition clinical video platform.</p>
                                <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                    Recommended
                                </div>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Step 2: Specialty & Doctor */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900">Choose a Specialty</h2>
                            <Button variant="ghost" className="text-slate-400 hover:text-slate-900" onClick={() => setStep(1)}>Back</Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                            {SPECIALTIES.map(spec => (
                                <Card
                                    key={spec.id}
                                    className={cn(
                                        "p-6 cursor-pointer transition-all duration-300 border-2",
                                        selectedSpec === spec.id ? "border-indigo-600 shadow-md bg-indigo-50/10" : "border-slate-100 hover:border-indigo-200"
                                    )}
                                    onClick={() => { setSelectedSpec(spec.id); setSelectedDoctor(null); }}
                                >
                                    <spec.icon className={cn("w-8 h-8 mb-4", selectedSpec === spec.id ? "text-indigo-600" : "text-slate-400")} />
                                    <h4 className="font-bold text-slate-900 mb-1">{spec.name}</h4>
                                    <p className="text-xs text-slate-500 font-medium">{spec.available} doctors available</p>
                                </Card>
                            ))}
                        </div>

                        {selectedSpec && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-t border-slate-100 pt-10">
                                <h2 className="text-xl font-black text-slate-900 mb-6">Select a Doctor</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {filteredDoctors.map(doctor => (
                                        <Card
                                            key={doctor.id}
                                            className={cn(
                                                "p-4 cursor-pointer transition-all duration-300 border-2 flex items-center justify-between",
                                                selectedDoctor === doctor.id ? "border-indigo-600 shadow-md bg-indigo-50/10" : "border-slate-100 hover:border-indigo-200"
                                            )}
                                            onClick={() => setSelectedDoctor(doctor.id)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <img src={doctor.image} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                                <div>
                                                    <h4 className="font-bold text-slate-900">{doctor.name}</h4>
                                                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
                                                        <span className="text-amber-500">★ {doctor.rating}</span>
                                                        <span>•</span>
                                                        <span>{SPECIALTIES.find(s => s.id === doctor.spec)?.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", selectedDoctor === doctor.id ? "border-indigo-600 bg-indigo-600" : "border-slate-200")}>
                                                {selectedDoctor === doctor.id && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <Button
                                        disabled={!selectedDoctor}
                                        onClick={() => setStep(3)}
                                        className="px-8"
                                    >
                                        Next Step
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3: Date & Time */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900">Select Date & Time</h2>
                            <Button variant="ghost" className="text-slate-400 hover:text-slate-900" onClick={() => setStep(2)}>Back</Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Simple Date Selector Mock */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Available Days</h3>
                                <div className="space-y-3">
                                    {['Today', 'Tomorrow', 'Oct 19, Thursday', 'Oct 20, Friday'].map((date, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4",
                                                selectedDate === date ? "border-indigo-600 bg-indigo-50/30 text-indigo-700 font-bold shadow-md" : "border-slate-100 hover:border-indigo-200 text-slate-700 font-medium"
                                            )}
                                            onClick={() => setSelectedDate(date)}
                                        >
                                            <CalendarIcon className="w-5 h-5" />
                                            {date}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div className={cn("transition-opacity duration-300", !selectedDate && "opacity-50 pointer-events-none")}>
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Available Times</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {TIME_SLOTS.map((time, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "p-3 text-center rounded-xl border-2 cursor-pointer transition-all text-sm font-bold",
                                                selectedTime === time ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-200" : "border-slate-100 hover:border-indigo-200 text-slate-600"
                                            )}
                                            onClick={() => setSelectedTime(time)}
                                        >
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex justify-end">
                            <Button
                                disabled={!selectedDate || !selectedTime}
                                onClick={() => setStep(4)}
                                className="px-10 py-4 shadow-xl shadow-indigo-200"
                            >
                                Review & Confirm
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 4: Confirmation */}
                {step === 4 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto">
                        <Card className="p-10 border-indigo-100 shadow-2xl shadow-indigo-100/50 text-center">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Almost Done!</h2>
                            <p className="text-slate-500 font-medium mb-10">Please review your appointment details below.</p>

                            <div className="bg-slate-50 rounded-2xl p-6 mb-10 text-left space-y-6">
                                <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                                        <Stethoscope className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Doctor</p>
                                        <p className="font-black text-lg text-slate-900">{DOCTORS.find(d => d.id === selectedDoctor)?.name}</p>
                                        <p className="text-sm font-bold text-slate-500">{SPECIALTIES.find(s => s.id === selectedSpec)?.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                                        <CalendarIcon className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Date & Time</p>
                                        <p className="font-black text-lg text-slate-900">{selectedDate}</p>
                                        <p className="text-sm font-bold text-slate-500">{selectedTime}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                                        {consultType === 'telemedicine' ? <Video className="w-6 h-6 text-indigo-600" /> : <MapPin className="w-6 h-6 text-indigo-600" />}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Type</p>
                                        <p className="font-black text-lg text-slate-900">{consultType === 'telemedicine' ? 'Telemedicine (Video Call)' : 'In-Person Visit'}</p>
                                        <p className="text-sm font-bold text-slate-500">
                                            {consultType === 'telemedicine' ? 'Link will be available in your dashboard' : 'Main Hospital, Floor 3, Suite B'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button variant="outline" className="flex-1 py-4" onClick={() => setStep(1)} disabled={isSubmitting}>Cancel</Button>
                                <Button className="flex-1 py-4 shadow-xl shadow-indigo-200" onClick={handleConfirm} disabled={isSubmitting}>
                                    {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default PatientBooking;
