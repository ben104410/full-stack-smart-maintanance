import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
import AssignTechnicianModal from "../../components/AssignTechnicianModal";

interface Request {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  user?: { username: string };
  asset?: { name: string };
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [assignData, setAssignData] = useState<Request | null>(null);

  const fetchRequests = () => {
    api.get("maintenance/all/")
      .then(res => setRequests(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(search.toLowerCase()) ||
      req.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : req.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Maintenance Requests</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search requests..."
          className="p-2 border rounded w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Assigned</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th className="p-2">Requesting User</th>
            <th className="p-2">Asset</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Status</th>
            <th className="p-2">Created</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredRequests.map((req) => (
            <tr key={req.id} className="border-t">
              <td className="p-2">{req.title}</td>
              <td className="p-2">{req.user?.username}</td>

              <td className="p-2">
                {req.asset ? (
                  <span className="px-2 py-1 bg-blue-100 rounded text-blue-600">
                    {req.asset.name}
                  </span>
                ) : (
                  "—"
                )}
              </td>

              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    req.priority === "High"
                      ? "bg-red-600"
                      : req.priority === "Medium"
                      ? "bg-yellow-600"
                      : "bg-green-600"
                  }`}
                >
                  {req.priority}
                </span>
              </td>

              <td className="p-2">{req.status}</td>

              <td className="p-2">
                {new Date(req.created_at).toLocaleString()}
              </td>

              <td className="p-2 flex gap-2">
                {req.status === "Pending" && (
                  <button
                    onClick={() => setAssignData(req)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Assign
                  </button>
                )}

                {req.status === "Completed" && (
                  <button className="bg-green-600 text-white px-3 py-1 rounded">
                    Verify
                  </button>
                )}

                <button className="bg-gray-600 text-white px-3 py-1 rounded">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign Technician Modal */}
      {assignData && (
        <AssignTechnicianModal
          request={assignData}
          close={() => setAssignData(null)}
          refresh={fetchRequests}
        />
      )}
    </AdminLayout>
  );
}