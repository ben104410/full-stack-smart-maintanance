import { type ChangeEvent, type FormEvent, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

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
    } catch (err: any) {
      const errorData = err.response?.data;
      const firstError =
        errorData?.detail ||
        errorData?.email?.[0] ||
        errorData?.password?.[0] ||
        errorData?.non_field_errors?.[0] ||
        "Authentication failed. Please verify your credentials.";

      console.error("Login failed:", err); // Add this line for debugging
      toast.error(firstError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-50 px-4 py-12 text-slate-900">
      <div className="absolute inset-0 bg-[url('/images/bg-office.jpg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/80 via-sky-50/80 to-white/95" />

      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-sky-200 bg-white/95 shadow-2xl backdrop-blur-xl">
        <div className="px-8 py-10 md:px-10 md:py-12">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-600 text-white text-3xl font-black shadow-lg">
              P
            </div>
            <h2 className="text-3xl font-black text-slate-900">Sign In</h2>
            <p className="mt-2 text-sm text-slate-500">Access the Pwani University maintenance portal</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Email Address</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </label>

            <button
              type="button"
              onClick={() => toast.error("Please contact the IT department at support@pwani-maint.local to reset your password.")}
              className="text-left text-sm font-medium text-slate-500 hover:text-sky-600 transition-colors"
            >
              Forgot password?
            </button>

            <button
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don’t have an account?{' '}
            <Link to="/register" className="font-semibold text-sky-700 transition hover:text-sky-900">
              Create Account
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-slate-500">© 2026 AssetTrack. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
