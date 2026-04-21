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
    username: "",
    email: "",
    password: "",
    role: "staff", // Default role
  });

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/users/register/", form);
      await auth.login(form.email, form.password);
      toast.success("Account created! Redirecting to landing page...");
      navigate("/", { replace: true });
    } catch (err: any) {
      const errorData = err.response?.data;
      const firstError =
        errorData?.email?.[0] ||
        errorData?.password?.[0] ||
        errorData?.username?.[0] ||
        errorData?.detail ||
        "Registration failed. Please contact IT if this persists.";
      console.error("Registration failed:", err); // Add this line for debugging

      toast.error(firstError);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#002147] px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#f37021] rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">P</div>
          <h1 className="text-3xl font-extrabold text-white">Create Account</h1>
          <p className="text-blue-300 mt-2 font-medium">Join the Pwani Maintenance Portal</p>
        </div>

        <form className="bg-white p-10 shadow-2xl rounded-[2rem]" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-widest">Username</label>
              <input
                type="text"
                name="username"
                placeholder="johndoe_99"
                required
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-widest"> Email</label>
              <input
                type="email"
                name="email"
                placeholder="j.doe@pwani.ac.ke"
                required
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-widest">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-widest">Institutional Role</label>
              <select
                name="role"
                value={form.role}
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white transition"
                onChange={handleChange}
              >
                <option value="staff">Staff Member</option>
                <option value="technician">Technician</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#f37021] text-white p-4 rounded-xl font-bold text-lg hover:bg-orange-600 shadow-lg mt-8 transition-all disabled:opacity-50" 
            type="submit"
          >
            {loading ? "Creating..." : "Register Account"}
          </button>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account? <Link to="/login" className="text-[#f37021] font-bold hover:text-[#002147] transition">Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
