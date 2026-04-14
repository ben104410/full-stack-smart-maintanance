import { type ChangeEvent, type FormEvent, useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await login(form.email, form.password)
      navigate("/")
    } catch (err) {
      alert("Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-600 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">P</div>
          <h1 className="text-3xl font-extrabold text-white">Institutional Login</h1>
          <p className="text-blue-300 mt-2 font-medium">Maintenance & Asset Management Portal</p>
        </div>

        <form className="bg-white p-10 shadow-2xl rounded-3xl" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address</label>
            <input
              type="email"
              placeholder="user@university.edu"
              value={form.email}
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="w-full bg-orange-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-orange-700 shadow-lg transition-all active:scale-[0.98]" type="submit">
            Sign In
          </button>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account? <Link to="/register" className="text-blue-700 font-bold hover:underline">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
