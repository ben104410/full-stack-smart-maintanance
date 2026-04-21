import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PortalsPage from "./pages/PortalsPage";
import CoreCapabilitiesPage from "./pages/CoreCapabilitiesPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import UserProfile from "./pages/UserProfile";
import ContactPage from "./pages/ContactPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      {/* Toast notifications for feedback on login/registration */}
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          duration: 4000,
          style: { fontWeight: 'bold', borderRadius: '12px' } 
        }} 
      />
      
      <Routes>
        {/* Public Institutional Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/core-capabilities" element={<CoreCapabilitiesPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Authenticated Portals & Profile */}
        <Route path="/portals" element={<ProtectedRoute><PortalsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        
        {/* Role-Based Dashboard Placeholders (To be developed) */}
        <Route path="/staff/dashboard" element={<ProtectedRoute allowedRoles={['staff', 'admin']}><div className="p-20 text-center font-bold">Staff Workspace Placeholder</div></ProtectedRoute>} />
        <Route path="/technician/dashboard" element={<ProtectedRoute allowedRoles={['technician', 'admin']}><div className="p-20 text-center font-bold">Technician Workspace Placeholder</div></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><div className="p-20 text-center font-bold">Administrative Command Center Placeholder</div></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><div className="p-20 text-center font-bold">Operational Analytics Placeholder</div></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}