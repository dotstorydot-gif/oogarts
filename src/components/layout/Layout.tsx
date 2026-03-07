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
    Activity
} from 'lucide-react';
import { cn } from './BaseUI';

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

const UserProfile = () => (
    <div className="flex items-center gap-3 pl-6 ml-6 border-l border-slate-100 py-2 group cursor-pointer">
        <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 p-[2px] shadow-lg">
                <img
                    src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100"
                    alt="User"
                    className="w-full h-full rounded-[10px] object-cover border-2 border-white"
                />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>
        <div className="hidden xl:block">
            <h4 className="font-black text-slate-900 text-sm leading-tight group-hover:text-indigo-600 transition-colors">Jack Chain</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Super Admin</p>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-all" />
    </div>
);

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="flex min-h-screen bg-[#f1f5f9] font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Sidebar */}
            <aside className="w-[300px] bg-slate-50/50 backdrop-blur-3xl border-r border-slate-200/50 flex flex-col sticky top-0 h-screen py-8 shrink-0 z-50">
                <div className="px-10 mb-12 flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-200 rotate-3 transition-transform hover:rotate-0 cursor-pointer">
                        <Activity className="text-white w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">oogarts</h1>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mt-1">Medical OS</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="px-6 mb-8">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-6 opacity-60">Operations</h3>
                        <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Analytics" />
                        <SidebarItem to="/queue" icon={Clock} label="Live Queue" />
                        <SidebarItem to="/patients" icon={Users} label="Patient Registry" />
                    </div>

                    <div className="px-6 mb-8">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-6 opacity-60">Clinical</h3>
                        <SidebarItem to="/appointments" icon={Calendar} label="Appointments" />
                        <SidebarItem to="/specialties" icon={Stethoscope} label="Specialties" />
                        <SidebarItem to="/doctor-reports" icon={FileText} label="Consultations" />
                        <SidebarItem to="/pharmacy" icon={Package} label="Pharmacy" />
                        <SidebarItem to="/lab" icon={Activity} label="Laboratory" />
                    </div>

                    <div className="px-6 mb-8">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-6 opacity-60">Administration</h3>
                        <SidebarItem to="/doctors" icon={UserSquare2} label="Staff Directory" />
                        <SidebarItem to="/payments" icon={CreditCard} label="Billing & Claims" />
                        <SidebarItem to="/inventory" icon={Package} label="Core Inventory" />
                    </div>

                    <div className="px-6 mb-8">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-6 opacity-60">System</h3>
                        <SidebarItem to="/settings" icon={Settings} label="Global Settings" />
                        <SidebarItem to="/help" icon={HelpCircle} label="Help Center" />
                        <SidebarItem to="/reports" icon={FileText} label="System Logs" />
                    </div>
                </div>

                <div className="px-6 mt-auto pt-6 border-t border-slate-200/50">
                    <button
                        onClick={() => navigate('/login')}
                        className="flex items-center gap-4 px-6 py-4 w-full text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-2xl transition-all font-bold text-sm group"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Header */}
                <header className="h-24 bg-white/60 backdrop-blur-2xl border-b border-slate-200/50 flex items-center justify-between px-12 sticky top-0 z-40 shrink-0">
                    <div className="relative w-[500px] group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Universal search across patients, staff, and records..."
                            className="w-full bg-slate-100/50 border-2 border-transparent focus:border-indigo-100 rounded-2xl pl-14 pr-6 py-4 focus:bg-white placeholder:text-slate-400 text-sm font-medium transition-all outline-none"
                        />
                        {searchQuery && (
                            <div className="absolute top-full left-0 right-0 mt-3 p-2 bg-white rounded-3xl shadow-2xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2">
                                <div className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">Quick Results for "{searchQuery}"</div>
                                <div className="p-8 text-center">
                                    <p className="text-slate-400 text-sm">No exact matches found.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-3 px-6 py-3.5 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-100 group">
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                            <span className="text-sm font-black">Quick Action</span>
                        </button>

                        <div className="flex items-center gap-3 px-3">
                            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100/50 text-slate-500 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all relative group">
                                <Bell className="w-5 h-5 group-hover:animate-bounce" />
                                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                            </button>
                            <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100/50 text-slate-500 hover:text-indigo-600 hover:bg-white hover:shadow-sm transition-all group">
                                <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>

                        <UserProfile />
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-transparent">
                    {children}
                </div>
            </main>
        </div>
    );
};
