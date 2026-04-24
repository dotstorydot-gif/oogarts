import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, Button, cn } from '../components/layout/BaseUI';
import {
    Package,
    AlertTriangle,
    Plus,
    TrendingUp,
    MoreHorizontal,
    Box,
    ChevronRight,
    X,
    Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Inventory = () => {
    const [showProvisionForm, setShowProvisionForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [stockItems, setStockItems] = useState<any[]>([]);
    const [newItem, setNewItem] = useState({
        name: '',
        category: 'Clinical Supplies',
        stock: 0,
        unit: 'Units'
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data } = await supabase.from('inventory').select('*').order('name');
            setStockItems(data || []);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleProvision = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('inventory').insert([{
                ...newItem,
                status: newItem.stock < 50 ? 'low' : 'normal',
                trend: '+0%'
            }]);
            if (error) throw error;
            alert('Item provisioned successfully!');
            setShowProvisionForm(false);
            setNewItem({ name: '', category: 'Clinical Supplies', stock: 0, unit: 'Units' });
            fetchData();
        } catch (error) {
            console.error("Error provisioning item:", error);
            alert("Failed to provision item.");
        }
    };

    return (
        <Layout>
            <div className="max-w-[1600px] text-left">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
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
                        <Button variant="outline" className="gap-2" onClick={fetchData}>
                            <Loader2 size={16} className={isLoading ? 'animate-spin' : ''} />
                            Refresh
                        </Button>
                        <Button variant="dark" className="gap-2 px-8 active:scale-95" onClick={() => setShowProvisionForm(true)}>
                            <Plus className="w-5 h-5" />
                            Provision New Item
                        </Button>
                    </div>
                </div>

                {showProvisionForm && (
                    <Card className="mb-12 p-10 animate-in fade-in zoom-in-95 duration-500 bg-white/80 backdrop-blur-xl border-white shadow-2xl relative">
                        <button onClick={() => setShowProvisionForm(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                            <X className="w-5 h-5" />
                        </button>
                        <div className="mb-10 text-left">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Provision New Supply</h2>
                            <p className="text-slate-500 font-medium">Add clinical assets to global inventory database.</p>
                        </div>
                        <form onSubmit={handleProvision} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div className="col-span-1 md:col-span-2 text-left">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Item Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Surgical Gloves"
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl font-bold outline-none transition-all"
                                        value={newItem.name}
                                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="text-left">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Category</label>
                                    <select 
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl font-bold outline-none transition-all appearance-none"
                                        value={newItem.category}
                                        onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                                    >
                                        <option>Clinical Supplies</option>
                                        <option>Protective Gear</option>
                                        <option>Devices</option>
                                        <option>Sanitization</option>
                                    </select>
                                </div>
                                <div className="text-left">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Stock Level</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl font-bold outline-none transition-all"
                                        value={newItem.stock}
                                        onChange={(e) => setNewItem({...newItem, stock: parseInt(e.target.value)})}
                                        required
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full h-16 rounded-[24px] bg-slate-900 hover:bg-black font-black flex items-center justify-center gap-3 group transition-all text-white">
                                <span>Finalize Provisioning</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>
                    </Card>
                )}

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold">Synchronizing inventory data...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {stockItems.map((item, idx) => (
                            <Card key={idx} className="p-8 hover:shadow-2xl transition-all duration-300 group cursor-pointer border-slate-100">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center",
                                            item.status === 'low' ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600"
                                        )}>
                                            <Box className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-slate-900 text-lg group-hover:text-indigo-600 transition-colors leading-tight">{item.name}</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{item.category}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-300">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Stock</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className={cn(
                                                "text-3xl font-black",
                                                item.status === 'low' ? "text-rose-600" : "text-slate-900"
                                            )}>{item.stock}</span>
                                            <span className="text-sm font-bold text-slate-400 italic">{item.unit || 'Units'}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Utilization</p>
                                        <div className="flex items-center justify-end gap-2 text-emerald-500 font-black">
                                            <TrendingUp className="w-4 h-4" />
                                            <span>{item.trend}</span>
                                        </div>
                                    </div>
                                </div>

                                {item.status === 'low' && (
                                    <div className="mt-6 flex items-center gap-3 bg-rose-50 text-rose-600 p-4 rounded-xl">
                                        <AlertTriangle className="w-5 h-5" />
                                        <span className="text-xs font-black uppercase tracking-widest">Restock Required Immediately</span>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Inventory;
