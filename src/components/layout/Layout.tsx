import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
    Plus
} from 'lucide-react';
import { cn } from './BaseUI';

const SidebarItem = ({ to, icon: Icon, label, hasSubmenu = false }: any) => (
    <NavLink
        to={to}
        className={({ isActive }) => cn(
            "flex items-center justify-between px-6 py-3.5 mb-1 mx-2 rounded-2xl transition-all duration-300 group",
            isActive
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
        )}
    >
        <div className="flex items-center gap-3.5">
            <Icon className="w-5 h-5" />
            <span className="font-medium text-[15px]">{label}</span>
        </div>
        {hasSubmenu && <ChevronDown className="w-4 h-4 opacity-50" />}
    </NavLink>
);

const UserProfile = () => (
    <div className="flex items-center gap-3 px-6 mb-8 py-2">
        <div className="relative">
            <img
                src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100"
                alt="User"
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 ring-offset-2"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
            <h4 className="font-bold text-slate-900 text-sm leading-tight">Jack Chain</h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Super admin</p>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 ml-auto" />
    </div>
);

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Sidebar */}
            <aside className="w-[280px] bg-white border-r border-slate-100 flex flex-col sticky top-0 h-screen py-8">
                <div className="px-8 mb-10 flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl">O</span>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">oogarts</h1>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="px-6 mb-4">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Main Menu</h3>
                        <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                        <SidebarItem to="/appointments" icon={Calendar} label="Appointments" />
                        <SidebarItem to="/patients" icon={Users} label="Patients" />
                    </div>

                    <div className="px-6 mb-4">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Core Modules</h3>
                        <SidebarItem to="/queue" icon={Clock} label="Queue" />
                        <SidebarItem to="/specialties" icon={Stethoscope} label="Specialties" />
                        <SidebarItem to="/pharmacy" icon={Package} label="Pharmacy" />
                        <SidebarItem to="/lab" icon={FileText} label="Laboratory" />
                    </div>

                    <div className="px-6 mb-4">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Management</h3>
                        <SidebarItem to="/doctors" icon={UserSquare2} label="Doctors" hasSubmenu />
                        <SidebarItem to="/payments" icon={CreditCard} label="Payments" />
                        <SidebarItem to="/inventory" icon={Package} label="Inventory" />
                    </div>

                    <div className="px-6 mt-auto">
                        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Support</h3>
                        <SidebarItem to="/help" icon={HelpCircle} label="Help Center" />
                        <SidebarItem to="/reports" icon={FileText} label="Reports" />
                    </div>
                </div>

                <div className="px-6 mt-8 pt-6 border-t border-slate-50">
                    <button
                        onClick={() => navigate('/login')}
                        className="flex items-center gap-3.5 px-6 py-3.5 w-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all font-medium text-[15px]"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-10 shrink-0">
                    <div className="relative w-[400px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search patients, records, or appointments..."
                            className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 text-sm transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2.5 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
                            <Plus className="w-4 h-4" />
                            <span className="text-sm font-semibold">Quick Action</span>
                        </button>
                        <div className="w-px h-8 bg-slate-100 mx-2" />
                        <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:text-indigo-600 transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:text-indigo-600 transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                        <UserProfile />
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
};
