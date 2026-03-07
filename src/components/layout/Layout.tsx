import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    Users,
    UserSquare2,
    Stethoscope,
    Clock,
    CreditCard,
    Package,
    HelpCircle,
    FileText,
    LogOut,
    ChevronDown,
    Search,
    Bell,
    Settings,
    Plus,
    Activity,
    Menu,
    X,
    Home
} from 'lucide-react';
import { cn, Button, Card } from './BaseUI';

const SidebarItem = ({ to, icon: Icon, label, hasSubmenu = false }: any) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <NavLink
            to={to}
            className={cn(
                "flex items-center justify-between px-6 py-4 mb-2 mx-3 rounded-2xl transition-all duration-300 group relative",
                isActive
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                    : "text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm"
            )}
        >
            <div className="flex items-center gap-4">
                <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-indigo-600")} />
                <span className="font-bold text-[14px] tracking-tight">{label}</span>
            </div>
            {hasSubmenu && <ChevronDown className="w-4 h-4 opacity-50" />}
            {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-indigo-400 rounded-r-full" />
            )}
        </NavLink>
    );
};

const UserProfile = ({ userRole }: { userRole: string }) => (
    <div className="flex items-center gap-3 pl-6 ml-6 border-l border-slate-100 py-2 group cursor-pointer">
        <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 p-[2px] shadow-lg">
                <img
                    src={
                        userRole === 'doctor' ? "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200" :
                            userRole === 'patient' ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" :
                                "/avatars/jack_chain.png"
                    }
                    alt="User"
                    className="w-full h-full rounded-[10px] object-cover border-2 border-white"
                />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>
        <div className="hidden xl:block">
            <h4 className="font-black text-slate-900 text-sm leading-tight group-hover:text-indigo-600 transition-colors">
                {userRole === 'doctor' ? 'Dr. Michael Chen' : userRole === 'patient' ? 'Sophia Martinez' : 'Jack Chain'}
            </h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                {userRole === 'doctor' ? 'Neurology' : userRole === 'patient' ? 'Premium Care' : 'Super Admin'}
            </p>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-all" />
    </div>
);

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const userRole = localStorage.getItem('userRole') || 'admin';

    return (
        <div className="flex min-h-screen bg-[#f1f5f9] font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Sidebar - Hidden on mobile, drawer on mobile if open */}
            <aside className={cn(
                "fixed inset-y-0 left-0 w-[300px] bg-slate-50/50 backdrop-blur-3xl border-r border-slate-200/50 flex flex-col h-screen py-8 shrink-0 z-[60] transition-transform duration-500 lg:sticky lg:translate-x-0",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="px-10 mb-12 flex items-center justify-between lg:justify-start gap-4">
                    <div className="flex items-center gap-4">
                        <div
                            onClick={() => navigate('/dashboard')}
                            className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-200 transition-transform cursor-pointer hover:scale-105"
                        >
                            <Activity className="text-white w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">oogarts</h1>
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mt-1">Medical OS</p>
                        </div>
                    </div>
                    <button
                        className="lg:hidden p-2 text-slate-400 hover:text-indigo-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {userRole === 'patient' ? (
                        <>
                            <div className="px-6 mb-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-6 opacity-60">Personal Health</h3>
                                <SidebarItem to="/patient-dashboard" icon={LayoutDashboard} label="My Hub" />
                                <SidebarItem to="/patient-booking" icon={Calendar} label="Book Appointment" />
                                <SidebarItem to="/telemedicine" icon={Activity} label="My Consultations" />
                                <SidebarItem to="/patient-records" icon={FileText} label="Medical Records" />
                            </div>
                            <div className="px-6 mb-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-6 opacity-60">Account</h3>
                                <SidebarItem to="/settings" icon={Settings} label="Settings" />
                                <SidebarItem to="/help" icon={HelpCircle} label="Help Center" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="px-6 mb-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-6 opacity-60">Operations</h3>
                                <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Analytics" />
                                {userRole === 'admin' && <SidebarItem to="/queue" icon={Clock} label="Live Queue" />}
                                <SidebarItem to="/patients" icon={Users} label="Patient Registry" />
                            </div>

                            <div className="px-6 mb-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-6 opacity-60">Clinical</h3>
                                <SidebarItem to="/appointments" icon={Calendar} label="Appointments" />
                                {userRole === 'admin' && <SidebarItem to="/specialties" icon={Stethoscope} label="Specialties" />}
                                <SidebarItem to="/doctor-reports" icon={FileText} label="Consultations" />
                                {userRole === 'admin' && <SidebarItem to="/pharmacy" icon={Package} label="Pharmacy" />}
                                <SidebarItem to="/lab" icon={Activity} label="Laboratory" />
                            </div>

                            {userRole === 'admin' && (
                                <div className="px-6 mb-8">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-6 opacity-60">Administration</h3>
                                    <SidebarItem to="/doctors" icon={UserSquare2} label="Staff Directory" />
                                    <SidebarItem to="/payments" icon={CreditCard} label="Billing & Claims" />
                                    <SidebarItem to="/inventory" icon={Package} label="Core Inventory" />
                                </div>
                            )}

                            <div className="px-6 mb-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-6 opacity-60">System</h3>
                                <SidebarItem to="/settings" icon={Settings} label="Global Settings" />
                                <SidebarItem to="/help" icon={HelpCircle} label="Help Center" />
                                {userRole === 'admin' && <SidebarItem to="/reports" icon={FileText} label="System Logs" />}
                            </div>
                        </>
                    )}
                </div>

                <div className="px-6 mt-auto pt-6 border-t border-slate-200/50">
                    <button
                        onClick={() => {
                            localStorage.removeItem('userRole');
                            navigate('/login');
                        }}
                        className="flex items-center gap-4 px-6 py-4 w-full text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-2xl transition-all font-bold text-sm group"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Backdrop for mobile sidebar */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 lg:h-28 bg-white/60 backdrop-blur-3xl border-b border-slate-200/50 flex items-center justify-between px-6 lg:px-16 sticky top-0 z-40 shrink-0">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-white hover:shadow-lg transition-all"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="relative w-full max-w-[600px] group hidden md:flex">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-indigo-600 transition-all duration-300" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Universal search..."
                            className="w-full bg-slate-100/50 border-2 border-transparent focus:border-indigo-100/50 rounded-2xl pl-16 pr-8 py-3.5 lg:py-5 focus:bg-white placeholder:text-slate-400 text-[14px] lg:text-[15px] font-bold tracking-tight transition-all duration-300 outline-none shadow-inner"
                        />
                        {/* Search results popup - remains same */}
                    </div>

                    {/* Mobile Logo (Center on mobile only) */}
                    <div className="md:hidden">
                        <h1 className="text-xl font-black text-slate-900 tracking-tighter italic">oogarts</h1>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6">
                        {userRole === 'admin' && (
                            <Button
                                variant="dark"
                                className="h-10 lg:h-auto gap-2 lg:gap-3 shadow-2xl shadow-slate-200 group px-4 lg:px-8"
                                onClick={() => setIsQuickActionOpen(true)}
                            >
                                <Plus className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-90 transition-transform duration-500" />
                                <span className="hidden sm:inline">Quick Action</span>
                            </Button>
                        )}

                        <div className="hidden sm:flex items-center gap-3 px-6 border-l border-slate-200 h-10">
                            <button className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl lg:rounded-2xl bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-xl hover:shadow-indigo-50 transition-all relative group">
                                <Bell className="w-4 h-4 lg:w-5 lg:h-5 group-hover:animate-bounce" />
                                <span className="absolute top-2.5 right-2.5 lg:top-3.5 lg:right-3.5 w-2 h-2 lg:w-2.5 lg:h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm font-sans"></span>
                            </button>
                        </div>

                        <UserProfile userRole={userRole} />
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-16 custom-scrollbar bg-transparent pb-32 lg:pb-16">
                    {children}
                </div>

                {/* Bottom Navigation for Mobile */}
                <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-3xl border-t border-slate-200/50 flex items-center justify-around px-2 lg:hidden z-40">
                    <NavLink to="/dashboard" className={({ isActive }) => cn("flex flex-col items-center gap-1 p-2 rounded-xl transition-all", isActive ? "text-indigo-600" : "text-slate-400")}>
                        <Home className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
                    </NavLink>
                    <NavLink to="/patients" className={({ isActive }) => cn("flex flex-col items-center gap-1 p-2 rounded-xl transition-all", isActive ? "text-indigo-600" : "text-slate-400")}>
                        <Users className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Registry</span>
                    </NavLink>
                    {userRole === 'admin' && (
                        <button
                            onClick={() => setIsQuickActionOpen(true)}
                            className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200 -mt-10 border-4 border-[#f1f5f9]"
                        >
                            <Plus className="w-6 h-6" />
                        </button>
                    )}
                    <NavLink to="/specialties" className={({ isActive }) => cn("flex flex-col items-center gap-1 p-2 rounded-xl transition-all", isActive ? "text-indigo-600" : "text-slate-400")}>
                        <Stethoscope className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Clinical</span>
                    </NavLink>
                    <NavLink to="/settings" className={({ isActive }) => cn("flex flex-col items-center gap-1 p-2 rounded-xl transition-all", isActive ? "text-indigo-600" : "text-slate-400")}>
                        <Settings className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Config</span>
                    </NavLink>
                </nav>

                {/* Quick Action Modal Placeholder */}
                {isQuickActionOpen && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6">
                        <Card className="w-full max-w-lg bg-white shadow-3xl animate-in zoom-in-95 duration-200">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Quick Action</h2>
                                <Button variant="ghost" className="rounded-full w-12 h-12" onClick={() => setIsQuickActionOpen(false)}>×</Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-32 flex-col gap-4 text-slate-600" onClick={() => { navigate('/patients'); setIsQuickActionOpen(false); }}>
                                    <Users className="w-8 h-8" />
                                    <span>Add Patient</span>
                                </Button>
                                <Button variant="outline" className="h-32 flex-col gap-4 text-slate-600" onClick={() => { navigate('/appointments'); setIsQuickActionOpen(false); }}>
                                    <Calendar className="w-8 h-8" />
                                    <span>Schedule Visit</span>
                                </Button>
                                <Button variant="outline" className="h-32 flex-col gap-4 text-slate-600" onClick={() => { navigate('/queue'); setIsQuickActionOpen(false); }}>
                                    <Clock className="w-8 h-8" />
                                    <span>New Token</span>
                                </Button>
                                <Button variant="outline" className="h-32 flex-col gap-4 text-slate-600" onClick={() => { navigate('/inventory'); setIsQuickActionOpen(false); }}>
                                    <Package className="w-8 h-8" />
                                    <span>Add Supply</span>
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
};
