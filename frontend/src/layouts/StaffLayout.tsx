import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

export default function StaffLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-blue">
      <Sidebar />

      <div className="flex-1 bg-white/90 backdrop-blur p-6">
        {children}
      </div>
    </div>
  );
}
