import { Layout } from '../components/layout/Layout';
import { Card, Button, Input, cn } from '../components/layout/BaseUI';
import {
    Package,
    Search,
    AlertTriangle,
    Plus,
    Filter,
    Download,
    TrendingUp,
    MoreHorizontal,
    Box,
    Layers,
    Stethoscope
} from 'lucide-react';

const Inventory = () => {
    const stockItems = [
        { name: 'Surgical Masks (Level 3)', category: 'Protective Gear', status: 'low', stock: 85, unit: 'Boxes', trend: '+12%' },
        { name: 'Nitrile Gloves (Large)', category: 'Protective Gear', status: 'normal', stock: 420, unit: 'Boxes', trend: '-5%' },
        { name: 'IV Fluids (Saline)', category: 'Clinical Supplies', status: 'low', stock: 45, unit: 'Units', trend: '+20%' },
        { name: 'Digital Thermometers', category: 'Devices', status: 'normal', stock: 120, unit: 'Units', trend: '0%' },
        { name: 'Antibacterial Wipes', category: 'Sanitization', status: 'normal', stock: 230, unit: 'Canisters', trend: '+8%' },
    ];

    return (
        <Layout>
            <div className="max-w-[1600px] text-left">
                {/* Header Section */}
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <Package className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">Supply Chain</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Hospital Inventory</h1>
                        <p className="text-slate-500 font-medium">Global tracking of clinical supplies, devices, and medication stock.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export CSV
                        </Button>
                        <Button variant="primary" className="gap-2 px-8">
                            <Plus className="w-5 h-5" />
                            Provision New Item
                        </Button>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-4 gap-6 mb-10">
                    <Card variant="flat" className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <Box className="w-6 h-6 text-indigo-600" />
                            </div>
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Total SKU's</p>
                        <div className="flex items-end gap-2">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">1,284</h3>
                            <span className="text-[10px] font-bold text-emerald-500 mb-1.5">+4.2%</span>
                        </div>
                    </Card>

                    <Card variant="flat" className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <AlertTriangle className="w-6 h-6 text-rose-500" />
                            </div>
                            <span className="px-3 py-1 bg-rose-100 text-rose-600 text-[10px] font-black rounded-full uppercase">Urgent</span>
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Low Stock items</p>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">12</h3>
                    </Card>

                    <Card variant="flat" className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <Layers className="w-6 h-6 text-sky-500" />
                            </div>
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Orders</p>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">08</h3>
                    </Card>

                    <Card variant="flat" className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <Stethoscope className="w-6 h-6 text-indigo-600" />
                            </div>
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Clinical Value</p>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">$2.4M</h3>
                    </Card>
                </div>

                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-12 space-y-6">
                        {/* Search and Filters */}
                        <Card className="p-4 bg-white/50 border-white">
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1 group">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 w-5 h-5 transition-colors" />
                                    <Input
                                        placeholder="Search by SKU, item name, category or location..."
                                        className="pl-16 bg-white border-2 border-transparent focus:border-indigo-100 placeholder:text-slate-400"
                                    />
                                </div>
                                <Button variant="outline" className="gap-2 h-14 px-8 rounded-2xl">
                                    <Filter className="w-5 h-5" />
                                    Advanced Filters
                                </Button>
                            </div>
                        </Card>

                        {/* Inventory Table */}
                        <Card className="p-0 overflow-hidden bg-white/40 border-white">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-900 text-white">
                                        <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Item Details</th>
                                        <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Category</th>
                                        <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Stock Level</th>
                                        <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Status</th>
                                        <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {stockItems.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-white/60 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                                                        <Package className="w-6 h-6 text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 text-[15px]">{item.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-wider">SKU: H-INV-00{idx + 1}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-sm font-bold text-slate-600">{item.category}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-black text-slate-900">{item.stock}</span>
                                                    <span className="text-[11px] font-bold text-slate-400">{item.unit}</span>
                                                </div>
                                                <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                                    <div
                                                        className={cn(
                                                            "h-full rounded-full transition-all duration-1000",
                                                            item.status === 'low' ? "bg-rose-500" : "bg-emerald-500"
                                                        )}
                                                        style={{ width: `${item.status === 'low' ? '25%' : '85%'}` }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={cn(
                                                    "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                                    item.status === 'low' ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                )}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-slate-400 hover:text-indigo-600 group">
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-slate-400 hover:text-slate-600">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </div >
        </Layout >
    );
};

export default Inventory;
