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
    } catch (err: unknown) {
      const errorData = typeof err === "object" && err !== null && "response" in err
        ? (err as { response?: { data?: { detail?: string; email?: string[]; password?: string[]; username?: string[] } } }).response?.data
        : undefined;
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
    <div className="relative min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04]" />

      <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-elevated">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Brand Left Column */}
          <div className="hidden flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-12 text-white lg:flex">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:text-white"
              >
                ← Back to home
              </Link>
              <div className="mt-12 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500 text-lg font-black text-white shadow-md shadow-sky-500/30">
                  P
                </div>
                <div>
                  <span className="text-xl font-extrabold tracking-tight">
                    Pwani<span className="text-sky-400">Maint</span>
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Registration Portal
                  </p>
                </div>
              </div>

              <h2 className="mt-8 text-3xl font-extrabold leading-tight tracking-tight text-white">
                Join the Campus Facilities Workspace
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Register to submit maintenance requests, report facilities damage, receive job assignments,
                and maintain university property.
              </p>
            </div>

            <div className="border-t border-slate-700/60 pt-6 text-xs text-slate-400">
              <p>Accounts are verified according to your university department.</p>
            </div>
          </div>

          {/* Form Right Column */}
          <div className="p-8 sm:p-12">
            <div className="mb-6">
              <Link
                to="/"
                className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 lg:hidden"
              >
                ← Back to home
              </Link>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Create Your Account
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Fill in your details below to register on the maintenance platform.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="e.g. John"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="e.g. Doe"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@pwani.ac.ke or personal email"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Campus Role
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white"
                >
                  <option value="student">Student / Community</option>
                  <option value="staff">Staff Member</option>
                  <option value="technician">Technician / Maintenance Personnel</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <button
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-sky-600 py-3 text-sm font-bold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700 active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Complete Registration"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
              Already registered?{' '}
              <Link to="/login" className="font-bold text-sky-600 hover:underline">
                Sign in to your account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
