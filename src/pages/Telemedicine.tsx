import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    PhoneOff,
    Users,
    Settings,
    Maximize,
    Stethoscope,
    FileText,
    Activity,
    Pill,
    ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Telemedicine = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole') || 'patient';
    const isDoctor = userRole === 'doctor';

    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [activeTab, setActiveTab] = useState<'chat' | 'notes' | 'prescriptions'>('notes');

    // Simulate call timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCallDuration(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Layout>
            <div className="h-[calc(100vh-120px)] flex flex-col md:flex-row gap-6">

                {/* Main Video Area */}
                <div className="flex-1 flex flex-col h-full bg-slate-900 rounded-[32px] overflow-hidden relative shadow-2xl">

                    {/* Remote Video Feed (The other person) */}
                    <img
                        src={isDoctor
                            ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200"
                            : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1200"
                        }
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        alt="Remote Feed"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent" />

                    {/* Top Bar (Participant Info & Timer) */}
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                        <div className="bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-4 text-white">
                            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                                {isDoctor ? <Users className="w-5 h-5" /> : <Stethoscope className="w-5 h-5" />}
                            </div>
                            <div>
                                <p className="font-bold">{isDoctor ? 'Sophia Martinez' : 'Dr. Michael Chen'}</p>
                                <p className="text-xs text-slate-300 font-medium">
                                    {isDoctor ? 'Patient • General Consult' : 'Neurologist • Main Hospital'}
                                </p>
                            </div>
                        </div>

                        <div className="bg-red-500/80 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 text-white font-black tracking-widest text-sm shadow-lg shadow-red-500/20">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            {formatTime(callDuration)}
                        </div>
                    </div>

                    {/* Local Video Feed (You) */}
                    <div className="absolute bottom-32 right-6 w-48 aspect-[3/4] bg-slate-800 rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-2xl z-20">
                        {isVideoOff ? (
                            <div className="w-full h-full flex items-center justify-center bg-slate-800">
                                <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
                                    <VideoOff className="w-8 h-8 text-slate-400" />
                                </div>
                            </div>
                        ) : (
                            <img
                                src={isDoctor
                                    ? "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400"
                                    : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
                                }
                                className="w-full h-full object-cover"
                                alt="Local Feed"
                            />
                        )}
                        <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                            You {isMuted && '(Muted)'}
                        </div>
                    </div>

                    {/* Call Controls */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20 bg-slate-900/60 backdrop-blur-xl p-3 rounded-[28px] border border-white/10 shadow-2xl">
                        <button
                            className={cn(
                                "w-14 h-14 rounded-[20px] flex items-center justify-center transition-all",
                                isMuted ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "bg-slate-700/50 text-white hover:bg-slate-700"
                            )}
                            onClick={() => setIsMuted(!isMuted)}
                        >
                            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                        </button>

                        <button
                            className={cn(
                                "w-14 h-14 rounded-[20px] flex items-center justify-center transition-all",
                                isVideoOff ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "bg-slate-700/50 text-white hover:bg-slate-700"
                            )}
                            onClick={() => setIsVideoOff(!isVideoOff)}
                        >
                            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                        </button>

                        <div className="w-px h-8 bg-white/10 mx-2" />

                        <button className="w-12 h-12 rounded-[16px] bg-slate-700/50 text-white hover:bg-slate-700 flex items-center justify-center transition-all">
                            <Maximize className="w-5 h-5" />
                        </button>
                        <button className="w-12 h-12 rounded-[16px] bg-slate-700/50 text-white hover:bg-slate-700 flex items-center justify-center transition-all">
                            <Settings className="w-5 h-5" />
                        </button>

                        <button
                            className="w-16 h-14 rounded-[20px] bg-red-500 text-white hover:bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 transition-all ml-2"
                            onClick={() => navigate(isDoctor ? '/dashboard' : '/patient-dashboard')}
                        >
                            <PhoneOff className="w-6 h-6" />
                        </button>
                    </div>

                </div>

                {/* Sidebar Panel (Doctor sees Notes/Rx, Patient sees Chat/Records) */}
                <Card className="w-full md:w-[380px] h-full flex flex-col p-0 overflow-hidden shadow-xl border-slate-100 flex-shrink-0">
                    <div className="flex border-b border-slate-100 p-2">
                        {isDoctor ? (
                            <>
                                <button
                                    className={cn("flex-1 py-3 text-sm font-bold rounded-xl transition-all", activeTab === 'notes' ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50")}
                                    onClick={() => setActiveTab('notes')}
                                >
                                    Clinical Notes
                                </button>
                                <button
                                    className={cn("flex-1 py-3 text-sm font-bold rounded-xl transition-all", activeTab === 'prescriptions' ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50")}
                                    onClick={() => setActiveTab('prescriptions')}
                                >
                                    Rx Form
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className={cn("flex-1 py-3 text-sm font-bold rounded-xl transition-all", activeTab === 'chat' ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50")}
                                    onClick={() => setActiveTab('chat')}
                                >
                                    Provider Chat
                                </button>
                                <button
                                    className={cn("flex-1 py-3 text-sm font-bold rounded-xl transition-all", activeTab === 'prescriptions' ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50")}
                                    onClick={() => setActiveTab('prescriptions')}
                                >
                                    My Care Plan
                                </button>
                            </>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 relative text-left">
                        {isDoctor && activeTab === 'notes' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-4">
                                    <FileText className="w-4 h-4 text-indigo-500" />
                                    SOAP Note Draft
                                </h3>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Subjective</p>
                                    <textarea className="w-full rounded-xl border-slate-200 bg-white p-3 text-sm min-h-[80px]" placeholder="Patient reports..." />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Objective</p>
                                    <textarea className="w-full rounded-xl border-slate-200 bg-white p-3 text-sm min-h-[80px]" placeholder="Observed signs..." />
                                </div>
                                <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">Save to EMR</Button>
                            </div>
                        )}

                        {isDoctor && activeTab === 'prescriptions' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-4">
                                    <Pill className="w-4 h-4 text-indigo-500" />
                                    New e-Prescription
                                </h3>
                                <input type="text" className="w-full rounded-xl border-slate-200 bg-white p-3 text-sm" placeholder="Medication Name" />
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" className="w-full rounded-xl border-slate-200 bg-white p-3 text-sm" placeholder="Dosage" />
                                    <input type="text" className="w-full rounded-xl border-slate-200 bg-white p-3 text-sm" placeholder="Frequency" />
                                </div>
                                <textarea className="w-full rounded-xl border-slate-200 bg-white p-3 text-sm min-h-[80px]" placeholder="Special Instructions..." />
                                <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">Send to Pharmacy</Button>
                            </div>
                        )}

                        {!isDoctor && activeTab === 'chat' && (
                            <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex-1 mb-4 space-y-4">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                                            <Stethoscope className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-sm shadow-sm">
                                            <p className="text-sm text-slate-700">Hello! I'm reviewing your chart now. Let me know when you're ready to start.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 flex-row-reverse">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                                            <Users className="w-4 h-4 text-slate-600" />
                                        </div>
                                        <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-sm shadow-sm">
                                            <p className="text-sm">Hi Dr. Chen, I'm ready.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mt-auto">
                                    <input type="text" className="w-full rounded-xl border-0 bg-white shadow-sm pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-indigo-600" placeholder="Type a message..." />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {!isDoctor && activeTab === 'prescriptions' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                                    <Activity className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                                    <p className="text-sm text-amber-700 font-medium">Dr. Chen will share notes and prescriptions here during the call.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default Telemedicine;
