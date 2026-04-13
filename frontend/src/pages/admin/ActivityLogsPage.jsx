import { useState, useEffect } from "react";
import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  the [actionFilter, setActionFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const fetchLogs = () => {
    api
      .get("activity/")
      .then((res) => setLogs(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user?.username.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details?.toLowerCase().includes(search.toLowerCase());

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
      .map(
        (log) =>
          `"${log.user?.username || "System"}","${log.action}","${
            log.details
          }","${log.timestamp}"`
      )
      .join("\n");

    const csv = header + rows;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "activity_logs.csv";
    a.click();
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Activity Logs</h1>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search user, action, or details..."
          className="p-2 border rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border rounded"
          onChange={(e) => setActionFilter(e.target.value)}
        >
          <option value="All">All Actions</option>
          <option value="Created Maintenance Request">
            Created Maintenance Request
          </option>
          <option value="Assigned Technician">Assigned Technician</option>
          <option value="Updated Task Status">Updated Task Status</option>
          <option value="Created Asset">Created Asset</option>
          <option value="Updated Asset">Updated Asset</option>
        </select>

        <input
          type="date"
          className="p-2 border rounded"
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <button
          onClick={exportCSV}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Export CSV
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Action</th>
              <th className="p-2 text-left">Details</th>
              <th className="p-2 text-left">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{log.user?.username || "System"}</td>
                <td className="p-2">{log.action}</td>
                <td className="p-2">{log.details}</td>
                <td className="p-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}

            {filteredLogs.length === 0 && (
              <tr>
                <td className="p-4 text-center" colSpan="4">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}