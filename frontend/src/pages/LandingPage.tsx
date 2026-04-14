import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LandingPage() {
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;
  const loading = auth?.loading ?? true;

  // Automatically redirect logged-in users to their dashboard
  if (!loading && user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "technician") return <Navigate to="/technician" replace />;
    if (user.role === "staff") return <Navigate to="/staff/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <section className="bg-blue-700 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">
          University Asset & Maintenance Management System
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          A smart, efficient and automated system for managing institution assets,
          reporting issues, assigning technicians, and tracking maintenance progress.
        </p>

        <Link
          to="/login"
          className="bg-white text-blue-700 px-6 py-3 rounded shadow font-bold text-lg"
        >
          Login
        </Link>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Asset Management</h3>
            <p>
              Track all university assets, including computers, lab equipment, furniture,
              and more. Attach images and assign QR codes for quick access.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Maintenance Requests</h3>
            <p>
              Staff can easily submit maintenance requests and upload photographs of
              issues. Admins assign technicians and monitor progress.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-3">Technician Workflow</h3>
            <p>
              Technicians receive assigned tasks, update status, upload repair proof,
              and add notes. Progress is tracked automatically.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-200 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          How It Works
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-3">1. Staff Submit Issues</h3>
            <p>
              Users report equipment failure or facility issues directly through their dashboard.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-3">2. Admin Assigns Technician</h3>
            <p>
              Admin reviews requests and assigns a technician for quick resolution.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-3">3. Technician Resolves Issue</h3>
            <p>
              Technician updates task status, uploads before/after images, and completes the task.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-700 text-white py-6 mt-10 text-center">
        <p className="text-lg">
          © {new Date().getFullYear()} University Asset & Maintenance Management System.
          All rights reserved.
        </p>
      </footer>

    </div>
  );
}