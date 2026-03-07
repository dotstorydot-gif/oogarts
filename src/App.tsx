import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Queue from './pages/Queue';
import Patients from './pages/Patients';

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
                    path="/queue"
                    element={isAuthenticated ? <Queue /> : <Navigate to="/login" />}
                />
                <Route
                    path="/patients"
                    element={isAuthenticated ? <Patients /> : <Navigate to="/login" />}
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Router>
    );
}

export default App;
