import { useState, useEffect } from "react";
import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const fetchLogs = () => {
    api.get("activity/")
      .then((res) => setLogs(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const username = log.user?.username?.toLowerCase() ?? "";
    const action = log.action?.toLowerCase() ?? "";
    const details = log.details?.toLowerCase() ?? "";
    const searchValue = search.toLowerCase();

    const matchesSearch =
      username.includes(searchValue) ||
      action.includes(searchValue) ||
      details.includes(searchValue);

    const matchesAction =
      actionFilter === "All" ? true : log.action === actionFilter;

    const matchesDate =
      dateFilter === ""
        ? true
        : new Date(log.timestamp).toISOString().slice(0, 10) === dateFilter;

    return matchesSearch && matchesAction && matchesDate;
  });

  const exportCSV = () => {
    const header = "User,Action,Details,Timestamp\n";

    const rows = filteredLogs
      .map((log) => {
        const username = log.user?.username ?? "System";
        const action = log.action ?? "";
        const details = (log.details ?? "").replace(/"/g, '""');
        const timestamp = log.timestamp ?? "";
        return `"${username}","${action}","${details}","${timestamp}"`;
      })
      .join("\n");

    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "activity_logs.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Activity Logs</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review and export the latest activity logs for administrators.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="shrink-0 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search user, action, details..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />

        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Actions</option>
          <option value="Created Maintenance Request">Created Maintenance Request</option>
          <option value="Assigned Technician">Assigned Technician</option>
          <option value="Updated Task Status">Updated Task Status</option>
          <option value="Created Asset">Created Asset</option>
          <option value="Updated Asset">Updated Asset</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Details</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                  No activity logs found.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-4 py-3 text-sm text-gray-800">{log.user?.username ?? "System"}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{log.action}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{log.details}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {log.timestamp ? new Date(log.timestamp).toLocaleString() : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
