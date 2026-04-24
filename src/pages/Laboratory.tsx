import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Microscope,
    ClipboardCheck,
    ShieldAlert,
    X,
    ChevronRight,
    Loader2,
    Search,
    Beaker,
    Plus,
    Clock
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Laboratory = () => {
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [labRequests, setLabRequests] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [foundPatient, setFoundPatient] = useState<any>(null);
    const [isOrdering, setIsOrdering] = useState(false);
    const [newOrder, setNewOrder] = useState({
        test_name: 'Full Blood Count',
        priority: 'Normal'
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const role = localStorage.getItem('userRole') || 'admin';

            let query = supabase.from('lab_requests').select('*, patients(name)').order('request_date', { ascending: false });
            
            if (role === 'doctor' && user) {
                query = query.eq('doctor_id', user.id);
            }

            const { data, error } = await query;
            if (error) throw error;
            setLabRequests(data || []);
        } catch (error) {
            console.error("Error fetching lab requests:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const searchPatient = async () => {
        if (!searchQuery) return;
        setIsLoading(true);
        try {
            const { data } = await supabase
                .from('patients')
                .select('*')
                .or(`name.ilike.%${searchQuery}%,id.eq.${searchQuery},phone.ilike.%${searchQuery}%`)
                .maybeSingle();
            
            if (!data) {
                alert("Patient not found.");
            } else {
                setFoundPatient(data);
            }
        } catch (error) {
            console.error("Error searching patient:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const submitOrder = async () => {
        if (!foundPatient) return;
        setIsOrdering(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { error } = await supabase.from('lab_requests').insert([{
                patient_id: foundPatient.id,
                doctor_id: user?.id,
                test_name: newOrder.test_name,
                priority: newOrder.priority,
                status: 'Pending'
            }]);
            if (error) throw error;
            alert("Lab request submitted successfully!");
            setShowOrderForm(false);
            setFoundPatient(null);
            setSearchQuery('');
            fetchData();
        } catch (error) {
            console.error("Error submitting order:", error);
        } finally {
            setIsOrdering(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto text-left">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Microscope className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Diagnostic Services</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 italic">Laboratory Command</h1>
                        <p className="text-slate-500 font-medium">Real-time tracking of diagnostic requests, specimen analysis, and results.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="gap-2" onClick={fetchData}>
                            <Loader2 size={16} className={isLoading ? 'animate-spin' : ''} />
                            Sync Registry
                        </Button>
                        <Button variant="dark" className="gap-2 px-8 active:scale-95" onClick={() => setShowOrderForm(true)}>
                            <Plus className="w-5 h-5" />
                            New Test Request
                        </Button>
                    </div>
                </div>

                {showOrderForm && (
                    <Card className="mb-12 p-10 animate-in fade-in zoom-in-95 duration-500 bg-white/80 backdrop-blur-xl border-white shadow-2xl relative">
                        <button onClick={() => setShowOrderForm(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                            <X className="w-5 h-5" />
                        </button>
                        <div className="mb-10 text-left">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Initiate Diagnostic Test</h2>
                            <p className="text-slate-500 font-medium">Link a medical investigation to a patient record.</p>
                        </div>
                        
                        {!foundPatient ? (
                            <div className="max-w-xl mx-auto space-y-6">
                                <div className="text-left">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Search Patient (Name/ID/Phone)</label>
                                    <div className="relative">
                                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                                        <input
                                            type="text"
                                            className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[24px] font-bold outline-none transition-all shadow-inner"
                                            placeholder="Enter patient details..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && searchPatient()}
                                        />
                                    </div>
                                </div>
                                <Button onClick={searchPatient} className="w-full h-16 rounded-[24px] bg-slate-900 text-white font-black" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Search className="mr-2" />}
                                    Locate Patient Record
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100/50 rounded-bl-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700"></div>
                                        <div className="relative z-10 flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center font-black text-indigo-600 text-xl">
                                                {foundPatient.name.charAt(0)}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Target Patient</p>
                                                <h4 className="text-2xl font-black text-slate-900 leading-none">{foundPatient.name}</h4>
                                                <p className="text-sm font-bold text-slate-500 mt-2 italic">{foundPatient.id} • {foundPatient.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full py-4 rounded-2xl" onClick={() => setFoundPatient(null)}>Change Patient</Button>
                                </div>

                                <div className="space-y-8">
                                    <div className="text-left">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Diagnostic Investigation</label>
                                        <select 
                                            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl font-bold outline-none transition-all appearance-none"
                                            value={newOrder.test_name}
                                            onChange={(e) => setNewOrder({...newOrder, test_name: e.target.value})}
                                        >
                                            <option>Full Blood Count</option>
                                            <option>Lipid Profile</option>
                                            <option>Blood Glucose</option>
                                            <option>Thyroid Panel</option>
                                            <option>Urinalysis</option>
                                            <option>X-Ray Imaging</option>
                                        </select>
                                    </div>
                                    <div className="text-left">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Priority Level</label>
                                        <div className="flex gap-4">
                                            {['Normal', 'High', 'Critical'].map(p => (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setNewOrder({...newOrder, priority: p})}
                                                    className={cn(
                                                        "flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                                                        newOrder.priority === p ? "bg-slate-900 border-slate-900 text-white shadow-xl" : "bg-white border-slate-100 text-slate-400 hover:border-indigo-100"
                                                    )}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <Button 
                                        className="w-full h-16 rounded-[24px] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg shadow-xl shadow-indigo-100 mt-4"
                                        onClick={submitOrder}
                                        disabled={isOrdering}
                                    >
                                        {isOrdering ? <Loader2 className="animate-spin mr-2" /> : <Beaker className="mr-2" />}
                                        Submit Request
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
                    {[
                        { label: 'Active Analysis', value: labRequests.filter(r => r.status === 'In Analysis').length, icon: Beaker, color: 'bg-indigo-600' },
                        { label: 'Pending Review', value: labRequests.filter(r => r.status === 'Pending').length, icon: ClipboardCheck, color: 'bg-amber-500' },
                        { label: 'Critical Alerts', value: labRequests.filter(r => r.priority === 'Critical').length, icon: ShieldAlert, color: 'bg-rose-500' },
                        { label: 'Turnaround Time', value: '4.2h', icon: Clock, color: 'bg-emerald-500' },
                    ].map((stat, idx) => (
                        <Card key={idx} className="p-8 group hover:shadow-2xl transition-all duration-500 border-slate-100 text-left">
                            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100`}>
                                <stat.icon className="text-white w-7 h-7" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-900 italic">{stat.value}</h3>
                        </Card>
                    ))}
                </div>

                <Card className="p-0 overflow-hidden border-slate-100">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                        <h3 className="font-black text-slate-900 text-xl italic">Laboratory Registry</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-left">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / Test Name</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Patient</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-4" />
                                            <p className="text-slate-400 font-bold italic">Refreshing diagnostic registry...</p>
                                        </td>
                                    </tr>
                                ) : labRequests.length > 0 ? labRequests.map((req) => (
                                    <tr key={req.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-xs">
                                                    {req.id.split('-')[1]}
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-none mb-1">{req.test_name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 tracking-tighter italic">ID: {req.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-left">
                                            <p className="font-bold text-slate-900">{req.patients?.name || 'Unknown'}</p>
                                            <p className="text-[10px] font-bold text-slate-400 italic mt-1">{new Date(req.request_date).toLocaleString()}</p>
                                        </td>
                                        <td className="px-8 py-6 text-left">
                                            <div className={cn(
                                                "inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                req.status === 'Completed' ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                                            )}>
                                                {req.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-left">
                                            <div className={cn(
                                                "inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest",
                                                req.priority === 'Critical' ? "text-rose-600" : 
                                                req.priority === 'High' ? "text-amber-500" : "text-slate-400"
                                            )}>
                                                {req.priority === 'Critical' && <ShieldAlert size={14} />}
                                                {req.priority}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Button variant="ghost" className="p-2 rounded-xl text-slate-300 hover:text-indigo-600">
                                                <ChevronRight size={20} />
                                            </Button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center text-slate-400 font-bold italic">No diagnostic requests found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default Laboratory;
