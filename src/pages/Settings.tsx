import { useState } from 'react';
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
    ShieldCheck
} from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('Account Profile');

    const tabs = [
        { icon: User, label: 'Account Profile' },
        { icon: Bell, label: 'Notifications' },
        { icon: Shield, label: 'Security & Access' },
        { icon: Globe, label: 'Localization' },
        { icon: Smartphone, label: 'Connected Apps' },
        { icon: Database, label: 'Data Management' },
        { icon: Key, label: 'API Keys' },
    ];

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto text-left">
                <div className="mb-12">
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tighter italic">System Configuration</h1>
                    <p className="text-slate-500 font-medium">Manage your workspace, security, and integration preferences.</p>
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
                                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Display Name</label>
                                                <Input placeholder="Jack Chain" />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Professional Title</label>
                                                <Input placeholder="Super Admin / Chief of Operations" />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Contact Email</label>
                                                <Input placeholder="jack.chain@oogarts.io" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 order-1 md:order-2">
                                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white shadow-xl p-1 mb-6">
                                                <img
                                                    src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200"
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            </div>
                                            <Button variant="outline" size="sm">Change Photo</Button>
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

                        {activeTab !== 'Account Profile' && (
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
