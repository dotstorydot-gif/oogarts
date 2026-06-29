import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Card, Button } from '../components/layout/BaseUI';
import { supabase } from '../lib/supabase';

const Login = () => {
    const navigate = useNavigate();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [formData, setFormData] = useState({
        organization: '',
        username: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);

        const targetRole = 
            formData.username === 'admin' ? 'admin' :
            formData.username === 'doctor' ? 'doctor' :
            formData.username === 'patient' ? 'patient' : null;

        if (
            formData.organization !== 'Healthcare' ||
            !targetRole ||
            (formData.username === 'admin' && formData.password !== 'Admin@xyz') ||
            (formData.username === 'doctor' && formData.password !== 'Doctor@xyz') ||
            (formData.username === 'patient' && formData.password !== 'Patient@xyz')
        ) {
            alert('Invalid credentials.\nAdmin: Healthcare / admin / Admin@xyz\nDoctor: Healthcare / doctor / Doctor@xyz\nPatient: Healthcare / patient / Patient@xyz');
            setIsLoggingIn(false);
            return;
        }

        try {
            const email = `${formData.username}@oogarts.com`;
            const password = formData.password;

            // Attempt to login to Supabase Auth
            let { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            let user = authData?.user;

            if (signInError) {
                // If user doesn't exist, register them
                if (
                    signInError.message.includes('Invalid login credentials') || 
                    signInError.message.includes('Email not confirmed') || 
                    signInError.status === 400
                ) {
                    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                        email,
                        password
                    });
                    
                    if (signUpError) {
                        console.warn("Supabase signup failed, falling back to local simulation:", signUpError);
                    } else {
                        user = signUpData?.user;
                    }
                } else {
                    console.warn("Supabase signin failed, falling back to local simulation:", signInError);
                }
            }

            if (user) {
                // 1. Seed Specialties lookup data if empty
                const { data: existingSpecs } = await supabase.from('specialties').select('id').limit(1);
                if (!existingSpecs || existingSpecs.length === 0) {
                    await supabase.from('specialties').insert([
                        { name: 'General Medicine', description: 'Primary care and general health checkups', icon: 'Stethoscope', doctor_count: 1 },
                        { name: 'Cardiology', description: 'Heart and cardiovascular system', icon: 'Heart', doctor_count: 1 },
                        { name: 'Neurology', description: 'Brain, spinal cord, and nervous system', icon: 'Brain', doctor_count: 1 },
                        { name: 'Pediatrics', description: 'Medical care for infants and children', icon: 'Baby', doctor_count: 1 },
                        { name: 'Orthopedics', description: 'Bones, joints, ligaments, tendons', icon: 'Bone', doctor_count: 1 },
                        { name: 'Ophthalmology', description: 'Eye and vision care', icon: 'Eye', doctor_count: 1 }
                    ]);
                }

                // 2. Seed default doctors if empty
                const { data: existingDocs } = await supabase.from('doctors').select('id').limit(1);
                if (!existingDocs || existingDocs.length === 0) {
                    const defaultDocs = [
                        { id: 'DOC-1', name: 'Dr. Sarah Jenkins', specialty: 'General Medicine', email: 'sarah.j@example.com', phone: '+1 (555) 987-6543', status: 'Active', image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200' },
                        { id: 'DOC-3', name: 'Dr. Emily Parker', specialty: 'Pediatrics', email: 'emily.p@example.com', phone: '+1 (555) 456-7890', status: 'Active', image: 'https://images.unsplash.com/photo-1594824432257-f67b5cbeb730?auto=format&fit=crop&q=80&w=200' },
                        { id: 'DOC-4', name: 'Dr. James Wilson', specialty: 'Orthopedics', email: 'james.w@example.com', phone: '+1 (555) 321-0987', status: 'Active', image: 'https://images.unsplash.com/photo-1537368910025-7028a609b13c?auto=format&fit=crop&q=80&w=200' },
                        { id: 'DOC-5', name: 'Dr. Lisa Torres', specialty: 'Cardiology', email: 'lisa.t@example.com', phone: '+1 (555) 123-9876', status: 'Active', image: 'https://images.unsplash.com/photo-1622253692010-333f2da60318?auto=format&fit=crop&q=80&w=200' },
                        { id: 'DOC-6', name: 'Dr. Robert Kim', specialty: 'Ophthalmology', email: 'robert.k@example.com', phone: '+1 (555) 789-0123', status: 'Active', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' }
                    ];
                    for (const doc of defaultDocs) {
                        await supabase.from('doctors').upsert(doc);
                    }
                }

                // 3. Sync profile based on logged-in user
                if (targetRole === 'doctor') {
                    // Sync the logged-in doctor profile
                    await supabase.from('doctors').upsert({
                        id: user.id,
                        name: 'Dr. Michael Chen',
                        specialty: 'Neurology',
                        email: email,
                        phone: '+1 (555) 019-2834',
                        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
                        status: 'Active'
                    });
                } else if (targetRole === 'patient') {
                    // Sync the logged-in patient profile
                    await supabase.from('patients').upsert({
                        id: user.id,
                        name: 'Sophia Martinez',
                        email: email,
                        phone: '+1 (555) 123-4567',
                        dob: '1992-05-15',
                        gender: 'Female',
                        blood_type: 'A+',
                        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
                        status: 'Active',
                        last_visit: 'Oct 12, 2024'
                    });

                    // Seed clinical records for patient user.id if not already present
                    const { data: existingHist } = await supabase.from('medical_history').select('id').eq('patient_id', user.id).limit(1);
                    if (!existingHist || existingHist.length === 0) {
                        await supabase.from('medical_history').insert([
                            {
                                id: `H-${Math.floor(1000 + Math.random() * 9000)}`,
                                patient_id: user.id,
                                title: 'Migraine Follow-up',
                                date: '2026-06-20',
                                doctor: 'Dr. Michael Chen',
                                type: 'Consultation',
                                notes: 'Patient reported decreased frequency of migraines. Continued current treatment plan.'
                            },
                            {
                                id: `H-${Math.floor(1000 + Math.random() * 9000)}`,
                                patient_id: user.id,
                                title: 'Annual Physical Exam',
                                date: '2025-11-15',
                                doctor: 'Dr. Sarah Jenkins',
                                type: 'Exam',
                                notes: 'All vitals normal. Recommended lipid panel update.'
                            }
                        ]);

                        await supabase.from('prescriptions').insert([
                            {
                                id: `RX-${Math.floor(1000 + Math.random() * 9000)}`,
                                patient_id: user.id,
                                name: 'Amoxicillin',
                                dosage: '500mg',
                                frequency: '2x daily after meals',
                                status: 'Active',
                                days_left: 14
                            },
                            {
                                id: `RX-${Math.floor(1000 + Math.random() * 9000)}`,
                                patient_id: user.id,
                                name: 'Lisinopril',
                                dosage: '10mg',
                                frequency: '1x daily morning',
                                status: 'Refill Soon',
                                days_left: 3
                            }
                        ]);

                        await supabase.from('lab_results').insert([
                            { 
                                id: `L-${Math.floor(1000 + Math.random() * 9000)}`, 
                                patient_id: user.id,
                                name: 'Comprehensive Metabolic Panel', 
                                date: '2026-06-15', 
                                status: 'Normal',
                                result_details: 'Glucose: 92 mg/dL (Normal: 70-99). BUN: 14 mg/dL (Normal: 7-20). Creatinine: 0.9 mg/dL (Normal: 0.6-1.2).'
                            },
                            { 
                                id: `L-${Math.floor(1000 + Math.random() * 9000)}`, 
                                patient_id: user.id,
                                name: 'Lipid Panel', 
                                date: '2026-06-15', 
                                status: 'Review',
                                result_details: 'Total Cholesterol: 210 mg/dL (High). LDL: 135 mg/dL (Borderline High). HDL: 45 mg/dL (Normal).'
                            }
                        ]);

                        await supabase.from('vitals').insert([
                            {
                                patient_id: user.id,
                                blood_pressure: '120/80',
                                heart_rate: 72,
                                temperature: 36.6,
                                weight: 70,
                                oxygen_sat: 98
                            }
                        ]);
                    }
                }
            }
        } catch (err) {
            console.warn("Supabase synchronization error, using local simulation:", err);
        }

        // Complete login
        localStorage.setItem('userRole', targetRole);
        setIsLoggingIn(false);
        if (targetRole === 'patient') {
            navigate('/patient-dashboard');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] p-4 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-200/50 rounded-full blur-[120px]" />

            <Card className="w-full max-w-[480px] p-10 relative z-10">
                <div className="mb-10 text-center">
                    <div className="w-20 h-20 bg-indigo-600 rounded-[28px] mx-auto mb-6 flex items-center justify-center shadow-xl shadow-indigo-100">
                        <Building2 className="text-white w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                    <p className="text-slate-500">Log in to your oogarts account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Organization Name</label>
                        <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                required
                                disabled={isLoggingIn}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors disabled:opacity-50"
                                placeholder="Healthcare"
                                value={formData.organization}
                                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                required
                                disabled={isLoggingIn}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors disabled:opacity-50"
                                placeholder="admin"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="password"
                                required
                                disabled={isLoggingIn}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors disabled:opacity-50"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full py-5 text-lg group" disabled={isLoggingIn}>
                        {isLoggingIn ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Authenticating & Seeding...
                            </>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </Button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Trouble logging in? <a href="#" className="text-indigo-600 font-semibold hover:underline">Contact Support</a>
                </p>
            </Card>

            <div className="absolute bottom-8 text-slate-400 text-sm">
                © 2026 oogarts. All rights reserved.
            </div>
        </div>
    );
};

export default Login;
