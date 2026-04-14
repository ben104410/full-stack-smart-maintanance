import { type ReactNode, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: string[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const auth = useContext(AuthContext)
  const user = auth?.user
  const loading = auth?.loading ?? true

  if (loading) return <p>Loading...</p>

  if (!user) return <Navigate to="/login" />

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}
