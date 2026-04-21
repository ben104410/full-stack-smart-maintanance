import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import PortalsPage from './pages/PortalsPage'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import AdminDashboard from './pages/admin/AdminDashboard'
import TechnicianDashboard from './pages/technician/TechnicianDashboard'
import UserDashboard from './pages/user/UserDashboard'
import UsersPage from './pages/user/UsersPage'
import AssetsPage from './pages/admin/AssetsPage'
import RequestsPage from './pages/admin/RequestPage'
import AnalyticsPage from './pages/admin/AnalyticsPage'
import RequestDetailsPage from './pages/admin/RequestDetailsPage'
import TaskDetailsPage from './pages/technician/TaskDetailsPage'
import ActivityLogsPage from './pages/admin/ActivityLogsPage'
import StaffDashboard from './pages/staff/StaffDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portals" element={<PortalsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated Routes */}
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

        {/* Admin Dashboard & Sub-pages */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UsersPage /></ProtectedRoute>} />
        <Route path="/admin/assets" element={<ProtectedRoute allowedRoles={['admin']}><AssetsPage /></ProtectedRoute>} />
        <Route path="/admin/requests" element={<ProtectedRoute allowedRoles={['admin']}><RequestsPage /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/admin/logs" element={<ProtectedRoute allowedRoles={['admin']}><ActivityLogsPage /></ProtectedRoute>} />
        <Route path="/admin/requests/:id" element={<ProtectedRoute allowedRoles={['admin']}><RequestDetailsPage /></ProtectedRoute>} />

        {/* Technician Routes */}
        <Route path="/technician" element={<ProtectedRoute allowedRoles={['technician']}><TechnicianDashboard /></ProtectedRoute>} />
        <Route path="/technician/dashboard" element={<ProtectedRoute allowedRoles={['technician']}><TechnicianDashboard /></ProtectedRoute>} />
        <Route path="/technician/task/:id" element={<ProtectedRoute allowedRoles={['technician']}><TaskDetailsPage /></ProtectedRoute>} />

        {/* General User/Staff Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['user', 'staff', 'student']}>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/staff/dashboard" element={
          <ProtectedRoute allowedRoles={['staff']}>
            <StaffDashboard />
          </ProtectedRoute>
        } />

        {/* Redirect any unknown routes back to the landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
