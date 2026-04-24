import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card, Button } from '../components/layout/BaseUI';
import {
    Search,
    Plus,
    Star,
    Mail,
    Phone,
    Stethoscope,
    Loader2,
    X
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Doctors = () => {
    const [searchParams] = useSearchParams();
    const filterParam = searchParams.get('filter') || '';
    const [searchQuery, setSearchQuery] = useState(filterParam);
    const [isLoading, setIsLoading] = useState(true);
    const [doctors, setDoctors] = useState<any[]>([]);
    const [specialties, setSpecialties] = useState<any[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        name: '',
        specialty: 'General Medicine',
        email: '',
        phone: '',
        status: 'Active'
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data: docs } = await supabase.from('doctors').select('*').order('name');
            const { data: specs } = await supabase.from('specialties').select('*').order('name');
            setDoctors(docs || []);
            setSpecialties(specs || []);
        } catch (error) {
            console.error("Error fetching staff:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddDoctor = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const id = `DOC-${Math.floor(1000 + Math.random() * 9000)}`;
            const { error } = await supabase.from('doctors').insert([{
                id,
                ...newDoctor,
                image: `https://ui-avatars.com/api/?name=${encodeURIComponent(newDoctor.name)}&background=random`
            }]);
            if (error) throw error;
            alert('Doctor added to directory!');
            setShowAddModal(false);
            setNewDoctor({ name: '', specialty: 'General Medicine', email: '', phone: '', status: 'Active' });
            fetchData();
        } catch (error) {
            console.error("Error adding doctor:", error);
            alert("Failed to add doctor.");
        }
    };

    return (
        <Layout>
            <div className="max-w-[1600px] text-left">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Stethoscope className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Medical Staff</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Staff Directory</h1>
                        <p className="text-slate-500 font-medium">Manage clinical professionals, specialties, and duty rosters.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-80">
                            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search medical staff..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border-2 border-slate-100 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-slate-900 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                        <Button variant="dark" className="gap-2 px-8 active:scale-95" onClick={() => setShowAddModal(true)}>
                            <Plus className="w-5 h-5" />
                            Add Doctor
                        </Button>
                    </div>
                </div>

                {showAddModal && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6">
                        <Card className="w-full max-w-xl bg-white shadow-3xl p-8 animate-in zoom-in-95 duration-200">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Onboard New Doctor</h2>
                                <Button variant="ghost" className="rounded-full w-10 h-10 p-0" onClick={() => setShowAddModal(false)}>
                                    <X size={20} />
                                </Button>
                            </div>
                            <form onSubmit={handleAddDoctor} className="space-y-6">
                                <div className="text-left">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-2xl font-bold outline-none"
                                        value={newDoctor.name}
                                        onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-left">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Specialty</label>
                                        <select 
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-2xl font-bold outline-none appearance-none"
                                            value={newDoctor.specialty}
                                            onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})}
                                        >
                                            {specialties.length > 0 ? specialties.map(s => <option key={s.id} value={s.name}>{s.name}</option>) : (
                                                <>
                                                    <option>General Medicine</option>
                                                    <option>Cardiology</option>
                                                    <option>Neurology</option>
                                                    <option>Pediatrics</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                    <div className="text-left">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone</label>
                                        <input 
                                            type="tel" 
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-2xl font-bold outline-none"
                                            value={newDoctor.phone}
                                            onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="text-left">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 rounded-2xl font-bold outline-none"
                                        value={newDoctor.email}
                                        onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 mt-4">
                                    Finalize Onboarding
                                </Button>
                            </form>
                        </Card>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold italic">Synchronizing staff directory...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {doctors.filter(d => 
                            d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((doctor) => (
                            <Card key={doctor.id} className="p-10 hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500 group relative overflow-hidden bg-white/80 backdrop-blur-xl border-white/40">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[100px] -mr-16 -mt-16 transition-all group-hover:scale-150 group-hover:bg-indigo-100/50 duration-700"></div>
                                
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="relative mb-8">
                                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-500 to-sky-400 p-[3px] shadow-xl transform group-hover:rotate-6 transition-transform duration-500">
                                            <img
                                                src={doctor.image}
                                                alt={doctor.name}
                                                className="w-full h-full rounded-[21px] object-cover border-4 border-white shadow-inner"
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 border-4 border-white rounded-2xl flex items-center justify-center text-white shadow-lg">
                                            <CheckCircle2 size={14} className="fill-current" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">{doctor.name}</h3>
                                    <div className="px-4 py-1.5 bg-indigo-50 rounded-xl text-xs font-black text-indigo-600 uppercase tracking-widest mb-8">
                                        {doctor.specialty}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                                            <p className="text-lg font-black text-slate-700">12+ Years</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rating</p>
                                            <div className="flex items-center justify-center gap-1">
                                                <Star size={16} className="text-amber-400 fill-amber-400" />
                                                <span className="text-lg font-black text-slate-700">4.9</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full space-y-4 pt-8 border-t border-slate-50">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400 font-bold italic">Contact</span>
                                            <span className="text-slate-900 font-black">{doctor.phone}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400 font-bold italic">Available</span>
                                            <span className="text-emerald-500 font-black">Now Online</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-3 w-full">
                                        <Button variant="outline" className="flex-1 rounded-xl py-4 group/btn hover:border-indigo-200">
                                            <Mail className="w-4 h-4 text-slate-400 group-hover/btn:text-indigo-500 transition-colors" />
                                        </Button>
                                        <Button variant="outline" className="flex-1 rounded-xl py-4 group/btn hover:border-indigo-200">
                                            <Phone className="w-4 h-4 text-slate-400 group-hover/btn:text-indigo-500 transition-colors" />
                                        </Button>
                                        <Button variant="dark" className="flex-[2] rounded-xl py-4 font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 active:scale-95">
                                            View Profile
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

const CheckCircle2 = ({ size, className }: any) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

export default Doctors;
