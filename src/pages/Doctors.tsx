import { Layout } from '../components/layout/Layout';
import { Card } from '../components/layout/BaseUI';
import { UserSquare2, Search, UserPlus } from 'lucide-react';

const Doctors = () => {
    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Doctors Directory</h1>
                        <p className="text-slate-500">Manage medical staff and schedules.</p>
                    </div>
                    <button className="flex items-center gap-2.5 px-6 py-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-bold shadow-lg shadow-slate-100">
                        <UserPlus className="w-5 h-5" />
                        <span>Add New Doctor</span>
                    </button>
                </div>

                <Card className="p-0 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                            />
                        </div>
                    </div>
                    <div className="p-12 text-center">
                        <UserSquare2 className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Loading Staff Profiles...</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">This section is being populated with your organization's medical personnel data.</p>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default Doctors;
