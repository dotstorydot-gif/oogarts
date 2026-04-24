import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, Input, cn } from '../components/layout/BaseUI';
import {
    User,
    Bell,
    Shield,
    Globe,
    Smartphone,
    Database,
    Key,
    Lock,
    Save,
    ShieldCheck,
    Box,
    Loader2,
    Camera
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('Account Profile');
    const [userData, setUserData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const userRole = localStorage.getItem('userRole') || 'admin';

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                if (userRole === 'patient') {
                    const patientId = 'PAT-1001';
                    const { data, error } = await supabase
                        .from('patients')
                        .select('*')
                        .eq('id', patientId)
                        .single();
                    if (error) throw error;
                    setUserData(data);
                } else {
                    // Mock Admin Data
                    setUserData({
                        name: 'Jack Chain',
                        title: 'Super Admin / Chief of Operations',
                        email: 'jack.chain@oogarts.io',
                        image: '/avatars/jack_chain.png'
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userRole]);

    const allTabs = [
        { icon: User, label: 'Account Profile', roles: ['admin', 'doctor', 'patient'] },
        { icon: Bell, label: 'Notifications', roles: ['admin', 'doctor', 'patient'] },
        { icon: Shield, label: 'Security & Access', roles: ['admin', 'doctor', 'patient'] },
        { icon: Globe, label: 'Localization', roles: ['admin'] },
        { icon: Smartphone, label: 'Connected Apps', roles: ['admin', 'doctor'] },
        { icon: Database, label: 'Data Management', roles: ['admin'] },
        { icon: Key, label: 'API Keys', roles: ['admin'] },
    ];

    const tabs = allTabs.filter(tab => tab.roles.includes(userRole));

    if (isLoading) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                    <p className="text-slate-500 font-bold text-center">Loading your preferences...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto text-left">
                <div className="mb-12">
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tighter italic">
                        {userRole === 'patient' ? 'Profile Settings' : 'System Configuration'}
                    </h1>
                    <p className="text-slate-500 font-medium">
                        {userRole === 'patient' ? 'Manage your personal information, security, and notifications.' : 'Manage your workspace, security, and integration preferences.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Navigation Sidebar for Settings */}
                    <div className="col-span-1 lg:col-span-3 space-y-2">
                        {tabs.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => setActiveTab(item.label)}
                                className={cn(
                                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group",
                                    activeTab === item.label
                                        ? "bg-white shadow-xl shadow-slate-200 text-indigo-600"
                                        : "text-slate-500 hover:bg-white hover:shadow-sm"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", activeTab === item.label ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-600")} />
                                <span className="font-bold text-sm tracking-tight">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Main Settings Content */}
                    <div className="col-span-1 lg:col-span-9 space-y-8">
                        {activeTab === 'Account Profile' && (
                            <div className="space-y-8">
                                <Card className="p-6 sm:p-10">
                                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                        <User className="w-6 h-6 text-indigo-600" />
                                        Public Profile
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
                                        <div className="space-y-6 order-2 md:order-1 text-left">
                                            <div>
                                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Full Name</label>
                                                <Input value={userData?.name || ''} onChange={(e) => setUserData({...userData, name: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">
                                                    {userRole === 'patient' ? 'Emergency Contact' : 'Professional Title'}
                                                </label>
                                                <Input 
                                                    value={userRole === 'patient' ? (userData?.emergency_contact || '+1 (555) 902-1122') : (userData?.title || '')} 
                                                    onChange={(e) => setUserData({...userData, title: e.target.value})} 
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Email Address</label>
                                                <Input value={userData?.email || ''} onChange={(e) => setUserData({...userData, email: e.target.value})} />
                                            </div>
                                            {userRole === 'patient' && (
                                                <div>
                                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Phone Number</label>
                                                    <Input value={userData?.phone || ''} onChange={(e) => setUserData({...userData, phone: e.target.value})} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 order-1 md:order-2">
                                            <div className="relative group">
                                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white shadow-xl p-1 mb-6 overflow-hidden">
                                                    <img
                                                        src={userData?.image || userData?.image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'}
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                </div>
                                                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer mb-6">
                                                    <Camera className="w-8 h-8" />
                                                    <input type="file" className="hidden" onChange={() => alert("Photo upload feature coming soon!")} />
                                                </label>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={() => alert("Select a file to upload.")}>Change Photo</Button>
                                            <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase">JPG, PNG or GIF. Max 5MB.</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6 sm:p-10 border-rose-100 bg-rose-50/10">
                                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                        <Lock className="w-6 h-6 text-rose-500" />
                                        Login & Password
                                    </h3>
                                    <div className="space-y-6 max-w-xl">
                                        <div>
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Current Password</label>
                                            <Input type="password" placeholder="••••••••••••" />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">New Password</label>
                                                <Input type="password" />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Confirm New Password</label>
                                                <Input type="password" />
                                            </div>
                                        </div>
                                        <Button variant="dark">Update Password</Button>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'Security & Access' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <Card className="p-10">
                                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                        <Shield className="w-6 h-6 text-indigo-600" />
                                        Two-Factor Authentication
                                    </h3>
                                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                                <Smartphone className="w-6 h-6 text-slate-400" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-black text-slate-900 tracking-tight">Authenticator App</p>
                                                <p className="text-xs text-slate-500 font-medium italic">Use Google Authenticator or Authy to secure your account.</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="font-black">Enable 2FA</Button>
                                    </div>
                                </Card>

                                <Card className="p-10">
                                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                        <Key className="w-6 h-6 text-indigo-600" />
                                        Active Sessions
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { device: 'MacBook Pro 16"', location: 'Cairo, Egypt', status: 'Current Session' },
                                            { device: 'iPhone 15 Pro', location: 'Dubai, UAE', status: '2 hours ago' }
                                        ].map((session, i) => (
                                            <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 rounded-2xl transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-600 transition-all">
                                                        <Box className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-black text-slate-900 tracking-tight">{session.device}</p>
                                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{session.location} • {session.status}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" className="text-rose-500 font-black text-[10px] uppercase tracking-widest">Revoke</Button>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        )}

                        {activeTab !== 'Account Profile' && activeTab !== 'Security & Access' && (
                            <Card className="flex flex-col items-center justify-center py-32 text-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-10 h-10 text-slate-200" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">Configure {activeTab}</h3>
                                <p className="text-slate-400 max-w-sm mx-auto font-medium">This module is currently being finalized. You will be able to manage your {activeTab.toLowerCase()} preferences here shortly.</p>
                                <Button variant="outline" className="mt-8" onClick={() => setActiveTab('Account Profile')}>Return to Profile</Button>
                            </Card>
                        )}

                        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-12">
                            <Button variant="ghost" className="w-full sm:w-auto">Reset Changes</Button>
                            <Button variant="dark" className="w-full sm:w-auto gap-2">
                                <Save className="w-4 h-4" />
                                Save Configuration
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;
