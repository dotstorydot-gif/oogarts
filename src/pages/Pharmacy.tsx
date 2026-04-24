import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Package,
    Search,
    Filter,
    Plus,
    AlertCircle,
    Activity,
    ChevronRight,
    X,
    ShieldCheck,
    Pill,
    Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Pharmacy = () => {
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [prescriptions, setPrescriptions] = useState<any[]>([]);
    const [patients, setPatients] = useState<any[]>([]);
    const [newMed, setNewMed] = useState({
        patient_id: '',
        name: '',
        dosage: '',
        frequency: '',
        days_left: 30
    });
    
    const categories = [
        { name: 'Antibiotics', items: 124, status: 'Stable', color: 'bg-indigo-50 text-indigo-600' },
        { name: 'Pain Relief', items: 85, status: 'Low Stock', color: 'bg-rose-50 text-rose-600' },
        { name: 'Cardiology', items: 42, status: 'Stable', color: 'bg-emerald-50 text-emerald-600' },
        { name: 'Vaccines', items: 156, status: 'Restocking', color: 'bg-sky-50 text-sky-600' },
    ];

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data: rxData } = await supabase
                .from('prescriptions')
                .select('*, patients(name)')
                .order('id', { ascending: false });
            
            const { data: pts } = await supabase.from('patients').select('id, name').order('name');
            
            setPrescriptions(rxData || []);
            setPatients(pts || []);
        } catch (error) {
            console.error("Error fetching pharmacy data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleIntake = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const id = `RX-${Math.floor(1000 + Math.random() * 9000)}`;
            const { error } = await supabase.from('prescriptions').insert([{
                id,
                ...newMed,
                status: 'Active'
            }]);
            if (error) throw error;
            alert('Medication Entry Synchronized!');
            setShowEntryForm(false);
            setNewMed({ patient_id: '', name: '', dosage: '', frequency: '', days_left: 30 });
            fetchData();
        } catch (error) {
            console.error("Error adding medication:", error);
            alert("Failed to add medication.");
        }
    };

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto text-left">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Package className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Medical Supplies</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 italic">Pharmacy Command</h1>
                        <p className="text-slate-500 font-medium">Global medication dispensing, inventory tracking, and warehouse management.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="gap-2" onClick={fetchData}>
                            <Loader2 size={16} className={isLoading ? 'animate-spin' : ''} />
                            Sync
                        </Button>
                        <Button variant="dark" className="gap-2 px-8 active:scale-95" onClick={() => setShowEntryForm(true)}>
                            <Plus className="w-5 h-5" />
                            New Entry
                        </Button>
                    </div>
                </div>

                {showEntryForm && (
                    <Card className="mb-12 p-10 animate-in fade-in zoom-in-95 duration-500 bg-slate-900 border-indigo-500/30 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-6">
                            <button onClick={() => setShowEntryForm(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mb-10 text-left">
                            <h2 className="text-2xl font-bold tracking-tight">Medication Intake</h2>
                            <p className="text-indigo-300/60 font-medium">Provision new pharmaceutical assets to global decentralized registry.</p>
                        </div>
                        <form onSubmit={handleIntake} className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-[10px] font-black text-indigo-300/40 uppercase tracking-widest mb-3">Patient</label>
                                <select 
                                    className="w-full px-6 py-4 bg-white/5 border-2 border-transparent focus:border-indigo-500/50 rounded-2xl font-bold outline-none transition-all appearance-none text-white"
                                    value={newMed.patient_id}
                                    onChange={(e) => setNewMed({...newMed, patient_id: e.target.value})}
                                    required
                                >
                                    <option value="" className="text-slate-900">Select Patient</option>
                                    {patients.map(p => <option key={p.id} value={p.id} className="text-slate-900">{p.name}</option>)}
                                </select>
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-[10px] font-black text-indigo-300/40 uppercase tracking-widest mb-3">Medication Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Amoxicillin" 
                                    className="w-full px-6 py-4 bg-white/5 border-2 border-transparent focus:border-indigo-500/50 rounded-2xl font-bold outline-none transition-all text-white" 
                                    value={newMed.name}
                                    onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-indigo-300/40 uppercase tracking-widest mb-3">Dosage</label>
                                <input 
                                    type="text" 
                                    placeholder="500mg" 
                                    className="w-full px-6 py-4 bg-white/5 border-2 border-transparent focus:border-indigo-500/50 rounded-2xl font-bold outline-none transition-all text-white" 
                                    value={newMed.dosage}
                                    onChange={(e) => setNewMed({...newMed, dosage: e.target.value})}
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-indigo-300/40 uppercase tracking-widest mb-3">Frequency</label>
                                <input 
                                    type="text" 
                                    placeholder="2x daily" 
                                    className="w-full px-6 py-4 bg-white/5 border-2 border-transparent focus:border-indigo-500/50 rounded-2xl font-bold outline-none transition-all text-white" 
                                    value={newMed.frequency}
                                    onChange={(e) => setNewMed({...newMed, frequency: e.target.value})}
                                    required 
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <Button type="submit" className="w-full h-16 rounded-[24px] bg-indigo-500 hover:bg-indigo-400 font-black text-white flex items-center justify-center gap-3 transition-all mt-6">
                                    Finalize Entry
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {categories.map((cat, idx) => (
                        <Card key={idx} className="p-8 group hover:shadow-2xl transition-all duration-500 cursor-pointer border-slate-100">
                            <div className="flex items-center justify-between mb-8">
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg", cat.color)}>
                                    <Pill className="w-7 h-7" />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                    <span className={cn("text-xs font-black uppercase tracking-widest", cat.status === 'Low Stock' ? 'text-rose-500' : 'text-emerald-500')}>{cat.status}</span>
                                </div>
                            </div>
                            <h3 className="font-black text-slate-900 text-xl mb-2">{cat.name}</h3>
                            <div className="flex items-end justify-between">
                                <p className="text-4xl font-black text-slate-900 tracking-tighter italic">{cat.items}</p>
                                <span className="text-sm font-bold text-slate-400 italic mb-1">SKU Types</span>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-8">
                        <Card className="p-0 overflow-hidden border-slate-100">
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                                <h3 className="font-black text-slate-900 text-xl italic">Active Dispensations</h3>
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input type="text" placeholder="Search prescriptions..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-indigo-500 transition-all" />
                                    </div>
                                    <Button variant="outline" className="p-2 rounded-xl">
                                        <Filter className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="divide-y divide-slate-50">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                                        <p className="text-slate-400 font-bold italic">Synchronizing prescription registry...</p>
                                    </div>
                                ) : prescriptions.map((rx) => (
                                    <div key={rx.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                                <Activity className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="font-black text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{rx.patients?.name || 'Unknown Patient'}</h4>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className="text-xs font-bold text-slate-400 italic">ID: {rx.id}</span>
                                                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">{rx.name} • {rx.dosage}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-12">
                                            <div className="text-right">
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Cycle Left</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-lg font-black text-slate-900">{rx.days_left}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 italic">Days</span>
                                                </div>
                                            </div>
                                            <div className={cn(
                                                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                                rx.status === 'Active' ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
                                            )}>
                                                {rx.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <Card className="p-8 bg-slate-900 text-white relative overflow-hidden text-left">
                            <div className="relative z-10">
                                <h3 className="font-black text-xl mb-6 italic">Warehouse Health</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Cold Chain</span>
                                        <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Optimal</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full">
                                        <div className="h-full w-full bg-emerald-500 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Oxygen Reserve</span>
                                        <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">94% Capacity</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full">
                                        <div className="h-full w-[94%] bg-sky-400 rounded-full"></div>
                                    </div>
                                </div>
                                <Button variant="dark" className="w-full mt-10 bg-white/10 hover:bg-white/20 text-white border-white/10 py-4 rounded-2xl gap-2 font-black">
                                    <ShieldCheck size={18} />
                                    Security Audit
                                </Button>
                            </div>
                            <div className="absolute -right-20 -top-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
                        </Card>

                        <Card className="p-8 border-slate-100 text-left">
                            <h3 className="font-black text-slate-900 text-xl mb-8 italic">Restock Alerts</h3>
                            <div className="space-y-6">
                                {[
                                    { item: 'Paracetamol', qty: '450 units', priority: 'Low' },
                                    { item: 'Insulin (Lantus)', qty: '12 units', priority: 'Critical' },
                                    { item: 'Vitamin C 1000mg', qty: '200 units', priority: 'Normal' },
                                ].map((alert, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-white hover:shadow-lg transition-all duration-300">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center",
                                                alert.priority === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-400'
                                            )}>
                                                <AlertCircle size={18} />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-sm leading-none mb-1">{alert.item}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{alert.qty}</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
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

export default Pharmacy;
