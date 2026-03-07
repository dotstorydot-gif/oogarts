import { Layout } from '../components/layout/Layout';
import { Card } from '../components/layout/BaseUI';
import { Package, Search, Filter } from 'lucide-react';

const Pharmacy = () => {
    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Pharmacy Management</h1>
                        <p className="text-slate-500">Track medication inventory and prescriptions.</p>
                    </div>
                </div>

                <Card className="mb-8">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search medication by name or batch..."
                                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-indigo-100 placeholder:text-slate-400 text-sm transition-all"
                            />
                        </div>
                        <button className="p-3 bg-slate-50 text-slate-500 rounded-2xl hover:text-indigo-600 transition-colors">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </Card>

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12">
                        <Card className="p-0 overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center">
                            <Package className="w-16 h-16 text-slate-200 mb-6" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Inventory Loading...</h3>
                            <p className="text-slate-500">Accessing medication database and stock levels.</p>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Pharmacy;
