import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "staff", // Default role
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/users/register/", form);
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-600 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">P</div>
          <h1 className="text-3xl font-extrabold text-white">Create Account</h1>
          <p className="text-blue-300 mt-2 font-medium">Join the Pwani Maintenance Portal</p>
        </div>

        <form className="bg-white p-10 shadow-2xl rounded-3xl" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-widest">Full Name</label>
              <input
                type="text"
                name="username"
                placeholder="John Doe"
                required
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-widest">University Email</label>
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
          </div>

          <button 
            disabled={loading}
            className="w-full bg-orange-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-orange-700 shadow-lg mt-8 transition-all disabled:opacity-50" 
            type="submit"
          >
            {loading ? "Creating..." : "Register Account"}
          </button>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account? <Link to="/login" className="text-blue-700 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}