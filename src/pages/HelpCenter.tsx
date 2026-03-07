import { Layout } from '../components/layout/Layout';
import { Card } from '../components/layout/BaseUI';
import { HelpCircle, Search, MessageSquare, BookOpen, Headphones } from 'lucide-react';

const HelpCenter = () => {
    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto text-left">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">How can we help?</h1>
                    <p className="text-slate-500 mb-8 text-lg">Search for guides, documentation, or contact support.</p>
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
                        <input
                            type="text"
                            placeholder="Type your question or keyword..."
                            className="w-full bg-white border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-lg focus:ring-4 focus:ring-indigo-100/50 transition-all outline-none shadow-xl shadow-slate-100"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="hover:scale-[1.02] transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 text-lg">Knowledge Base</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Detailed articles and guides on using the medical management system.</p>
                    </Card>
                    <Card className="hover:scale-[1.02] transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 text-lg">Community Forum</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Discuss best practices and workflows with other Healthcare admins.</p>
                    </Card>
                    <Card className="hover:scale-[1.02] transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
                            <Headphones className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 text-lg">24/7 Support</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Need technical help? Our team of specialists is just a click away.</p>
                    </Card>
                </div>

                <div className="mt-12 p-10 bg-indigo-600 rounded-[40px] text-white flex items-center justify-between relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
                    <div>
                        <h2 className="text-2xl font-black mb-2">Still need help?</h2>
                        <p className="text-white/70 font-medium">Join our daily training webinars or book a personalized demo.</p>
                    </div>
                    <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-slate-50 transition-colors relative z-10 shadow-lg">
                        Contact Us
                    </button>
                    <HelpCircle className="absolute right-10 bottom-10 w-32 h-32 text-white/5 -rotate-12" />
                </div>
            </div>
        </Layout>
    );
};

export default HelpCenter;
