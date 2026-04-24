import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Queue from './pages/Queue';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Specialties from './pages/Specialties';
import Pharmacy from './pages/Pharmacy';
import Laboratory from './pages/Laboratory';
import Doctors from './pages/Doctors';
import Payments from './pages/Payments';
import Inventory from './pages/Inventory';
import HelpCenter from './pages/HelpCenter';
import Reports from './pages/Reports';
import DoctorReports from './pages/DoctorReports';
import Settings from './pages/Settings';
import PatientDashboard from './pages/PatientDashboard';
import PatientBooking from './pages/PatientBooking';
import Telemedicine from './pages/Telemedicine';
import PatientRecords from './pages/PatientRecords';
import PatientBilling from './pages/PatientBilling';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
    const isAuthenticated = true; // Temporary simple auth
    const userRole = localStorage.getItem('userRole') || 'admin';

    if (!isAuthenticated) return <Navigate to="/login" />;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        if (userRole === 'patient') return <Navigate to="/patient-dashboard" />;
        return <Navigate to="/dashboard" />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                
                {/* Admin & Doctor Routes */}
                <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin', 'doctor']}><Dashboard /></ProtectedRoute>} />
                <Route path="/appointments" element={<ProtectedRoute allowedRoles={['admin', 'doctor']}><Appointments /></ProtectedRoute>} />
                <Route path="/queue" element={<ProtectedRoute allowedRoles={['admin']}><Queue /></ProtectedRoute>} />
                <Route path="/patients" element={<ProtectedRoute allowedRoles={['admin', 'doctor']}><Patients /></ProtectedRoute>} />
                <Route path="/specialties" element={<ProtectedRoute allowedRoles={['admin']}><Specialties /></ProtectedRoute>} />
                <Route path="/pharmacy" element={<ProtectedRoute allowedRoles={['admin']}><Pharmacy /></ProtectedRoute>} />
                <Route path="/lab" element={<ProtectedRoute allowedRoles={['admin', 'doctor']}><Laboratory /></ProtectedRoute>} />
                <Route path="/doctors" element={<ProtectedRoute allowedRoles={['admin']}><Doctors /></ProtectedRoute>} />
                <Route path="/doctor-reports" element={<ProtectedRoute allowedRoles={['admin', 'doctor']}><DoctorReports /></ProtectedRoute>} />
                <Route path="/payments" element={<ProtectedRoute allowedRoles={['admin']}><Payments /></ProtectedRoute>} />
                <Route path="/inventory" element={<ProtectedRoute allowedRoles={['admin']}><Inventory /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute allowedRoles={['admin']}><Reports /></ProtectedRoute>} />
                
                {/* Patient Routes */}
                <Route path="/patient-dashboard" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
                <Route path="/patient-booking" element={<ProtectedRoute allowedRoles={['patient']}><PatientBooking /></ProtectedRoute>} />
                <Route path="/patient-records" element={<ProtectedRoute allowedRoles={['patient']}><PatientRecords /></ProtectedRoute>} />
                <Route path="/patient-billing" element={<ProtectedRoute allowedRoles={['patient']}><PatientBilling /></ProtectedRoute>} />
                
                {/* Shared Routes */}
                <Route path="/telemedicine" element={<ProtectedRoute allowedRoles={['patient', 'doctor']}><Telemedicine /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute allowedRoles={['admin', 'doctor', 'patient']}><Settings /></ProtectedRoute>} />
                <Route path="/help" element={<ProtectedRoute allowedRoles={['admin', 'doctor', 'patient']}><HelpCenter /></ProtectedRoute>} />
                
                {/* Default Route */}
                <Route path="/" element={<ProtectedRoute><Navigate to="/dashboard" /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
