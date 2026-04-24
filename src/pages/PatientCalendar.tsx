import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import { Clock, MapPin, Video, ChevronLeft, ChevronRight, Loader2, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Appointment } from '../lib/mockData';

const PatientCalendar = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            setIsLoading(true);
            try {
                const { data: { user } } = await supabase.auth.getUser();
                const patientId = user?.id || 'PAT-1001';
                
                const { data, error } = await supabase
                    .from('appointments')
                    .select('*')
                    .eq('patient_id', patientId)
                    .order('date', { ascending: true });

                if (error) throw error;
                setAppointments(data || []);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left py-4">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">My Schedule</h1>
                        <p className="text-slate-500 font-medium">Manage your clinic visits and telemedicine appointments.</p>
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                        <Plus className="w-4 h-4" /> Book Appointment
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold">Loading your schedule...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Calendar View (Mock UI for now, but dynamic data list) */}
                        <div className="lg:col-span-4">
                            <Card className="p-6 border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-black text-slate-900">October 2024</h3>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="p-1"><ChevronLeft className="w-4 h-4" /></Button>
                                        <Button variant="outline" size="sm" className="p-1"><ChevronRight className="w-4 h-4" /></Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                        <span key={day} className="text-[10px] font-black text-slate-400 uppercase">{day}</span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center">
                                    {Array.from({ length: 31 }).map((_, i) => {
                                        const day = i + 1;
                                        const hasAppt = appointments.some(a => new Date(a.date).getDate() === day);
                                        return (
                                            <div 
                                                key={i} 
                                                className={cn(
                                                    "h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-colors cursor-pointer",
                                                    hasAppt ? "bg-indigo-600 text-white" : "hover:bg-slate-50 text-slate-600"
                                                )}
                                            >
                                                {day}
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </div>

                        {/* Appointments List */}
                        <div className="lg:col-span-8 space-y-4">
                            <h3 className="text-xl font-black text-slate-900 mb-4">Upcoming Appointments</h3>
                            {appointments.length === 0 ? (
                                <Card className="p-12 text-center border-dashed border-2 border-slate-200">
                                    <p className="text-slate-500 font-medium">No appointments scheduled.</p>
                                </Card>
                            ) : (
                                appointments.map(appt => (
                                    <Card key={appt.id} className="p-6 border-slate-100 hover:border-indigo-100 transition-all group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{appt.date.split(',')[0]}</span>
                                                    <span className="text-2xl font-black text-slate-900 leading-none">{new Date(appt.date).getDate()}</span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={cn(
                                                            "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest",
                                                            appt.type === 'Telemedicine' ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
                                                        )}>
                                                            {appt.type}
                                                        </span>
                                                        <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">{appt.status}</span>
                                                    </div>
                                                    <h4 className="text-lg font-black text-slate-900">{appt.doctor_name}</h4>
                                                    <p className="text-sm font-medium text-slate-500">{appt.specialty}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2 text-slate-900 font-black mb-2">
                                                    <Clock className="w-4 h-4 text-indigo-600" /> {appt.time}
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                                    {appt.type === 'Telemedicine' ? (
                                                        <><Video className="w-3 h-3" /> Secure Video Link Available</>
                                                    ) : (
                                                        <><MapPin className="w-3 h-3" /> Main Clinic - Floor 2</>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {appt.type === 'Telemedicine' ? (
                                                <Button className="bg-indigo-600 text-white flex-1">Join Meeting</Button>
                                            ) : (
                                                <Button className="bg-slate-900 text-white flex-1">Check In</Button>
                                            )}
                                            <Button variant="outline" className="flex-1">Reschedule</Button>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default PatientCalendar;
