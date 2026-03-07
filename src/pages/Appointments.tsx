import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button } from '../components/layout/BaseUI';
import { Calendar as CalendarIcon, Clock, Plus, User, Stethoscope, ChevronRight, X, Video, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        patient: '',
        doctor: '',
        date: '',
        time: '',
        type: 'General'
    });

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Appointment Scheduled successfully!');
        setShowForm(false);
    };

    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-black italic tracking-tight">Appointments</h1>
                        <p className="text-slate-500 font-medium italic">Manage patient schedules and telemedicine sessions.</p>
                    </div>
                    {!showForm && (
                        <button
                            className="flex items-center gap-2.5 px-6 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-100 active:scale-95"
                            onClick={() => setShowForm(true)}
                        >
                            <Plus className="w-5 h-5" />
                            <span>Schedule Appointment</span>
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-8">
                        {showForm ? (
                            <Card className="p-8 sm:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white/80 backdrop-blur-xl border-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4">
                                    <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                        <X className="w-5 h-5 text-slate-400" />
                                    </button>
                                </div>
                                <div className="mb-10 text-left">
                                    <h2 className="text-2xl font-black text-slate-900 mb-2">Book Appointment</h2>
                                    <p className="text-slate-500 font-medium">Configure date and provider details.</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-8 text-left">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="col-span-2">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Select Patient</label>
                                            <div className="relative">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                                <input
                                                    type="text"
                                                    placeholder="Search patient name..."
                                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[20px] font-bold outline-none transition-all"
                                                    value={formData.patient}
                                                    onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Department</label>
                                            <div className="relative">
                                                <Stethoscope className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                                <select
                                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[20px] font-bold outline-none transition-all appearance-none"
                                                    value={formData.type}
                                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                >
                                                    <option>General Medicine</option>
                                                    <option>Cardiology</option>
                                                    <option>Pediatrics</option>
                                                    <option>Dermatology</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[20px] font-bold outline-none transition-all"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-6">
                                        <Button type="submit" className="w-full py-5 rounded-3xl bg-slate-900 hover:bg-black font-black flex items-center justify-center gap-3 overflow-hidden group shadow-2xl shadow-indigo-100">
                                            <span>Confirm Appointment</span>
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        ) : (
                            <Card className="min-h-[500px] flex flex-col items-center justify-center text-center p-14 bg-white/50 border-white/50 backdrop-blur-sm">
                                <div className="w-24 h-24 bg-slate-50/50 rounded-[32px] flex items-center justify-center mb-8 border border-white">
                                    <CalendarIcon className="w-12 h-12 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">No Active Schedules</h3>
                                <p className="text-slate-500 font-medium max-w-xs mx-auto italic mb-10">Digital health registry is currently synchronized and ready for new admissions.</p>
                                <Button onClick={() => setShowForm(true)} className="rounded-2xl px-10 py-6 bg-slate-900 hover:bg-black font-black shadow-xl shadow-slate-200 active:scale-95 transition-all">
                                    Schedule First Appointment
                                </Button>
                            </Card>
                        )}
                    </div>
                    <div className="col-span-4 space-y-6">
                        <Card>
                            <h4 className="font-bold text-slate-900 mb-6">Upcoming Sessions</h4>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Mar</span>
                                            <span className="text-sm font-black text-slate-900">{10 + i}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">Dr. Sarah Johnson</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <Button variant="outline" className="flex-1 py-3 text-slate-500">Reschedule</Button>
                                                <Button className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200" onClick={() => navigate('/telemedicine')}>
                                                    Join Telemedicine
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Appointments;
