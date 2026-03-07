import { Layout } from '../components/layout/Layout';
import { Card } from '../components/layout/BaseUI';
import { Activity } from 'lucide-react';

const PatientBilling = () => {
    return (
        <Layout>
            <div className="max-w-[1000px] mx-auto text-left py-8">
                <div className="mb-12">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Billing & Claims</h1>
                    <p className="text-slate-500 font-medium">Manage your invoices, payments, and insurance claims.</p>
                </div>

                <Card className="p-16 text-center shadow-xl border-slate-100">
                    <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Activity className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Under Construction</h2>
                    <p className="text-slate-500 font-medium max-w-md mx-auto">
                        The patient billing portal is currently being integrated with our payment processor. Check back soon!
                    </p>
                </Card>
            </div>
        </Layout>
    );
};

export default PatientBilling;
