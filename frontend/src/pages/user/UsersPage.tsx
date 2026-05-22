import { useEffect, useState } from "react";
import api from "../../api/axios";
import Layout from "../../layouts/Layout";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get("maintenance/users/")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-black text-[#002147] uppercase tracking-tight mb-6">Manage <span className="text-[#f37021]">Users</span></h1>

      <table className="w-full bg-white shadow-sm rounded-3xl overflow-hidden border border-slate-100">
        <thead>
          <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <th className="px-6 py-4 text-left">Username</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-bold text-sm text-slate-700">{user.username}</td>
              <td className="px-6 py-4 text-sm text-slate-500">{user.email}</td>
              <td className="px-6 py-4 text-sm font-bold text-orange-600 capitalize">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}