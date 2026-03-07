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

function App() {
    // Simple auth check for now
    const isAuthenticated = true; // Temporary

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/appointments"
                    element={isAuthenticated ? <Appointments /> : <Navigate to="/login" />}
                />
                <Route
                    path="/queue"
                    element={isAuthenticated ? <Queue /> : <Navigate to="/login" />}
                />
                <Route
                    path="/patients"
                    element={isAuthenticated ? <Patients /> : <Navigate to="/login" />}
                />
                <Route
                    path="/specialties"
                    element={isAuthenticated ? <Specialties /> : <Navigate to="/login" />}
                />
                <Route
                    path="/pharmacy"
                    element={isAuthenticated ? <Pharmacy /> : <Navigate to="/login" />}
                />
                <Route
                    path="/lab"
                    element={isAuthenticated ? <Laboratory /> : <Navigate to="/login" />}
                />
                <Route
                    path="/doctors"
                    element={isAuthenticated ? <Doctors /> : <Navigate to="/login" />}
                />
                <Route
                    path="/doctor-reports"
                    element={isAuthenticated ? <DoctorReports /> : <Navigate to="/login" />}
                />
                <Route
                    path="/payments"
                    element={isAuthenticated ? <Payments /> : <Navigate to="/login" />}
                />
                <Route
                    path="/inventory"
                    element={isAuthenticated ? <Inventory /> : <Navigate to="/login" />}
                />
                <Route
                    path="/help"
                    element={isAuthenticated ? <HelpCenter /> : <Navigate to="/login" />}
                />
                <Route
                    path="/reports"
                    element={isAuthenticated ? <Reports /> : <Navigate to="/login" />}
                />
                <Route
                    path="/settings"
                    element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
                />
                <Route
                    path="/patient-dashboard"
                    element={isAuthenticated ? <PatientDashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/patient-booking"
                    element={isAuthenticated ? <PatientBooking /> : <Navigate to="/login" />}
                />
                <Route
                    path="/telemedicine"
                    element={isAuthenticated ? <Telemedicine /> : <Navigate to="/login" />}
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Router>
    );
}

export default App;
