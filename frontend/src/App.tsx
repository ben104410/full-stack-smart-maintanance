import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import AdminDashboard from "./pages/AdminDashboard";
import TechnicianDashboard from "./pages/technician/TechnicianDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import UsersPage from "./pages/user/UsersPage";
import FeedbackPage from "./pages/FeedbackPage";
import AssetsPage from "./pages/admin/AssetsPage";
import RequestsPage from "./pages/admin/RequestPage";
import RequestDetailsPage from "./pages/admin/RequestDetailsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import ActivityLogsPage from "./pages/admin/ActivityLogsPage";
import TaskDetailsPage from "./pages/technician/TaskDetailsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layouts/Layout";

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
        <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<Navigate to="/portals" replace />} />
        
        {/* Role-Based Dashboard Routes */}
        <Route path="/staff/dashboard" element={<ProtectedRoute allowedRoles={['staff', 'student', 'admin']}><Layout><StaffDashboard /></Layout></ProtectedRoute>} />
        <Route path="/user/dashboard" element={<Navigate to="/staff/dashboard" replace />} />
        <Route path="/technician/dashboard" element={<ProtectedRoute allowedRoles={['technician', 'admin']}><Layout><TechnicianDashboard /></Layout></ProtectedRoute>} />
        <Route path="/technician/tasks/:id" element={<ProtectedRoute allowedRoles={['technician', 'admin']}><Layout><TaskDetailsPage /></Layout></ProtectedRoute>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><Layout><UsersPage /></Layout></ProtectedRoute>} />
        <Route path="/admin/assets" element={<ProtectedRoute allowedRoles={['admin']}><Layout><AssetsPage /></Layout></ProtectedRoute>} />
        <Route path="/admin/requests" element={<ProtectedRoute allowedRoles={['admin']}><Layout><RequestsPage /></Layout></ProtectedRoute>} />
        <Route path="/admin/requests/:id" element={<ProtectedRoute allowedRoles={['admin']}><Layout><RequestDetailsPage /></Layout></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><Layout><AnalyticsPage /></Layout></ProtectedRoute>} />
        <Route path="/admin/logs" element={<ProtectedRoute allowedRoles={['admin']}><Layout><ActivityLogsPage /></Layout></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute allowedRoles={['admin']}><Layout><UsersPage /></Layout></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}