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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true);

    try {
      await login(form.email, form.password)
      toast.success("Welcome to the Pwani University Portal");
      navigate("/", { replace: true });
    } catch (err: any) {
      const errorData = err.response?.data;
      const firstError =
        errorData?.detail ||
        errorData?.email?.[0] ||
        errorData?.password?.[0] ||
        errorData?.non_field_errors?.[0] ||
        "Authentication failed. Please verify your credentials.";

      toast.error(firstError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#002147] px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#f37021]"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#f37021] rounded-full blur-[120px] opacity-10"></div>
      
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-[#f37021] rounded-3xl mx-auto flex items-center justify-center text-white text-4xl font-black shadow-2xl mb-6 border-4 border-white/20">P</div>
          <h1 className="text-4xl font-black text-white tracking-tight italic">Portal <span className="text-[#f37021] not-italic">Login</span></h1>
          <p className="text-blue-200 mt-3 font-medium text-lg opacity-80 uppercase tracking-widest">Institutional Access</p>
        </div>

        <form className="bg-white p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] border border-white/10" onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-[0.2em]">University Email</label>
            <input
              type="email"
              placeholder="user@university.edu"
              value={form.email}
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-[#f37021] outline-none transition-all font-medium"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Security Password</label>
              <a href="#" className="text-[10px] font-bold text-[#002147] hover:text-[#f37021] uppercase tracking-tighter">Forgot?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-[#f37021] outline-none transition-all font-medium"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button 
            disabled={isSubmitting}
            className="w-full bg-[#f37021] text-white p-5 rounded-2xl font-black text-lg hover:bg-[#d65a10] shadow-[0_10px_20px_rgba(243,112,33,0.3)] transition-all active:scale-[0.97] disabled:opacity-70" 
            type="submit"
          >
            {isSubmitting ? "Authenticating..." : "Access Account"}
          </button>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm font-semibold">
              New to the portal? <Link to="/register" className="text-[#002147] font-black hover:text-[#f37021] transition">Request Access</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
