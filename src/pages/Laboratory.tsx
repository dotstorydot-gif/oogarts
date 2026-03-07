import { Layout } from '../components/layout/Layout';
import { Card } from '../components/layout/BaseUI';
import { FileText, TestTube, Microscope } from 'lucide-react';

const Laboratory = () => {
    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Laboratory System</h1>
                    <p className="text-slate-500">Process test orders and manage results.</p>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-4">
                        <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-0">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white/10 rounded-xl"><TestTube className="w-6 h-6" /></div>
                                <h3 className="font-bold">Pending Tests</h3>
                            </div>
                            <h2 className="text-4xl font-black">24</h2>
                            <p className="text-white/70 text-sm mt-2 font-medium">Requiring immediate processing</p>
                        </Card>
                    </div>
                    <div className="col-span-8">
                        <Card className="min-h-[300px] flex flex-col items-center justify-center text-center">
                            <Microscope className="w-12 h-12 text-slate-200 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-1">Laboratory Equipment Active</h3>
                            <p className="text-slate-500 text-sm">Real-time status tracking is being synchronized.</p>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Laboratory;
