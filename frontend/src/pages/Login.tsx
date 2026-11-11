import { type ChangeEvent, type FormEvent, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";

export default function Login() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider")
  }

  const { login } = auth
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true);

    try {
      await login(form.email, form.password)
      toast.success("Welcome to the Pwani University Portal");
      navigate("/portals", { replace: true });
    } catch (err: unknown) {
      const errorData = typeof err === "object" && err !== null && "response" in err
        ? (err as { response?: { data?: { detail?: string; email?: string[]; password?: string[]; non_field_errors?: string[] } } }).response?.data
        : undefined;
      const firstError =
        errorData?.detail ||
        errorData?.email?.[0] ||
        errorData?.password?.[0] ||
        errorData?.non_field_errors?.[0] ||
        "Authentication failed. Please verify your credentials.";

      console.error("Login failed:", err);
      toast.error(firstError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04]" />

      <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-elevated lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left Side: Brand Showcase */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-12 text-white lg:flex">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:text-white"
            >
              <ArrowLeft size={15} /> Back to home
            </Link>

            <div className="mt-14 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500 text-xl font-black text-white shadow-md shadow-sky-500/30">
                P
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight">
                  Pwani<span className="text-sky-400">Maint</span>
                </span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Campus Facilities OS
                </p>
              </div>
            </div>

            <h1 className="mt-8 text-3xl font-extrabold leading-tight tracking-tight text-white">
              Centralized facilities care for university operations.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Submit work orders, inspect assets via QR codes, assign technician teams, and verify
              completed repairs in one place.
            </p>
          </div>

          <div className="relative space-y-3.5 border-t border-slate-700/60 pt-8 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-sky-400" />
              <span>Role-Based Authentication (Admin, Staff, Technician, Student)</span>
            </div>
            <div className="flex items-center gap-3">
              <LockKeyhole size={18} className="text-teal-400" />
              <span>Audit Trail &amp; Verification Timestamping</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sign-in Form */}
        <div className="p-8 sm:p-12 lg:p-14">
          <div className="mb-8">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 lg:hidden"
            >
              <ArrowLeft size={14} /> Back to home
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-700">
              <span>Verified Access</span>
            </div>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Sign in to your account
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              Enter your university email address and password to continue.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@pwani.ac.ke or personal email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => toast.error("Please contact your IT department or use your registration credentials.")}
                  className="text-xs font-semibold text-sky-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 pr-11 text-sm text-slate-800 outline-none transition focus:border-sky-600 focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              disabled={isSubmitting}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-3.5 text-sm font-bold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700 active:scale-[0.99] disabled:opacity-50"
              type="submit"
            >
              {isSubmitting ? "Signing in..." : <>Sign In to Workspace <ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="mt-8 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
            <span>Don&rsquo;t have an account yet? </span>
            <Link to="/register" className="font-bold text-sky-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
