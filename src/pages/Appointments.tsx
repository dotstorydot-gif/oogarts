import { Layout } from '../components/layout/Layout';
import { Card } from '../components/layout/BaseUI';
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';

const Appointments = () => {
    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Appointments</h1>
                        <p className="text-slate-500">Manage patient schedules and telemedicine sessions.</p>
                    </div>
                    <button className="flex items-center gap-2.5 px-6 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-100">
                        <Plus className="w-5 h-5" />
                        <span>Schedule Appointment</span>
                    </button>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-8">
                        <Card className="min-h-[400px] flex flex-col items-center justify-center text-center p-10">
                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                                <CalendarIcon className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No Appointments Today</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">Click the button above to schedule a new appointment for a patient.</p>
                        </Card>
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
                                                <Clock className="w-3 h-3 text-slate-400" />
                                                <span className="text-[10px] font-medium text-slate-500">10:30 AM</span>
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
