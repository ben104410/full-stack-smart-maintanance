import { useState, type FormEvent, type ChangeEvent, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "staff",
  });

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider");
  }

  const buildUsername = () => {
    const candidate = `${form.first_name}.${form.last_name}`
      .trim()
      .replace(/\s+/g, ".")
      .replace(/^\.+|\.+$/g, "")
      .toLowerCase();

    return candidate || form.email.split("@")[0] || `user${Date.now()}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        username: buildUsername(),
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      await api.post("/users/register/", payload);
      await auth.login(form.email, form.password);
      toast.success("Account created! Redirecting to landing page...");
      navigate("/", { replace: true });
    } catch (err: any) {
      const errorData = err.response?.data;
      const firstError =
        errorData?.email?.[0] ||
        errorData?.password?.[0] ||
        errorData?.username?.[0] ||
         errorData?.detail || "Registration failed. Please try again.";
        
      console.error("Registration failed:", err);

      toast.error(firstError);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-50 px-4 py-12 text-slate-900">
      <div className="absolute inset-0 bg-[url('/images/bg-office.jpg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/80 via-sky-50/80 to-white/95" />

      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-sky-200 bg-white/95 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-sky-600 px-10 py-12 text-white md:px-12 md:py-16">
            <div className="mb-6 inline-flex items-center gap-3 rounded-3xl bg-sky-100/20 px-4 py-2 text-sm font-bold uppercase tracking-[0.25em] text-sky-100">
              Pwani University
            </div>
            <h2 className="text-3xl font-black leading-tight md:text-4xl">
              Create Your Account
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-200/90">
              Join the Pwani Maintenance Portal and access asset tracking, task assignments, and institutional reporting.
            </p>
          </div>

          <div className="px-8 py-10 md:px-12 md:py-14">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">First Name</span>
                  <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Last Name</span>
                  <input
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Email Address</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
                <p className="mt-2 text-xs text-slate-500">Must be at least 6 characters.</p>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Confirm Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Register As</span>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="staff">Staff Member</option>
                  <option value="technician">Technician</option>
                  <option value="admin">Administrator</option>
                </select>
              </label>

              <button
                disabled={loading}
                className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-sky-700 transition hover:text-sky-900">
                Login here
              </Link>
            </p>
            <p className="mt-6 text-center text-xs text-slate-500">© 2026 AssetTrack. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
