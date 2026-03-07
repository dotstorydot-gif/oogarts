import { Layout } from '../components/layout/Layout';
import { Card } from '../components/layout/BaseUI';
import { Package, Search, AlertTriangle, Plus } from 'lucide-react';

const Inventory = () => {
    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Hospital Inventory</h1>
                        <p className="text-slate-500">Track supplies, equipment, and stock levels.</p>
                    </div>
                    <button className="flex items-center gap-2.5 px-6 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-100">
                        <Plus className="w-5 h-5" />
                        <span>Add Item</span>
                    </button>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12">
                        <Card className="bg-rose-50 border-rose-100 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-rose-500 text-white rounded-xl"><AlertTriangle className="w-5 h-5" /></div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Low Stock Alert</h4>
                                    <p className="text-sm text-slate-500 mt-1">Surgical masks and gloves are below the threshold of 100 units.</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="col-span-12">
                        <Card className="p-0 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <div className="relative w-72">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search inventory..."
                                        className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div className="p-12 text-center text-slate-300">
                                <Package className="w-16 h-16 mx-auto mb-6 opacity-30" />
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Catalog Loading...</h3>
                                <p className="text-sm text-slate-500">Scanning inventory database and stock levels.</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Inventory;
