import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
import AdminDashboard from './pages/admin/AdminDashboard'
import TechnicianDashboard from './pages/technician/TechnicianDashboard'
import UserDashboard from './pages/user/UserDashboard'
import UsersPage from './pages/user/UsersPage'
import AssetsPage from "./pages/admin/AssetsPage";
import RequestsPage from "./pages/admin/RequestPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import RequestDetailsPage from "./pages/admin/RequestDetailsPage";
import TaskDetailsPage from "./pages/technician/TaskDetailsPage";
import ActivityLogsPage from "./pages/admin/ActivityLogsPage";
import StaffDashboard from './pages/staff/StaffDashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/technician" element={<TechnicianDashboard />} />
        <Route path="/technician/dashboard" element={<TechnicianDashboard />} />
        <Route path="/technician/task/:id" element={<TaskDetailsPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/assets" element={<AssetsPage />} />
        <Route path="/admin/requests" element={<RequestsPage />} />
        <Route path="/admin/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/logs" element={<ActivityLogsPage />} />
        <Route path="/admin/requests/:id" element={<RequestDetailsPage />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
