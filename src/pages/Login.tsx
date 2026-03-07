import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, Lock, ArrowRight } from 'lucide-react';
import { Card, Button } from '../components/layout/BaseUI';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        organization: '',
        username: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Admin credentials
        if (
            formData.organization === 'Healthcare' &&
            formData.username === 'admin' &&
            formData.password === 'Admin@xyz'
        ) {
            localStorage.setItem('userRole', 'admin');
            navigate('/dashboard');
        }
        // Doctor credentials
        else if (
            formData.organization === 'Healthcare' &&
            formData.username === 'doctor' &&
            formData.password === 'Doctor@xyz'
        ) {
            localStorage.setItem('userRole', 'doctor');
            navigate('/dashboard');
        }
        // Patient credentials
        else if (
            formData.organization === 'Healthcare' &&
            formData.username === 'patient' &&
            formData.password === 'Patient@xyz'
        ) {
            localStorage.setItem('userRole', 'patient');
            navigate('/patient-dashboard');
        }
        else {
            alert('Invalid credentials.\nAdmin: Healthcare / admin / Admin@xyz\nDoctor: Healthcare / doctor / Doctor@xyz\nPatient: Healthcare / patient / Patient@xyz');
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
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors"
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
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors"
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
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full py-5 text-lg group">
                        Sign In
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
