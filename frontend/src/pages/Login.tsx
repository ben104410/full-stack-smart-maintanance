import { useState, useContext, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
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
      const user = auth.user
      if (user?.role === "admin") navigate("/admin")
      else if (user?.role === "technician") navigate("/technician")
      else navigate("/dashboard")
    } catch (err) {
      alert("Login failed")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 shadow rounded w-96" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          className="w-full mb-3 p-2 border"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className="w-full mb-3 p-2 border"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}
