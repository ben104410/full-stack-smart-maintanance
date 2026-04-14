import { Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import TechnicianDashboard from "./pages/TechnicianDashboard";

<Route path="/login" element={<Login />} />

{/* Admin */}
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

{/* Technician */}
<Route
  path="/technician/dashboard"
  element={
    <ProtectedRoute allowedRoles={["technician"]}>
      <TechnicianDashboard />
    </ProtectedRoute>
  }
/>