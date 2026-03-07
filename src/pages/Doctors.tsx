import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Card, Button, Input, cn } from '../components/layout/BaseUI';
import {
    Search,
    UserPlus,
    Edit2,
    Mail,
    Phone,
    ShieldCheck,
    Users
} from 'lucide-react';

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    email: string;
    phone: string;
    status: 'Active' | 'On Leave' | 'Emergency Only';
    image: string;
}

const Doctors = () => {
    const [searchParams] = useSearchParams();
    const filterFromUrl = searchParams.get('filter') || '';

    const [searchTerm, setSearchTerm] = useState(filterFromUrl);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

    useEffect(() => {
        if (filterFromUrl) {
            setSearchTerm(filterFromUrl);
        }
    }, [filterFromUrl]);

    const initialDoctors: Doctor[] = [
        {
            id: 'DOC-001',
            name: 'Dr. Sarah Smith',
            specialty: 'Cardiology',
            email: 'sarah.smith@oogarts.io',
            phone: '+1 555-0123',
            status: 'Active',
            image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200'
        },
        {
            id: 'DOC-002',
            name: 'Dr. Michael Chen',
            specialty: 'Neurology',
            email: 'm.chen@oogarts.io',
            phone: '+1 555-0124',
            status: 'Active',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
        },
        {
            id: 'DOC-003',
            name: 'Dr. Elena Rodriguez',
            specialty: 'Pediatrics',
            email: 'e.rodriguez@oogarts.io',
            phone: '+1 555-0125',
            status: 'On Leave',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200'
        },
        {
            id: 'DOC-004',
            name: 'Dr. James Wilson',
            specialty: 'Dermatology',
            email: 'j.wilson@oogarts.io',
            phone: '+1 555-0126',
            status: 'Emergency Only',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'
        }
    ];

    const doctors = initialDoctors;

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-2 tracking-tighter italic">Staff Directory</h1>
                        <p className="text-slate-500 font-medium">Manage clinical personnel, specializations and availability status.</p>
                    </div>
                    <Button variant="dark" className="w-full sm:w-auto gap-3 shadow-2xl shadow-slate-200" onClick={() => setIsAddModalOpen(true)}>
                        <UserPlus className="w-5 h-5" />
                        <span>Add New Doctor</span>
                    </Button>
                </div>

                <Card className="mb-10 bg-slate-50/50 border-slate-100 p-6 lg:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-all" />
                            <input
                                type="text"
                                placeholder="Search staff members..."
                                className="w-full bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-8 py-4 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-100 transition-all outline-none font-bold text-slate-900"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative w-full md:w-72">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-600">
                                <Users className="w-5 h-5" />
                            </div>
                            <select className="w-full h-full bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-8 py-4 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-100 transition-all outline-none font-bold text-slate-900 appearance-none cursor-pointer">
                                <option value="">Select Active Patient</option>
                                <option value="p1">Jeffrey Hessel</option>
                                <option value="p2">Sarah Connor</option>
                                <option value="p3">John Doe</option>
                            </select>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredDoctors.map(doctor => (
                        <Card key={doctor.id} className="group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden relative border-slate-100">
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-[24px] bg-gradient-to-tr from-indigo-500 to-sky-400 p-[2px] shadow-lg transition-transform duration-500">
                                            <img
                                                src={doctor.image}
                                                alt={doctor.name}
                                                className="w-full h-full rounded-[22px] object-cover border-2 border-white"
                                            />
                                        </div>
                                        <div className={cn(
                                            "absolute -bottom-1 -right-1 w-6 h-6 border-4 border-white rounded-full",
                                            doctor.status === 'Active' ? "bg-emerald-500" :
                                                doctor.status === 'On Leave' ? "bg-amber-500" : "bg-rose-500"
                                        )}></div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">{doctor.id}</p>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{doctor.name}</h3>
                                        <p className="text-sm font-bold text-slate-400">{doctor.specialty}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-xl" onClick={() => setEditingDoctor(doctor)}>
                                    <Edit2 size={18} />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer group/item">
                                    <Mail size={16} className="text-slate-300 group-hover/item:text-indigo-400" />
                                    <span className="text-xs font-bold">{doctor.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer group/item">
                                    <Phone size={16} className="text-slate-300 group-hover/item:text-indigo-400" />
                                    <span className="text-xs font-bold">{doctor.phone}</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-emerald-500" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{doctor.status}</span>
                                </div>
                                <Button variant="outline" size="sm" className="px-4 py-2 border-slate-100 hover:bg-slate-50 text-[10px]">VIEW SCHEDULE</Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Edit/Add Modal Overlay */}
                {(isAddModalOpen || editingDoctor) && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300">
                        <Card className="w-full max-w-2xl bg-white shadow-3xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto p-6 sm:p-10">
                            <div className="flex items-center justify-between mb-8 sm:mb-10">
                                <div>
                                    <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                        {isAddModalOpen ? 'Register New Doctor' : 'Update Staff Profile'}
                                    </h2>
                                    <p className="text-slate-400 font-medium mt-1 text-xs sm:text-base">
                                        {isAddModalOpen ? 'Create a new medical record.' : `Modifying profile for ${editingDoctor?.name}`}
                                    </p>
                                </div>
                                <Button variant="ghost" className="rounded-full w-10 h-10 sm:w-12 sm:h-12" onClick={() => { setIsAddModalOpen(false); setEditingDoctor(null); }}>×</Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block px-2">Full Legal Name</label>
                                        <Input placeholder="e.g. Dr. John Doe" defaultValue={editingDoctor?.name} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block px-2">Specialization</label>
                                        <Input placeholder="e.g. Cardiology" defaultValue={editingDoctor?.specialty} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block px-2">Contact Email</label>
                                        <Input placeholder="name@oogarts.io" defaultValue={editingDoctor?.email} />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block px-2">Work Phone</label>
                                        <Input placeholder="+1 555-0000" defaultValue={editingDoctor?.phone} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block px-2">Status</label>
                                        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all appearance-none cursor-pointer">
                                            <option>Active</option>
                                            <option>On Leave</option>
                                            <option>Emergency Only</option>
                                        </select>
                                    </div>
                                    <div className="pt-4 sm:pt-8 flex gap-4">
                                        <Button variant="ghost" className="flex-1" onClick={() => { setIsAddModalOpen(false); setEditingDoctor(null); }}>Cancel</Button>
                                        <Button variant="dark" className="flex-1" onClick={() => { setIsAddModalOpen(false); setEditingDoctor(null); }}>
                                            {isAddModalOpen ? 'Create' : 'Save'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Doctors;
