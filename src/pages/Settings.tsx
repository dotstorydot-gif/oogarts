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
    Save
} from 'lucide-react';

const Settings = () => {
    return (
        <Layout>
            <div className="max-w-[1400px] text-left">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">System Configuration</h1>
                    <p className="text-slate-500 font-medium">Manage your workspace, security, and integration preferences.</p>
                </div>

                <div className="grid grid-cols-12 gap-10">
                    {/* Navigation Sidebar for Settings */}
                    <div className="col-span-3 space-y-2">
                        {[
                            { icon: User, label: 'Account Profile', active: true },
                            { icon: Bell, label: 'Notifications', active: false },
                            { icon: Shield, label: 'Security & Access', active: false },
                            { icon: Globe, label: 'Localization', active: false },
                            { icon: Smartphone, label: 'Connected Apps', active: false },
                            { icon: Database, label: 'Data Management', active: false },
                            { icon: Key, label: 'API Keys', active: false },
                        ].map((item) => (
                            <button
                                key={item.label}
                                className={cn(
                                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group",
                                    item.active
                                        ? "bg-white shadow-xl shadow-slate-200 text-indigo-600"
                                        : "text-slate-500 hover:bg-white hover:shadow-sm"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", item.active ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-600")} />
                                <span className="font-bold text-sm tracking-tight">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Main Settings Content */}
                    <div className="col-span-9 space-y-8">
                        <Card className="p-10">
                            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <User className="w-6 h-6 text-indigo-600" />
                                Public Profile
                            </h3>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-6">
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
                                <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 border-spacing-4">
                                    <div className="w-32 h-32 rounded-full bg-white shadow-xl p-1 mb-6">
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

                        <Card className="p-10 border-rose-100 bg-rose-50/10">
                            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <Lock className="w-6 h-6 text-rose-500" />
                                Login & Password
                            </h3>
                            <div className="space-y-6 max-w-xl">
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Current Password</label>
                                    <Input type="password" placeholder="••••••••••••" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">New Password</label>
                                        <Input type="password" />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 block px-1">Confirm New Password</label>
                                        <Input type="password" />
                                    </div>
                                </div>
                                <Button variant="primary" className="bg-slate-900 hover:bg-slate-800">Update Password</Button>
                            </div>
                        </Card>

                        <div className="flex items-center justify-end gap-4 mt-12">
                            <Button variant="ghost">Reset Changes</Button>
                            <Button variant="primary" className="gap-2">
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
